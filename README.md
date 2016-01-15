# SVG Icon Sprite
### Workflow para crear un sprite de iconos SVG con fallback en PNG

#### Automatización del proceso con Gulp:

1. Convierte una carpeta con iconos en formato svg en un único archivo .SVG ("svg-sprite-icons.svg") que contiene todos los iconos en un solo sprite.
2. Cada icono se incluye dentro de un elemento `symbol` cuyo `id` se corresponde con el nombre del archivo svg.
3. El código de cada archivo .SVG se optimiza con **SVGO** antes de incluirse en el sprite.
4. **Fallback:** se contruye un icono en formato .PNG para cada icono svg.
5. Se crean los siguientes directorios:

```
`-- sprite
        `-- svg-sprite-icons.svg
`-- pngicons
        `-- icon.png
```

#### Instalación y ejecución del workflow:

1. Clonamos o bajamos el repositorio.
2. Ejecutamos `npm install` para instalar las dependencias.
3. Colocamos nuestros iconos en formato .svg dentro de la carpeta "build/".
4. Ejecutamos `gulp sprite` para optimizar los .SVG, crear el sprite y crear los .PNG para el fallback.
5. El sprite resultante se almacena en "sprite/svg-sprite-icons.svg"
6. Se incluye un task `svgWatch` que actualiza el HTML resultante.

#### Uso del sprite SVG

Utilizaremos **SVG inline** con referencia a un archivo externo:

```html
<svg>
<use xlink:href="sprite/symbol/svg/sprite.symbol.svg#id_SVG"/></use>
</svg>
```
Para que el sitema de referenciado a un archivo externo funcione en **gte IE9**, utilizaremos la libreria javascript [SVG4everybody](https://github.com/jonathantneal/svg4everybody).

#### Fallback en PNG

Tenemos la posibilidad de utilizar un fallback PNG para versiones **lte IE8** y Android 2.3. El nombre del archivo PNG será el mismo que el `id` del .SVG que estamos utilizando. Para una mayor comprensión del fallback, consultar la página [A Complete Guide to SVG Fallbacks](https://css-tricks.com/a-complete-guide-to-svg-fallbacks/).

```html
<svg>
<use xlink:href="sprite/symbol/svg/sprite.symbol.svg#id_SVG"/></use>
<image src="sprite/pngicons/id_SVG.png" xlink:href="">
</svg>
```

#### Accesibilidad

Si creamos el .SVG con **Sketch**, el código resultante ya incluye las etiquetas `title` y `description`.

Si creamos el .SVG con **Illustrator** no he encontrado todavía la manera de incluir, en el código, las etiquetas `title` y `description`. En este caso incluiremos la etiqueta `title`, a mano, dentro del código de cada icono.

```html
<symbol viewBox="0 0 64 64" id="baths"><title>Icono de baños</title><path d="M.1 32.2v8c0..."></symbol>
```

> La rutina de Gulp que ejecuta el workflow elimina cualquier etiqueta `description`, manteniendo únicamente las etiquetas `title`.

#### To do...

Es importante definir un **sistema de versionado** para el sprite resultante *sprite.symbol.svg.*






