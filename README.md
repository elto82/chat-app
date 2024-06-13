# Chat Application

Esta es una aplicación de chat en tiempo real construida con Node.js y Socket.IO.

## Descripción

La aplicación permite a los usuarios unirse a diferentes salas de chat y enviar mensajes a todos los usuarios dentro de la misma sala. También soporta mensajes privados entre los usuarios.

## Características

- Conexión y desconexión de usuarios en tiempo real.
- Creación y administración de salas de chat.
- Envío y recepción de mensajes públicos dentro de una sala.
- Envío y recepción de mensajes privados entre usuarios.
- Listado de usuarios conectados en cada sala.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/elto82/chat-app
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd chat-app
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

## Uso

1. Inicia el servidor:

    ```bash
    npm start
    ```

2. Abre tu navegador y navega a `http://localhost:3000`.

3. Ingresa tu nombre y el nombre de la sala a la que deseas unirte.

## Estructura del Proyecto

- `public/`
  - `index.html`: Página de inicio para ingresar nombre y sala.
  - `chat.html`: Página de chat principal.
  - `js/socket-chat.js`: Archivo JavaScript del lado del cliente.

- `server/`
  - `sockets/`
    - `socket.js`: Configuración de los sockets del lado del servidor.
  - `clases/`
    - `usuarios.js`: Clase para manejar la lógica de los usuarios.
  - `utilidades/`
    - `utilidades.js`: Funciones utilitarias.
  - `server.js`: Configuración principal del servidor.

## Funcionalidades

### Cliente

- `index.html`: Formulario para ingresar al chat con nombre y sala.
- `chat.html`: Interfaz de usuario para la sala de chat.

### Lado del Cliente (JavaScript)

- Conexión y desconexión del servidor.
- Emisión de eventos para unirse al chat y enviar mensajes.
- Recepción de eventos para mostrar mensajes y actualizar la lista de usuarios.

### Lado del Servidor (Node.js)

- Manejo de la conexión de clientes.
- Administración de salas y usuarios.
- Emisión de eventos para actualizar a los clientes con la lista de usuarios y nuevos mensajes.
- Recepción de eventos de los clientes para mensajes públicos y privados.