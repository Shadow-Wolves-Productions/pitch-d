export function buildTxtExport(data) {
  if (!data) return '';
  const lines = [];
  lines.push("PITCH'D — Your story. Worth the room.");
  lines.push('A Shadow Wolves Productions Tool');
  lines.push('='.repeat(56));
  lines.push('');
  lines.push('A FILM TITLED');
  lines.push('-'.repeat(56));
  lines.push(data.primaryTitle || '');
  lines.push('');
  if (data.altTitles?.length) {
    lines.push('OR PERHAPS —');
    lines.push('-'.repeat(56));
    data.altTitles.forEach((t) => lines.push(`· ${t}`));
    lines.push('');
  }
  if (data.loglines?.length) {
    lines.push('LOGLINES — THREE ANGLES');
    lines.push('-'.repeat(56));
    data.loglines.forEach((l, i) => {
      lines.push(`${String(i + 1).padStart(2, '0')}. ${l}`);
      lines.push('');
    });
  }
  if (data.taglines?.length) {
    lines.push('TAGLINES — FOR THE POSTER');
    lines.push('-'.repeat(56));
    data.taglines.forEach((t, i) => {
      lines.push(`${String(i + 1).padStart(2, '0')}. "${t}"`);
    });
    lines.push('');
  }
  if (data.synopsis) {
    lines.push('SYNOPSIS — THE ROOM READ');
    lines.push('-'.repeat(56));
    lines.push(data.synopsis);
    lines.push('');
  }
  lines.push('='.repeat(56));
  lines.push("PITCH'D © Shadow Wolves Productions");
  return lines.join('\n');
}

export function downloadTxt(data) {
  const content = buildTxtExport(data);
  const safeTitle = (data?.primaryTitle || 'pitch')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 50);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pitchd-${safeTitle || 'pitch'}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}