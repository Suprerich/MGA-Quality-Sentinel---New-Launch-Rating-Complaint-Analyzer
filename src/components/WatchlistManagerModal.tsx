import React, { useState } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { WatchlistSKU } from '../types/qa';
import { useTranslation } from '../i18n/LanguageContext';

interface WatchlistManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: WatchlistSKU[];
  onSaveWatchlist: (items: WatchlistSKU[]) => void;
}

export const WatchlistManagerModal: React.FC<WatchlistManagerModalProps> = ({
  isOpen,
  onClose,
  watchlist,
  onSaveWatchlist
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const [items, setItems] = useState<WatchlistSKU[]>(watchlist);
  const [activeTab, setActiveTab] = useState<'LIST' | 'BATCH'>('LIST');
  const [batchText, setBatchText] = useState('');

  // Single Item Add state
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('MGA');
  const [newUpc, setNewUpc] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newWm, setNewWm] = useState('');
  const [newTcin, setNewTcin] = useState('');
  const [newAsin, setNewAsin] = useState('');
  const [newCostco, setNewCostco] = useState('');
  const [isNewLaunch, setIsNewLaunch] = useState(true);

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: WatchlistSKU = {
      id: `wl-${Date.now()}`,
      name: newName.trim(),
      brand: newBrand.trim(),
      upc: newUpc.trim(),
      model: newModel.trim(),
      wm: newWm.trim(),
      tcin: newTcin.trim(),
      asin: newAsin.trim(),
      costco: newCostco.trim(),
      isNewLaunch,
      addedAt: new Date().toISOString().slice(0, 10)
    };

    const updated = [newItem, ...items];
    setItems(updated);
    onSaveWatchlist(updated);

    setNewName('');
    setNewUpc('');
    setNewModel('');
    setNewWm('');
    setNewTcin('');
    setNewAsin('');
    setNewCostco('');
  };

  const handleDelete = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    onSaveWatchlist(updated);
  };

  const handleParseBatch = () => {
    if (!batchText.trim()) return;

    const parsed: WatchlistSKU[] = [];
    const lines = batchText.split(/\r?\n/);

    lines.forEach((line, idx) => {
      const t = line.trim();
      if (!t || t.startsWith('#')) return;

      const parts = t.split(/\s*(?:\||,|，|\t)\s*/).map(p => p.trim());
      if (parts.length > 0 && parts[0]) {
        parsed.push({
          id: `wl-${Date.now()}-${idx}`,
          name: parts[0] || 'Unknown Product',
          upc: parts[1] || '',
          model: parts[2] || '',
          wm: parts[3] || '',
          tcin: parts[4] || '',
          asin: parts[5] || '',
          costco: parts[6] || '',
          brand: 'MGA',
          isNewLaunch: true,
          addedAt: new Date().toISOString().slice(0, 10)
        });
      }
    });

    if (parsed.length > 0) {
      const updated = [...parsed, ...items];
      setItems(updated);
      onSaveWatchlist(updated);
      setBatchText('');
      setActiveTab('LIST');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              {t.watchlistTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.watchlistSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('LIST')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'LIST' ? 'bg-white font-semibold text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'text-slate-600'
                }`}
              >
                {t.tabExistingList} ({items.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('BATCH')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'BATCH' ? 'bg-white font-semibold text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'text-slate-600'
                }`}
              >
                {t.tabBatchImport}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-5">
          {activeTab === 'LIST' ? (
            <>
              {/* Add Single Form */}
              <form onSubmit={handleAddSingle} className="p-5 bg-slate-50/70 border border-slate-200/70 rounded-2xl space-y-4">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Plus className="w-4 h-4 text-slate-700" />
                  <span>{t.addSingleTitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblProductName}</label>
                    <input
                      type="text"
                      placeholder="e.g. Little Tikes Power Cuts Chainsaw 2-in-1"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblBrand}</label>
                    <input
                      type="text"
                      placeholder="e.g. Little Tikes / MGA"
                      value={newBrand}
                      onChange={(e) => setNewBrand(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblUpc}</label>
                    <input
                      type="text"
                      placeholder="050743663189"
                      value={newUpc}
                      onChange={(e) => setNewUpc(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblModel}</label>
                    <input
                      type="text"
                      placeholder="663189M"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblTcin}</label>
                    <input
                      type="text"
                      placeholder="89123456"
                      value={newTcin}
                      onChange={(e) => setNewTcin(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblAsin}</label>
                    <input
                      type="text"
                      placeholder="B0C7L9M123"
                      value={newAsin}
                      onChange={(e) => setNewAsin(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblWm}</label>
                    <input
                      type="text"
                      placeholder="556192837"
                      value={newWm}
                      onChange={(e) => setNewWm(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">{t.lblCostco}</label>
                    <input
                      type="text"
                      placeholder="1789234"
                      value={newCostco}
                      onChange={(e) => setNewCostco(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                    <input
                      type="checkbox"
                      checked={isNewLaunch}
                      onChange={(e) => setIsNewLaunch(e.target.checked)}
                      className="rounded-none text-slate-900 focus:ring-slate-900"
                    />
                    <span>{t.chkMarkNewLaunch}</span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-slate-900 text-white font-semibold rounded-full hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.btnAddWatchlist}</span>
                  </button>
                </div>
              </form>

              {/* Items List Table */}
              <div className="border border-slate-200/70 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 font-medium border-b border-slate-200/60">
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-3 w-24">Brand</th>
                      <th className="py-3 px-3 w-32 font-mono">UPC</th>
                      <th className="py-3 px-3 w-28 font-mono">Model</th>
                      <th className="py-3 px-3 w-32 font-mono">WM / Target</th>
                      <th className="py-3 px-3 w-32 font-mono">Amazon / Costco</th>
                      <th className="py-3 px-2 w-16 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it) => (
                      <tr key={it.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-medium text-slate-900">
                          <div className="flex items-center gap-1.5">
                            {it.isNewLaunch && (
                              <span className="text-[10px] bg-slate-100 text-slate-900 font-semibold px-2 py-0.5 rounded-full">
                                NEW
                              </span>
                            )}
                            <span>{it.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{it.brand || 'MGA'}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{it.upc || '-'}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{it.model || '-'}</td>
                        <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                          <div>WM: {it.wm || '-'}</div>
                          <div>TCIN: {it.tcin || '-'}</div>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                          <div>ASIN: {it.asin || '-'}</div>
                          <div>Costco: {it.costco || '-'}</div>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(it.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 fill-slate-100" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 text-slate-600 leading-relaxed text-xs">
                {t.batchInstructions}
              </div>

              <textarea
                rows={8}
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                placeholder={t.batchPlaceholder}
                className="w-full bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-xs border border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
              />

              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  onClick={handleParseBatch}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-full hover:bg-black transition-colors cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{t.btnParseSave}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            {items.length} items
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            {t.btnFinish}
          </button>
        </div>
      </div>
    </div>
  );
};
