const items = document.getElementById('items')
const templateCard = document.getElementById('template-card')
const fragment = document.createDocumentFragment()

const fetchData = async () => {
    axios.get('https://backtiendita-production.up.railway.app/api/vendedores')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}

const pintarCards = () => {
    data.forEach(vendedores => {
        templateCard.querySelector('h1').textContent = vendedores.nombre

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });

    items.appendChild(fragment)
}
//Mostrar alerta--------------------------------------------------------------------------

var textoInput = document.getElementById("recipient-name").value;
var textoInput2 = document.getElementById("recipient-name2").value;

function mostrarAlerta() {
  if (textoInput.trim() && textoInput2.trim() !== "") {
    console.log("El input tiene un valor");
  } else {
    console.log("El input no tiene un valor");
  }
}