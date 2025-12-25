const Simulation = require('../models/simulationModel');

exports.saveSimulation = async (req, res) => {
    try {
        const { purchase, monthlyRent, annualFee, email } = req.body;

        // Server side validation of input fields
        const p = parseFloat(purchase);
        const m = parseFloat(monthlyRent);
        const f = parseFloat(annualFee);

        if (!p || !m || !f || !email) {
            return res.status(400).json({ message: 'Field are necessary' });
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
            resMonthly: avgMonthly
        });

        await newSim.save();

        // Return sucess
        res.status(200).json({ message: 'Simulation saved successfully.' });
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
    