import React, { useEffect, useState } from 'react';
import { Download, Trophy, X } from 'lucide-react';
import { auth } from '../firebase';
import { ExamRecord, formatDuration, getPendingExamResults, leaderboardError, saveExamResult, watchLeaderboard, watchStudentHistory } from '../services/examService';
import { rankedTopics } from '../services/ranking';
import { exportLeaderboardToExcel, exportExamToPdf, exportExamToExcel } from '../services/exportService';

interface Props { isOpen: boolean; onClose: () => void; currentEmail?: string }

export const LeaderboardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'global' | 'history'>('global');
  const [topicId, setTopicId] = useState('review-all');
  const [records, setRecords] = useState<ExamRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pending, setPending] = useState<ExamRecord[]>([]);
  const [retrying, setRetrying] = useState(false);
  const [reload, setReload] = useState(0);
  const uid = auth?.currentUser?.uid;

  useEffect(() => {
    if (!isOpen || !uid) return;
    setRecords([]); setLoading(true); setError('');
    setPending(getPendingExamResults(uid));
    const next = (items: ExamRecord[]) => { setRecords(items); setLoading(false); };
    const fail = (reason: unknown) => { setError(leaderboardError(reason)); setLoading(false); setRecords([]); };
    try {
      return tab === 'global' ? watchLeaderboard(topicId, next, fail) : watchStudentHistory(next, fail);
    } catch (reason) { fail(reason); }
  }, [isOpen, uid, tab, topicId, reload]);

  if (!isOpen) return null;
  const topic = rankedTopics.find(item => item.id === topicId);
  const retryPending = async () => {
    if (!uid || retrying) return;
    setRetrying(true); setError('');
    try { for (const record of pending) await saveExamResult(record); }
    catch (reason) { setError(leaderboardError(reason)); }
    finally { setPending(getPendingExamResults(uid)); setRetrying(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 p-3 sm:p-5 backdrop-blur-xl">
      <section role="dialog" aria-modal="true" aria-labelledby="leaderboard-title" className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-950 p-5 sm:p-7 text-slate-900 dark:text-white shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Đóng bảng xếp hạng" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10"><X size={20}/></button>
        <h2 id="leaderboard-title" className="pr-12 text-xl font-bold flex items-center gap-2"><Trophy className="text-amber-500" size={24}/> Bảng xếp hạng chung</h2>
        <p className="mt-2 pr-8 text-sm text-slate-600 dark:text-slate-400">Mỗi user có một kết quả tốt nhất trong từng phần. Cùng điểm thì ưu tiên thời gian ngắn hơn.</p>
        <div className="my-4 flex flex-wrap gap-2" role="tablist" aria-label="Bảng điểm">
          <button type="button" role="tab" id="ranking-tab" aria-controls="ranking-panel" aria-selected={tab === 'global'} onClick={() => setTab('global')} className={`min-h-[44px] rounded-xl px-4 py-2 font-semibold ${tab === 'global' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 dark:bg-white/10'}`}>Xếp hạng theo phần</button>
          <button type="button" role="tab" id="history-tab" aria-controls="ranking-panel" aria-selected={tab === 'history'} onClick={() => setTab('history')} className={`min-h-[44px] rounded-xl px-4 py-2 font-semibold ${tab === 'history' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-100 dark:bg-white/10'}`}>Lịch sử thi của tôi</button>
        </div>
        {tab === 'global' && <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <label className="min-w-0 flex-1 text-sm font-medium">Chọn phần thi
            <select aria-label="Chọn phần thi" value={topicId} onChange={event => setTopicId(event.target.value)} className="mt-1 block min-h-[44px] w-full rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
              {rankedTopics.map(item => <option key={item.id} value={item.id}>{item.name} ({item.count} câu)</option>)}
            </select>
          </label>
          <button type="button" disabled={loading || !records.length || !!error} onClick={() => exportLeaderboardToExcel(records)} className="min-h-[44px] rounded-xl border border-slate-300 dark:border-white/20 px-4 py-2 text-sm font-semibold disabled:opacity-40 flex items-center gap-2"><Download size={16}/> Xuất Excel</button>
        </div>}
        {pending.length > 0 && <div role="status" className="mb-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-sm text-amber-900 dark:text-amber-200 flex flex-wrap items-center justify-between gap-2">
          <span>{pending.length} bài thi đang chờ đồng bộ. Điểm chưa được đưa lên bảng chung.</span>
          <button type="button" disabled={retrying} onClick={retryPending} className="min-h-[44px] rounded-lg border border-current px-3 py-2 font-semibold disabled:opacity-50">{retrying ? 'Đang đồng bộ…' : 'Đồng bộ lại'}</button>
        </div>}
        <div id="ranking-panel" role="tabpanel" aria-labelledby={tab === 'global' ? 'ranking-tab' : 'history-tab'} className="min-h-0 flex-1 overflow-auto">
          {loading ? <p role="status" className="py-10 text-center">Đang tải dữ liệu chung…</p> : error ? <div role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-rose-800 dark:text-rose-200"><p>{error}</p><button type="button" onClick={() => setReload(value => value + 1)} className="mt-3 min-h-[44px] rounded-lg border border-current px-4 py-2">Thử lại</button></div> : !records.length ? <div className="py-12 text-center"><Trophy size={36} className="mx-auto mb-3 text-slate-400"/><h3 className="font-semibold">{tab === 'global' ? 'Chưa có kết quả cho phần này' : 'Bạn chưa có lịch sử thi trên hệ thống'}</h3><p className="mt-2 text-sm text-slate-500">Bật chế độ thi và nộp bài để lưu kết quả.</p></div> : tab === 'global' ? <>
            <p className="mb-3 text-xs text-slate-500" aria-live="polite">{records.length} user · {topic?.count} câu mỗi lượt · Tự cập nhật khi có người nộp bài</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10"><table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-white/5"><tr><th className="p-3">Hạng</th><th className="p-3">Sinh viên</th><th className="p-3 whitespace-nowrap">Đúng</th><th className="p-3 whitespace-nowrap">Điểm / 10</th><th className="p-3">Thời gian</th></tr></thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">{records.map((record, index) => <tr key={record.userId} className={record.userId === uid ? 'bg-cyan-50 dark:bg-cyan-950/40' : ''}>
                <td className="p-3 font-bold tabular-nums">{index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1}</td>
                <td className="p-3"><div className="font-semibold">{record.displayName}{record.userId === uid && ' (Bạn)'}</div><div className="text-xs text-slate-500">{record.maskedEmail}</div></td>
                <td className="p-3 tabular-nums whitespace-nowrap">{record.score}/{record.totalQuestions}</td><td className="p-3 font-bold tabular-nums">{record.grade.score10.toFixed(1)}</td><td className="p-3 tabular-nums">{formatDuration(record.timeSpentSeconds)}</td>
              </tr>)}</tbody>
            </table></div>
          </> : <div className="space-y-3">{records.map(record => <article key={record.id} className="rounded-xl border border-slate-200 dark:border-white/15 p-4">
            <h3 className="font-semibold">{record.topicName}</h3><p className="mt-1 text-xs text-slate-500">{record.dateFormatted}</p>
            <p className="my-2 text-sm">Đúng {record.score}/{record.totalQuestions} · {record.grade.score10.toFixed(1)}/10 · {formatDuration(record.timeSpentSeconds)}</p>
            <div className="flex gap-2"><button type="button" onClick={() => exportExamToPdf(record)} className="min-h-[44px] rounded-lg border border-slate-300 dark:border-white/20 px-3 py-2 text-sm">Tải PDF</button><button type="button" onClick={() => exportExamToExcel(record)} className="min-h-[44px] rounded-lg border border-slate-300 dark:border-white/20 px-3 py-2 text-sm">Tải Excel</button></div>
          </article>)}</div>}
        </div>
      </section>
    </div>
  );
};
