window.addEventListener("DOMContentLoaded", function () {
    permisos();
  });

cerrarSesion = () => {
  localStorage.removeItem("tToken");
  localStorage.removeItem("vendedor");
  window.location.href = "../index.html";
};

function permisos() {
  const objeto = localStorage.getItem("vendedor");
  const vendedor = JSON.parse(objeto);
  if (vendedor.idPermisos == 1) { const ocultar = document.querySelectorAll("#ocultar");
    ocultar.forEach(elemento => { elemento.style.display = "flex";
    });
  }}