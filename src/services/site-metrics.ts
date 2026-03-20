export type SiteMetric = {
  label: string;
  value: string;
};

export type GrowthPoint = {
  month: string;
  score: number;
};

export type SiteMetricsResponse = {
  stats: SiteMetric[];
  growth: GrowthPoint[];
};

export async function getSiteMetrics(): Promise<SiteMetricsResponse> {
  const response = await fetch('/api/site-metrics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to load site metrics');
  }

  return response.json();
}
