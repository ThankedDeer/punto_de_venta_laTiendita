const documentDefinition = {
  content: [
    { text: 'Corte de caja', style: 'header', alignment: 'center' },
    { text: 'Abarrotes (La tiendita)', style: 'header', alignment: 'center' },
    { text: 'Carlos Sagredo, La Fundición, 20016 Aguascalientes, Ags', style: 'ubi', alignment: 'center' },
    
    {text: '-----------------'},
    { text: 'Este es el contenido de mi documento PDF.', style: 'body' },
    { text: 'Datos del servicio', style: 'subheader' },
    { text: 'Esperando respuesta del servicio...', style: 'body' }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 0]
    },
    ubi: {
      fontSize: 15,
      bold: false,
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 20, 0, 10]
    },
    body: {
      fontSize: 12,
      margin: [0, 0, 0, 10]
    }
  }
};

const promise1 = axios.get('http://192.168.43.192:3000/api/productos')
  .then((res1) => {
    let data1 = '';
    res1.data.forEach(proveedor => {
      data1 += proveedor.Nom_Producto + '\n';
    });
    documentDefinition.content.push({ text: data1 });
  });

const promise2 = axios.get('http://192.168.43.192:3000/api/categorias')
  .then((res2) => {
    let data2 = '';
    res2.data.forEach(categoria => {
      data2 += categoria.Nom_Categoria + '\n';
    });
    documentDefinition.content.push({ text: data2 });
  });

Promise.all([promise1, promise2])
  .then(() => {
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('reporte.pdf');
  })
  .catch(error => {
    console.error(error);
  });

