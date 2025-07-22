const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/ReactBillingApp/' : '',
  basePath: isProd ? '/ReactBillingApp' : '',
  output: 'export'
};

export default nextConfig;
