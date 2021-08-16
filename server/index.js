const cors = require('cors');
const express = require('express');
const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

let contracts = [];

app.get('/contracts', (req, res) => {
    res.send(contracts);
});
  
app.post('/send/:arbiter/:beneficiary/:value', (req, response) => {
    const {arbiter, beneficiary, value} = req.params;
    const contract = {arbiter, beneficiary, value};
    console.log(contract);
    contracts.push(contract);
    response.send('success');
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}!`); 
});