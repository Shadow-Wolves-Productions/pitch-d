import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import SelectableCard from './onesheet/SelectableCard';
import LockBar from './onesheet/LockBar';
import LockedBanner from './onesheet/LockedBanner';
import PromoModal from './onesheet/PromoModal';
import PrintSheet from './onesheet/PrintSheet';
import SectionLabel from './SectionLabel';
import CrossPromo from './CrossPromo';

export default function OneSheetBuilder({ data, onReset }) {
  const { primaryTitle, altTitles = [], loglines = [], taglines = [], synopsis: rawSynopsis = '' } = data;

  const allTitles = [primaryTitle, ...altTitles];

  const [selectedTitle, setSelectedTitle] = useState(null);   // index
  const [selectedLogline, setSelectedLogline] = useState(null);
  const [selectedTagline, setSelectedTagline] = useState(null);

  const [editTitle, setEditTitle] = useState('');
  const [editLogline, setEditLogline] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editSynopsis, setEditSynopsis] = useState(rawSynopsis);

  const [locked, setLocked] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [showPrintSheet, setShowPrintSheet] = useState(false);

  const completed = [
    selectedTitle !== null,
    selectedLogline !== null,
    selectedTagline !== null,
    editSynopsis.trim().length > 0,
  ];

  const handleSelectTitle = (i) => {
    if (locked) return;
    if (selectedTitle === i) return;
    setSelectedTitle(i);
    setEditTitle(allTitles[i]);
  };

  const handleSelectLogline = (i) => {
    if (locked) return;
    if (selectedLogline === i) return;
    setSelectedLogline(i);
    setEditLogline(loglines[i]);
  };

  const handleSelectTagline = (i) => {
    if (locked) return;
    if (selectedTagline === i) return;
    setSelectedTagline(i);
    setEditTagline(taglines[i]);
  };

  const handleLock = () => setLocked(true);
  const handleUnlock = () => setLocked(false);

  const handleExport = () => {
    setShowPrintSheet(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrintSheet(false);
        setShowPromo(true);
      }, 500);
    }, 50);
  };

  const finalTitle = selectedTitle !== null ? editTitle : '';
  const finalLogline = selectedLogline !== null ? editLogline : '';
  const finalTagline = selectedTagline !== null ? editTagline : '';
  const finalSynopsis = editSynopsis;

  return (
    <>
      <PrintSheet
        title={finalTitle}
        logline={finalLogline}
        tagline={finalTagline}
        synopsis={finalSynopsis}
        visible={showPrintSheet}
      />

      {/* Screen UI */}
      <div className="no-print space-y-10">

        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-syne font-extrabold" style={{ fontSize: '20px', color: '#1a1a1a' }}>
              Build your One Sheet
            </h2>
            <p className="font-grotesk mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>
              Select one from each section, edit inline, then lock.
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

        {/* Lock bar or locked banner */}
        {locked ? (
          <LockedBanner onUnlock={handleUnlock} onExport={handleExport} />
        ) : (
          <LockBar completed={completed} onLock={handleLock} />
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
                    <span
                      className="font-mono-dm ml-2"
                      style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#9ca3af', fontStyle: 'normal', fontWeight: 400, fontSize: '10px' }}
                    >
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

        {/* SYNOPSIS — always editable */}
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

        {/* Lock bar repeat at bottom for convenience */}
        {!locked && (
          <LockBar completed={completed} onLock={handleLock} />
        )}

        <CrossPromo />
      </div>

      {showPromo && <PromoModal onClose={() => setShowPromo(false)} />}
    </>
  );
}