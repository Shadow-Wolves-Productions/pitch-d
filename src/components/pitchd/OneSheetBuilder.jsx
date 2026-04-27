import React, { useState } from 'react';
import { RotateCcw, Lock, Download, Unlock, CheckCircle, ChevronRight, Plus, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import SelectableCard from './onesheet/SelectableCard';
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

  const handleExport = async () => {
    setExporting(true);

    const primaryTitle = editTitle;
    const notableAttachments = buildAttachedString();

    const data = {
      primaryTitle,
      loglines: [editLogline],
      taglines: [editTagline],
      synopsis: editSynopsis,
      comparableA: compA,
      comparableB: compB,
      genre: genreList,
      tone,
      themes: editThemes.split(',').map(t => t.trim()).filter(Boolean),
      setting: editSetting,
      period: editPeriod,
      format: editFormat,
      estimatedBudget: editBudgetTier,
      estimatedBudgetRange: editBudgetRange,
      targetAudience: editTarget,
      writerName,
      writerEmail,
      writerPhone,
      notableAttachments,
    };

    const {
      loglines = [],
      taglines = [],
      synopsis = '',
      comparableA = '',
      comparableB = '',
      genre = [],
      themes = [],
      setting = '',
      period = '',
      format: fmt = '',
      estimatedBudget = '',
      estimatedBudgetRange = '',
      targetAudience = '',
    } = data;

    const sideItems = [
      ['Format', fmt],
      ['Genre', Array.isArray(genre) ? genre.join(' \u00B7 ') : genre],
      ['Est. Budget', [estimatedBudget, estimatedBudgetRange].filter(Boolean).join(' \u00B7 ')],
      ['Period', period],
      ['Setting', setting],
      ['Tone', tone],
      ['Themes', Array.isArray(themes) ? themes.join(', ') : themes],
    ];

    const sideHTML = sideItems.map(([key, val], i, arr) => {
      const divider = i < arr.length - 1 ? '<div style="height:1px;background:rgba(255,255,255,0.07);"></div>' : '';
      return `<div style="display:flex;flex-direction:column;gap:3px;"><span style="font-family:'DM Mono',monospace;font-size:7px;text-transform:uppercase;letter-spacing:1.2px;color:#0d9488;">${key}</span><span style="font-size:10px;color:#ffffff;font-weight:400;line-height:1.4;">${val || '\u2014'}</span></div>${divider}`;
    }).join('');

    const formattedAttachments = (notableAttachments || '\u2014')
      .replace(/\b(Director|DOP|Producer|Cast|Composer)\b/g, '<strong style="font-weight:700;">$1</strong>');

    const writerItems = [
      writerName ? `<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'DM Mono',monospace;font-size:7px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.6);">Written By</span><span style="font-size:10px;color:#ffffff;font-weight:500;">${writerName}</span></div>` : '',
      writerEmail ? `<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'DM Mono',monospace;font-size:7px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.6);">Contact</span><span style="font-size:10px;color:#ffffff;font-weight:500;">${writerEmail}</span></div>` : '',
      writerPhone ? `<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'DM Mono',monospace;font-size:7px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.6);">Phone</span><span style="font-size:10px;color:#ffffff;font-weight:500;">${writerPhone}</span></div>` : '',
    ].filter(Boolean).join('');

    const sheet = [
      '<div style="font-family:\'Space Grotesk\',sans-serif;background:#ffffff;width:680px;max-width:680px;box-sizing:border-box;overflow:hidden;display:flex;flex-direction:column;height:100%;">',
      '<div style="height:5px;background:#0d9488;"></div>',
      '<div style="background:#ffffff;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #0d9488;">',
      '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:26px;color:#1a1a1a;letter-spacing:2px;line-height:1;">P<span style="color:#0d9488;">¡</span>TCH\'D</div>',
      '<span style="font-family:\'DM Mono\',monospace;font-size:8px;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;">Development One Sheet</span>',
      '</div>',
      '<div style="background:#1a1a1a;padding:20px 22px 18px;display:flex;flex-direction:column;justify-content:flex-end;min-height:110px;">',
      '<div style="font-family:\'DM Mono\',monospace;font-size:7px;text-transform:uppercase;letter-spacing:2px;color:#0d9488;margin-bottom:5px;">A Film Titled</div>',
      `<div style="font-family:'Bebas Neue',sans-serif;font-size:38px;color:#ffffff;line-height:0.95;letter-spacing:1px;">${primaryTitle.toUpperCase()}</div>`,
      '</div>',
      '<div style="background:#0d9488;padding:7px 22px;display:flex;gap:28px;">',
      writerItems,
      '</div>',
      '<div style="display:grid;grid-template-columns:1fr 155px;flex:1;">',
      '<div style="background:#ffffff;padding:14px 22px;">',
      '<div style="margin-bottom:12px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;display:block;padding-bottom:3px;border-bottom:1px solid rgba(13,148,136,0.2);margin-bottom:4px;">Logline</span>',
      `<p style="font-size:10px;color:#1a1a1a;line-height:1.6;margin:0;">${loglines[0] || ''}</p>`,
      '</div>',
      '<div style="margin-bottom:12px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;display:block;padding-bottom:3px;border-bottom:1px solid rgba(13,148,136,0.2);margin-bottom:4px;">Tagline</span>',
      `<p style="font-size:11px;color:#0d9488;line-height:1.5;font-style:italic;font-weight:500;margin:0;">"${taglines[0] || ''}"</p>`,
      '</div>',
      '<div style="margin-bottom:12px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;display:block;padding-bottom:3px;border-bottom:1px solid rgba(13,148,136,0.2);margin-bottom:4px;">Synopsis</span>',
      `<p style="font-size:10px;color:#1a1a1a;line-height:1.6;margin:0;">${synopsis}</p>`,
      '</div>',
      '<div style="margin-bottom:12px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;display:block;padding-bottom:3px;border-bottom:1px solid rgba(13,148,136,0.2);margin-bottom:4px;">Comparables</span>',
      '<div style="display:flex;align-items:baseline;flex-wrap:wrap;gap:6px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-style:italic;font-size:10px;color:#6b7280;">It\'s</span>',
      `<span style="font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.5px;">${comparableA}</span>`,
      '<span style="font-family:\'DM Mono\',monospace;font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;">meets</span>',
      `<span style="font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.5px;">${comparableB}</span>`,
      '</div>',
      '</div>',
      '<div style="margin-bottom:12px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;display:block;padding-bottom:3px;border-bottom:1px solid rgba(13,148,136,0.2);margin-bottom:4px;">Target Audience</span>',
      `<p style="font-size:10px;color:#1a1a1a;line-height:1.6;margin:0;">${targetAudience}</p>`,
      '</div>',
      '<div style="margin-bottom:4px;">',
      '<span style="font-family:\'DM Mono\',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;display:block;padding-bottom:3px;border-bottom:1px solid rgba(13,148,136,0.2);margin-bottom:4px;">Notable Attachments</span>',
      `<p style="font-size:10px;color:#1a1a1a;line-height:1.7;margin:0;">${formattedAttachments}</p>`,
      '</div>',
      '</div>',
      '<div style="background:#1a1a1a;padding:14px;display:flex;flex-direction:column;gap:10px;border-left:3px solid #0d9488;">',
      sideHTML,
      '</div>',
      '</div>',
      '<div style="height:3px;background:#0d9488;"></div>',
      '<div style="background:#1a1a1a;padding:6px 22px;display:flex;justify-content:space-between;align-items:center;">',
      '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:13px;color:#9ca3af;letter-spacing:2px;">P<span style="color:#0d9488;">¡</span>TCH\'D</div>',
      '<div style="font-family:\'DM Mono\',monospace;font-size:6.5px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;">PITCH\'D \u00A9 Shadow Wolves Productions</div>',
      '</div>',
      '</div>',
    ].join('');

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = '680px';
    container.style.maxWidth = '680px';
    container.style.overflow = 'hidden';
    container.style.boxSizing = 'border-box';
    container.style.zIndex = '-1';
    // A4 aspect ratio: 210:297 → at 680px width, height = 680 * (297/210) = 962px
    const a4Height = Math.round(680 * (297 / 210));
    container.innerHTML = sheet;
    container.style.height = a4Height + 'px';
    document.body.appendChild(container);
    container.getBoundingClientRect(); // forces reflow
    await document.fonts.ready;
    await new Promise(r => setTimeout(r, 1200));

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 680,
        height: a4Height,
        windowWidth: 680,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      const filename = `PITCHD_${(primaryTitle || 'ONE_SHEET').replace(/\s+/g, '_').toUpperCase()}.pdf`;
      pdf.save(filename);
    } finally {
      document.body.removeChild(container);
      setExporting(false);
      if (onExportDone) onExportDone();
    }
  };

  return (
    <>
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
