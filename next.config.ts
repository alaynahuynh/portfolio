import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    viewTransition: true,
  },
  // Case studies moved from numbered slugs to readable ones — keep any
  // link already shared (résumé, LinkedIn, applications) working.
  async redirects() {
    return [
      { source: "/projects/case-study-01", destination: "/projects/mymuseum", permanent: true },
      { source: "/projects/case-study-02", destination: "/projects/coursepilot", permanent: true },
      { source: "/projects/case-study-03", destination: "/projects/vietnamese-noodle-house", permanent: true },
    ];
  },
};

export default nextConfig;
