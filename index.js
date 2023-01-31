const express = require('express');
const pdf = require('html-pdf');
const app = express();
const path = require('path');

app.use(express.json());


app.post('/generate-pdf', (req, res) => {
    const html = req.body.body;

    const fileName = 'output.pdf';
    const filePath = path.join(__dirname, 'pdf', fileName);

    pdf.create(html).toFile(filePath, (err, result) => {
        if (err) return res.send(err);

        res.send({ filePath: result.filename });
    });
});

app.post('/receive', (req, res) => {
    console.log("post");
    console.log(req.body.body);
    // return "HELLO";
    return res.status(200).json()
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// app.set("port", process.env.PORT || 3000);