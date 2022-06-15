const express = require('express');
const cors = require('cors');
const mailService = require('./mailService');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/ping', async (_, res) => {
    res.send('pong').end().status(200);
});

app.post('/email', async(req, res) => {
    const emailReq = req.body;
    mailService.sendMail(emailReq);
    res.status(201);
    res.end();
});

app.listen(port, () => console.log(`App listening at https://localhost:${port}`));

module.exports.app = app;