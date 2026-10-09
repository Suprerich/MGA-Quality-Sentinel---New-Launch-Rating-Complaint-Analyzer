import React, { useState } from 'react';
import { Clock, CheckCircle2, History, Save, BellRing } from 'lucide-react';
import { InspectionScheduleConfig, InspectionRunLog } from '../types/qa';
import { useTranslation } from '../i18n/LanguageContext';

interface SchedulePanelProps {
  schedule: InspectionScheduleConfig;
  onSaveSchedule: (cfg: InspectionScheduleConfig) => void;
  logs: InspectionRunLog[];
  threshold: number;
}

export const SchedulePanel: React.FC<SchedulePanelProps> = ({
  schedule,
  onSaveSchedule,
  logs,
  threshold
}) => {
  const { t, format, language } = useTranslation();
  const [enabled, setEnabled] = useState(schedule.enabled);
  const [intervalMinutes, setIntervalMinutes] = useState(schedule.intervalMinutes);
  const [alertThreshold, setAlertThreshold] = useState(schedule.threshold || threshold);
  const [emailAlert, setEmailAlert] = useState(schedule.emailAlertEnabled);
  const [email, setEmail] = useState(schedule.recipientEmail || 'qa-compliance@mgae.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: InspectionScheduleConfig = {
      ...schedule,
      enabled,
      intervalMinutes,
      threshold: alertThreshold,
      emailAlertEnabled: emailAlert,
      recipientEmail: email,
      nextRunAt: enabled ? new Date(Date.now() + intervalMinutes * 60 * 1000).toISOString() : null
    };
    onSaveSchedule(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const isEn = language === 'en-US';
  const isTw = language === 'zh-TW';

  const intervalOptions = isEn ? [
    { label: 'Every 6 hours (High Frequency)', value: 360 },
    { label: 'Every 12 hours (Twice daily)', value: 720 },
    { label: 'Every 24 hours (Daily routine)', value: 1440 },
    { label: 'Weekly on Monday morning (Weekly report)', value: 10080 }
  ] : isTw ? [
    { label: '每 6 小時自動巡檢一次 (高頻監控)', value: 360 },
    { label: '每 12 小時自動巡檢一次 (早晚各一次)', value: 720 },
    { label: '每 24 小時自動巡檢一次 (每日例行)', value: 1440 },
    { label: '每週一早間巡檢一次 (週報模式)', value: 10080 }
  ] : [
    { label: '每 6 小时自动巡检一次 (高频监控)', value: 360 },
    { label: '每 12 小时自动巡检一次 (早晚各一次)', value: 720 },
    { label: '每 24 小时自动巡检一次 (每日例行)', value: 1440 },
    { label: '每周一早间巡检一次 (周报模式)', value: 10080 }
  ];

  return (
    <div className="space-y-6">
      {/* Schedule Configuration Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-slate-700" />
            <div>
              <h3 className="text-base font-semibold tracking-tight text-slate-900">
                {t.scheduleTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.scheduleSubtitle}
              </p>
            </div>
          </div>

          <div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                enabled
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {enabled ? t.statusEngineActive : t.statusEnginePaused}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          {/* Toggle Enable */}
          <div className="flex items-center justify-between p-4 bg-slate-50/60 rounded-2xl border border-slate-200/60">
            <div>
              <div className="font-semibold text-slate-900 text-xs">
                {t.enableAutoInspect}
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                {t.enableAutoInspectDesc}
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
            </label>
          </div>

          {/* Interval Setting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1.5">
                {t.frequencyLabel}
              </label>
              <select
                value={intervalMinutes}
                onChange={(e) => setIntervalMinutes(Number(e.target.value))}
                disabled={!enabled}
                className="w-full bg-slate-100/70 border-0 rounded-2xl p-2.5 text-xs text-slate-800 disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                {intervalOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1.5">
                {t.thresholdSettingLabel}
              </label>
              <select
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                disabled={!enabled}
                className="w-full bg-slate-100/70 border-0 rounded-2xl p-2.5 text-xs text-slate-800 font-mono disabled:opacity-40 focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <option value={2.5}>&lt; 2.5 ★ ({isEn ? 'Critical Severity' : '特级严重预警'})</option>
                <option value={3.0}>&lt; 3.0 ★ ({isEn ? 'Standard MGA Compliance Threshold - Recommended' : '标准 MGA 合规红线 - 推荐'})</option>
                <option value={3.5}>&lt; 3.5 ★ ({isEn ? 'Early Caution' : '潜在风险关注'})</option>
                <option value={4.0}>&lt; 4.0 ★ ({isEn ? 'Strict Inspection' : '高标准严格监管'})</option>
              </select>
            </div>
          </div>

          {/* Email Notification */}
          <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800 select-none">
                <input
                  type="checkbox"
                  checked={emailAlert}
                  onChange={(e) => setEmailAlert(e.target.checked)}
                  className="rounded-none text-slate-900 focus:ring-slate-900"
                />
                <BellRing className="w-3.5 h-3.5 text-slate-500 fill-slate-200" />
                <span>{t.emailAlertLabel}</span>
              </label>
            </div>

            {emailAlert && (
              <div className="pt-2">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-slate-400 font-mono">
              {t.lastRunLabel} {schedule.lastRunAt ? new Date(schedule.lastRunAt).toLocaleString() : '-'}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-black rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5 fill-white text-white" />
              <span>{savedSuccess ? t.savedSuccess : t.btnSavePolicy}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Historical Execution Run Logs */}
      <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            <h4 className="text-xs font-semibold text-slate-900">
              {t.historyTitle}
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {format(t.historyCountDesc, { n: logs.length })}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-medium border-b border-slate-200/60">
                <th className="py-3 px-4 w-40">{t.thRunTime}</th>
                <th className="py-3 px-3 w-24 text-center">{t.thDuration}</th>
                <th className="py-3 px-3 w-24 text-center">{t.thScannedCount}</th>
                <th className="py-3 px-3 w-28 text-center">{t.thAlertCount}</th>
                <th className="py-3 px-3 w-24 text-center">{t.thStatus}</th>
                <th className="py-3 px-4">{t.thSummary}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {new Date(log.runAt).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono text-slate-500 tabular-nums">
                    {(log.durationMs / 1000).toFixed(1)}s
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-medium tabular-nums text-slate-900">
                    {log.totalProductsScanned}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono tabular-nums">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        log.lowRatingAlertsCount > 0
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {log.lowRatingAlertsCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{t.statusSuccess}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.summaryMessage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
