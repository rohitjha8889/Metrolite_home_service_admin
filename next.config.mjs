/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Specify the protocol (http or https)
                hostname: 'metrolite.co.in', // Specify the hostname/domain
            },

            {
                protocol: 'http', // Assuming you're serving images over HTTP
                hostname: 'localhost', // Add localhost
            },
        ],
    },
};

export default nextConfig;
