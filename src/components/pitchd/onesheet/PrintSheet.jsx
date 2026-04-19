import React from 'react';

export default function PrintSheet({ title, logline, tagline, synopsis, visible }) {
  return (
    <div className={`print-sheet${visible ? ' show' : ''}`} id="printSheet">
      <div className="ps-header">
        <div className="ps-logo-row">
          <div>
            <div className="ps-logo">PITCH<em>'D</em></div>
            <div className="ps-brand">A Shadow Wolves Productions Tool</div>
          </div>
          <div className="ps-badge">DEVELOPMENT ONE SHEET</div>
        </div>
        <div className="ps-film-label">A Film Titled</div>
        <div className="ps-title">{title}</div>
      </div>

      <div className="ps-body">
        <div>
          <div className="ps-section-label">Logline</div>
          <div className="ps-logline">{logline}</div>
        </div>
        <div>
          <div className="ps-section-label">Tagline</div>
          <div className="ps-tagline">"{tagline}"</div>
        </div>
        <div>
          <div className="ps-section-label">Synopsis</div>
          <div className="ps-synopsis">{synopsis}</div>
        </div>
      </div>

      <div className="ps-footer">
        <div className="ps-footer-text">PITCH'D © Shadow Wolves Productions</div>
        <div className="ps-footer-text">Session Only · Nothing Saved</div>
      </div>
    </div>
  );
}