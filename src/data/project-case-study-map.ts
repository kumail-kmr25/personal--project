export const PROJECT_TO_CASE_STUDY: Record<string, string> = {
  'fashionco-e-commerce': 'ecommerce-fashion-platform',
  'saas-analytics-dashboard': 'saas-analytics-dashboard',
  'modern-law-firm-portfolio': 'law-firm-website',
  'high-performance-api-engine': 'saas-analytics-dashboard',
  'healthcare-booking-platform': 'healthcare-booking-platform',
  'fitness-social-network': 'fitness-social-network',
  'restaurant-ordering-system': 'restaurant-ordering-system',
  'bella-cucina': 'restaurant-ordering-system',
  'medq-ai': 'healthcare-booking-platform',
  'fitconnect': 'fitness-social-network',
  'data-metrics': 'saas-analytics-dashboard',
  'legalpro-associates': 'law-firm-website',
};

export function getCaseStudySlugForProject(projectId: string): string | null {
  const slug = projectId.toLowerCase().replace(/\s+/g, '-');
  return PROJECT_TO_CASE_STUDY[slug] || PROJECT_TO_CASE_STUDY[projectId] || null;
}
