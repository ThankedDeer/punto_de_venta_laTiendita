var productos = {
    id_producto: 1,
    nombre: "coca-cola",
    precio: 13,
    cantidad:1
}




const items = document.getElementById('items')
const fragment = document.createDocumentFragment()
const templateCarrito = document.getElementById("templateLista").content

const lalo = () => {


  templateCarrito.querySelector('th').textContent = 10
  templateCarrito.querySelectorAll('td')[0].textContent = "cocacola";
  templateCarrito.querySelectorAll('td')[1].textContent = 1
  templateCarrito.querySelector('span').textContent = 10
  
  //botones
  templateCarrito.querySelector('.btn-info').dataset.id = 1
  templateCarrito.querySelector('.btn-danger').dataset.id =1

  const clone = templateCarrito.cloneNode(true)
  fragment.appendChild(clone)

  items.appendChild(fragment)
}




  

  

