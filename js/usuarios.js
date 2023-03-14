const items = document.getElementById('items');
const templateCard = document.getElementById('template-card');
const fragment = document.createDocumentFragment();
const axios = require('axios');

  axios.get('https://backtiendita-production.up.railway.app/api/vendedores')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });


const pintarCards = () => {
    data.forEach(vendedores => {
        templateCard.querySelector('h1').textContent = vendedores.Nom_Vendedor

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });

    items.appendChild(fragment)
}
//Mostrar alerta--------------------------------------------------------------------------
