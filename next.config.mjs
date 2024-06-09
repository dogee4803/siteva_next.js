/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => [
      {
        source: '/',
        destination: '/pages/home',
        permanent: true,
      },
    ],
  };
  
  export default nextConfig;
  