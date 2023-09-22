const items = document.getElementById("items");
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById("templateLista").content;
const cantidadInput = document.getElementById("cantidad");
const precioInput = document.getElementById("importe");
const btnModal = document.getElementById("aceptar");
const modal = document.getElementById("modalBascula");
const totalVenta = document.getElementById("total");
let listenersAgregados = false;
let carrito = {};
items.addEventListener("click", (e) => {
  btnAccion(e);});
const buscarProducto = () => {
  let c = document.getElementById("buscarProducto").value;
  if (c.length === 0) {
    Swal.fire({
      title: "Alerta",
      text: "Ingresa un código de producto",
      icon: "warning",
      confirmButtonText: "Cerrar",
    }); return;
  } if (c.startsWith("Prom")) {
    buscarPaquete();
    return;}
  axios.get("http://localhost:3000/api/producto/" + c).then((response) => {
      this.productoEncontrado = response.data[0];
      if(productoEncontrado.Stock == 0){
        Swal.fire({
          title: "No Disponible",
          text: "No hay producto existente en inventario",
          icon: "warning",
          confirmButtonText: "Cerrar"});
        document.getElementById("buscarProducto").value = "";
        return }
      else if (productoEncontrado.Es_Paquete) {
        obtenerProductosPaquete(productoEncontrado.Id_Paquete);
        return;}
      if (productoEncontrado.Unidad == "Kilogramo") {
        $("#modalBascula").modal("show");
        if (!listenersAgregados) {
          $("#modalBascula").on("shown.bs.modal", () => {
            datosModal(productoEncontrado);});
          cantidadInput.addEventListener("input", () => {
            actualizarPrecio(productoEncontrado);});
          btnModal.addEventListener("click", () => {
            setCarritoBascula(productoEncontrado);});
          listenersAgregados = true;}
        return;}
      setCarrito(productoEncontrado);
      document.getElementById("buscarProducto").value = "";})
    .catch((error) => {
      Swal.fire({
        title: "No encontrado",
        text: "Este producto no existe en el inventario",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      document.getElementById("buscarProducto").value = "";
    });};
const buscarPaquete = () => {
  const idPaquete = document.getElementById("buscarProducto").value;
  if (idPaquete.length === 0) {
    Swal.fire({
      title: "Alerta",
      text: "Ingresa un código de paquete",
      icon: "warning",
      confirmButtonText: "Cerrar",});
    return;}
  axios.get(`http://localhost:3000/api/ventaPaquete/${idPaquete}`).then((response) => {
      const productosPaquete = response.data;
      if (productosPaquete.length > 0) {
        productosPaquete.forEach((producto) => {
          producto.Cantidad_Producto = parseFloat(producto.Cantidad_Producto); 
          producto.Precio_Compra = parseFloat(producto.Precio_Compra);
          producto.Precio_Venta = parseFloat(producto.Precio_Venta);
          producto.Precio_Promocion = parseFloat(producto.Precio_Promocion);
          producto.Stock_Disponible = parseFloat(producto.Stock_Disponible);
          setCarrito(producto);});
      } else {
        Swal.fire({
          title: "No encontrado",
          text: "Este paquete no existe en el inventario",
          icon: "error",
          confirmButtonText: "Cerrar",
        });}
      document.getElementById("buscarProducto").value = "";})
    .catch((error) => {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Error al obtener el paquete",
        icon: "error",
        confirmButtonText: "Cerrar",});
      document.getElementById("buscarProducto").value = "";});};

