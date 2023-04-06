

window.addEventListener('DOMContentLoaded', function() {
    gActuales();
    gAproximadas();
    inversion();
    pInventario();
    
});
  
const dineroCaja = (actuales) => {
  axios
    .get("http://localhost:3000/api/caja")
    .then((response) => {
       const  dinero = response.data[0].dineroEnCaja
        const dineroCaja = parseFloat(dinero) || 0;
        const Ganancias = parseFloat(actuales)|| 0;

        console.log(dineroCaja);
        console.log(Ganancias);

        let resultado = dineroCaja + Ganancias
        document.getElementById('dinero').innerHTML = "$" +   resultado


    })
    .catch((error) => {
      console.log(error); 
    });
}


const gActuales = () => {
  axios
    .get("http://localhost:3000/api/Actuales")
    .then((response) => {
        let actuales = response.data[0].Ganancias || 0;
        console.log(actuales);
        dineroCaja(actuales)
        document.getElementById('gActuales').innerHTML = "$" + actuales


    })
    .catch((error) => {
      console.log(error); 
    });
}


const gAproximadas = () => {
    axios
      .get("http://localhost:3000/api/Aproximadas")
      .then((response) => {
        aproximadas = response.data[0].Ganacias
          console.log(aproximadas);
  
          document.getElementById('gAproximadas').innerHTML = "$" + aproximadas
  
  
      })
      .catch((error) => {
         console.log(error); 
      });
  }

  const pInventario = () => {
    axios
      .get("http://localhost:3000/api/productos")
      .then((response) => {
        inventario = response.data
        total = 0
        inventario.forEach(element => {
          
          this.total = element.Stock + this.total
          
        });
        
  
          document.getElementById('pInventarios').innerHTML = this.total
  
  
      })
      .catch((error) => {
         console.log(error); 
      });
  }



  
  const inversion = () => {
    axios
      .get("http://localhost:3000/api/invercion")
      .then((response) => {
        inversiones = response.data[0].Invercion
          console.log(inversiones);
          document.getElementById('Inversión').innerHTML = "$" +inversiones
      })
      .catch((error) => {
         console.log(error); 
      });
  }

  axios
  .get("http://localhost:3000/api/invercion")
  .then((response) => {
   console.log(response.data);
  })
  .catch((error) => {
     console.log(error); 
  });
