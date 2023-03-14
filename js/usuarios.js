



const items = document.getElementById('items');
const templateCard = document.getElementById('template-card');
const fragment = document.createDocumentFragment();

data = []

window.addEventListener('load', function() {
    usuarios()

});
  


 const usuarios =  ()  =>{
    axios.get('https://backtiendita-production.up.railway.app/api/vendedores')
    .then(response => {
      
    data = response.data
     console.log(data);
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

