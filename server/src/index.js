const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//acc currency
app.get("/getAllCurrency", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?app_id=8494dd345c1b454a837253c9c95cf387";

  try {
    const nameResponce = await axios.get(nameURL);
    const nameData = nameResponce.data;

    return res.json(nameData);
  } catch (err) {
    console.log(err);
  }
});

//get target amount
app.get("/convert", async (req, res) => {
  // Note the order of req and res
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=8494dd345c1b454a837253c9c95cf387`;
    const dataResponce = await axios.get(dataUrl);
    const rates = dataResponce.data.rates;

    //rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    //final value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.log(err);
  }
});

// Listen to a port
app.listen(5000, () => {
  console.log("server started");
});
