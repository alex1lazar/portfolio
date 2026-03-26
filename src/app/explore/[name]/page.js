import { notFound } from 'next/navigation';
import PageWithNavbar from '../../../components/layout/PageWithNavbar';
import ContentWheel from '../../../views/explore/ContentWheel';
import HeroExplore from '../../../views/explore/HeroExplore';
import { buildPageMetadata } from '../../../lib/siteMetadata';

const VIEWS = {
  'content-wheel': ContentWheel,
  'hero-explore': HeroExplore,
};

function normalizeExploreSegment(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const decoded = decodeURIComponent(raw);
  const n = decoded.toLowerCase().replace(/_/g, '-');
  if (n === 'contentwheel' || n === 'content-wheel') return 'content-wheel';
  if (n === 'heroexplore' || n === 'hero-explore') return 'hero-explore';
  return null;
}

const TITLES = {
  'content-wheel': 'Content wheel',
  'hero-explore': 'Hero explore',
};

export function generateStaticParams() {
  return [{ name: 'content-wheel' }, { name: 'hero-explore' }];
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const key = normalizeExploreSegment(resolved?.name);
  const path = `/explore/${resolved?.name ?? ''}`;
  return buildPageMetadata({
    title: key ? TITLES[key] : 'Explore',
    description: 'Design explorations and experiments.',
    path,
  });
}

export default async function ExplorePage({ params }) {
  const resolved = await params;
  const key = normalizeExploreSegment(resolved?.name);
  if (!key) {
    notFound();
  }
  const View = VIEWS[key];
  return (
    <PageWithNavbar>
      <View />
    </PageWithNavbar>
  );
}
