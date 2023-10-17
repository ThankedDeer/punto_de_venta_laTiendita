const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const Store = require('electron-store');
const store = new Store();
let numeroComputadoraWindow;
let numeroCajaWindow;
let sucursalWindow;
let mainWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
const createNumeroComputadoraWindow = () => {
  const idCompu = obtenerIdCompuDesdeLocalStorage();
  const Nom_Compu = obtenerNomCompuDesdeLocalStorage();
  if (idCompu && Nom_Compu) {
    createNumeroCajaWindow();
    return;
  }
  if (numeroComputadoraWindow) {
    return;
  }
  numeroComputadoraWindow = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'numeroComputadoraPreload.js')
    }
  });
  numeroComputadoraWindow.loadFile('numeroComputadora.html');
  numeroComputadoraWindow.on('closed', () => {
    numeroComputadoraWindow = null;
  });
};
const createNumeroCajaWindow = () => {
  const idCaja = obtenerIdCajaDesdeLocalStorage();
  if (idCaja) {
    createSucursalWindow();
    return;
  }
  if (numeroCajaWindow) {
    return;
  }
  numeroCajaWindow = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'numeroCajaPreload.js')
    }
  });
  numeroCajaWindow.loadFile('numeroCaja.html');
  numeroCajaWindow.on('closed', () => {
    numeroCajaWindow = null;
  });
};
const createSucursalWindow = () => {
  const idSucursal = obtenerIdSucursalDesdeLocalStorage();
  if (idSucursal) {
    createWindow();
    return;
  }
  if (sucursalWindow) {
    return;
  }
  sucursalWindow = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'sucursalPreload.js')
    }
  });
  sucursalWindow.loadFile('sucursal.html');
  sucursalWindow.on('closed', () => {
    sucursalWindow = null;
    const idSucursal = obtenerIdSucursalDesdeLocalStorage();
    if (idSucursal) {
      createWindow();
    } else {
      app.quit();
    }
  });
};
const createWindow = () => {
  if (mainWindow) {
    return;
  }
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html');
};
app.whenReady().then(() => {
  createNumeroComputadoraWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createNumeroComputadoraWindow();
    }
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
const guardarNumeroComputadoraEnLocalStorageEletron = (idCompu, Nom_Compu) => {
  guardarIdCompuEnLocalStorage(idCompu);
  guardarNomCompuEnLocalStorage(Nom_Compu);
  return Promise.resolve();
};
const guardarNumeroCajaEnLocalStorageElectron = (idCaja) => {
  guardarIdCajaEnLocalStorage(idCaja);
  return Promise.resolve();
};
const guardarIdSucursalEnLocalStorageElectron = (idSucursal, Nom_Sucursal, Direccion_Sucursal, Contacto_Sucursal) => {
  guardarIdSucursalEnLocalStorage(idSucursal);
  guardarNomSucursalEnLocalStorage(Nom_Sucursal);
  guardarDireccionSucursalEnLocalStorage(Direccion_Sucursal);
  guardarContactoSucursalEnLocalStorage(Contacto_Sucursal);
  return Promise.resolve();
};
const obtenerIdCompuDesdeLocalStorage = () => {
  return store.get('idCompu');
};
const obtenerNomCompuDesdeLocalStorage = () => {
  return store.get('Nom_Compu');
};
const guardarIdCompuEnLocalStorage = (idCompu) => {
  store.set('idCompu', idCompu);
};
const guardarNomCompuEnLocalStorage = (Nom_Compu) => {
  store.set('Nom_Compu', Nom_Compu);
};
const guardarIdCajaEnLocalStorage = (idCaja) => {
  store.set('idCaja', idCaja);
};
const obtenerIdCajaDesdeLocalStorage = () => {
  return store.get('idCaja');
};
ipcMain.on('guardarNumeroComputadora', (event, idCompu, Nom_Compu) => {
  guardarNumeroComputadoraEnLocalStorageEletron(idCompu, Nom_Compu)
    .then(() => {
      guardarIdCompuEnLocalStorage(idCompu);
      guardarNomCompuEnLocalStorage(Nom_Compu);
      if (numeroComputadoraWindow) {
        numeroComputadoraWindow.close();
      }
      createNumeroCajaWindow();
    })
    .catch((error) => {
      console.error(error);
    });
});
ipcMain.on('guardarNumeroCaja', (event, idCaja, idCompu) => {
  if (!idCompu) {
    console.log('No se completaron los datos en la pantalla de número de computadora. Cerrando la aplicación.');
    app.quit();
    return;
  }
  guardarNumeroCajaEnLocalStorageElectron(idCaja)
    .then(() => {
      guardarIdCajaEnLocalStorage(idCaja);
      if (numeroCajaWindow) {
        numeroCajaWindow.close();
      }
      createSucursalWindow();
    })
    .catch((error) => {
      console.log(error);
    });
});
const guardarIdSucursalEnLocalStorage = (idSucursal) => {
  store.set('idSucursal', idSucursal);
};
const guardarNomSucursalEnLocalStorage = (Nom_Sucursal) => {
  store.set('Nom_Sucursal', Nom_Sucursal);
};
const guardarDireccionSucursalEnLocalStorage = (Direccion_Sucursal) => {
  store.set('Direccion_Sucursal', Direccion_Sucursal);
};
const guardarContactoSucursalEnLocalStorage = (Contacto_Sucursal) => {
  store.set('Contacto_Sucursal', Contacto_Sucursal);
}
const obtenerIdSucursalDesdeLocalStorage = () => {
  return store.get('idSucursal');
};
ipcMain.on('guardarIdSucursal', (event, idSucursal, Nom_Sucursal, Direccion_Sucursal, Contacto_Sucursal) => {
  if (!Nom_Sucursal || !Direccion_Sucursal || !Contacto_Sucursal) {
    console.log('No se completaron los datos en la pantalla de sucursal. Cerrando la aplicación.');
    app.quit();
    return;
  }
  guardarIdSucursalEnLocalStorageElectron(idSucursal, Nom_Sucursal, Direccion_Sucursal, Contacto_Sucursal)
    .then(() => {
      guardarIdSucursalEnLocalStorage(idSucursal);
      guardarNomSucursalEnLocalStorage(Nom_Sucursal);
      guardarDireccionSucursalEnLocalStorage(Direccion_Sucursal);
      guardarContactoSucursalEnLocalStorage(Contacto_Sucursal);
      if (sucursalWindow) {
        sucursalWindow.close();
      }
      createWindow();
    })
    .catch((error) => {
      console.log(error);
    });
});
app.on('ready', () => {
  const idCompu = obtenerIdCompuDesdeLocalStorage();
  const idCaja = obtenerIdCajaDesdeLocalStorage();
  const idSucursal = obtenerIdSucursalDesdeLocalStorage();
  if (idCompu && idCaja && idSucursal) {
    createWindow();
  } else if (idCompu && idCaja) {
    createSucursalWindow();
  } else if (idCompu) {
    createNumeroCajaWindow();
  } else {
    createNumeroComputadoraWindow();
  }
});