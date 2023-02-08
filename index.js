const express = require('express');
// const pdf = require('html-pdf');
const app = express();
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
const uuid = require('uuid/v4');

var html_to_pdf = require('html-pdf-node');
let options = {
    timeout: 300000,
    format: 'A4',
};
app.use(express.json({ limit: '150mb' }));

app.post('/generate-pdf', (req, res) => {
    let html = req.body.body;
    console.log(html);
    let filename = uuid()+'.pdf';
    console.log(filename);
    let file = { content: html };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
        const filePath = path.resolve(__dirname, 'pdf', filename);
        if (!fs.existsSync('pdf')) {
            fs.mkdirSync('pdf');
        }
        fs.writeFileSync(filePath, pdfBuffer);
        console.log(filePath);
    });
    return res.status(200).json()
});

app.post('/receive', (req, res) => {
    console.log("post");
    console.log(req.body.body);
    return res.status(200).json()
});

var server = app.listen(3000, () => {
    console.log('Server started on port 3000');
});
server.setTimeout(50000000);

// app.set("port", process.env.PORT || 3000);


// const data = {
//     name: 'John Doe',
//     email: 'johndoe@example.com'
// };

// axios.post('https://my-backend.com/api/users', data)
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });