window.addEventListener("DOMContentLoaded", function () {
    permisos();
  });

cerrarSesion = () => {
  localStorage.clear();
  localStorage.removeItem("tToken");
  localStorage.removeItem("vendedor");
  window.location.href = "../index.html";
};




function permisos() {
  const objeto = localStorage.getItem("vendedor");
const vendedor = JSON.parse(objeto);
  console.log(vendedor);
  if (vendedor.idPermisos == 1) {

    const ocultar = document.getElementById("ocultar");
    ocultar.style.display = "flex";
  }
}
