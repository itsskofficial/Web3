/** @type {import('next').NextConfig} */

import withPlugins from "next-compose-plugins";
import withImages from "next-images";

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
