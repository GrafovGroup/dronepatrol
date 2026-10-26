import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.dronepatrol.ca' }],
        destination: 'https://dronepatrol.ca/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'dronepatrol.ca' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
        ],
        destination: 'https://dronepatrol.ca/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
