const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const sucursalForm = document.getElementById('sucursalForm');
  sucursalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const idSucursalInput = document.getElementById('idSucursal');
    const nombreSucursalInput = document.getElementById('nombreSucursal');
    const direccionSucursalInput = document.getElementById('direccionSucursal');
    const contactoSucursalInput = document.getElementById('contactoSucursal');
    const idSucursal = idSucursalInput.value;
    const nombreSucursal = nombreSucursalInput.value;
    const direccionSucursal = direccionSucursalInput.value;
    const contactoSucursal = contactoSucursalInput.value;
    ipcRenderer.send('guardarIdSucursal', idSucursal, nombreSucursal, direccionSucursal, contactoSucursal);
  });
});