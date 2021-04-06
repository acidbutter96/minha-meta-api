import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MonthlySale = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    estimated: {
        type: Number,
        required: true
    },
    real_value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    daily_sale: {
        type: Object,
        required: true
    }
}, {
    timestamps: true,
});

MonthlySale.plugin(mongoosePaginate);
export default mongoose.model('monthly_sales', MonthlySale);