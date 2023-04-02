cerrarSesion = () =>{
    localStorage.removeItem("tToken");
    localStorage.removeItem("vendedor");
    window.location.href = "../index.html";
}