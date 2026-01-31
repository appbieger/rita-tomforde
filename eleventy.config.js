const Image = require('@11ty/eleventy-img');

// Image shortcode for responsive image generation
async function imageShortcode(
  src,
  alt,
  widths = [300, 600, 900],
  sizes = '(min-width: 400px) 33.3vw, 100vw'
) {
  // Validate alt text for accessibility
  if (!alt) {
    throw new Error(`Missing alt text for image: ${src}`);
  }

  let metadata = await Image(src, {
    widths: widths,
    formats: ['webp', 'jpeg'],
    outputDir: './_site/img/',
    urlPath: '/img/',
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  });
}

module.exports = function (eleventyConfig) {
  // Register image shortcode for responsive images
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  // Passthrough copy for static assets
  // CSS directory includes all modules subdirectories (e.g., css/modules/*.css)
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/js');

  // Favicon files
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/favicon-32x32.png');
  eleventyConfig.addPassthroughCopy('src/favicon-16x16.png');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');

  // Return the configuration object
  return {
    // Template formats to process
    templateFormats: ['njk', 'md', 'html'],

    // Default template engine for Markdown files
    markdownTemplateEngine: 'njk',

    // Default template engine for HTML files
    htmlTemplateEngine: 'njk',

    // Path prefix for GitHub Pages deployment
    // This ensures all URLs work correctly when deployed to https://[username].github.io/rita-tomforde/
    pathPrefix: '/rita-tomforde/',

    // Directory configuration
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
  };
};
