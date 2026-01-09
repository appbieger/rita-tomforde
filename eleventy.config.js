module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  // Return the configuration object
  return {
    // Template formats to process
    templateFormats: ["njk", "md", "html"],

    // Default template engine for Markdown files
    markdownTemplateEngine: "njk",

    // Default template engine for HTML files
    htmlTemplateEngine: "njk",

    // Path prefix for GitHub Pages deployment
    // This ensures all URLs work correctly when deployed to https://[username].github.io/rita-tomforde/
    pathPrefix: "/rita-tomforde/",

    // Directory configuration
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
