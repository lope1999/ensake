/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.postimg.cc'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://core-main-lgmkhu.laravel.cloud/assessment/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 