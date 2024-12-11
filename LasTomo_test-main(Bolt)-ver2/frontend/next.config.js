/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 厳密モードを有効化（任意）
  eslint: {
    ignoreDuringBuilds: true, // ビルド中にESLintエラーを無視
  },
  images: {
    domains: ["localhost"], // 必要に応じて許可する画像ドメインを追加
    unoptimized: true, // 静的エクスポート時に画像最適化を無効化（オプション）
  },
};

module.exports = nextConfig;

