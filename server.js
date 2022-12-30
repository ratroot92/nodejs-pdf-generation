const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const util = require('util')
const pdfCreatorNode = require('pdf-creator-node')
const puppeteer = require('puppeteer')
const axios = require('axios')





const PORT = 4011
const HOST = '0.0.0.0'
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)








var pdfData = {
    'Dados Basicos': {
        'Nome do Poco': '4xx 001 xx',
        'Area emissora': 'Construction',
        'Area Destination': 'Operations',
        'Ultima Atualizacao': '10/08/2022 15:03',
        'Atualizado Por': 'login_user',
        'Nome poco ANP': '4-xx-1-x',
        'Codigo do poco ANP': '45454545454',
        'Campo': 'CANAMBRAVA',
        'Intevention': 'WORKOVER(10 / 04 / 2020)',
        'Intalaco': 'Est.Canamrava',
        'Apresenta': 'Surgineaca',
        'Number of CSBs': '2',
        'Cetegoria de poco': 'Poco de Explorstion',
        'Locolization do poco': 'Areas com menor impacto ambiental/ pessoas > 200m(3)',
        'Vazao': '500 bfdp(1)',
        'Fluido produzido': 'Injector em zona de agua(1)',
        'Criticidedo': 'Muito Baxia',
        'Monitoramento': 'Supervisor',
        'Intervalo de Inspecao': 'A cada 6 meses',
        'Elemento CSB Compartihado': 'Nao',
        'DHSV': 'Nao',
        'Metodo de Producao': 'N/A',
        'Classificao Atual': '',
        'Vida Util Prevista(anos)': '',
        'Vida Util Remanescente(anos)': '',

    }
    ,
    'CSB': {
        'Nome do Poco': '4xx 001 xx',
        'Area emissora': 'Construction',
        'Area Destination': 'Operations',
        'Ultima Atualizacao': '10/08/2022 15:03',
        'Atualizado Por': 'login_user',
        'Nome poco ANP': '4-xx-1-x',
        'Codigo do poco ANP': '45454545454',
        'Campo': 'CANAMBRAVA',
        'Intevention': 'WORKOVER(10 / 04 / 2020)',
        'Intalaco': 'Est.Canamrava',
        'Apresenta': 'Surgineaca',
        'Number of CSBs': '2',
        'Cetegoria de poco': 'Poco de Explorstion',
        'Locolization do poco': 'Areas com menor impacto ambiental/ pessoas > 200m(3)',
        'Vazao': '500 bfdp(1)',
        'Fluido produzido': 'Injector em zona de agua(1)',
        'Criticidedo': 'Muito Baxia',
        'Monitoramento': 'Supervisor',
        'Intervalo de Inspecao': 'A cada 6 meses',
        'Elemento CSB Compartihado': 'Nao',
        'DHSV': 'Nao',
        'Metodo de Producao': 'N/A',
        'Classificao Atual': '',
        'Vida Util Prevista(anos)': '',
        'Vida Util Remanescente(anos)': '',

    },

    'ABC': {
        'Nome do Poco': '4xx 001 xx',
        'Area emissora': 'Construction',
        'Area Destination': 'Operations',
        'Ultima Atualizacao': '10/08/2022 15:03',
        'Atualizado Por': 'login_user',
        'Nome poco ANP': '4-xx-1-x',
        'Codigo do poco ANP': '45454545454',
        'Campo': 'CANAMBRAVA',
        'Intevention': 'WORKOVER(10 / 04 / 2020)',
        'Intalaco': 'Est.Canamrava',
        'Apresenta': 'Surgineaca',
        'Number of CSBs': '2',
        'Cetegoria de poco': 'Poco de Explorstion',
        'Locolization do poco': 'Areas com menor impacto ambiental/ pessoas > 200m(3)',
        'Vazao': '500 bfdp(1)',
        'Fluido produzido': 'Injector em zona de agua(1)',
        'Criticidedo': 'Muito Baxia',
        'Monitoramento': 'Supervisor',
        'Intervalo de Inspecao': 'A cada 6 meses',
        'Elemento CSB Compartihado': 'Nao',
        'DHSV': 'Nao',
        'Metodo de Producao': 'N/A',
        'Classificao Atual': '',
        'Vida Util Prevista(anos)': '',
        'Vida Util Remanescente(anos)': '',

    },
    'ABC': {
        'Nome do Poco': '4xx 001 xx',
        'Area emissora': 'Construction',
        'Area Destination': 'Operations',
        'Ultima Atualizacao': '10/08/2022 15:03',
        'Atualizado Por': 'login_user',
        'Nome poco ANP': '4-xx-1-x',
        'Codigo do poco ANP': '45454545454',
        'Campo': 'CANAMBRAVA',
        'Intevention': 'WORKOVER(10 / 04 / 2020)',
        'Intalaco': 'Est.Canamrava',
        'Apresenta': 'Surgineaca',
        'Number of CSBs': '2',
        'Cetegoria de poco': 'Poco de Explorstion',
        'Locolization do poco': 'Areas com menor impacto ambiental/ pessoas > 200m(3)',
        'Vazao': '500 bfdp(1)',
        'Fluido produzido': 'Injector em zona de agua(1)',
        'Criticidedo': 'Muito Baxia',
        'Monitoramento': 'Supervisor',
        'Intervalo de Inspecao': 'A cada 6 meses',
        'Elemento CSB Compartihado': 'Nao',
        'DHSV': 'Nao',
        'Metodo de Producao': 'N/A',
        'Classificao Atual': '',
        'Vida Util Prevista(anos)': '',
        'Vida Util Remanescente(anos)': '',

    }
}






