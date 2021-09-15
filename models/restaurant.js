const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-url')

const restaurantSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String,
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    google_map: {
        type: String
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    isCheck: {
        type: Boolean,
        default: false
    },
    userId: {  // 加入關聯設定
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)