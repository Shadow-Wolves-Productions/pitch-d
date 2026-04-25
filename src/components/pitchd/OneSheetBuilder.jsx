import React, { useState } from 'react';
import { RotateCcw, Lock, Download, Unlock, CheckCircle, ChevronRight } from 'lucide-react';
import SelectableCard from './onesheet/SelectableCard';
import PrintSheet from './onesheet/PrintSheet';
import SectionLabel from './SectionLabel';

const inputStyle = {
  fontFamily: 'var(--font-grotesk)',
  fontSize: '14px',
  color: '#1a1a1a',
  background: '#ffffff',
  border: '1px solid #e8e0d8',
  borderRadius: '8px',
  padding: '10px 14px',
  width: '100%',
  outline: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.2s ease',
};

const focusInput = (e) => { e.target.style.borderColor = '#0d9488'; e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)'; };
const blurInput = (e) => { e.target.style.borderColor = '#e8e0d8'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; };

function ProdField({ label, children }) {
  return (
    <div>
      <label className="font-mono-dm uppercase block mb-1.5" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function OneSheetBuilder({ data, onReset, writerName, writerPhone, writerEmail, attachedTalent, onExportDone }) {
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

  // Stage 1 — Story Assets
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedLogline, setSelectedLogline] = useState(null);
  const [selectedTagline, setSelectedTagline] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editLogline, setEditLogline] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editSynopsis, setEditSynopsis] = useState(rawSynopsis);
  const [storyLocked, setStoryLocked] = useState(false);

  // Stage 2 — Production Details
  const [compA, setCompA] = useState(aiCompA);
  const [compB, setCompB] = useState(aiCompB);
  const [editThemes, setEditThemes] = useState(Array.isArray(themes) ? themes.join(', ') : themes);
  const [editFormat, setEditFormat] = useState(aiFormat);
  const [editBudgetTier, setEditBudgetTier] = useState(aiBudget);
  const [editBudgetRange, setEditBudgetRange] = useState(aiBudgetRange);
  const [editSetting, setEditSetting] = useState(aiSetting);
  const [editPeriod, setEditPeriod] = useState(aiPeriod);
  const [editTarget, setEditTarget] = useState(aiTarget);
  const [editAttached, setEditAttached] = useState(attachedTalent || '');

  const [showPrintSheet, setShowPrintSheet] = useState(false);
  const [exporting, setExporting] = useState(false);

  const completed = [selectedTitle !== null, selectedLogline !== null, selectedTagline !== null, editSynopsis.trim().length > 0];
  const allDone = completed.every(Boolean);

  const handleSelectTitle = (i) => { if (storyLocked) return; setSelectedTitle(i); setEditTitle(allTitles[i]); };
  const handleSelectLogline = (i) => { if (storyLocked) return; setSelectedLogline(i); setEditLogline(loglines[i]); };
  const handleSelectTagline = (i) => { if (storyLocked) return; setSelectedTagline(i); setEditTagline(taglines[i]); };

  const handleLockStory = () => { if (!allDone) return; setStoryLocked(true); };
  const handleUnlockStory = () => { setStoryLocked(false); };

  const handleExport = () => {
    setExporting(true);
    setShowPrintSheet(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrintSheet(false);
        setExporting(false);
        if (onExportDone) onExportDone();
      }, 800);
    }, 300);
  };

  const oneSheetData = {
    writerName, writerPhone, writerEmail,
    title: editTitle, logline: editLogline, tagline: editTagline, synopsis: editSynopsis,
    comparableA: compA, comparableB: compB,
    genres: genreList, tone, themes: editThemes.split(',').map(t => t.trim()).filter(Boolean),
    setting: editSetting, period: editPeriod, format: editFormat,
    estimatedBudget: editBudgetTier, estimatedBudgetRange: editBudgetRange,
    targetAudience: editTarget, attachedTalent: editAttached,
  };

  return (
    <>
      <PrintSheet data={oneSheetData} visible={showPrintSheet} />

      <div className="no-print space-y-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-syne font-extrabold" style={{ fontSize: '20px', color: '#1a1a1a' }}>
              Build Your One Sheet
            </h2>
            <p className="font-grotesk mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>
              {storyLocked ? 'Story locked. Add production details and export.' : "Pick one from each section. Edit anything. Lock it when it's right."}
            </p>
          </div>
          <button onClick={onReset} className="font-mono-dm uppercase flex items-center gap-1.5 px-3 py-2 rounded-md pitchd-card-base" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#0d9488', border: '1px solid rgba(13,148,136,0.25)' }}>
            <RotateCcw size={12} /> Start Over
          </button>
        </div>

        {/* GENRE / TONE METADATA */}
        {(genreList.length > 0 || tone) && (
          <div className="rounded-lg p-4" style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}>
            <div className="flex flex-wrap gap-3">
              {genreList.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-mono-dm uppercase" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>Genre</span>
                  {genreList.map((g, i) => (
                    <span key={i} className="font-grotesk px-2.5 py-1 rounded-md" style={{ fontSize: '13px', color: '#1a1a1a', background: '#ffffff', border: '1px solid #e8e0d8' }}>{g}</span>
                  ))}
                </div>
              )}
              {tone && (
                <div className="flex items-center gap-2">
                  <span className="font-mono-dm uppercase" style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}>Tone</span>
                  <span className="font-grotesk px-2.5 py-1 rounded-md" style={{ fontSize: '13px', color: '#1a1a1a', background: '#ffffff', border: '1px solid #e8e0d8' }}>{tone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STORY LOCKED BANNER */}
        {storyLocked && (
          <div className="rounded-lg px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: '#0d9488' }}>
            <div className="flex items-center gap-3">
              <CheckCircle size={18} color="#ffffff" />
              <span className="font-syne font-bold" style={{ fontSize: '15px', color: '#ffffff' }}>Story assets locked.</span>
            </div>
            <button onClick={handleUnlockStory} className="font-mono-dm uppercase flex items-center gap-1.5 px-4 py-2 rounded-md" style={{ fontSize: '11px', letterSpacing: '0.12em', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }}>
              <Unlock size={12} /> Unlock & Edit
            </button>
          </div>
        )}

        {/* STATUS DOTS */}
        {!storyLocked && (
          <div className="rounded-lg p-4 flex items-center gap-4 flex-wrap pitchd-card-base" style={{ background: '#ffffff', border: '1px solid #e8e0d8' }}>
            {['Title', 'Logline', 'Tagline', 'Synopsis'].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full transition-colors" style={{ background: completed[i] ? '#0d9488' : '#e5e7eb' }} />
                <span className="font-mono-dm uppercase" style={{ fontSize: '10px', letterSpacing: '0.15em', color: completed[i] ? '#0d9488' : '#9ca3af' }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ═══ STAGE 1: STORY ASSETS ═══ */}
        <section><SectionLabel>Title — pick the one that fits</SectionLabel>
          <div className="space-y-3">
            {allTitles.map((t, i) => (
              <SelectableCard key={i} index={i === 0 ? undefined : i - 1} selected={selectedTitle === i} locked={storyLocked} onSelect={() => handleSelectTitle(i)} editValue={editTitle} onEditChange={setEditTitle} large>
                {i === 0 ? (<span>{t}<span className="font-mono-dm ml-2 px-2 py-0.5 rounded-full" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#0d9488', background: 'rgba(13,148,136,0.1)', fontWeight: 400 }}>AI Pick</span></span>) : t}
              </SelectableCard>
            ))}
          </div>
        </section>

        <section><SectionLabel>Logline — pick the angle that lands</SectionLabel>
          <div className="space-y-3">
            {loglines.map((l, i) => (<SelectableCard key={i} index={i} selected={selectedLogline === i} locked={storyLocked} onSelect={() => handleSelectLogline(i)} editValue={editLogline} onEditChange={setEditLogline}>{l}</SelectableCard>))}
          </div>
        </section>

        <section><SectionLabel>Tagline — pick the line that sticks</SectionLabel>
          <div className="space-y-3">
            {taglines.map((t, i) => (<SelectableCard key={i} index={i} selected={selectedTagline === i} locked={storyLocked} onSelect={() => handleSelectTagline(i)} editValue={editTagline} onEditChange={setEditTagline} italic>"{t}"</SelectableCard>))}
          </div>
        </section>

        <section><SectionLabel>Synopsis — edit until it reads right</SectionLabel>
          <div className="rounded-lg p-6 pitchd-card-base" style={{ background: '#ffffff', border: '1px solid #e8e0d8', borderLeft: '3px solid #0d9488' }}>
            {storyLocked ? (
              <p className="font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#374151' }}>{editSynopsis}</p>
            ) : (
              <><textarea value={editSynopsis} onChange={(e) => setEditSynopsis(e.target.value)} rows={5} placeholder="Your synopsis will appear here." className="w-full resize-none bg-transparent outline-none font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#374151' }} />
              <p className="font-mono-dm mt-1" style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.05em' }}>This is yours — rewrite it until it sounds like you</p></>
            )}
          </div>
        </section>

        {/* LOCK STORY ASSETS BUTTON */}
        {!storyLocked && (
          <>
            <button onClick={handleLockStory} disabled={!allDone} data-testid="lock-story-btn"
              className="w-full font-syne font-extrabold uppercase flex items-center justify-center gap-2 py-4 rounded-lg pitchd-btn-primary"
              style={{ fontSize: '16px', letterSpacing: '0.04em', background: allDone ? '#0d9488' : '#e5e7eb', color: allDone ? '#ffffff' : '#9ca3af', cursor: allDone ? 'pointer' : 'not-allowed' }}>
              <Lock size={16} /> Lock Story Assets <ChevronRight size={16} />
            </button>
            <p className="font-mono-dm text-center" style={{ fontSize: '10px', letterSpacing: '0.15em', color: allDone ? '#0d9488' : '#9ca3af', textTransform: 'uppercase', marginTop: '-24px' }}>
              {allDone ? "You're ready. Lock it and export." : 'Pick a title, logline, and tagline to unlock export'}
            </p>
          </>
        )}

        {/* ═══ STAGE 2: PRODUCTION DETAILS ═══ */}
        {storyLocked && (
          <div className="space-y-8 pt-4">
            <div>
              <h3 className="font-syne font-extrabold" style={{ fontSize: '18px', color: '#1a1a1a' }}>Almost there. Add the finishing touches.</h3>
              <p className="font-grotesk mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>These details make your one sheet print-ready. All optional.</p>
            </div>

            {/* Comparables */}
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
                <select value={editBudgetTier} onChange={(e) => setEditBudgetTier(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focusInput} onBlur={blurInput}>
                  <option value="">Select...</option>
                  {['Micro', 'Low', 'Low-Mid', 'Mid', 'Mid-High', 'High', 'Studio'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </ProdField>
              <ProdField label="Est. Budget Range"><input type="text" value={editBudgetRange} onChange={(e) => setEditBudgetRange(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder="$500K-$2M AUD" /></ProdField>
              <ProdField label="Setting"><input type="text" value={editSetting} onChange={(e) => setEditSetting(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} /></ProdField>
              <ProdField label="Period"><input type="text" value={editPeriod} onChange={(e) => setEditPeriod(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} /></ProdField>
            </div>

            <ProdField label="Target Audience"><textarea value={editTarget} onChange={(e) => setEditTarget(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusInput} onBlur={blurInput} /></ProdField>
            <ProdField label="Notable Attachments"><input type="text" value={editAttached} onChange={(e) => setEditAttached(e.target.value)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} placeholder="e.g. Director: Jane Smith" /></ProdField>

            {/* EXPORT BUTTON */}
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