const app = express()
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use((req, res, next) => {
    console.log(`${req.method}:${req.originalUrl}`)
    return next()
})
app.use(cors())
app.set('views', __dirname + '/templates');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
const router = express.Router()


/**  
 * http://3.82.250.75:4011/pdf/preview
 */
router.get(`/preview`, (req, res, next) => {
    return res.render('pdf.html')
})

router.get(`/html`, (req, res, next) => {
    return res.render('pdf2.html')
})

/**  
 * http://3.82.250.75:4011/pdf/canvas
 */
router.get(`/canvas`, (req, res, next) => {
    return res.render('index.html')
})


/**
 * Response in browser from this url 
 * blob:http://3.82.250.75:4011/ec69522f-3614-4377-b413-1e8b8545ce83
* Pdf generation using jsPDF 
    sir demo ready ha 
    what we achieved is 
    1-browser captures a canvas 
    2-converts canvas into base64 string 
    3-send a POST request to the backend with payload as canvas converted string 
    4-backend created a pdf & inserts the canvas into the pdf and 
    5-returns a blob to frontend 
    6-the frontend receives a downloaded pdf with canvas in it 

*/
router.post(`/canvas`, async (req, res, next) => {
    try {

        let filename = 'sample.pdf'
        const filePath = '/var/www/test/node/public/sample.pdf'
        var canvas = req.body.canvas
        var doc = new jsPDF({
            orientation: "potrait",
            // unit: "in",
            // format: [4, 2]
        })
        let subSectionKeyHeight = 6

        var pageHeight = doc.internal.pageSize.height;
        var height = 20;
        var xMargin = 40
        doc.setProperties({
            title: 'Title',
            subject: 'This is the subject',
            author: 'James Hall',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'MEEE'
        });
        doc.addImage(canvas, 'JPEG', 150, 20, 100, 100)

        height += 25

        /** Title Start  */
        doc.setFontSize(20).text(xMargin, height, 'welhandover-document 1234-revision 5')
        xMargin = 50
        height += 10
        doc.setFontSize(20).text(xMargin, height, 'From Construntion to Operation')
        /** Title End  */


        /** Dados Basicos  Start  */


        height += 20
        xMargin = 20
        Object.keys(pdfData).forEach((key, index) => {
            xMargin = 20
            doc.setFontSize(20)
            if ((height + 20) > pageHeight) {
                doc.insertPage();
                height = 10
                doc.text(xMargin, height, `${key}`).setLineWidth(0.5).line(xMargin, (height + 5), 150, (height + 5));
                height += 20
            }
            else {
                doc.text(xMargin, height, `${key}`).setLineWidth(0.5).line(xMargin, (height + 5), 150, (height + 5));
                height += 20
            }
            if (Object.keys(pdfData[key]).length) {
                Object.keys(pdfData[key]).forEach((innerKey, innerIndex) => {
                    xMargin = 25
                    if (height === 0) {
                        height = 4
                    }
                    else {
                        height += subSectionKeyHeight
                    }

                    if ((height + subSectionKeyHeight) > pageHeight) {
                        // doc.setFontSize(10).text(xMargin, height, `${innerKey} : ${pdfData[key][innerKey]}`).insertPage();
                        doc.setFontSize(10).setFont(undefined, 'bold').text(xMargin, height, `${innerKey}`)
                        doc.setFontSize(10).setFont(undefined, 'normal').text(xMargin + 50, height, `${pdfData[key][innerKey]}`).insertPage();
                        height = 0

                    }
                    else {
                        // doctext(xMargin, height, `${innerKey} : ${pdfData[key][innerKey]}`)
                        doc.setFontSize(10).setFont(undefined, 'normal').text(xMargin, height, `${innerKey}`)
                        doc.setFontSize(10).setFont(undefined, 'bold').text(xMargin + 50, height, `${pdfData[key][innerKey]}`);
                    }
                    if (innerIndex === (Object.keys(pdfData[key]).length - 1)) {
                        height += 20

                    }


                })
            }




        })
        height += 20
        if ((height + 20) > pageHeight) {
            doc.insertPage();
            height = 10
        }
        doc.addImage(canvas, 'JPEG', xMargin, height, 500, 500)
        doc.save(`./public/${filename}`)
        const file = fs.createReadStream(filePath);
        const stat = fs.statSync(filePath);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        file.pipe(res);
    }
    catch (err) {
        console.log(err.stack)
        return res.status(500).json({ message: err.message })
    }
})

