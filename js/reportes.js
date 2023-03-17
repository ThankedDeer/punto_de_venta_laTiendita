const PDFDocmuent = require('pdfkit')

const doc = new PDFDocmuent()
doc.pipe(fs.createWriteStream('Reportes.pdf'))

doc.fontSize(25)
    .text('hola pinches pendejos')

doc.end()