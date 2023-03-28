const documentDefinition = {
  content: [
    { text: 'Corte de caja', style: 'header', alignment: 'center' },
    { text: 'Abarrotes (La tiendita)', style: 'header', alignment: 'center' },

    { text: 'Cajero: Administrador de la tienda', style: 'caja' },
    { text: 'Carlos Sagredo, La Fundición, 20016 Aguascalientes, Ags', style: 'caja' },

    {text: '==== VENTAS DEL DÍA ====', style: 'a1', alignment: 'center'},

    { 
      stack: [
        { text: 'Datos de productos:', style: 'subheader' },
        { text: 'producto1', text: '', style: 'body' } // Aquí se agregará el resultado de la API de productos
      ]
    },
    { 
      stack: [
        { text: 'Datos de categorías:', style: 'subheader' },
        { text: '', style: 'body' } // Aquí se agregará el resultado de la API de categorías
      ]
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    caja: {
      fontSize: 13,
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
    documentDefinition.content[5].stack[1].text = data1; // Se agrega el resultado en el segundo objeto 'text' del primer objeto 'stack'
  });

const promise2 = axios.get('http://192.168.43.192:3000/api/categorias')
  .then((res2) => {
    let data2 = '';
    res2.data.forEach(categoria => {
      data2 += categoria.Nom_Categoria + '\n';
    });
    documentDefinition.content[6].stack[1].text = data2; // Se agrega el resultado en el segundo objeto 'text' del segundo objeto 'stack'
  });

Promise.all([promise1, promise2])
  .then(() => {
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('reporte.pdf');
  })
  .catch(error => {
    console.error(error);
  });
