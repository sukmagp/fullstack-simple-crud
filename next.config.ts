/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/simplycrud", // sesuai nama repo GitHub kamu
  assetPrefix: "/simplycrud/",
};

module.exports = nextConfig;
