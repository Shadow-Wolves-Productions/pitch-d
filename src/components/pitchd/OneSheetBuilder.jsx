import React, { useState } from 'react';
import { RotateCcw, Lock, Download, Unlock, CheckCircle, ChevronRight, Plus, X } from 'lucide-react';
import SelectableCard from './onesheet/SelectableCard';
import PrintSheet from './onesheet/PrintSheet';
import SectionLabel from './SectionLabel';
import UpgradeBanner from './UpgradeBanner';

const inputStyle = {
  fontFamily: 'var(--font-grotesk)', fontSize: '14px', color: '#1a1a1a',
  background: '#ffffff', border: '1px solid #e8e0d8', borderRadius: '8px',
  padding: '10px 14px', width: '100%', outline: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s ease',
};
const focusInput = (e) => { e.target.style.borderColor = '#0d9488'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)'; };
const blurInput = (e) => { e.target.style.borderColor = '#e8e0d8'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; };

function ProdField({ label, children }) {
  return (
    <div>
      <label className="font-mono-dm uppercase block mb-1.5" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>{label}</label>
      {children}
    </div>
  );
}

const BUDGET_RANGES = {
  'Micro': ['Sweat Equity', '$0-$10K', '$10K-$50K'],
  'Low': ['$50K-$150K', '$150K-$500K'],
  'Low-Mid': ['$500K-$1M', '$1M-$2M'],
  'Mid': ['$2M-$5M', '$5M-$10M'],
  'Mid-High': ['$10M-$20M', '$20M-$40M'],
  'High': ['$40M-$80M', '$80M-$120M'],
  'Studio': ['$120M-$200M', '$200M+'],
};

const CREW_ROLES = ['Director', 'Composer', 'DOP', 'Producer'];

