import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Vendor = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    remuneration: {
        type: Number,
    }
}, {
    timestamps: true,
});

Vendor.plugin(mongoosePaginate);

export default mongoose.model('vendors', Vendor);