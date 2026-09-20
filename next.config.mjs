/** @type {import('next').NextConfig} */
// Static export. Every page ships as HTML to Cloudflare Pages; there is no
// server runtime. The Cloudflare host serves `_headers` and `_redirects`.
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),
  },
};

export default nextConfig;
