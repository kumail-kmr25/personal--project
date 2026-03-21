import { notFound } from 'next/navigation';
import { getCaseStudy } from '@/data/case-studies';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { CASE_STUDIES } = await import('@/data/case-studies');
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return { title: 'Case Study Not Found' };
  return {
    title: `${caseStudy.title} | Case Study - Kumail Kmr`,
    description: caseStudy.overview.slice(0, 155),
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.overview,
      images: [caseStudy.heroImage],
    },
  };
}

export default async function CaseStudyRoute({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();
  return <CaseStudyPage caseStudy={caseStudy} />;
}
