## Mathematics Formula:
### Inputs:
Purchase: user input for example: 25000
Monthly Rent: 800 (Multiply by 12) = 9600 Gross per year
Annual Fee: 500

#### Year 1 calculation:
1. Commission(30%): 9600 * 0.30 = 2880
2. Net Income: 9600(Gross) - 2880(Comm) - 500(Fee) = 6220
3. Return: (6220 / 25000) * 100 = 24.88%

#### Year 2 calculation:
1. Commission(25%): 9600 * 0.25 = 2400
2. Net Income: 9600(Gross) - 2400(Comm) - 500(Fee) = 6700
3. Return: (6700 / 25000) * 100 = 26.80%

#### Year 3 & so on calculation:
1. Commission(20%): 9600 * 0.20 = 1920
2. Net Income: 9600(Gross) - 1920(Comm) - 500(Fee) = 7180
3. Return: (7180 / 25000) * 100 = 28.72%

### For Avg monthly Net income:
 avg = (annualGross(9600) - commYear1(2880) - annualFee(500)) / 12 = 518.33 

After 3 years then every year is 20% commission

### About Inputs field:
All inputs field are using input type=text but bound by javascript validation so input cannot accept any alphabets neither any (@,#,etc) only numbers from 0-9 & also validation function assure only one decimal is present in whole value.
For larger/medium devices input fields are cover like in 1 row 2 fields but for small device like mobile 1 row have only 1 field for better UX


### Project Architecture:
 * Pattern: MVC (Model, View, Controller).
 * Routes: Centralized in app/routes/index.js
 * Logic: Bussiness logic/calculations (ROI &  CSV) must reside in app/controllers/
 * Data: Models are defined in app/models/ 

