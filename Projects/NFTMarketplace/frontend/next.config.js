/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
    output: "export",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ipfs.io",
                port: "",
            },
        ],
    },
};

module.exports = withPlugins([[withImages]], nextConfig);
