import React from 'react';
import { X, FolderArchive, Code2, ExternalLink, CheckCircle2, ArrowDownToLine, Globe2, Server } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface DownloadPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadPackageModal: React.FC<DownloadPackageModalProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();

  if (!isOpen) return null;

  const isEn = language === 'en-US';
  const isTw = language === 'zh-TW';

  const title = isEn
    ? 'Download Project Files & Deployment Packages'
    : isTw
    ? '下載專案檔案與部署包'
    : '下载项目文件与部署包';

  const subtitle = isEn
    ? 'Directly download the ready-to-deploy static website or complete source code for independent hosting without Google login.'
    : isTw
    ? '直接下載打包好的純靜態網站或完整原始碼，脫離 Google 認證系統，部署到任何公網伺服器。'
    : '直接下载打包好的纯静态网站或完整源代码，脱离 Google 认证系统，部署到任何公网服务器。';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <ArrowDownToLine className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
            </div>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-lg">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Download Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1: Static Dist (Recommended) */}
            <div className="relative p-5 rounded-xl border-2 border-emerald-500/80 bg-emerald-50/20 hover:bg-emerald-50/30 transition-all flex flex-col justify-between group">
              <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                {isEn ? 'Recommended' : isTw ? '最推薦' : '最推荐'}
              </div>

              <div>
                <div className="flex items-center gap-2.5 text-emerald-700 font-semibold text-sm">
                  <FolderArchive className="w-5 h-5 text-emerald-600" />
                  <span>{isEn ? 'Static Deploy Package (dist)' : isTw ? '純靜態部署包 (dist)' : '纯静态部署包 (dist)'}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Pre-built HTML/CSS/JS files (~550 KB). Directly drag into Netlify Drop or upload to Nginx/server to go live instantly.'
                    : isTw
                    ? '已完成編譯打包的 HTML/CSS/JS（約 550 KB）。免安裝環境，直接拖拽到 Netlify Drop 或上傳公司伺服器即可上線。'
                    : '已完成编译打包的 HTML/CSS/JS（约 550 KB）。免安装环境，直接拖拽到 Netlify Drop 或上传公司服务器即可上线。'}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isEn ? 'Zero setup, drag & go live' : isTw ? '零配置，免 Google 登入' : '零配置，免 Google 登录'}</span>
                </div>
              </div>

              <a
                href="/mga-dist-deploy.zip"
                download="mga-dist-deploy.zip"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all text-center cursor-pointer active:scale-[0.98]"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>{isEn ? 'Download Deploy ZIP (~550KB)' : isTw ? '下載部署包 ZIP (~550KB)' : '下载部署包 ZIP (~550KB)'}</span>
              </a>
            </div>

            {/* Option 2: Full Source Code */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-sm">
                  <Code2 className="w-5 h-5 text-slate-600" />
                  <span>{isEn ? 'Full Source Code' : isTw ? '完整原始碼包' : '完整源代码包'}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Complete React + Vite + TypeScript source code with all components, styles, and configs (~370 KB).'
                    : isTw
                    ? '包含全部 React + Vite + TypeScript 原始程式碼、組件、Tailwind 樣式與配置檔案（約 370 KB）。'
                    : '包含全部 React + Vite + TypeScript 原始代码、组件、Tailwind 样式与配置文件（约 370 KB）。'}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'For developers & Git repo' : isTw ? '適合二開或推送到 GitHub' : '适合二开或推送到 GitHub'}</span>
                </div>
              </div>

              <a
                href="/mga-source-code.zip"
                download="mga-source-code.zip"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all text-center cursor-pointer active:scale-[0.98]"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>{isEn ? 'Download Source ZIP (~370KB)' : isTw ? '下載原始碼 ZIP (~370KB)' : '下载源代码 ZIP (~370KB)'}</span>
              </a>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-3">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-blue-500" />
              <span>{isEn ? 'How to publish in 30 seconds (No login needed for visitors):' : isTw ? '30秒免登入極速發布指南：' : '30秒免登录极速发布指南：'}</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 pl-1 leading-relaxed">
              <li>
                <span className="font-medium text-slate-700">
                  {isEn ? 'Download & unzip: ' : isTw ? '下載並解壓：' : '下载并解压：'}
                </span>
                {isEn ? 'Download the Static Deploy Package and unzip it to get the folder.' : isTw ? '下載上方「純靜態部署包」，解壓縮後得到 dist 檔案夾。' : '下载上方“纯静态部署包”，解压后得到 dist 文件夹。'}
              </li>
              <li>
                <span className="font-medium text-slate-700">
                  {isEn ? 'Open Netlify Drop: ' : isTw ? '打開 Netlify Drop：' : '打开 Netlify Drop：'}
                </span>
                <a
                  href="https://app.netlify.com/drop"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-0.5 ml-1 font-semibold"
                >
                  app.netlify.com/drop <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="font-medium text-slate-700">
                  {isEn ? 'Drag & Drop: ' : isTw ? '直接拖拽：' : '直接拖拽：'}
                </span>
                {isEn ? 'Drag the unzipped folder into the page. Within 10 seconds, you get a public HTTPS link!' : isTw ? '將解壓後的檔案夾直接拖進網頁虛線框內，10 秒內即自動產生永久公開的獨立 HTTPS 網址！' : '将解压后的文件夹直接拖进网页虚线框内，10秒内即自动生成永久公开的独立 HTTPS 网址！'}
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-slate-400" />
            <span>MGA Quality Department · Sentinel Static Package</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
          >
            {isEn ? 'Close' : isTw ? '關閉' : '关闭'}
          </button>
        </div>
      </div>
    </div>
  );
};
