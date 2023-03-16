

window.addEventListener('load', function() {
    gActuales();
    gAproximadas();
    inversion();
    pInventario();

});
  

const gActuales = () => {
  axios
    .get("https://backtiendita-production.up.railway.app/api/Actuales")
    .then((response) => {
        actuales = response.data[0].Ganancias
        console.log(actuales);

        document.getElementById('gActuales').innerHTML = actuales


    })
    .catch((error) => {
      console.log(error); 
    });
}


const gAproximadas = () => {
    axios
      .get("https://backtiendita-production.up.railway.app/api/Aproximadas")
      .then((response) => {
        aproximadas = response.data[0].Ganacias
          console.log(aproximadas);
  
          document.getElementById('gAproximadas').innerHTML = aproximadas
  
  
      })
      .catch((error) => {
         console.log(error); 
      });
  }

  const pInventario = () => {
    axios
      .get("https://backtiendita-production.up.railway.app/api/productos")
      .then((response) => {
        inventario = response.data.length
        console.log(inventario);
  
          document.getElementById('pInventarios').innerHTML = inventario
  
  
      })
      .catch((error) => {
         console.log(error); 
      });
  }



  
  const inversion = () => {
    axios
      .get("https://backtiendita-production.up.railway.app/api/invercion")
      .then((response) => {
        inversiones = response.data[0].Invercion
          console.log(inversiones);
  
          document.getElementById('Inversión').innerHTML = inversiones
  
  
      })
      .catch((error) => {
         console.log(error); 
      });
  }


