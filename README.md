# Portfolio creativo

Web estática en HTML, CSS y JavaScript. No necesita instalar dependencias ni configurar un servidor. Incluye diseño adaptable, una galería horizontal de cuatro miniaturas interactivas que cargan las webs originales, transición de entrada con botón para saltarla y transiciones asociadas al desplazamiento, SEO básico y soporte para movimiento reducido.

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

## Galería horizontal

En ordenador, la rueda desplaza los proyectos en horizontal cuando el cursor está sobre la galería. También se pueden usar las flechas. Al pasar el cursor o enfocar una tarjeta, esta se amplía como un icono del Dock. En móvil, desliza con el dedo; cada tarjeta encaja en pantalla. «Explorar aquí» activa la web dentro del marco y «Abrir web» la abre completa. Si una web externa impide su inclusión en iframe, seguirá disponible el enlace para abrirla.

La interfaz emplea tres colores: negro `#171717`, crema `#f4f0e7` y verde lima `#d7ff37`. Los contenidos de las webs externas y la fotografía conservan sus colores originales.

## Ajuste de miniaturas

Los cuatro proyectos comparten un visor de 1440 píxeles adaptado al ancho disponible. El proyecto 4 usa exactamente el mismo encuadre y escala. La carga de la URL incrustada sigue dependiendo de la configuración del sitio de origen.

## Nueva dirección visual

La versión inmersiva incorpora fotografía editorial de un equipo creativo con animación automática sutil, capítulos de scroll, capas con profundidad, entrada con transición y marcos interactivos. El movimiento se reduce automáticamente si el visitante lo solicita en su dispositivo. Se inspira en la narrativa visual de los cuatro estudios indicados, sin reutilizar sus textos ni recursos.

La portada utiliza `assets/hero-marketing.webp`, incluida en el proyecto, con movimiento lento y tarjetas temáticas de estrategia, diseño web y SEO. No utiliza seguimiento del puntero. La fotografía es una imagen creada para este diseño y representa una escena ilustrativa; no debe presentarse como una foto del equipo real de la empresa.

## Móvil

La portada, la intro, las cuatro miniaturas, los textos, la navegación y el pie se adaptan a pantallas pequeñas. Los visores usan una anchura virtual móvil o de tableta para mostrar las versiones responsive de cada proyecto. Las tarjetas de la portada desaparecen en móvil para dejar visible la foto y el mensaje.
