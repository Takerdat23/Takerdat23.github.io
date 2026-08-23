import { access, copyFile, cp, mkdir } from "node:fs/promises";

const outputDirectory = new URL("../dist/client/", import.meta.url);
const routes = ["fun", "privacy"];

await Promise.all(
  routes.map(async (route) => {
    const routeDirectory = new URL(`${route}/`, outputDirectory);
    await mkdir(routeDirectory, { recursive: true });
    await copyFile(
      new URL(`${route}.html`, outputDirectory),
      new URL("index.html", routeDirectory),
    );
  }),
);

const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
  .replace(/^\//, "")
  .replace(/\/$/, "");

if (configuredBasePath) {
  const prefixedAssets = new URL(
    `${configuredBasePath}/_next/`,
    outputDirectory,
  );
  const deployedAssets = new URL("_next/", outputDirectory);

  try {
    await access(prefixedAssets);
    await cp(prefixedAssets, deployedAssets, { recursive: true });
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    await access(deployedAssets);
  }
}
