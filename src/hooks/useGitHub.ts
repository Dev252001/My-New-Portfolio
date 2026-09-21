import { useState, useEffect } from 'react';

export interface GitHubStats {
  followers: number;
  public_repos: number;
  contributions: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubData {
  stats: GitHubStats | null;
  calendar: ContributionDay[];
  loading: boolean;
  error: boolean;
}

const CACHE_KEY = 'gh_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

function getCache(): { data: GitHubData; ts: number } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setCache(data: GitHubData) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // ignore
  }
}

async function fetchGitHub(username: string): Promise<GitHubData> {
  const [userRes, calRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    ),
  ]);

  if (!userRes.ok || !calRes.ok) throw new Error('fetch failed');

  const user = await userRes.json();
  const cal = await calRes.json();

  const days: ContributionDay[] = (cal.contributions ?? []).map(
    (d: { date: string; count: number; level: number }) => ({
      date: d.date,
      count: d.count,
      level: Math.min(d.level, 4) as 0 | 1 | 2 | 3 | 4,
    })
  );

  const contributions = days.reduce((sum, d) => sum + d.count, 0);

  return {
    stats: {
      followers: user.followers ?? 0,
      public_repos: user.public_repos ?? 0,
      contributions,
    },
    calendar: days,
    loading: false,
    error: false,
  };
}

// Static fallback
function buildFallback(): GitHubData {
  return {
    stats: { followers: 0, public_repos: 0, contributions: 0 },
    calendar: [],
    loading: false,
    error: true,
  };
}

export function useGitHub(username: string): GitHubData {
  const [data, setData] = useState<GitHubData>({
    stats: null,
    calendar: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    if (!username || username.startsWith('[')) {
      setData(buildFallback());
      return;
    }

    // Check cache
    const cached = getCache();
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(cached.data);
      return;
    }

    fetchGitHub(username)
      .then((result) => {
        setCache(result);
        setData(result);
      })
      .catch(() => {
        setData(buildFallback());
      });
  }, [username]);

  return data;
}
