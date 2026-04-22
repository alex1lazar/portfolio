import React from 'react';
import WideContainer from '../components/containers/WideContainer';
import NarrowContainer from '../components/containers/NarrowContainer';
import PageHeader from '../components/PageHeader';

function monthKeyFromIso(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function formatMonthHeading(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Assumes `picks` are already sorted by `addedAt` descending (see getAllPicks).
 * Groups consecutive calendar months while preserving order within each month.
 */
function groupPicksByMonth(picks) {
  const groups = [];
  for (const pick of picks) {
    const key = monthKeyFromIso(pick.addedAt);
    const last = groups[groups.length - 1];
    if (!key) {
      if (!last || last.monthKey !== '_unknown') {
        groups.push({ monthKey: '_unknown', label: 'Undated', items: [pick] });
      } else {
        last.items.push(pick);
      }
      continue;
    }
    if (!last || last.monthKey !== key) {
      groups.push({
        monthKey: key,
        label: formatMonthHeading(pick.addedAt),
        items: [pick],
      });
    } else {
      last.items.push(pick);
    }
  }
  return groups;
}

export default function Picks({ picks = [] }) {
  const monthGroups = groupPicksByMonth(picks);

  return (
    <div className="pt-32 pb-16">
      <WideContainer>
        <NarrowContainer>
          <PageHeader
            title="Picks"
            description="Articles, videos, and other resources I found worth the time—mostly design, software, and adjacent rabbit holes."
          />
          {picks.length === 0 ? (
            <p className="text-text-muted">Nothing here yet.</p>
          ) : (
            <div className="space-y-16">
              {monthGroups.map(({ monthKey, label, items }) => (
                <section key={monthKey} aria-labelledby={`picks-month-${monthKey}`}>
                  <p
                    id={`picks-month-${monthKey}`}
                    className="font-semibold text-xs text-text-muted mb-4"
                  >
                    {label}
                  </p>
                  <ul className="space-y-6 list-none p-0 m-0">
                    {items.map((pick) => (
                      <li
                        key={pick.id}
                      >
                        <a
                          href={pick.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          <h4 className="text-text-dark font-semibold mb-1 group-hover:text-text-accent group-hover:underline transition-colors">
                            {pick.title}
                            {pick.author?.trim() ? (
                              <span className="text-text-muted font-normal"> · {pick.author}</span>
                            ) : null}
                          </h4>
                        {pick.note ? (
                          <p className="text-text-muted text-sm mb-2">{pick.note}</p>
                        ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </NarrowContainer>
      </WideContainer>
    </div>
  );
}
