/**
 * Emerald Simulator - ROI Calculation Logic
 */

function calculateResults() {
    // 1. Get input values (fallback to 0 if empty/NaN)
    const purchase = parseFloat(document.getElementById('purchase').value) || 0;
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value) || 0;
    const annualFee = parseFloat(document.getElementById('annualFee').value) || 0;
    const email = document.getElementById('email').value;

    // 2. UI Validation
    if (purchase <= 0 || monthlyRent <= 0 || annualFee < 0) {
        alert("Please enter a valid amount");
        return;
    }

    if (!email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }

    // 3. Financial Logic
    const annualGross = monthlyRent * 12;
    
    // Commission Schedule (Costs)
    const commissions = {
        y1: annualGross * 0.30,
        y2: annualGross * 0.25,
        y3: annualGross * 0.20
    };

    // Net Incomes (Gross - Fees - Commission)
    const netY1 = annualGross - annualFee - commissions.y1;
    const netY2 = annualGross - annualFee - commissions.y2;
    const netY3 = annualGross - annualFee - commissions.y3;

    // Calculate ROI Percentages
    const calculateROI = (net) => ((net / purchase) * 100).toFixed(2);

    // 4. Update UI
    document.getElementById('resY1').innerText = `${calculateROI(netY1)}%`;
    document.getElementById('resY2').innerText = `${calculateROI(netY2)}%`;
    document.getElementById('resY3').innerText = `${calculateROI(netY3)}%`;
    
    // Monthly average (using Year 1 as baseline)
    const monthlyNet = (netY1 / 12).toFixed(2);
    document.getElementById('resMonthly').innerText = `$${monthlyNet}`;
    
    // Reveal the results box
    const resultsBox = document.getElementById('resultsBox');
    resultsBox.classList.remove('d-none');
    
    // Smooth scroll to results on mobile
    resultsBox.scrollIntoView({ behavior: 'smooth' });
}