import React, { useState } from 'react';
import { RotateCcw, Lock, Download, Unlock, CheckCircle } from 'lucide-react';
import SelectableCard from './onesheet/SelectableCard';
import PromoModal from './onesheet/PromoModal';
import PrintSheet from './onesheet/PrintSheet';
import SectionLabel from './SectionLabel';

export default function OneSheetBuilder({ data, onReset }) {
  const { primaryTitle, altTitles = [], loglines = [], taglines = [], synopsis: rawSynopsis = '' } = data;
  const allTitles = [primaryTitle, ...altTitles];

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedLogline, setSelectedLogline] = useState(null);
  const [selectedTagline, setSelectedTagline] = useState(null);

  const [editTitle, setEditTitle] = useState('');
  const [editLogline, setEditLogline] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editSynopsis, setEditSynopsis] = useState(rawSynopsis);

  const [locked, setLocked] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [showPrintSheet, setShowPrintSheet] = useState(false);
  const [exporting, setExporting] = useState(false);

  const completed = [
    selectedTitle !== null,
    selectedLogline !== null,
    selectedTagline !== null,
    editSynopsis.trim().length > 0,
  ];
  const allDone = completed.every(Boolean);

  const handleSelectTitle = (i) => {
    if (locked) return;
    setSelectedTitle(i);
    setEditTitle(allTitles[i]);
  };

  const handleSelectLogline = (i) => {
    if (locked) return;
    setSelectedLogline(i);
    setEditLogline(loglines[i]);
  };

  const handleSelectTagline = (i) => {
    if (locked) return;
    setSelectedTagline(i);
    setEditTagline(taglines[i]);
  };

  const handleLockAndExport = async () => {
    if (!allDone) return;
    setLocked(true);
    setExporting(true);
    // Small delay so locked state renders before print sheet shows
    setTimeout(() => {
      setShowPrintSheet(true);
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          setShowPrintSheet(false);
          setExporting(false);
          setShowPromo(true);
        }, 800);
      }, 100);
    }, 200);
  };

  const handleExportAgain = () => {
    setExporting(true);
    setShowPrintSheet(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrintSheet(false);
        setExporting(false);
        setShowPromo(true);
      }, 800);
    }, 100);
  };

  const handleUnlock = () => {
    setLocked(false);
    setExporting(false);
  };

  return (
    <>
      <PrintSheet
        title={editTitle}
        logline={editLogline}
        tagline={editTagline}
        synopsis={editSynopsis}
        visible={showPrintSheet}
      />

      <div className="no-print space-y-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-syne font-extrabold" style={{ fontSize: '20px', color: '#1a1a1a' }}>
              Build your One Sheet
            </h2>
            <p className="font-grotesk mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>
              {locked
                ? 'Locked and ready. Export or unlock to make changes.'
                : 'Select one from each section — then edit if needed.'}
            </p>
          </div>
          <button
            onClick={onReset}
            className="font-mono-dm uppercase flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors"
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: '#0d9488',
              border: '1px solid rgba(13,148,136,0.25)',
            }}
          >
            <RotateCcw size={12} />
            New Pitch
          </button>
        </div>

        {/* LOCKED BANNER */}
        {locked && (
          <div
            className="rounded-lg px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: '#0d9488' }}
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={18} color="#ffffff" />
              <span className="font-syne font-bold" style={{ fontSize: '15px', color: '#ffffff' }}>
                ✓ Locked and ready to export
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUnlock}
                className="font-mono-dm uppercase flex items-center gap-1.5 px-4 py-2 rounded-md"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <Unlock size={12} />
                Unlock & Edit
              </button>
              <button
                onClick={handleExportAgain}
                disabled={exporting}
                className="font-syne font-extrabold uppercase flex items-center gap-1.5 px-4 py-2 rounded-md"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  background: '#ffffff',
                  color: '#0d9488',
                  opacity: exporting ? 0.7 : 1,
                }}
              >
                <Download size={13} />
                {exporting ? 'Exporting…' : '↓ Export Again'}
              </button>
            </div>
          </div>
        )}

        {/* STATUS DOTS — only when unlocked */}
        {!locked && (
          <div
            className="rounded-lg p-4 flex items-center gap-4 flex-wrap"
            style={{ background: '#ffffff', border: '1px solid #e8e0d8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          >
            {['Title', 'Logline', 'Tagline', 'Synopsis'].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full transition-colors"
                  style={{ background: completed[i] ? '#0d9488' : '#e5e7eb' }}
                />
                <span
                  className="font-mono-dm uppercase"
                  style={{ fontSize: '10px', letterSpacing: '0.15em', color: completed[i] ? '#0d9488' : '#9ca3af' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TITLE */}
        <section>
          <SectionLabel>Title — pick one</SectionLabel>
          <div className="space-y-3">
            {allTitles.map((t, i) => (
              <SelectableCard
                key={i}
                index={i === 0 ? undefined : i - 1}
                selected={selectedTitle === i}
                locked={locked}
                onSelect={() => handleSelectTitle(i)}
                editValue={editTitle}
                onEditChange={setEditTitle}
                large
              >
                {i === 0 ? (
                  <span>
                    {t}
                    <span className="font-mono-dm ml-2" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#9ca3af', fontWeight: 400 }}>
                      AI Pick
                    </span>
                  </span>
                ) : t}
              </SelectableCard>
            ))}
          </div>
        </section>

        {/* LOGLINE */}
        <section>
          <SectionLabel>Logline — pick one</SectionLabel>
          <div className="space-y-3">
            {loglines.map((l, i) => (
              <SelectableCard
                key={i}
                index={i}
                selected={selectedLogline === i}
                locked={locked}
                onSelect={() => handleSelectLogline(i)}
                editValue={editLogline}
                onEditChange={setEditLogline}
              >
                {l}
              </SelectableCard>
            ))}
          </div>
        </section>

        {/* TAGLINE */}
        <section>
          <SectionLabel>Tagline — pick one</SectionLabel>
          <div className="space-y-3">
            {taglines.map((t, i) => (
              <SelectableCard
                key={i}
                index={i}
                selected={selectedTagline === i}
                locked={locked}
                onSelect={() => handleSelectTagline(i)}
                editValue={editTagline}
                onEditChange={setEditTagline}
                italic
              >
                "{t}"
              </SelectableCard>
            ))}
          </div>
        </section>

        {/* SYNOPSIS */}
        <section>
          <SectionLabel>Synopsis — edit directly</SectionLabel>
          <div
            className="rounded-lg p-6"
            style={{
              background: '#ffffff',
              border: '1px solid #e8e0d8',
              borderLeft: '3px solid #0d9488',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {locked ? (
              <p className="font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#374151' }}>
                {editSynopsis}
              </p>
            ) : (
              <textarea
                value={editSynopsis}
                onChange={(e) => setEditSynopsis(e.target.value)}
                rows={5}
                placeholder="Your synopsis will appear here — edit as needed."
                className="w-full resize-none bg-transparent outline-none font-grotesk leading-relaxed"
                style={{ fontSize: '15px', color: '#374151' }}
              />
            )}
          </div>
        </section>

        {/* LOCK & EXPORT — single button, only when unlocked */}
        {!locked && (
          <button
            onClick={handleLockAndExport}
            disabled={!allDone}
            className="w-full font-syne font-extrabold uppercase flex items-center justify-center gap-2 py-4 rounded-lg transition-all"
            style={{
              fontSize: '16px',
              letterSpacing: '0.04em',
              background: allDone ? '#0d9488' : '#e5e7eb',
              color: allDone ? '#ffffff' : '#9ca3af',
              cursor: allDone ? 'pointer' : 'not-allowed',
              boxShadow: allDone ? '0 4px 16px rgba(13,148,136,0.3)' : 'none',
            }}
          >
            <Lock size={16} />
            Lock & Export One Sheet
          </button>
        )}

        {!locked && !allDone && (
          <p className="font-mono-dm text-center" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#9ca3af', textTransform: 'uppercase', marginTop: '-24px' }}>
            Select a title, logline, and tagline to continue
          </p>
        )}
      </div>

      {showPromo && <PromoModal onClose={() => setShowPromo(false)} />}
    </>
  );
}
