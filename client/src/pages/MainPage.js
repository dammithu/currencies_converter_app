import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Autocomplete,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import "./MainPage.css";

function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrency"
        );
        setCurrencyNames(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <Container maxWidth="md">
      <Card elevation={3} className="main-card">
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            <CurrencyExchangeIcon fontSize="large" sx={{ color: '#0288d1', mr: 1 }} />
            Currency Converter
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Easily convert between currencies with real-time exchange rates.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount in Source Currency"
                  type="number"
                  onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={Object.keys(currencyNames)}
                  getOptionLabel={(currency) => `${currency} - ${currencyNames[currency]}`}
                  onChange={(event, newValue) => setSourceCurrency(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Source Currency" variant="outlined" />
                  )}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={Object.keys(currencyNames)}
                  getOptionLabel={(currency) => `${currency} - ${currencyNames[currency]}`}
                  onChange={(event, newValue) => setTargetCurrency(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Target Currency" variant="outlined" />
                  )}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#0288d1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#01579b',
                },
              }}
              size="large"
              fullWidth
            >
              Convert
            </Button>
          </Box>

          {!loading && (
            <Box mt={4} p={3} sx={{ backgroundColor: "#e0f7fa", borderRadius: 2, mt: 3 }}>
              <Typography variant="h6" align="center">
                {amountInSourceCurrency} {currencyNames[sourceCurrency]} equals{" "}
                <strong>{amountInTargetCurrency}</strong> in {currencyNames[targetCurrency]}.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default MainPage;
