# Portfolio Grupo Loang

Web estática en HTML, CSS y JavaScript. No necesita instalar dependencias ni configurar un servidor. Incluye diseño adaptable, cuatro escenas visuales creadas con CSS, transiciones asociadas al desplazamiento, SEO básico y soporte para movimiento reducido.

## Publicar en GitHub y Vercel

1. Descomprime el ZIP. Crea un repositorio nuevo en GitHub y sube los archivos **del interior** de `portfolio-loang` a la raíz del repositorio (`index.html`, `styles.css`, `main.js`, `favicon.svg`, `README.md`).
2. En Vercel, pulsa **Add New → Project**, importa ese repositorio y selecciona **Other** como Framework Preset. Deja Build Command en blanco y Output Directory en `.`. Pulsa **Deploy**.
3. Cada cambio que subas a la rama conectada se publicará mediante Vercel.

Para verlo en local, abre `index.html` en el navegador. Si prefieres un servidor local, desde la carpeta del proyecto ejecuta `python3 -m http.server 8000` y visita `http://localhost:8000`.

## Personalizar antes de publicarlo como portfolio real

- Los cuatro paneles son **conceptos visuales ilustrativos**. No son capturas ni atribuciones verificadas de los enlaces proporcionados. Sustituye sus textos, sectores y escenas por proyectos reales. Los enlaces «Ver referencia» apuntan a las cuatro URL facilitadas y pueden cambiarse en `index.html`.
- Sustituye `hola@grupoloang.com` por el correo confirmado. Ahora es un ejemplo; no se ha verificado que sea un buzón activo. Quita también el aviso bajo el botón de contacto.
- Ajusta el nombre de empresa, el texto comercial, el título y la descripción SEO a la oferta definitiva. Evita afirmar resultados de posicionamiento sin datos propios.
- Si conectas un dominio, añade una URL canónica y etiquetas `og:url` y `og:image` con la URL e imagen definitivas. El contenido es una sola página, por lo que no necesita rutas ni configuración especial de Vercel.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño y escenas visuales.
- `main.js`: menú, entradas y efectos de desplazamiento.
- `favicon.svg`: icono.
