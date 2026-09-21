import { useState, useRef } from 'react';
import type { ContributionDay } from '../../hooks/useGitHub';

interface Props {
  calendar: ContributionDay[];
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS: Record<number, string> = { 1: 'Mon', 3: 'Wed', 5: 'Fri' };

function levelColor(level: 0 | 1 | 2 | 3 | 4): string {
  return [
    'var(--heat-empty)',
    'var(--heat-l1)',
    'var(--heat-l2)',
    'var(--heat-l3)',
    'var(--heat-l4)',
  ][level];
}

/**
 * Groups flat ContributionDay[] into 53 ISO weeks × 7 days (Sun–Sat).
 * Missing days are filled with { count:0, level:0 }.
 */
function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (!days.length) return [];

  const map = new Map<string, ContributionDay>();
  days.forEach((d) => map.set(d.date, d));

  // Start from the Sunday on or before the first day
  const first = new Date(days[0].date + 'T00:00:00');
  const start = new Date(first);
  start.setDate(start.getDate() - start.getDay()); // back to Sunday

  const last = new Date(days[days.length - 1].date + 'T00:00:00');
  const end = new Date(last);
  end.setDate(end.getDate() + (6 - end.getDay())); // forward to Saturday

  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  const cur = new Date(start);

  while (cur <= end) {
    const iso = cur.toISOString().slice(0, 10);
    week.push(map.get(iso) ?? { date: iso, count: 0, level: 0 });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    cur.setDate(cur.getDate() + 1);
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

/** Returns month label positions: { label, weekIndex } */
function monthLabels(weeks: (ContributionDay | null)[][]): { label: string; col: number }[] {
  const seen = new Set<string>();
  const labels: { label: string; col: number }[] = [];
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d !== null);
    if (!first) return;
    const month = first.date.slice(0, 7); // YYYY-MM
    if (!seen.has(month)) {
      seen.add(month);
      const m = parseInt(first.date.slice(5, 7), 10) - 1;
      labels.push({ label: MONTHS[m], col: wi });
    }
  });
  return labels;
}

const CELL = 14;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT_OFFSET = 36; // space for day labels

export default function GithubHeatmap({ calendar }: Props) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const weeks = buildWeeks(calendar);
  const mLabels = monthLabels(weeks);

  const svgWidth = LEFT_OFFSET + weeks.length * STEP;
  const svgHeight = 30 + 7 * STEP; // 30px for month labels, 7 rows

  const handleMouseEnter = (day: ContributionDay | null, e: React.MouseEvent) => {
    if (!day) return;
    const rect = (e.target as SVGRectElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const d = new Date(day.date + 'T00:00:00');
    const label = `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    setTooltip({
      text: label,
      x: rect.left - containerRect.left + CELL / 2,
      y: rect.top - containerRect.top - 8,
    });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-x-auto">
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{ display: 'block', minWidth: svgWidth }}
        aria-label="GitHub contribution heatmap"
        role="img"
      >
        {/* Month labels */}
        {mLabels.map(({ label, col }) => (
          <text
            key={`${label}-${col}`}
            x={LEFT_OFFSET + col * STEP}
            y={14}
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fill="var(--muted)"
          >
            {label}
          </text>
        ))}

        {/* Day-of-week labels */}
        {[0,1,2,3,4,5,6].map((row) =>
          DAY_LABELS[row] ? (
            <text
              key={row}
              x={LEFT_OFFSET - 4}
              y={30 + row * STEP + CELL - 2}
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fill="var(--muted)"
              textAnchor="end"
            >
              {DAY_LABELS[row]}
            </text>
          ) : null
        )}

        {/* Cells */}
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            if (!day) return null;
            return (
              <rect
                key={day.date}
                x={LEFT_OFFSET + wi * STEP}
                y={30 + di * STEP}
                width={CELL}
                height={CELL}
                rx={3}
                fill={levelColor(day.level)}
                style={{ cursor: 'default' }}
                onMouseEnter={(e) => handleMouseEnter(day, e)}
                onMouseLeave={() => setTooltip(null)}
                aria-label={`${day.count} contributions on ${day.date}`}
              />
            );
          })
        )}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10
            bg-ink text-bg font-mono text-[11px] px-2 py-1 rounded
            whitespace-nowrap -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
          aria-hidden="true"
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
