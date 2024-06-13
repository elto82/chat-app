const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y sala son necesarios");
}

const usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("entrarChat", usuario, function (resp) {
    renderizarUsuarios(resp);
  });
});

socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

socket.on("crearMensaje", function (mensaje) {
  renderizarMensajes(mensaje, false);
  scrollBottom();
});

socket.on("listaPersona", function (personas) {
  renderizarUsuarios(personas);
});

socket.on("mensajePrivado", function (mensaje) {
  console.log("Mensaje Privado:", mensaje);
});

function renderizarUsuarios(personas) {
  let html = "";
  html += `<li class="animated fadeIn">`;
  html += `<a href="javascript:void(0)" class="active">Chat de <span>${params.get(
    "sala"
  )}</span></a>`;
  html += "</li>";

  for (let i = 0; i < personas.length; i++) {
    html += `<li>`;
    html += `<a data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg"
            alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small
            class="text-success">online</small></span></a>`;
    html += `</li>`;
  }
  $("#divUsuarios").html(html);
}

function renderizarMensajes(mensaje, yo) {
  let html = "";
  let fecha = new Date(mensaje.fecha);
  let hora = fecha.getHours() + ":" + fecha.getMinutes();
  let adminClass = "info";
  if (mensaje.nombre === "Administrador") {
    adminClass = "danger";
  }

  if (yo) {
    html += `<li class="reverse">`;
    html += `<div class="chat-content">`;
    html += `<h5>${mensaje.nombre}</h5>`;
    html += `<div class="box bg-light-inverse">${mensaje.mensaje}</div>`;
    html += `</div>`;
    html += `<div class="chat-img">`;
    html += `<img src="assets/images/users/5.jpg" alt="user" />`;
    html += `</div>`;
    html += `<div class="chat-time">${hora}</div>`;
    html += `</li>`;
  } else {
    html += `<li class="animated fadeIn">`;
    if (mensaje.nombre !== "Administrador") {
      html += `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`;
    }

    html += `<div class="chat-content">`;
    html += `<h5>${mensaje.nombre}</h5>`;
    html += `<div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>`;
    html += `</div>`;
    html += `<div class="chat-time">${hora}</div>`;
    html += `</li>`;
  }

  $("#divChatbox").append(html);
}

function scrollBottom() {
  let divChatbox = $("#divChatbox");
  let newMessage = divChatbox.children("li:last-child");

  let clientHeight = divChatbox.prop("clientHeight");
  let scrollTop = divChatbox.prop("scrollTop");
  let scrollHeight = divChatbox.prop("scrollHeight");
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatbox.scrollTop(scrollHeight);
  }
}

// Listeners
$("#divUsuarios").on("click", "a", function () {
  let id = $(this).data("id");
  if (id) {
    console.log(id);
  }
});

$("#formEnviar").on("submit", function (e) {
  e.preventDefault();
  if ($("#txtMensaje").val().trim().length === 0) {
    return;
  }

  socket.emit(
    "crearMensaje",
    {
      nombre: usuario.nombre,
      mensaje: $("#txtMensaje").val(),
    },
    function (mensaje) {
      $("#txtMensaje").val("").focus();
      renderizarMensajes(mensaje, true);
      scrollBottom();
    }
  );
});
