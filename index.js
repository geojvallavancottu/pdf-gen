const express = require('express');
// const pdf = require('html-pdf');
const app = express();
const path = require('path');
const puppeteer = require('puppeteer');


var html_to_pdf = require('html-pdf-node');
let options = { timeout: 300000, 
//     margin: {
//     top:'0.4cm',
//     right:'0.39cm',
//     bottom:'0.49cm',
//     left:'0.4cm'
// }
 };
app.use(express.json({ limit: '150mb' }));

app.post('/pdf', async (req, res) => {
    const browser = await puppeteer.launch({ timeout: 300000 });
    const page = await browser.newPage();
    let html = req.body.body;
    console.log(html);
    await page.setContent(html);
    const buffer = await page.pdf({ format: 'A4' });
    const filePath = path.resolve(__dirname, 'pdfs', 'dynamic.pdf');

    if (!fs.existsSync('pdfs')) {
        fs.mkdirSync('pdfs');
    }

    fs.writeFileSync(filePath, buffer);

    res.send({ filePath });

    await browser.close();
});

app.post('/generate-pdf', (req, res) => {
    let html = req.body.body;
    console.log(html);
    let file = { content: html };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
        let pth = require('fs').writeFileSync('./pdf/example.pdf', pdfBuffer);
        // console.log(pth)
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Length', pdfBuffer.length);
        // return res.send({ pdf: pdfBuffer }).json();
    });
    // html_to_pdf.generatePdf(html).then(pdfBuffer => {
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Length', pdfBuffer.length);
    //     res.send(pdfBuffer);
    // });
    return res.status(200).json()
    // const fileName = 'output.pdf';
    // const filePath = path.join(__dirname, 'pdf', fileName);

    // pdf.create(html).toFile(filePath, (err, result) => {
    //     if (err) return res.send(err);

    //     res.send({ filePath: result.filename });
    // });
});

app.post('/receive', (req, res) => {
    console.log("post");
    console.log(req.body.body);
    // return "HELLO";
    return res.status(200).json()
});

var server = app.listen(3000, () => {
    console.log('Server started on port 3000');
});
server.setTimeout(50000000);

// app.set("port", process.env.PORT || 3000);