module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Return the configuration object
  return {
    // Template formats to process
    templateFormats: ["njk", "md", "html"],

    // Default template engine for Markdown files
    markdownTemplateEngine: "njk",

    // Default template engine for HTML files
    htmlTemplateEngine: "njk",

    // Directory configuration
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
