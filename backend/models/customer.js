const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    contact: {
        type: String,
        trim: true,
        required: true,
    },
    company: {
        type: Object,
        url: String,
        public_id: String
    },
}, { timestamps: true });

customerSchema.index({ name: "text" })

module.exports = mongoose.model("Customer", customerSchema)