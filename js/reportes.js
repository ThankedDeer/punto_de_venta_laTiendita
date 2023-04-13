const tablaVentas = document.getElementById("tablaVentas")
const fragment = document.createDocumentFragment()
const templateVentas = document.getElementById("templateVentass").content
const tablaOperacion = document.getElementById("tablaOperacion")
const fragment1 = document.createDocumentFragment()
const templateOperacion = document.getElementById("templateOperacion").content
const tablaStock = document.getElementById("tablaStock")
const fragment2 = document.createDocumentFragment()
const templateStock = document.getElementById("templateStock").content
const tablaMas = document.getElementById("tablaMas")
const fragment3 = document.createDocumentFragment()
const templateMas = document.getElementById("templateMas").content
const tablaMenos = document.getElementById("tablaMenos")
const fragment4 = document.createDocumentFragment()
const templateMenos = document.getElementById("templateMenos").content

window.addEventListener('load', function (){
  ventas()
  dias()
  operacion()
  stock()
  productomas()
  productomenos()
})

const ventas = () => {
  axios.get('http://localhost:3000/api/reporte')
  .then(response => {
    console.log(response.data)
    todasVentas = response.data
    mostrarVentas(todasVentas)
})
  .catch(error => {
    console.error(error);
  })
}
const mostrarVentas = (todasVentas) => {
  Object.values(todasVentas).forEach((venta) => {
    templateVentas.querySelector("th").textContent = venta.Nom_Categoria
    templateVentas.querySelectorAll('td')[0].textContent = "$" + venta.Ventas_Dia
    const clone  = templateVentas.cloneNode(true);
    fragment.appendChild(clone);
  })
  tablaVentas.appendChild(fragment);
}

const dias = () => {
  axios.get('http://localhost:3000/api/dias')
  .then(response => {
    console.log(response.data)
    document.getElementById('numVentas').textContent=response.data[0].Ventas
  })
  .catch(error => {
    console.log(error)
  })
}

const operacion = () => {
  axios.get('http://localhost:3000/api/operacion')
  .then(response => {
    console.log(response.data)
    ope = response.data
    mostrarOperacion(ope)
  })
  .catch(error => {
    console.error(error);
  })
}

const mostrarOperacion = (ope) => {
  Object.values(ope).forEach((op) => {
    templateOperacion.querySelector("th").textContent = op.Tipo_Operación
    templateOperacion.querySelectorAll('td')[0].textContent = "$" + op.Cantidad
    const clone = templateOperacion.cloneNode(true)
    fragment1.appendChild(clone)
  })
  tablaOperacion.appendChild(fragment1)
}

const stock = () => {
  axios.get('http://localhost:3000/api/stock')
  .then(response => {
    console.log(response.data)
    sto = response.data
    mostrarStock(sto)
  })
}

const mostrarStock = (sto) => {
  Object.values(sto).forEach((sto) => {
    templateStock.querySelector("th").textContent = sto.Codigo
    templateStock.querySelectorAll('td')[0].textContent = sto.Nom_Producto
    templateStock.querySelectorAll('td')[1].textContent = sto.Stock
    const clone = templateStock.cloneNode(true)
    fragment2.appendChild(clone)
  })
  tablaStock.appendChild(fragment2)
}

const productomas = () => {
  axios.get('http://localhost:3000/api/masvendido')
  .then(response => {
    console.log(response.data)
    mas = response.data
    mostrarMas(mas)
  })
}

const mostrarMas = () => {
  Object.values(mas).forEach((mas) => {
    templateMas.querySelector("th").textContent = mas.Nom_Producto
    templateMas.querySelectorAll('td')[0].textContent = mas.TotalVentas
    const clone = templateMas.cloneNode(true)
    fragment3.appendChild(clone)
  })
  tablaMas.appendChild(fragment3)
}

const productomenos = () => {
  axios.get('http://localhost:3000/api/menvendido')
  .then(response => {
    console.log(response.data)
    menos = response.data
    mostrarMenos(menos)
  })
}

const mostrarMenos = () => {
  Object.values(menos).forEach((menos) => {
    templateMenos.querySelector("th").textContent = menos.Nom_Producto
    templateMenos.querySelectorAll('td')[0].textContent = menos.TotalVentas
    const clone = templateMenos.cloneNode(true)
    fragment4.appendChild(clone)
  })
  tablaMenos.appendChild(fragment4)
}

function generarPDF() {
  // Obtiene el contenido HTML
  var contenido = document.getElementById('contenido');

  // Convierte el contenido HTML en un archivo PDF
  html2pdf()
    .set({
      margin: 1,
      padding: 1,
      filename: 'reporte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
    })
    .from(contenido)
    .save();
}