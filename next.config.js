/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Legacy Next Pages Router and CRA routes used different paths than App Router.
   * Permanent redirects keep old bookmarks and external links working.
   */
  async redirects() {
    return [
      // /Work and /Reading → see src/middleware.js (case-sensitive; avoids Netlify redirect loops)
      { source: '/CaseStudyCarturesti', destination: '/carturesti', permanent: true },
      { source: '/projects/Carturesti', destination: '/carturesti', permanent: true },
      { source: '/explore/ContentWheel', destination: '/explore/content-wheel', permanent: true },
      { source: '/explore/HeroExplore', destination: '/explore/hero-explore', permanent: true },
      { source: '/SlotWheel', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;

