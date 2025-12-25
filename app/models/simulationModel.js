const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
    purchase: { type: Number, required: true },
    monthlyRent: { type: Number, required: true },
    annualFee: { type: Number, required: true },
    email: { type: String, required: true },

    // We have to store results too 
    resY1: Number,
    resY2: Number,
    resY3: Number,
    resMonthly: Number,
    predictionScore: { type: String, default: "No Prediction Available" },
    createdAt: { type: Date, default: Date.now }
}); 

module.exports = mongoose.model('Simulation', simulationSchema);