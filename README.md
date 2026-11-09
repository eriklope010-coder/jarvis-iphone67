# JARVIS MIDAS

Tu asistente personal con IA, con estilo MIDAS: orbe dorado y negro obsidiana. Es tu colega: chistes, recomendaciones, búsquedas en internet, cálculos exactos y memoria. Abre WhatsApp, Instagram, TikTok, Plex y Spotify.

Todos los archivos están en la misma carpeta, sin subcarpetas.

| Archivo | Para qué sirve |
|---|---|
| `index.html`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` | La app web (GitHub Pages). |
| `server.js`, `calc.js`, `package.json`, `render.yaml` | El servidor que guarda tu clave de IA (Render). |
| `variables-ejemplo.txt` | Las variables que hay que poner en el servidor. |

> Aquí no hay ninguna clave. La clave de Anthropic se pone solo en Render, nunca en GitHub.

## 1. Subir a GitHub
Crea un repositorio, pulsa **Add file › Upload files** y arrastra todos estos archivos.

## 2. Publicar la web
En el repositorio, ve a **Settings › Pages**:
- **Source:** Deploy from a branch.
- **Branch:** `main`, carpeta `/ (root)`.
- Pulsa **Save**.

En un minuto tendrás la web en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## 3. Crear el servidor (Render, gratis)
1. En render.com, entra en **New › Blueprint** y elige el repositorio.
2. Rellena las variables:
   - `ANTHROPIC_API_KEY`: tu clave, de console.anthropic.com. Se paga por uso.
   - `ALLOWED_ORIGINS`: `https://TU-USUARIO.github.io`
   - `JARVIS_DEVICE_TOKEN`: Render la genera sola. Cópiala.
3. Copia la URL del servidor, del tipo `https://jarvis-midas-backend.onrender.com`.

## 4. Conectar
1. Abre la web y entra en **Ajustes (engranaje) › Servidor**.
2. Pega la URL y el token, y pulsa **Guardar y comprobar**.
3. En el iPhone, desde Safari, pulsa **Compartir › Añadir a pantalla de inicio**.

## Límites
- La memoria se guarda en el navegador de cada dispositivo. Expórtala de vez en cuando desde Ajustes › Memoria.
- Puedes hablarle por voz con la web abierta, pero no escucha con el móvil bloqueado; ninguna web puede.
- Abre Spotify con la búsqueda, pero no puede darle al play.
- El plan gratuito de Render se duerme tras un rato sin uso: la primera respuesta puede tardar unos 30 segundos.
