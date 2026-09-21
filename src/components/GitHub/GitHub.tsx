import SectionTitle from '../shared/SectionTitle';
import FadeUp from '../shared/FadeUp';
import GithubHeatmap from './GithubHeatmap';
import { useGitHub } from '../../hooks/useGitHub';
import site from '../../data/site';

/* Skeleton pulse block */
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-surface rounded animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

/* Emerald legend swatches */
const LEGEND_LEVELS = [
  'var(--heat-empty)',
  'var(--heat-l1)',
  'var(--heat-l2)',
  'var(--heat-l3)',
  'var(--heat-l4)',
] as const;

export default function GitHub() {
  const { stats, calendar, loading, error } = useGitHub(site.githubUsername);

  const profileUrl = `https://github.com/${site.githubUsername}`;
  const isPlaceholder = site.githubUsername.startsWith('[');

  return (
    <section
      id="github"
      className="px-[clamp(20px,4vw,50px)] pt-[clamp(80px,12vw,160px)] pb-[clamp(80px,12vw,160px)]"
    >
      {/* Giant title */}
      <SectionTitle>GITHUB</SectionTitle>

      {/* Stats row */}
      <FadeUp delay={0.1}>
        <div className="flex items-end justify-between mt-10 mb-10 flex-wrap gap-6">
          {/* Stats */}
          <div className="flex items-end gap-10 sm:gap-16">
            {/* Followers */}
            <div className="flex flex-col gap-1">
              <span className="font-mono font-bold uppercase tracking-[0.12em] text-[11px] text-muted">
                Followers
              </span>
              {loading ? (
                <Skeleton className="w-12 h-7" />
              ) : (
                <span className="font-sans font-bold text-[22px] text-ink leading-none">
                  {error || isPlaceholder ? '—' : (stats?.followers ?? 0)}
                </span>
              )}
            </div>

            {/* Contributions */}
            <div className="flex flex-col gap-1">
              <span className="font-mono font-bold uppercase tracking-[0.12em] text-[11px] text-muted">
                Contributions
              </span>
              {loading ? (
                <Skeleton className="w-14 h-7" />
              ) : (
                <span className="font-sans font-bold text-[22px] text-ink leading-none">
                  {error || isPlaceholder ? '—' : (stats?.contributions ?? 0)}
                </span>
              )}
            </div>

            {/* Repos */}
            <div className="flex flex-col gap-1">
              <span className="font-mono font-bold uppercase tracking-[0.12em] text-[11px] text-muted">
                Repos
              </span>
              {loading ? (
                <Skeleton className="w-10 h-7" />
              ) : (
                <span className="font-sans font-bold text-[22px] text-ink leading-none">
                  {error || isPlaceholder ? '—' : (stats?.public_repos ?? 0)}
                </span>
              )}
            </div>
          </div>

          {/* View profile link */}
          <a
            href={isPlaceholder ? '#' : profileUrl}
            target={isPlaceholder ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink
              border-b border-ink pb-px link-underline"
          >
            VIEW PROFILE ↗
          </a>
        </div>
      </FadeUp>

      {/* Heatmap */}
      <FadeUp delay={0.15}>
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            /* Skeleton grid */
            <div className="flex gap-[3px]" aria-label="Loading contribution data">
              {Array.from({ length: 53 }).map((_, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, di) => (
                    <div
                      key={di}
                      className="w-[14px] h-[14px] rounded-[3px] bg-surface animate-pulse"
                      style={{ animationDelay: `${(wi * 7 + di) * 2}ms` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : error || isPlaceholder ? (
            <div className="py-12 text-center text-muted font-sans text-[16px]">
              {isPlaceholder
                ? 'Set your GitHub username in src/data/site.ts to load live data.'
                : 'Could not load GitHub data. Check your connection or try again later.'}
            </div>
          ) : (
            <GithubHeatmap calendar={calendar} />
          )}
        </div>
      </FadeUp>

      {/* Footer row */}
      <FadeUp delay={0.2}>
        <div className="flex items-center justify-between mt-4 max-w-[1200px] mx-auto flex-wrap gap-3">
          {/* Learn link */}
          <a
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[13px] text-muted link-underline"
          >
            Learn how we count contributions
          </a>

          {/* Legend */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span>Less</span>
            {LEGEND_LEVELS.map((color, i) => (
              <span
                key={i}
                className="w-[14px] h-[14px] rounded-[3px] inline-block"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
