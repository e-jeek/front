import { createRequire } from "module";
const require = createRequire(import.meta.url);

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: false,
  images: {
    domains: ["as1.ftcdn.net"], //FIXME:데모 이미지사이트 제거->백엔드 주소 추가
  },
});

export default nextConfig;
