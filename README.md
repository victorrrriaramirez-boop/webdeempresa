# Portfolio creativo

Web estática en HTML, CSS y JavaScript para mostrar seis estilos de diseño web. Incluye una galería horizontal con miniaturas de las webs, ampliación a pantalla grande, navegación mediante flechas y teclado en ordenador, desplazamiento táctil en móvil y preferencias de movimiento reducido. La portada usa una imagen ilustrativa original de una estación de trabajo; no representa al equipo real.

## Publicar en GitHub y Vercel

1. Descomprime el ZIP y sube el contenido de `portfolio-creativo` a la raíz de un repositorio de GitHub (`index.html`, `styles.css`, `editorial.css`, `main.js`, `favicon.svg` y la carpeta `assets`).
2. En Vercel, crea un proyecto desde ese repositorio. Selecciona `Other` como Framework Preset, deja Build Command vacío y usa `.` como Output Directory.
3. Publica el proyecto. Los cambios posteriores en la rama conectada actualizarán la web.

También puedes abrir `index.html` en local o ejecutar `python3 -m http.server 8000` desde esta carpeta.

## Personalizar antes de publicar

- Sustituye `contacto@tu-dominio.com` por un correo real y elimina el aviso que aparece bajo el botón de contacto.
- Cambia «Estudio creativo» por el nombre definitivo y actualiza el título y la descripción SEO.
- Añade `canonical`, `og:url` y `og:image` cuando conozcas el dominio e imagen definitivos.

## Proyectos

| N.º | Estilo visible | URL del visor |
| --- | --- | --- |
| 01 | Sensorial | https://uno-sigma-eight.vercel.app/ |
| 02 | Editorial | https://dos-ivory.vercel.app/ |
| 03 | Futurista | https://tres-zeta.vercel.app/ |
| 04 | Narrativo | https://cuatro-seven.vercel.app/ |
| 05 | Contemporáneo | https://prueba-altagracia.vercel.app/ |
| 06 | Cosmético | https://ocho-five.vercel.app/ |

Las miniaturas y la vista ampliada cargan las webs mediante `iframe`. Si una web de origen bloquea su inclusión con `X-Frame-Options` o `Content-Security-Policy: frame-ancestors`, habrá que permitir el dominio del portfolio desde la configuración de esa web para que aparezca dentro del visor.

## Diseño e interacción

La interfaz utiliza tinta suave `#303431`, crema `#f4f0e7` y verde lima `#d7ff37`. La portada presenta la agencia de marketing y su servicio de páginas web a medida, con un mensaje breve y un botón hacia los seis estilos. Su fotografía se encuentra en `assets/hero-minimal-web.webp` y permanece estática.

En ordenador, usa las flechas de la galería, las teclas izquierda y derecha cuando la sección está visible, o el desplazamiento horizontal. En móvil, desliza las tarjetas. El proyecto que entra en foco crece y toma el verde. Pulsa «Ampliar proyecto» para recorrer su web en una vista grande; «Cerrar» devuelve a la galería.

## Dirección editorial

Tipografía serif, fondos claros, mensajes breves y espacios amplios. La portada presenta la agencia y las páginas web a medida. La fotografía estática aparece debajo del mensaje; se elimina la introducción. Los ajustes visuales están en `editorial.css`.

## Portada animada

El titular tiene contraste oscuro sobre crema. La imagen se sustituye por una composición original en HTML/CSS: una web toma forma al desplazarse y una escultura gráfica flota suavemente. No requiere vídeos externos; respeta movimiento reducido.

La última portada utiliza un rótulo verde sobre fondo oscuro y una composición cinética original de anillos con giro continuo y avance vinculado al scroll. Sustituye al mockup y a la fotografía.
