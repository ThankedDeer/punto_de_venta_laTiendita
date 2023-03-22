const tablaProductos = document.getElementById("tablaProductos");
const fragment = document.createDocumentFragment();
const templateProductos = document.getElementById("templateProductos").content

window.addEventListener("load", function () {
  productos();
});



const productos = () => {
  axios
    .get("https://backtiendita-production-9419.up.railway.app/api/productos")
    .then((response) => {
      console.log(response.data);
      let lista = response.data
      mostrarProductos(lista)
    })
    .catch((error) =>{
      log.error(error);
    })

};



const mostrarProductos = (lista) =>{
  Object.values(lista).forEach((producto) => {
    templateProductos.querySelector("th").textContent = producto.Codigo
    templateProductos.querySelectorAll('td')[0].textContent = producto.Nom_Producto
    templateProductos.querySelectorAll('td')[1].textContent = producto.Precio_Compra
    templateProductos.querySelectorAll('td')[2].textContent = producto.Precio_Venta
    templateProductos.querySelectorAll('td')[3].textContent = producto.Stock
    templateProductos.querySelectorAll('td')[4].textContent = producto.idCategoria
    templateProductos.querySelectorAll('td')[5].textContent = producto.idProveedor
    const clone  = templateProductos.cloneNode(true);
    fragment.appendChild(clone);
  })
  tablaProductos.appendChild(fragment);

}


const selectCategoria = () => {
  document.getElementById('selectCategoria').innerHTML = "";
  axios.get('http://backtiendita-production-9419.up.railway.app/api/categorias')
  .then((response)=>{
    response.data.forEach((categoria)=>{
        opt= document.createElement('option');
        opt.value=categoria.idCategoria;
        opt.innerHTML=categoria.Nom_Categoria;
        document.getElementById('selectCategoria').appendChild(opt);
    });
})
.catch((error)=>{
    console.log(error);
})}

const selectProveedor = () => {
  document.getElementById('selectProveedor').innerHTML="";
  axios.get('')
}


