// import * as fs from "fs";
const fs = require("fs");
// import { SitemapStream, streamToPromise } from "sitemap";
const { streamToPromise, SitemapStream } = require("sitemap");

const { Readable } = require("stream");

const generateSitemap = async () => {
  const urls = [
    { url: "/", changefreq: "weekly", priority: 0.7 },
    { url: "/all", changefreq: "weekly", priority: 0.7 },

    // Add more URLs as needed
  ];

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: "https://y-company.vercel.app/",
  });

  const sitemap = await streamToPromise(Readable.from(urls).pipe(stream)).then(
    (data) => data.toString()
  );
  fs.writeFileSync("./public/sitemap.xml", sitemap);
};

generateSitemap();
