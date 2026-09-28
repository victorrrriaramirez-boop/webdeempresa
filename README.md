# Portfolio creativo

Web estática en HTML, CSS y JavaScript. No necesita instalar dependencias ni configurar un servidor. Incluye diseño adaptable, cuatro miniaturas interactivas que cargan las webs originales, transiciones asociadas al desplazamiento, SEO básico y soporte para movimiento reducido.

## Publicar en GitHub y Vercel

1. Descomprime el ZIP. Crea un repositorio nuevo en GitHub y sube los archivos **del interior** de `portfolio-creativo` a la raíz del repositorio (`index.html`, `styles.css`, `main.js`, `favicon.svg`, `README.md`).
2. En Vercel, pulsa **Add New → Project**, importa ese repositorio y selecciona **Other** como Framework Preset. Deja Build Command en blanco y Output Directory en `.`. Pulsa **Deploy**.
3. Cada cambio que subas a la rama conectada se publicará mediante Vercel.

Para verlo en local, abre `index.html` en el navegador. Si prefieres un servidor local, desde la carpeta del proyecto ejecuta `python3 -m http.server 8000` y visita `http://localhost:8000`.

## Personalizar antes de publicarlo como portfolio real

- Las cuatro miniaturas cargan directamente las URL facilitadas mediante `iframe`. Pulsa «Explorar aquí» para navegar dentro y «Salir de la vista» para volver al scroll del portfolio. También hay un enlace para abrir cada web completa. Para reemplazarlas, cambia las URL de `src` y `href` en `index.html`. Los sitios originales deben seguir publicados y permitir su inclusión en marcos: si su servidor envía `X-Frame-Options` o una política `frame-ancestors` restrictiva, el navegador bloqueará la vista incrustada. En tal caso configura esos sitios para permitir el dominio del portfolio o aporta capturas/vídeos autorizados como alternativa.
- Sustituye `contacto@tu-dominio.com` por el correo confirmado. Ahora es un ejemplo; no se ha verificado que sea un buzón activo. Quita también el aviso bajo el botón de contacto.
- Sustituye «Estudio creativo» por el nombre definitivo, y ajusta el texto comercial, el título y la descripción SEO a la oferta definitiva. Evita afirmar resultados de posicionamiento sin datos propios.
- Si conectas un dominio, añade una URL canónica y etiquetas `og:url` y `og:image` con la URL e imagen definitivas. El contenido es una sola página, por lo que no necesita rutas ni configuración especial de Vercel.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño y marcos interactivos.
- `main.js`: menú, entradas y efectos de desplazamiento.
- `favicon.svg`: icono.
