const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', () => {
  const numeroCajaForm = document.getElementById('numeroCajaForm');
  numeroCajaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const numeroCajaInput = document.getElementById('numeroCaja');
    const numeroComputadoraInput = document.getElementById('numeroComputadora');
    const numeroCaja = numeroCajaInput.value;
    const numeroComputadora = numeroComputadoraInput.value;
    ipcRenderer.send('guardarNumeroCaja', numeroCaja, numeroComputadora);
  });
});