export default function OneSheetBuilder({ data, onReset, writerName, writerPhone, writerEmail, attachedTalent: initAttached, onExportDone, wasTruncated = false }) {
  const {
    primaryTitle, altTitles = [], loglines = [], taglines = [],
    synopsis: rawSynopsis = '', genre = [], tone = '', themes = [],
    setting: aiSetting = '', period: aiPeriod = '', format: aiFormat = '',
    estimatedBudget: aiBudget = '', estimatedBudgetRange: aiBudgetRange = '',
    comparableA: aiCompA = '', comparableB: aiCompB = '',
    targetAudience: aiTarget = '',
  } = data;
  const allTitles = [primaryTitle, ...altTitles];
  const genreList = Array.isArray(genre) ? genre : [genre].filter(Boolean);

  // Stage 1
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedLogline, setSelectedLogline] = useState(null);
  const [selectedTagline, setSelectedTagline] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLogline, setEditLogline] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editSynopsis, setEditSynopsis] = useState(rawSynopsis);
  const [storyLocked, setStoryLocked] = useState(false);

  // Stage 2
  const [compA, setCompA] = useState(aiCompA);
  const [compB, setCompB] = useState(aiCompB);
  const [editThemes, setEditThemes] = useState(Array.isArray(themes) ? themes.join(', ') : themes);
  const [editFormat, setEditFormat] = useState(aiFormat);
  const [editBudgetTier, setEditBudgetTier] = useState(aiBudget);
  const [editBudgetRange, setEditBudgetRange] = useState(aiBudgetRange);
  const [editSetting, setEditSetting] = useState(aiSetting);
  const [editPeriod, setEditPeriod] = useState(aiPeriod);
  const [editTarget, setEditTarget] = useState(aiTarget);

  // Structured attachments
  const [crewAttach, setCrewAttach] = useState({ Director: '', Composer: '', DOP: '', Producer: '' });
  const [castList, setCastList] = useState(initAttached ? [initAttached] : ['']);

  const [showPrintSheet, setShowPrintSheet] = useState(false);
  const [exporting, setExporting] = useState(false);

  const completed = [selectedTitle !== null, selectedLogline !== null, selectedTagline !== null, editSynopsis.trim().length > 0];
  const allDone = completed.every(Boolean);

  const handleSelectTitle = (i) => { if (storyLocked) return; setSelectedTitle(i); setEditTitle(allTitles[i]); };
  const handleSelectLogline = (i) => { if (storyLocked) return; setSelectedLogline(i); setEditLogline(loglines[i]); };
  const handleSelectTagline = (i) => { if (storyLocked) return; setSelectedTagline(i); setEditTagline(taglines[i]); };
  const handleLockStory = () => { if (!allDone) return; setStoryLocked(true); };
  const handleUnlockStory = () => { setStoryLocked(false); };

  const buildAttachedString = () => {
    const parts = [];
    CREW_ROLES.forEach(role => { if (crewAttach[role]?.trim()) parts.push(`${role}: ${crewAttach[role].trim()}`); });
    castList.filter(c => c.trim()).forEach(c => parts.push(`Cast: ${c.trim()}`));
    return parts.join(' · ');
  };

  const budgetRangeOptions = BUDGET_RANGES[editBudgetTier] || [];

  const oneSheetData = {
    writerName, writerPhone, writerEmail,
    title: editTitle, logline: editLogline, tagline: editTagline, synopsis: editSynopsis,
    comparableA: compA, comparableB: compB,
    genres: genreList, tone, themes: editThemes.split(',').map(t => t.trim()).filter(Boolean),
    setting: editSetting, period: editPeriod, format: editFormat,
    estimatedBudget: editBudgetTier, estimatedBudgetRange: editBudgetRange,
    targetAudience: editTarget, attachedTalent: buildAttachedString(),
  };

  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const handleExport = async () => {
    setExporting(true);
    setShowPrintSheet(true);

    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

    const sheet = document.getElementById('printSheet');
    sheet.style.display = 'flex';
    sheet.style.position = 'fixed';
    sheet.style.top = '0';
    sheet.style.left = '0';
    sheet.style.width = '794px';
    sheet.style.height = '1123px';
    sheet.style.zIndex = '99999';
    sheet.style.background = '#ffffff';
    sheet.style.overflow = 'hidden';

    await new Promise(resolve => setTimeout(resolve, 300));

    // Wait for all Google Fonts to be fully loaded before capture
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const canvas = await window.html2canvas(sheet, {
        scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff',
        width: 794, height: 1123, windowWidth: 794, windowHeight: 1123,
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      const filename = `PITCHD_${(oneSheetData.title || 'OneSheet').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      sheet.style.display = 'none';
      setShowPrintSheet(false);
      setExporting(false);
      if (onExportDone) onExportDone();
    }
  };

  return (
    <>
      <PrintSheet data={oneSheetData} visible={showPrintSheet} />

      <div className="no-print space-y-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-syne font-extrabold" style={{ fontSize: '20px', color: '#1a1a1a' }}>Build Your One Sheet</h2>
            <p className="font-grotesk mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>
              {storyLocked ? 'Story locked. Add production details and export.' : "Pick one from each section. Edit anything. Lock it when it's right."}
            </p>
          </div>
          <button onClick={onReset} className="font-mono-dm uppercase flex items-center gap-1.5 px-3 py-2 rounded-md pitchd-card-base" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#0d9488', border: '1px solid rgba(13,148,136,0.25)' }}>
            <RotateCcw size={12} /> Start Over
          </button>
        </div>

        {/* TRUNCATION UPSELL */}

        {(genreList.length > 0 || tone) && (
          <div className="rounded-lg p-4" style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}>
            <div className="flex flex-wrap gap-3">
              {genreList.length > 0 && (<div className="flex items-center gap-2"><span className="font-mono-dm uppercase" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>Genre</span>{genreList.map((g, i) => <span key={i} className="font-grotesk px-2.5 py-1 rounded-md" style={{ fontSize: '13px', color: '#1a1a1a', background: '#ffffff', border: '1px solid #e8e0d8' }}>{g}</span>)}</div>)}
              {tone && (<div className="flex items-center gap-2"><span className="font-mono-dm uppercase" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>Tone</span><span className="font-grotesk px-2.5 py-1 rounded-md" style={{ fontSize: '13px', color: '#1a1a1a', background: '#ffffff', border: '1px solid #e8e0d8' }}>{tone}</span></div>)}
            </div>
          </div>
        )}

        {storyLocked && (
          <div className="rounded-lg px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: '#0d9488' }}>
            <div className="flex items-center gap-3"><CheckCircle size={18} color="#ffffff" /><span className="font-syne font-bold" style={{ fontSize: '15px', color: '#ffffff' }}>Story assets locked.</span></div>
            <button onClick={handleUnlockStory} className="font-mono-dm uppercase flex items-center gap-1.5 px-4 py-2 rounded-md" style={{ fontSize: '11px', letterSpacing: '0.12em', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }}><Unlock size={12} /> Unlock & Edit</button>
          </div>
        )}

        {!storyLocked && (
          <div className="rounded-lg p-4 flex items-center gap-4 flex-wrap pitchd-card-base" style={{ background: '#ffffff', border: '1px solid #e8e0d8' }}>
            {['Title', 'Logline', 'Tagline', 'Synopsis'].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full transition-colors" style={{ background: completed[i] ? '#0d9488' : '#e5e7eb' }} /><span className="font-mono-dm uppercase" style={{ fontSize: '10px', letterSpacing: '0.15em', color: completed[i] ? '#0d9488' : '#9ca3af' }}>{label}</span></div>
            ))}
          </div>
        )}

        {/* STAGE 1 */}
        <section><SectionLabel>Title — pick the one that fits</SectionLabel>
          <div className="space-y-3">{allTitles.map((t, i) => (
            <SelectableCard key={i} index={i === 0 ? undefined : i - 1} selected={selectedTitle === i} locked={storyLocked} onSelect={() => handleSelectTitle(i)} editValue={editTitle} onEditChange={setEditTitle} large>
              {i === 0 ? (<span>{t}<span className="font-mono-dm ml-2 px-2 py-0.5 rounded-full" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#0d9488', background: 'rgba(13,148,136,0.1)', fontWeight: 400 }}>AI Pick</span></span>) : t}
            </SelectableCard>
          ))}</div>
        </section>
        <section><SectionLabel>Logline — pick the angle that lands</SectionLabel>
          <div className="space-y-3">{loglines.map((l, i) => <SelectableCard key={i} index={i} selected={selectedLogline === i} locked={storyLocked} onSelect={() => handleSelectLogline(i)} editValue={editLogline} onEditChange={setEditLogline}>{l}</SelectableCard>)}</div>
        </section>
        <section><SectionLabel>Tagline — pick the line that sticks</SectionLabel>
          <div className="space-y-3">{taglines.map((t, i) => <SelectableCard key={i} index={i} selected={selectedTagline === i} locked={storyLocked} onSelect={() => handleSelectTagline(i)} editValue={editTagline} onEditChange={setEditTagline} italic>"{t}"</SelectableCard>)}</div>
        </section>
        <section><SectionLabel>Synopsis — edit until it reads right</SectionLabel>
          <div className="rounded-lg p-6 pitchd-card-base" style={{ background: '#ffffff', border: '1px solid #e8e0d8', borderLeft: '3px solid #0d9488' }}>
            {storyLocked ? <p className="font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#374151' }}>{editSynopsis}</p> : (
              <><textarea value={editSynopsis} onChange={(e) => setEditSynopsis(e.target.value)} rows={5} placeholder="Your synopsis will appear here." className="w-full resize-none bg-transparent outline-none font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#374151' }} />
              <p className="font-mono-dm mt-1" style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.05em' }}>This is yours — rewrite it until it sounds like you</p></>
            )}
          </div>
        </section>

        {!storyLocked && (
          <>
            <button onClick={handleLockStory} disabled={!allDone} data-testid="lock-story-btn" className="w-full font-syne font-extrabold uppercase flex items-center justify-center gap-2 py-4 rounded-lg pitchd-btn-primary" style={{ fontSize: '16px', letterSpacing: '0.04em', background: allDone ? '#0d9488' : '#e5e7eb', color: allDone ? '#ffffff' : '#9ca3af', cursor: allDone ? 'pointer' : 'not-allowed' }}>
              <Lock size={16} /> Lock Story Assets <ChevronRight size={16} />
            </button>
            <p className="font-mono-dm text-center" style={{ fontSize: '10px', letterSpacing: '0.15em', color: allDone ? '#0d9488' : '#9ca3af', textTransform: 'uppercase', marginTop: '-24px' }}>
              {allDone ? "You're ready. Lock it and export." : 'Pick a title, logline, and tagline to unlock export'}
            </p>
          </>
        )}

        {/* STAGE 2 */}
        {storyLocked && (
          <div className="space-y-8 pt-4">
            <div>
              <h3 className="font-syne font-extrabold" style={{ fontSize: '18px', color: '#1a1a1a' }}>Almost there. Add the finishing touches.</h3>
              <p className="font-grotesk mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>These details make your one sheet print-ready. All optional.</p>
            </div>

            <ProdField label="Comparables">
              <div className="flex items-center gap-3">
                <span className="font-mono-dm italic shrink-0" style={{ fontSize: '13px', color: '#9ca3af' }}>It's</span>
                <input type="text" value={compA} onChange={(e) => setCompA(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder="Film A" />
                <span className="font-mono-dm uppercase shrink-0" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#0d9488', fontWeight: 600 }}>meets</span>
                <input type="text" value={compB} onChange={(e) => setCompB(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder="Film B" />
              </div>
            </ProdField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProdField label="Themes"><input type="text" value={editThemes} onChange={(e) => setEditThemes(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder="guilt, redemption, identity" /></ProdField>
              <ProdField label="Format">
                <select value={editFormat} onChange={(e) => setEditFormat(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focusInput} onBlur={blurInput}>
                  <option value="">Select...</option>
                  {['Feature Film', 'Short Film', 'TV Series', 'Mini-Series', 'Documentary'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </ProdField>
              <ProdField label="Est. Budget Tier">
                <select value={editBudgetTier} onChange={(e) => { setEditBudgetTier(e.target.value); setEditBudgetRange(''); }} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focusInput} onBlur={blurInput}>
                  <option value="">Select...</option>
                  {Object.keys(BUDGET_RANGES).map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </ProdField>
              <ProdField label="Est. Budget Range">
                <select value={editBudgetRange} onChange={(e) => setEditBudgetRange(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focusInput} onBlur={blurInput}>
                  <option value="">Select...</option>
                  {budgetRangeOptions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </ProdField>
              <ProdField label="Setting"><input type="text" value={editSetting} onChange={(e) => setEditSetting(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} /></ProdField>
              <ProdField label="Period"><input type="text" value={editPeriod} onChange={(e) => setEditPeriod(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} /></ProdField>
            </div>

            <ProdField label="Target Audience"><textarea value={editTarget} onChange={(e) => setEditTarget(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusInput} onBlur={blurInput} /></ProdField>

            {/* Structured Attachments */}
            <div>
              <label className="font-mono-dm uppercase block mb-3" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>Notable Attachments</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CREW_ROLES.map(role => (
                  <div key={role}>
                    <span className="font-mono-dm block mb-1" style={{ fontSize: '10px', color: '#6b7280' }}>{role}</span>
                    <input type="text" value={crewAttach[role]} onChange={(e) => setCrewAttach(prev => ({ ...prev, [role]: e.target.value }))} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder={`${role} name`} />
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <span className="font-mono-dm block mb-1" style={{ fontSize: '10px', color: '#6b7280' }}>Cast</span>
                {castList.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input type="text" value={c} onChange={(e) => { const n = [...castList]; n[i] = e.target.value; setCastList(n); }} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder="Cast member name" />
                    {castList.length > 1 && <button onClick={() => setCastList(castList.filter((_, j) => j !== i))} className="shrink-0 p-1 rounded hover:bg-red-50"><X size={14} style={{ color: '#9ca3af' }} /></button>}
                  </div>
                ))}
                <button onClick={() => setCastList([...castList, ''])} className="font-mono-dm uppercase flex items-center gap-1 mt-1 px-3 py-1.5 rounded-md transition-colors" style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#0d9488', border: '1px solid rgba(13,148,136,0.25)' }}>
                  <Plus size={12} /> Add Cast
                </button>
              </div>
            </div>

            <button onClick={handleExport} disabled={exporting} data-testid="export-btn"
              className="w-full font-syne font-extrabold uppercase flex items-center justify-center gap-2 py-4 rounded-lg pitchd-btn-primary"
              style={{ fontSize: '16px', letterSpacing: '0.04em', background: '#0d9488', color: '#ffffff', opacity: exporting ? 0.7 : 1 }}>
              <Download size={16} /> {exporting ? 'Exporting...' : 'Export One Sheet'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
