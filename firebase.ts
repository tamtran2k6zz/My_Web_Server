import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMayk2Gj6-UwslBOb-byGo8Pv_yHugWgE",
  authDomain: "login-kinh-te-mac.firebaseapp.com",
  projectId: "login-kinh-te-mac",
  storageBucket: "login-kinh-te-mac.firebasestorage.app",
  messagingSenderId: "118965171740",
  appId: "1:118965171740:web:1ccb35451b5bfbbbec11d9",
  measurementId: "G-DLWPC4Y8ER"
};

export let app;
export let auth;
export let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn("Firebase config is invalid. Please update firebaseConfig in firebase.ts");
}

export const loginWithGoogle = async () => {
  if (!auth) {
    alert("Chưa cấu hình Firebase! Vui lòng cập nhật firebaseConfig trong file firebase.ts");
    return null;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed", error);
    alert("Đăng nhập thất bại: " + error.message);
    return null;
  }
};

export const logout = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
  }
};
