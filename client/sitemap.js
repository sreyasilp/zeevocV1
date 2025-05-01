const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  // Add more routes here
];

const generateSitemap = async () => {
  const sitemapStream = new SitemapStream({ hostname: 'https://zeevocdigital.com' });

  // Add each link to the sitemap
  links.forEach(link => sitemapStream.write(link));
  sitemapStream.end();

  // Write the sitemap to a file
  const writeStream = createWriteStream(path.resolve('./public/sitemap.xml'));
  streamToPromise(sitemapStream.pipe(writeStream)).then(() => {
    console.log('Sitemap created successfully');
  });
};

generateSitemap();
