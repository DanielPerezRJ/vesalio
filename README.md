# Vesalio

Atlas interactivo para estudiar el ramo **Anatomía e Histología** (Química y Farmacia). Funciona en ordenador y móvil.
El nombre homenajea a Andrés Vesalio (1514–1564), considerado el padre de la anatomía moderna.

**Pruébala aquí:** https://danielperezrj.github.io/vesalio/

## Cómo abrirlo
- Doble clic en `index.html`, o bien
- `node servidor.js` y abrir http://localhost:5173 (también desde el móvil en la misma red Wi‑Fi, usando la IP del ordenador).

## Modos
- **Explorar**: toca un hueso y verás su ficha (descripción, puntos clave, articulaciones y relevancia clínica).
- **Encuentra**: la app te da un nombre y tú lo tocas en la figura.
- **Quiz**: identifica la estructura resaltada o adivínala a partir de una pista.

El progreso se guarda en el navegador, y lo que fallas aparece más a menudo.

## Láminas detalladas
Algunos huesos tienen una lámina con sus accidentes óseos (por ahora el **húmero**, en vistas anterior y posterior).
Se abre desde la ficha del hueso con «Ver lámina detallada». Los tres modos funcionan también dentro de la lámina,
y el botón «Nombres» oculta los rótulos para practicar.

## Estructura
```
index.html              página
css/estilos.css         estilos (modo claro/oscuro, móvil)
js/app.js               lógica (modos, figura, láminas, progreso)
js/sistemas/oseo.js     datos + dibujo del esqueleto completo
js/laminas/humero.js    lámina detallada del húmero
```

## Añadir una lámina
Crea `js/laminas/<hueso>.js` siguiendo `humero.js`: `partes` (fichas), `contorno` y `vistas` (dibujo + zonas clicables
con `ancla` y `ly` para los rótulos). La clave debe coincidir con el `id` del hueso en `oseo.js`.
Añade su `<script>` en `index.html` antes de `app.js`.

## Añadir un sistema nuevo
Crea `js/sistemas/<sistema>.js` con la misma forma que `oseo.js` (`regiones`, `estructuras`, `formas`),
regístralo en `window.SISTEMAS` y añade su `<script>` en `index.html` antes de `app.js`.