/**
 * Pdf generation using puppeteer
 */
router.get(`/canvas/html`, async (req, res, next) => {
    try {
        const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser' })
        const page = await browser.newPage();
        await page.goto('http://3.82.250.75:4011/pdf/html', { waitUntil: 'networkidle0' });
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
        res.send(pdf)
    }
    catch (err) {
        console.log(err.stack)
        return res.status(500).json({ message: err.message })
    }
})

/**  
 * POST http://3.82.250.75:4011/pdf/set-preview
 */
router.post(`/set-preview`, async (req, res, next) => {
    const html = req.body.html
    const path = `${process.cwd() + '/templates/pdf.html'}`;
    const write = await writeFileAsync(path, html)
    return res.json({ message: "template created successfully at /templates/pdf.html", data: { html, write } })
})


/**
 * GET http://3.82.250.75:4011/pdf/create/?name=ahmed&headerContent='<div class="text-center"><h5>welhandover-document 1234-revision 5</h5><p>From Construntion to Operation</p></div>'
 * 
 */

router.get('/create', async (req, res, next) => {
    try {

        const name = req.query.name;
        if (!name) {
            return res.status(400).json({ message: 'name is required.', data: {} })
        }
        else {
            const pdfName = `${name}.pdf`;
            const pdfTemplatePath = path.join(__dirname, './templates/pdf.html')
            const pdfOptions = {
                format: 'A4',
                base: 'file://' + process.cwd() + '/public',
                orientation: 'potrait',
                border: "3mm",
                header: {
                    // height: "30mm",
                    contents: `
                    <div id="pageHeader">
                     <img style="display:none" src="data:image/png;base64,${logo}" height="40" width="150" />
                        <div class="headerWrapper">
                            <div class="logoWrapper">
                                <img src="data:image/png;base64,${logo}" height="40" width="150"/></div>
                            </div>
                            <div class="headingWrapper">
                            <p style='font-size:16px;text-transform:uppercase;'>welhandover-document 1234-revision 5</p> 
                            <p style='font-size:16px;'>From Construntion to Operation</p> 
                        </div>       
                </div>
    
                   `,
                },
                footer: {
                    height: "5mm",
                    contents: {
                        default:
                            '<div id="pageFooter" style="margin-left:300; font-size: 12px;">{{page}}/{{pages}}</div>'
                    }
                }
            }
            const bitmap = await readFileAsync(__dirname + '/public/assets/images/image.jpg');
            const logo = bitmap.toString('base64');
            const document = {
                html: await readFileAsync(pdfTemplatePath, 'utf-8'),
                data: {
                    // name,
                    // logo: logo,
                    // wellImageAddress: "https://www.researchgate.net/publication/295682028/figure/fig2/AS:614129198968860@1523431219687/Schematics-of-an-oil-well-drilling-Courtesy-of-Statoil.png"
                },
                // path: pdfPath,
                type: "stream",
            }
            pdfCreatorNode.create(document, pdfOptions).then((stream => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${pdfName}`);
                stream.pipe(res);
            })).catch(err => {
                throw new Error(err.message)
            })

        }


    }
    catch (err) {
        return res.status(500).json({ message: err.message, data: {}, })
    }
})



/**  
 * GET http://3.82.250.75:4011/create/download
 */
router.get('/create/download', async (req, res, next) => {
    try {
        const pdfName = `sample.pdf`;
        // const bitmap = await readFileAsync(__dirname + '/public/assets/images/image.jpg');
        // const logo = bitmap.toString('base64');
        let image = await axios.get('https://www.google.com/images/srpr/logo11w.png', { responseType: 'arraybuffer' });
        let logo = Buffer.from(image.data).toString('base64');
        const pdfTemplatePath = path.join(__dirname, './templates/pdf.html')
        const pdfOptions = {
            format: 'A4',
            base: 'file://' + process.cwd() + '/public',
            orientation: 'potrait',
            border: "3mm",
            header: {
                // height: "30mm",
                contents: `
                <div id="pageHeader">
                 <img style="display:none" src="data:image/png;base64,${logo}" height="40" width="150" />
                    <div class="headerWrapper">
                        <div class="logoWrapper">
                            <img src="data:image/png;base64,${logo}" height="40" width="150"/></div>
                        </div>
                        <div class="headingWrapper">
                        <p style='font-size:16px;text-transform:uppercase;'>welhandover-document 1234-revision 5</p> 
                        <p style='font-size:16px;'>From Construntion to Operation</p> 
                    </div>       
            </div>

               `,
            },
            footer: {
                height: "5mm",
                contents: {
                    default:
                        '<div id="pageFooter" style="margin-left:300; font-size: 12px;">{{page}}/{{pages}}</div>'
                }
            }
        }

        const document = {
            html: await readFileAsync(pdfTemplatePath, 'utf-8'),
            data: {
                logo: logo
            },
            // path: pdfPath,
            type: "stream",
        }
        pdfCreatorNode.create(document, pdfOptions).then((stream => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${pdfName}`);
            stream.pipe(res);
        })).catch(err => {
            throw new Error(err.message)
        })

    }


    catch (err) {
        return res.status(500).json({ message: err.message, data: {}, })
    }



})


