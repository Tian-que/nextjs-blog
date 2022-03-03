const withImages = require('next-images')
module.exports = withImages({
  fileExtensions: ["svg"],
  inlineImageLimit: false
})