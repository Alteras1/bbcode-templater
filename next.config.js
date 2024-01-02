const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  basePath: '/bbcode-templater',
  images: {
    unoptimized: true,
  },
};

module.exports = withMDX(nextConfig);
