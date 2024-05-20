import { conexionAPI } from "./conexionAPI.js";
import { crearCard } from "./crearCard.js";

//direccion del servidor
let urlApi = "http://localhost:3002/productos/";
let urlApiBorrar = "http://localhost:3002/productos/";

//constantes de productos
const contenedorProductos = document.querySelector(".contenedor-productos");

//mostrar los productos en la página
mostrarProductos();
async function mostrarProductos() {
  try {
    const productos = await conexionAPI.listarProductos(urlApi);

    if (productos == null) {
      throw new Error("Error en la conexión");
    } else {
      productos.forEach(producto => {
        contenedorProductos.innerHTML += crearCard(
          producto.nombre,
          producto.imagen,
          producto.precio,
          producto.id
        );
      });

      return;
    }

  } catch (error) {
    console.log(`Error al cargar los productos: ${error}`);
    contenedorProductos.innerHTML = `<p class="parrafo-error-contenedor">Error en la conexión.</p>`;

    return null;
  }
}

// eliminar tarjeta de producto
contenedorProductos.addEventListener("click", evento =>
  eliminarProductos(evento)
);

async function eliminarProductos(evento) {
  if (evento.target.classList.contains("trash-icon")) {
    // buscar el elemento abuelo "card-producto" y obtener su data-index
    const elementoPadre = evento.target.parentElement;
    const elementoAbuelo = elementoPadre.parentElement;
    let idProducto = elementoAbuelo.getAttribute("data-index");
    console.log(`id de producto a eliminar ${idProducto}`);
    if (activarServerOnline) {
      idProducto = `${idProducto}.json`;
    }

    try {
      const productoEliminar = await conexionAPI.eliminarProducto(
        idProducto,
        urlApiBorrar
      );
      if (productoEliminar === null) {
        throw new Error("Error al intentar eliminar el producto");
      }
      alert("Producto eliminado con éxito");
      elementoAbuelo.remove();
      return;
    } catch (error) {
      alert(`Error al intentar eliminar el producto.`);
      return null;
    }
  }
}

export { urlApi };
export { mostrarProductos };
export { contenedorProductos };
