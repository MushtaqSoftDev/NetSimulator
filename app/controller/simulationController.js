const Simulation = require('../models/simulationModel');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * 
 * Helper function to calculate avg from our data
 * This will show approximation in admin-panel depend on the user input & our own history data
 */
const getMarketAvg = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        const csvFilePath = path.join(__dirname, '../data/booking_history.csv');

        // Check if file exists to prevent crash
        if (!fs.existsSync(csvFilePath)) {
            return resolve(300); // Fallback to 300 if file is missing
        }

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(parseFloat(data.listing_price)))
            .on('end', () => {
                const total = results.reduce((acc, price) => acc + (price || 0), 0);
                const avg = results.length > 0 ? total / results.length : 300;
                resolve(avg);
            })
            .on('error', (err) => reject(err));
    });
};

exports.saveSimulation = async (req, res) => {
    try {
        const { purchase, monthlyRent, annualFee, email } = req.body;

        // Server side validation of input fields
        const errors = [];
        const p = parseFloat(purchase);
        const m = parseFloat(monthlyRent);
        const f = parseFloat(annualFee);


        if (!p || isNaN(p) || p <= 0) errors.push("Valid Purchas Price is required.");
        if (!m || isNaN(m) || m <= 0) errors.push("Valid Rent Amount is required.");
        if (!f || isNaN(f) || f <= 0) errors.push("Valid Annual Fee is required.");
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push("A valid Email account is required.");

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: errors
            });
        }

        // DATA-DRIVE PREDICTION
        // WE get the avg from CSV file
        const marketAverageListing = await getMarketAvg();
        console.log("Market Avg Listing Price from CSV:", marketAverageListing);
        let predictionMsg = "";

        // compare user input monthlyRent with market average
        if (m <= marketAverageListing * 1.1) {
            predictionMsg = "High Probability: Matches historical data.";
        } else if (m <= marketAverageListing * 1.5) {
            predictionMsg = "Moderate Probability: Slightly above average.";
        } else {
            predictionMsg = "Low Probability: Rent is significantly higher then market history.";
        }

        // 2. Perform calculations
        const annualGross = m * 12;
        const net1 = annualGross - (annualGross * 0.30) - f;
        const net2 = annualGross - (annualGross * 0.25) - f;
        const net3 = annualGross - (annualGross * 0.20) - f;

        const roi1 = ((net1 / p) * 100).toFixed(2);
        const roi2 = ((net2 / p) * 100).toFixed(2);
        const roi3 = ((net3 / p) * 100).toFixed(2);
        const avgMonthly = (net1 / 12).toFixed(2);

        // 3. Save to DB
        const newSim = new Simulation({
            purchase: p,
            monthlyRent: m,
            annualFee: f,
            email: email,
            resY1: roi1,
            resY2: roi2,
            resY3: roi3,
            resMonthly: avgMonthly,
            predictionScore: predictionMsg
        });

        await newSim.save();
        console.log("Simulation saved:", newSim);

        // Return sucess
        res.status(200).json({ message: 'Simulation saved successfully.', prediction: predictionMsg });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error/Data not saved'});
    }
};


exports.listSimulations = async (req, res) => {
    try {
        const simulations = await Simulation.find().sort({ createdAt: -1 });
        res.render('admin', { title: 'Admin Dashboard', simulations});
    } catch (err) {
        console.error('Fetch error:',err);
        res.status(500).send("Error fetching simulations");
    }
};
    