/**
 * POST http://3.82.250.75:4011/pdf/create
 * 
 */
router.post('/create', async (req, res, next) => {
    try {

        const name = req.body.name;
        const headerContent = req.query.headerContent;
        if (!name) {
            return res.status(400).json({ message: 'name is required.', data: {} })
        }
        else {
            const pdfName = `${name}.pdf`;
            // const pdfPath = path.join(__dirname, `./public/${pdfName}`)
            const pdfTemplatePath = path.join(__dirname, './templates/pdf.html')
            const pdfOptions = {
                format: 'A4',
                orientation: 'potrait',
                border: "0mm",
                header: {
                    height: "45mm",
                    // contents: '<div class="text-center"><h5>welhandover-document 1234-revision 5</h5><p>From Construntion to Operation</p></div>'
                    contents: headerContent,
                },
                footer: {
                    height: "0mm",
                    contents: {
                        // first: 'Cover page',
                        // 2: 'Second page', // Any page number is working. 1-based index
                        // default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                        // last: 'Last Page'
                    }
                }
            }
            const bitmap = await readFileAsync(__dirname + '/public/assets/images/image.jpg');
            const logo = bitmap.toString('base64');
            const document = {
                html: await readFileAsync(pdfTemplatePath, 'utf-8'),
                data: {

                    name,
                    logo: logo,
                    wellImageAddress: "https://www.researchgate.net/publication/295682028/figure/fig2/AS:614129198968860@1523431219687/Schematics-of-an-oil-well-drilling-Courtesy-of-Statoil.png"
                },
                // path: pdfPath,
                type: "stream",
            }
            pdfCreatorNode.create(document, pdfOptions).then((stream => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
                stream.pipe(res);
            })).catch(err => {
                throw new Error(err.message)
            })

        }


    }
    catch (err) {
        return res.status(500).json({ message: err.message, data: {}, })
    }
})

app.use('/pdf', router)

app.listen(PORT, HOST, () => {
    console.log("============================")
    console.log(`Server listening at ${HOST}:${PORT}`)
    console.log("============================")

})



