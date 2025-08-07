/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/vcs_frontend',
  assetPrefix: '/vcs_frontend',
  env: {
    ASSET_PREFIX: '/vcs_frontend',
  },
};

export default nextConfig;
