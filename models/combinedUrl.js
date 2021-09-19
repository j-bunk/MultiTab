const mongoose = require('mongoose')
const shortId = require('shortid')

const combinedUrlSchema = new mongoose.Schema({
  full: {
    type: [String],
    required: true
  },
  combined: {
    type: String,
    required: true,
    default: shortId.generate
  },
})

module.exports = mongoose.model('CombinedUrl', combinedUrlSchema)