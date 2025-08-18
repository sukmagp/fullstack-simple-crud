/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/fullstack-simple-crud", // sesuai nama repo GitHub kamu
  assetPrefix: "/simplycrud/",
};

module.exports = nextConfig;
