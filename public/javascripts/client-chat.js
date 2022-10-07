const socket = io();

const btnEnviar = document.querySelector("#btnEnviar");
const inputNombre = document.querySelector("#inputNombre");
const inputMensaje = document.querySelector("#inputMensaje");
const span = document.querySelector("#numUsuario");
const ul = document.querySelector("#mensajes");

btnEnviar.addEventListener("click", () => {
  const body = {
    nombre: inputNombre.value,
    mensaje: inputMensaje.value,
    socketId: socket.id,
  };

  socket.emit("mensaje_chat", body);
});

// Me suscribo a la recepción del evento mensaje_chat
socket.on("mensaje_chat", (body) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${body.nombre}: </strong> ${body.mensaje}`;

  if (body.socketId === socket.id) {
    li.classList.add("propietario");
  }

  ul.appendChild(li);
});

socket.on("usuarios_chat", (clientsCount) => {
  span.textContent = clientsCount;
});