const setCarrito = (objeto) => { 
  let producto;

  if(!objeto.Precio_Promocion) { 
    producto = {
      Codigo: objeto.Codigo_Producto,
      Nombre: objeto.Nom_Producto,
      Precio_Venta: objeto.Precio_Venta,
      Precio_Compra: objeto.Precio_Compra,
      Stock: objeto.Stock_Disponible,
      Unidad: objeto.Unidad,
      cantidad: 1
    } 
    } else { 
      producto = {
      Codigo: objeto.Codigo_Producto,
      Nombre: objeto.Nom_Producto,
      Precio_Venta: objeto.Precio_Promocion,
      Precio_Compra: objeto.Precio_Compra,
      Stock: objeto.Stock_Disponible,
      Unidad: objeto.Unidad,
      cantidad: objeto.Cantidad_Producto 
    }}
    if (producto.Stock == 0) {
      Swal.fire({
        title: "No Disponible",
        text: "No hay producto existente en inventario",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      document.getElementById("buscarProducto").value = "";
      return;
    }
    if (carrito.hasOwnProperty(producto.Codigo)) {
      if (objeto.Es_Paquete) {
        carrito[producto.Codigo].cantidad += producto.cantidad;
      } else {
        carrito[producto.Codigo].cantidad += 1;
        carrito[producto.Codigo].Total_Venta += producto.Total_Venta;
      }
    } else {
      carrito[producto.Codigo] = { ...producto };}
    pintarCarrito();
    pintarFooter();
  };


  function pintarCarrito() {
    items.innerHTML = "";
    Object.values(carrito).forEach((producto) => {
      templateCarrito.querySelector("th").textContent = producto.Codigo;
      templateCarrito.querySelectorAll("td")[0].textContent = producto.Nombre;
      templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
      templateCarrito.querySelectorAll("span")[0].textContent = producto.Precio_Venta;
      templateCarrito.querySelectorAll("span")[1].textContent =
        producto.Precio_Venta * producto.cantidad;
      const btnAumentar = templateCarrito.querySelector(".btn-info");
      btnAumentar.dataset.id = producto.Codigo;
      const btnDisminuir = templateCarrito.querySelector(".btn-danger");
      btnDisminuir.dataset.id = producto.Codigo;
      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    });
    items.appendChild(fragment);
    pintarFooter();}
  const footer = document.getElementById("footer");
  const templateFooter = document.getElementById("template-footer").content;
  const pintarFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(carrito).length === 0) {
      footer.innerHTML = ` <th scope="row" colspan="5">Lista vacía - escanea para agregar!</th>`;
      return;}
    const nCantidad = Object.values(carrito).reduce(
      (acc, { cantidad }) => acc + cantidad,
      0
    );
    const nPrecio = Object.values(carrito).reduce(
      (acc, { Precio_Venta, cantidad }) => acc + cantidad * Precio_Venta,
      0
    );
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelectorAll("span")[1].textContent = parseFloat(nPrecio);
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);
    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", () => {
      carrito = {};
      pintarCarrito();
      pintarFooter();});};
  const btnAccion = (e) => {
    if (e.target.classList.contains("btn-info")) {
      const producto = carrito[e.target.dataset.id];
      if (producto.Stock == 1) {
        Swal.fire({
          title: "Alerta",
          text: "Ya no hay mas producto en inventario",
          icon: "warning",
          confirmButtonText: "Cerrar",
        }); return; }
      producto.cantidad++;
      producto.Stock--;
      carrito[e.target.dataset.id] = { ...producto };
      pintarCarrito();
      pintarFooter();}
    if (e.target.classList.contains("btn-danger")) {
      const producto = carrito[e.target.dataset.id];
      producto.cantidad--;
      producto.Stock++;
      if (producto.cantidad <= 0) {
        delete carrito[e.target.dataset.id];
      } else {
        carrito[e.target.dataset.id] = { ...producto };}
      pintarCarrito();
      pintarFooter();
    } e.stopPropagation();};
  const setCarritoBascula = (objeto) => {
    const producto = {
      Codigo: objeto.Codigo_Producto,
      Nombre: objeto.Nom_Producto,
      Precio_Venta: parseFloat(objeto.Precio_Venta),
      Precio_Compra: parseFloat(objeto.Precio_Compra),
      Unidad: objeto.Unidad,
      cantidad: parseFloat(cantidadInput.value),};
    if (carrito.hasOwnProperty(producto.Codigo_Producto)) {
      carrito[producto.Codigo_Producto].Stock -= cantidadInput.value;
      if (carrito.hasOwnProperty(producto.Codigo_Producto)) {
        producto.cantidad =
          carrito[producto.Codigo_Producto].cantidad + parseFloat(cantidadInput.value);
        producto.Stock = carrito[producto.Codigo_Producto].Stock;}}
    $("#modalBascula").off("shown.bs.modal");
    carrito[producto.Codigo_Producto] = { ...producto };
    console.log(carrito);
    pintarCarrito();
    limpiarModal();
    document.getElementById("buscarProducto").value = "";
    btnModal.removeEventListener("click", () => {
      setCarritoBascula(productoEncontrado);});};
  function datosModal(producto) {
    const tituloProducto = document.querySelector("#productoNombre");
    const precio = document.querySelector("#precio");
    tituloProducto.textContent = producto.Nom_Producto;
    precio.textContent = "$" + producto.Precio_Venta + " por " + producto.Unidad;}
  const actualizarPrecio = (producto) => {
    const cantidad = parseFloat(cantidadInput.value);
    const precio = parseFloat(producto.Precio_Venta);
    const stock = producto.Stock;
    const total = cantidad * precio;
    if (cantidad > stock) {
      swal.fire({
        title: "Error",
        text: `La cantidad ingresada excede el stock disponible (${stock})`,
        icon: "error",
        button: "Aceptar",
      }).then(() => {
        cantidadInput.value = stock; });} else {
      precioInput.value = total;}};
  const limpiarModal = () => {
    modal.querySelector("form").reset();
    $("#modalBascula").modal("toggle");
    document.getElementById("buscarProducto").value = "";};
  document.addEventListener("keydown", function (event) {
    switch ((event.ctrlKey && event.code) || event.code) {
      case "F1":
        crearVenta();
        break;
      case "F3":
        consultarInventario()
        break;
      default:
        break;}});


  const crearVenta = async () => {
    if (Object.keys(carrito).length === 0) {
      Swal.fire({
        title: "Alerta",
        text: "No hay productos en la lista",
        icon: "warning",
        confirmButtonText: "Cerrar",
      }); 
      return; }
    const totalVenta = document.getElementById("total").textContent;
    const user = JSON.parse(localStorage.getItem("vendedor"));
    const idCaja = localStorage.getItem("idCaja");
    const venta = {
      idVendedor: user.id,
      idCaja: idCaja,
      Total: totalVenta,};
var fechaActual = new Date();
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; 
var anio = fechaActual.getFullYear();
var fechaFormateada = dia.toString().padStart(2, '0') + '-' + mes.toString().padStart(2, '0') + '-' + anio.toString();
localStorage.setItem('fecha', fechaFormateada);
var fecha = new Date();
var hora = fecha.getHours();
var minutos = fecha.getMinutes();
var segundos = fecha.getSeconds();
var horaActual = hora + ':' + minutos + ':' + segundos;
localStorage.setItem('hora', horaActual);
    try { const response = await axios.post("http://localhost:3000/api/ventas", venta);
      const idVenta = response.data.idVenta;
      for (const producto of Object.values(carrito)) {
        const data = {
          idVenta: idVenta,
          Codigo_Producto: producto.Codigo,
          Cantidad_Producto: producto.cantidad,
          Precio_Compra: parseFloat(producto.Precio_Compra),
          Precio_Venta: parseFloat(producto.Precio_Venta),
          Devuelto: false,};
        await axios.post("http://localhost:3000/api/detalleVentas", data);
        console.log("Producto insertado en la venta: " + idVenta);}
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
          <title>Imprimir ticket</title>
      </head>
      <body>
        <div id="ticket">
        <h1>========================================================================================================</h1>
        <h1 id="Nom_Sucursal"><strong></strong></h1>
        <h1>========================================================================================================</h1>
        <h2 id="DireccionSucursal" ><strong></strong></h2>
        <h4 id="fecha"><strong></strong></h4>
        <h4 id="hora"><strong></strong></h4>
        <h4 id="vendedor"><strong></strong></h4>
        <h4><strong>Venta: ${idVenta}</strong></h4>
        <table>
        <thead>
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Producto</th>
            <th>Importe</th>
        </tr>
    </thead>
    <tbody>
        ${Object.values(carrito)
            .map(
                (producto) => `
                <tr>
                    <td>${producto.Nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${producto.Precio_Venta}c/u</td>
                    <td>$${producto.Precio_Venta * producto.cantidad}</td>
                </tr>`).join("")}
    </tbody>
    <tfoot>
    </tfoot>
        </table>
        </div>
        <br>
        <br>
        <h3><strong>Total de Venta: $${venta.Total}</strong></h3>
        <br>
        <br>
        <h4><strong>***GRACIAS POR SU COMPRA***</strong></h4>
          <script>
              window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                      window.close();}}
          </script>
          <script>
            var sucursal = localStorage.getItem("Nom_Sucursal");
            var textoCompleto = sucursal;
            document.getElementById("Nom_Sucursal").textContent = textoCompleto;
            var direccionSucursal = localStorage.getItem("Direccion_Sucursal");
            var textoCompleto = direccionSucursal;
            document.getElementById("DireccionSucursal").textContent = textoCompleto;
            var fecha = localStorage.getItem("fecha");
            var textoCompleto = fecha;
            document.getElementById("fecha").textContent = "Fecha: " + textoCompleto;
            var hora = localStorage.getItem("hora");
            var textoCompleto = hora;
            document.getElementById("hora").textContent = "Hora: " + textoCompleto;
            var vendedor = localStorage.getItem('vendedor');
            var vendedorObjeto = JSON.parse(vendedor);
            var username = vendedorObjeto.username;
            var textoCompleto = username;
            document.getElementById("vendedor").textContent = "Lo atendio: " + textoCompleto;
          </script>
      </body>
      </html>`);
      printWindow.document.close();
      Swal.fire({
        title: "Alerta",
        text: "Venta Exitosa",
        icon: "success",
        confirmButtonText: "Cerrar",});
      localStorage.removeItem('fecha');
      localStorage.removeItem('hora');
      carrito = {};
      pintarCarrito();
      pintarFooter();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Alerta",
        text: "Error al hacer la venta",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });}};

      
  async function filtrarProductos() {
    const input = document.getElementById('filtrarProducto');
    const valor = input.value.toLowerCase(); 
    try { const response = await axios.get('http://localhost:3000/api/consultarProducto');
      const data = response.data;
      const productosFiltrados = data.filter(producto =>
        producto.Nom_Producto.toLowerCase().includes(valor));
      const selectOpciones = document.getElementById('opcionesFiltradas');
      selectOpciones.innerHTML = ''; 
      productosFiltrados.forEach(producto => {
        const opcion = document.createElement('option');
        opcion.value = producto.Codigo_Producto;
        opcion.textContent = producto.Nom_Producto;
        opcion.dataset.precioVenta = producto.Precio_Venta;
        opcion.dataset.precioCompra = producto.Precio_Compra;
        opcion.dataset.stockDisponible = producto.Stock_Disponible;
        opcion.dataset.unidad = producto.Unidad;
        selectOpciones.appendChild(opcion);});
      selectOpciones.size = productosFiltrados.length > 5 ? 5 : productosFiltrados.length;
    } catch (error) {
      console.error('Error:', error);}}
    function limpiarInputsYSelects() {
    const inputs = document.querySelectorAll('input[type=text], input[type=number]');
    const selects = document.querySelectorAll('select');
    inputs.forEach(input => input.value = '');
    selects.forEach(select => select.selectedIndex = 0);
    window.location.reload();}
  function insertarProducto() {
    const axlSelectOpciones = document.getElementById('opcionesFiltradas');
    const selectedOption = axlSelectOpciones.options[axlSelectOpciones.selectedIndex];
    const producto = {
      Codigo_Producto: selectedOption.value,
      Nom_Producto: selectedOption.textContent,
      Precio_Venta: selectedOption.dataset.precioVenta,
      Precio_Compra: selectedOption.dataset.precioCompra,
      Stock_Disponible: selectedOption.dataset.stockDisponible,
      Unidad: selectedOption.dataset.unidad};
    setCarrito(producto);
  const modal = document.getElementById('crear');
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();}
  const btnInsertar = document.querySelector('.btn.btn-success');
  btnInsertar.addEventListener('click', insertarProducto);