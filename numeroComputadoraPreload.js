const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', () => {
  const numeroComputadoraForm = document.getElementById('numeroComputadoraForm');
  numeroComputadoraForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const numeroComputadoraInput = document.getElementById('numeroComputadora');
    const nombreComputadoraInput = document.getElementById('nombreComputadora');
    const numeroComputadora = numeroComputadoraInput.value;
    const nombreComputadora = nombreComputadoraInput.value;
    ipcRenderer.send('guardarNumeroComputadora', numeroComputadora, nombreComputadora);
  });
});
