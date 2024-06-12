const socket = io();
let params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesarios");
}

let usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

socket.on("connect", () => {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, (resp) => {
    console.log("usuarios conectados", resp);
  });
});

// Escuchar desconexión
socket.on("disconnect", () => {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "Fernando",
//     mensaje: "Hola Mundo",
//   },
//   (resp) => {
//     console.log("respuesta server: ", resp);
//   }
// );

// Escuchar información
socket.on("crearMensaje", (mensaje) => {
  console.log("Servidor:", mensaje);
});

//escuchar cambios de usuarios / cuando un usuario entra o sale del chat
socket.on("listaPersona", (personas) => console.log(personas));

//mensajes privados
socket.on("mensajePrivado", (mensaje) =>
  console.log("mensaje privado", mensaje)
);
