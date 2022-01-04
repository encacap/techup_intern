const postcssImport = require("postcss-import");
const tailwindcssNesting = require("tailwindcss/nesting");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");

module.exports = {
    plugins: [postcssImport(), tailwindcssNesting(), tailwindcss(), autoprefixer(), cssnano()],
};
