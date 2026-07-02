import path from "path";
import process from "node:process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isGithubPages = process.env["GITHUB_PAGES"] === "true";
const githubPagesBasePath = "/portfolio-red";

/** @type {import('next').NextConfig} */
const nextConfig = isGithubPages
  ? {
      output: "export",
      basePath: githubPagesBasePath,
      assetPrefix: `${githubPagesBasePath}/`,
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
    }
  : {
      output: "standalone",
      outputFileTracingRoot: path.join(__dirname, "../../"),
    };

export default nextConfig;
