# Portfolio creativo

Web estática en HTML, CSS y JavaScript. No necesita instalar dependencias ni configurar un servidor. Incluye diseño adaptable, una galería horizontal de cinco miniaturas interactivas que cargan las webs originales, transición de entrada con botón para saltarla y transiciones asociadas al desplazamiento, SEO básico y soporte para movimiento reducido.

## Publicar en GitHub y Vercel

1. Descomprime el ZIP. Crea un repositorio nuevo en GitHub y sube los archivos **del interior** de `portfolio-creativo` a la raíz del repositorio (`index.html`, `styles.css`, `main.js`, `favicon.svg`, `README.md`).
2. En Vercel, pulsa **Add New → Project**, importa ese repositorio y selecciona **Other** como Framework Preset. Deja Build Command en blanco y Output Directory en `.`. Pulsa **Deploy**.
3. Cada cambio que subas a la rama conectada se publicará mediante Vercel.

Para verlo en local, abre `index.html` en el navegador. Si prefieres un servidor local, desde la carpeta del proyecto ejecuta `python3 -m http.server 8000` y visita `http://localhost:8000`.

## Personalizar antes de publicarlo como portfolio real

- Las cinco miniaturas cargan directamente las URL facilitadas mediante `iframe`. Pulsa «Ampliar proyecto» o toca la tarjeta para abrir una vista grande; el botón «Cerrar» devuelve a la galería. Para reemplazarlas, cambia las URL de `src` y `href` en `index.html`. Los sitios originales deben seguir publicados y permitir su inclusión en marcos: si su servidor envía `X-Frame-Options` o una política `frame-ancestors` restrictiva, el navegador bloqueará la vista incrustada. En tal caso configura esos sitios para permitir el dominio del portfolio o utiliza capturas/vídeos autorizados como alternativa.
- Sustituye `contacto@tu-dominio.com` por el correo confirmado. Ahora es un ejemplo; no se ha verificado que sea un buzón activo. Quita también el aviso bajo el botón de contacto.
- Sustituye «Estudio creativo» por el nombre definitivo, y ajusta el texto comercial, el título y la descripción SEO a la oferta definitiva. Evita afirmar resultados de posicionamiento sin datos propios.
- Si conectas un dominio, añade una URL canónica y etiquetas `og:url` y `og:image` con la URL e imagen definitivas. El contenido es una sola página, por lo que no necesita rutas ni configuración especial de Vercel.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño y marcos interactivos.
- `main.js`: menú, entradas y efectos de desplazamiento.
- `favicon.svg`: icono.

## Galería horizontal

En ordenador, la rueda desplaza los proyectos en horizontal cuando el cursor está sobre la galería. También se pueden usar las flechas. Al pasar el cursor o enfocar una tarjeta, esta se amplía como un icono del Dock. En móvil, desliza con el dedo; cada tarjeta encaja en pantalla. «Ampliar proyecto» abre una ventana grande con la web a escala real, que se puede recorrer verticalmente. Si una web externa impide su inclusión en iframe, será necesario habilitar ese dominio en la configuración del sitio de origen.

La interfaz emplea tres colores: tinta suave `#303431`, crema `#f4f0e7` y verde lima `#d7ff37`. Los contenidos de las webs externas y la fotografía conservan sus colores originales.

## Ajuste de miniaturas

Las miniaturas usan una vista escalada; al ampliarlas, el iframe ocupa la pantalla disponible y la web responde al ancho del dispositivo. El proyecto 4 usa el mismo comportamiento que los demás. La carga de la URL incrustada sigue dependiendo de la configuración del sitio de origen.

## Nueva dirección visual

La versión inmersiva incorpora fotografía editorial de un equipo creativo con animación automática sutil, capítulos de scroll, capas con profundidad, entrada con transición y marcos interactivos. El movimiento se reduce automáticamente si el visitante lo solicita en su dispositivo. Se inspira en la narrativa visual de los cuatro estudios indicados, sin reutilizar sus textos ni recursos.

La portada utiliza `assets/hero-marketing.webp`, incluida en el proyecto, con movimiento lento y tarjetas temáticas de estrategia, diseño web y SEO. No utiliza seguimiento del puntero. La fotografía es una imagen creada para este diseño y representa una escena ilustrativa; no debe presentarse como una foto del equipo real de la empresa.

## Móvil

La portada, la intro, las cinco miniaturas, los textos, la navegación y el pie se adaptan a pantallas pequeñas. Los visores usan una anchura virtual móvil o de tableta para mostrar las versiones responsive de cada proyecto. Las tarjetas de la portada desaparecen en móvil para dejar visible la foto y el mensaje.

Los iconos de flechas, menú y controles son vectoriales y mantienen el mismo aspecto en móvil y ordenador.

El indicador de la galería cambia de 01 a 05 con el desplazamiento, las flechas, el foco y el cursor. La interfaz usa fondos claros en la mayoría de las secciones.

## Vista ampliada

Toca una tarjeta o su botón para abrir el proyecto. La apertura y el cierre tienen una transición suave; se puede cerrar con el botón superior, pulsando fuera del panel en escritorio o con Escape cuando el foco está en los controles. La miniatura conserva su posición en la galería. La carga dentro de la vista ampliada sigue sujeta a las restricciones de iframe del sitio original; será necesario que la web de origen permita la carga en iframe.

## Desplazamiento y controles

Cada tarjeta tiene ancho estable para evitar saltos al mover la galería. Usa las flechas, el gesto horizontal del trackpad o desliza con el dedo en móvil. La rueda vertical se aplica a la galería mientras haya proyectos en esa dirección; al llegar al extremo, continúa el desplazamiento normal de la página. La única acción de cada proyecto es «Ampliar proyecto». El indicador lateral de capítulos se ha eliminado.

El tamaño de cada tarjeta cambia de forma progresiva según su posición en la galería, también en móvil. El proyecto que entra en foco crece y el anterior vuelve a su tamaño, sin modificar el ancho reservado para cada tarjeta.

## Quinto proyecto y nombres

La galería contiene cinco proyectos. Los títulos visibles son Estilo sensorial, Estilo editorial, Estilo futurista, Estilo narrativo y Estilo contemporáneo. El quinto visor apunta a `https://prueba-altagracia.vercel.app/`. El contador se actualiza de 01 a 05.

En ordenador, con la galería a la vista, las teclas ← y → cambian entre proyectos. El verde se aplica solo a la tarjeta que llega a la posición de foco; durante el tránsito se retira del proyecto anterior antes de activarse en el siguiente.
