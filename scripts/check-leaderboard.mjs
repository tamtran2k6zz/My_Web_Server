import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { build } from 'esbuild';
import { initializeTestEnvironment, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
const env = await initializeTestEnvironment({ projectId:'demo-quiz-ranking', firestore:{host:'127.0.0.1',port:8085,rules:readFileSync('firestore.rules','utf8')} });
const user = uid => ({uid,email:`${uid}@ictu.edu.vn`,email_verified:true,displayName:uid});
const a = user('student-a'), b = user('student-b');
const dbA = env.authenticatedContext(a.uid,{email:a.email,email_verified:true}).firestore();
const dbB = env.authenticatedContext(b.uid,{email:b.email,email_verified:true}).firestore();
let activeUser=a, activeDb=dbA;
const storage=new Map();
globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
const output=await build({entryPoints:['services/examService.ts'],bundle:true,write:false,platform:'node',format:'esm',packages:'external',plugins:[{name:'firebase-test',setup(build){build.onResolve({filter:/^\.\.\/firebase$/},()=>({path:'firebase-test',namespace:'test'}));build.onLoad({filter:/.*/,namespace:'test'},()=>({contents:`export const auth={get currentUser(){return globalThis.__testUser()}}; export const db=globalThis.__testDb(); export const maskEmail=()=> 'stu***nt@ictu.edu.vn';`}));}}]});
globalThis.__testUser=()=>activeUser;globalThis.__testDb=()=>activeDb._delegate;
const bundleUrl=new URL('../.leaderboard-test.mjs',import.meta.url);writeFileSync(bundleUrl,output.outputFiles[0].text);
const service=await import(bundleUrl.href);unlinkSync(bundleUrl);
const record=(id,score,time=60)=>({id,userId:a.uid,topicId:'1',topicName:'Part 1',score,totalQuestions:40,timeSpentSeconds:time,totalDurationSeconds:1800,timestamp:Date.now(),answers:Array.from({length:40},(_,i)=>({questionIndex:i,questionText:'Test',type:'single',isCorrect:i<score}))});
try {
 let unsubscribe;
 const received=new Promise((resolve,reject)=>{unsubscribe=service.watchLeaderboard('1',rows=>{if(rows.some(r=>r.score===35))resolve(rows)},reject)});
 await service.saveExamResult(record('first',30));
 await service.saveExamResult(record('lower',20));
 assert.equal((await getDoc(doc(dbA,'quizLeaderboards/1/entries/'+a.uid))).data().score,30);
 await Promise.all([service.saveExamResult(record('better',35,80)),service.saveExamResult(record('fast',35,50))]);
 const rows=await received; assert.equal(rows.length,1);unsubscribe();
 await service.saveExamResult(record('fast',35,50));
 assert.equal((await getDoc(doc(dbB,'quizLeaderboards/1/entries/'+a.uid))).data().timeSpentSeconds,50);
 assert.equal(service.getPendingExamResults(a.uid).length,0);
 await new Promise((resolve,reject)=>{const off=service.watchStudentHistory(items=>{try{assert.equal(items.length,4);off();resolve()}catch(e){reject(e)}},reject)});
 const privateRecord={...record('personal',10),topicId:'saved-questions'};await service.saveExamResult(privateRecord);
 assert.ok((await getDoc(doc(dbA,'quizExamHistory/'+a.uid+'/attempts/personal'))).exists());
 assert.ok(!(await getDoc(doc(dbA,'quizLeaderboards/saved-questions/entries/'+a.uid))).exists());
 await assertFails(getDoc(doc(dbB,'quizExamHistory/'+a.uid+'/attempts/first')));
 await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'quizLeaderboards/1/entries/'+a.uid)));
 await assertFails(getDoc(doc(env.authenticatedContext('outsider',{email:'x@gmail.com',email_verified:true}).firestore(),'quizLeaderboards/1/entries/'+a.uid)));
 const summary=(await getDoc(doc(dbA,'quizLeaderboards/1/entries/'+a.uid))).data();
 assert.ok(!('userEmail' in summary)&&!('answers' in summary));
 await assertFails(setDoc(doc(dbB,'quizLeaderboards/1/entries/'+a.uid),{...summary,submittedAt:serverTimestamp()}));
 await assertFails(setDoc(doc(dbA,'quizLeaderboards/1/entries/'+a.uid),{...summary,score:40,submittedAt:serverTimestamp()}));
 await assertFails(setDoc(doc(dbA,'quizExamHistory/'+a.uid+'/attempts/first'),{...summary,submittedAt:serverTimestamp()}));
 const batch=writeBatch(dbA); const worse={...summary,score:1,submissionId:'forged-lower',submittedAt:serverTimestamp()};
 batch.set(doc(dbA,'quizExamHistory/'+a.uid+'/attempts/forged-lower'),{...worse,userEmail:a.email,answers:Array(40).fill({})});batch.set(doc(dbA,'quizLeaderboards/1/entries/'+a.uid),worse);await assertFails(batch.commit());
 console.log('PASS: real-time updates, concurrent best score, idempotent retry, private history, ownership, domain and overwrite rules.');
} catch(error) { writeFileSync('rules-coverage.local.json',await (await fetch('http://127.0.0.1:8085/emulator/v1/projects/demo-quiz-ranking:ruleCoverage')).text()); throw error; } finally { await env.cleanup(); }




