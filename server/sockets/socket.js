const { io } = require("../server");
const { Usuarios } = require("../clases/usuarios");
const { crearMensaje } = require("../utilidades/utilidades");

const usuarios = new Usuarios();

io.on("connection", (client) => {
  console.log("Nuevo cliente conectado");

  client.on("entrarChat", (data, callback) => {
    if (!data.nombre || !data.sala) {
      return callback({
        error: true,
        mensaje: "El nombre/sala es necesario",
      });
    }

    usuarios.agregarPersona(client.id, data.nombre, data.sala);

    client.join(data.sala);

    client.broadcast
      .to(data.sala)
      .emit("listaPersona", usuarios.getPersonasPorSala(data.sala));
    client.broadcast
      .to(data.sala)
      .emit(
        "crearMensaje",
        crearMensaje("Administrador", `${data.nombre} se unió`)
      );

    callback(usuarios.getPersonasPorSala(data.sala));
  });

  client.on("crearMensaje", (data, callback) => {
    let persona = usuarios.getPersona(client.id);
    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
    callback(mensaje);
  });

  client.on("disconnect", () => {
    let personaBorrada = usuarios.borrarPersona(client.id);

    if (personaBorrada) {
      client.broadcast
        .to(personaBorrada.sala)
        .emit(
          "crearMensaje",
          crearMensaje("Administrador", `${personaBorrada.nombre} se ha ido`)
        );

      client.broadcast
        .to(personaBorrada.sala)
        .emit("listaPersona", usuarios.getPersonasPorSala(personaBorrada.sala));
    }
  });

  client.on("mensajePrivado", (data) => {
    let persona = usuarios.getPersona(client.id);
    client.broadcast
      .to(data.para)
      .emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
  });
});
