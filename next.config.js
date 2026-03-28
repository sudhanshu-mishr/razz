/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.myntassets.com" },
      { protocol: "https", hostname: "cdn.pixelbin.io" },
      { protocol: "https", hostname: "rukminim2.flixcart.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images.meesho.com" },
      { protocol: "https", hostname: "www.fabindia.com" },
      { protocol: "https", hostname: "images.ajio.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;
