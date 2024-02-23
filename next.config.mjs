/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*googleusercontent.com',
            },

            {
                protocol: 'https',
                hostname: 'market-express-sandaga.s3.amazonaws.com',
            }
        ]
    }
};

export default nextConfig;
