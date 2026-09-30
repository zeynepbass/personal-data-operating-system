const legacyApiUrl = process.env.LEGACY_API_URL ?? "http://localhost:6021";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async rewrites() {
    return [
      { source: "/api/legacy/:path*", destination: `${legacyApiUrl}/api/:path*` },
      { source: "/uploads/:path*", destination: `${legacyApiUrl}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
