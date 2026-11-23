/*
 * Lámina: Sacro y cóccix (vista anterior o pélvica, y vista posterior).
 * Es simétrico; la vista posterior usa `espejo: true`. Los forámenes sacros son huecos.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }
  var FORAMENES = [[110, 122, 9, 7], [116, 162, 8, 6], [122, 200, 7, 5], [128, 236, 6, 4]];
  var huecos = FORAMENES.map(function (f) { return elipse(f[0], f[1], f[2], f[3]) + ' ' + elipse(300 - f[0], f[1], f[2], f[3]); }).join(' ');

  var CONTORNO =
    'M60,70 C90,56 210,56 240,70 C250,90 246,120 232,150 C214,190 190,240 172,280 ' +
    'C166,292 134,292 128,280 C110,240 86,190 68,150 C54,120 50,90 60,70 Z ' +
    // Cóccix: cuatro piezas
    'M134,296 L166,296 L162,320 L138,320 Z M138,324 L162,324 L158,344 L142,344 Z ' +
    'M142,348 L158,348 L155,364 L145,364 Z M146,368 L154,368 L150,380 Z ' + huecos;

  function forZonas(id, conAncla) {
    var z = [];
    FORAMENES.forEach(function (f, i) {
      z.push({ id: id, tipo: 'elipse', cx: f[0], cy: f[1], rx: f[2] + 2, ry: f[3] + 2 });
      z.push({ id: id, tipo: 'elipse', cx: 300 - f[0], cy: f[1], rx: f[2] + 2, ry: f[3] + 2 });
    });
    z[2].ancla = [116, 162]; z[2].ly = 175;
    return z;
  }
  var COCCIX = { id: 'coccix', tipo: 'path', d: 'M132,294 L168,294 L150,384 Z' };
  var VERTICE = { id: 'vertice', tipo: 'path', d: 'M126,270 L174,270 C168,284 160,290 150,290 C140,290 132,284 126,270 Z' };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  var LAMINA = {
    id: 'sacro',
    estructura: 'sacro',
    titulo: 'Sacro y cóccix',
    subtitulo: 'Sacro y cóccix',
    ancho: 300,
    vistaNombres: '-190 30 680 370',
    vistaSola: '30 40 240 355',
    contorno: CONTORNO,
    descripcion: 'El sacro resulta de la fusión de cinco vértebras (S1–S5) y forma la pared posterior de la pelvis. Bajo él, el cóccix reúne de tres a cinco vértebras rudimentarias.',

    partes: {
      'promontorio': {
        nombre: 'Promontorio',
        descripcion: 'Borde anterior saliente de la cara superior de S1.',
        puntos: ['Forma parte de la línea terminal, el límite de la entrada de la pelvis menor.'],
        clinica: 'En obstetricia, la distancia del promontorio a la sínfisis del pubis (conjugado) indica si la pelvis es suficientemente amplia para el parto.',
        pista: 'Borde anterior saliente de S1, referencia obstétrica'
      },
      'ala-sacra': {
        nombre: 'Ala del sacro',
        descripcion: 'Expansión lateral a cada lado de la base del sacro.',
        puntos: ['Está formada por la fusión de los procesos transversos y costales de S1.', 'Sobre ella pasan el tronco lumbosacro y los vasos ilíacos.'],
        pista: 'Expansión lateral de la base del sacro'
      },
      'cara-pelvica': {
        nombre: 'Cara pélvica',
        descripcion: 'Cara anterior, cóncava, que mira hacia la pelvis.',
        puntos: ['Las líneas transversas marcan la fusión de los cuerpos vertebrales.', 'Sobre ella está el recto.'],
        pista: 'Cara anterior cóncava con líneas transversas'
      },
      'foramenes-sacros-anteriores': {
        nombre: 'Forámenes sacros anteriores',
        descripcion: 'Cuatro pares de agujeros en la cara pélvica.',
        puntos: ['Por ellos salen los ramos anteriores de los nervios sacros, que forman el plexo sacro.'],
        pista: 'Agujeros anteriores por donde salen los nervios del plexo sacro'
      },
      'vertice': {
        nombre: 'Vértice del sacro',
        descripcion: 'Extremo inferior estrecho del sacro.',
        puntos: ['Articula con el cóccix.'],
        pista: 'Extremo inferior del sacro que se une al cóccix'
      },
      'coccix': {
        nombre: 'Cóccix',
        descripcion: 'Hueso pequeño y triangular formado por la fusión de tres a cinco vértebras rudimentarias.',
        puntos: ['Inserción del glúteo mayor y de los músculos del suelo pélvico (elevador del ano).'],
        clinica: 'Tras una caída sentado puede doler mucho (coccigodinia).',
        pista: 'Restos de la cola al final de la columna'
      },
      'cresta-sacra-media': {
        nombre: 'Cresta sacra media',
        descripcion: 'Cresta vertical en la línea media de la cara posterior.',
        puntos: ['Son los procesos espinosos de las vértebras sacras fusionados.'],
        pista: 'Cresta posterior media formada por procesos espinosos fusionados'
      },
      'foramenes-sacros-posteriores': {
        nombre: 'Forámenes sacros posteriores',
        descripcion: 'Cuatro pares de agujeros en la cara posterior.',
        puntos: ['Por ellos salen los ramos posteriores de los nervios sacros.'],
        pista: 'Agujeros posteriores por donde salen los ramos posteriores sacros'
      },
      'hiato-sacro': {
        nombre: 'Hiato sacro',
        descripcion: 'Abertura inferior del conducto sacro, donde faltan las láminas de S5.',
        puntos: ['Está cerrado por un ligamento y a sus lados están los cuernos sacros.'],
        clinica: 'Por aquí se pone la anestesia caudal (un tipo de anestesia epidural), muy usada en niños.',
        pista: 'Abertura inferior del conducto sacro usada para la anestesia caudal'
      },
      'cuernos-sacros': {
        nombre: 'Cuernos sacros',
        descripcion: 'Dos pequeñas salientes a cada lado del hiato sacro.',
        puntos: ['Son restos de los procesos articulares inferiores de S5.', 'Se palpan y sirven para encontrar el hiato.'],
        pista: 'Salientes palpables a los lados del hiato sacro'
      },
      'cara-auricular': {
        nombre: 'Cara auricular',
        descripcion: 'Superficie articular en forma de oreja en cada borde lateral.',
        puntos: ['Articula con la cara auricular del ilion (articulación sacroilíaca).'],
        pista: 'Superficie lateral en forma de oreja que articula con el ilion'
      },
      'proceso-articular-superior': {
        nombre: 'Proceso articular superior',
        descripcion: 'Salientes de la base, uno a cada lado, por detrás.',
        puntos: ['Articulan con los procesos articulares inferiores de L5.'],
        pista: 'Salientes de la base que articulan con L5'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M118,142 C138,146 162,146 182,142 M124,182 C140,186 160,186 176,182 M130,220 C142,222 158,222 170,220' },
          { clase: 'linea', d: 'M110,70 C130,64 170,64 190,70' }
        ],
        zonas: [
          { id: 'cara-pelvica', tipo: 'path', d: 'M112,84 L188,84 C186,150 172,220 162,268 L138,268 C128,220 114,150 112,84 Z', ancla: [150, 180], ly: 190 },
          { id: 'promontorio', tipo: 'path', d: 'M110,64 C130,58 170,58 190,64 L188,82 C170,76 130,76 112,82 Z', ancla: [150, 72], ly: 50 },
          { id: 'ala-sacra', tipo: 'path', d: 'M60,70 C80,62 100,60 112,62 L112,100 C96,104 80,110 68,120 C58,104 56,86 60,70 Z', ancla: [84, 84], ly: 80 },
          { id: 'ala-sacra', tipo: 'path', d: 'M240,70 C220,62 200,60 188,62 L188,100 C204,104 220,110 232,120 C242,104 244,86 240,70 Z' },
          con(VERTICE, { ancla: [150, 280], ly: 285 }),
          con(COCCIX, { ancla: [150, 340], ly: 340 })
        ].concat(forZonas('foramenes-sacros-anteriores'))
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'rugoso', d: 'M150,84 L150,244' },
          { clase: 'sombra', d: 'M140,248 L160,248 C160,262 158,272 150,278 C142,272 140,262 140,248 Z' },
          { clase: 'rugoso', d: 'M64,84 C72,104 76,130 72,150 M236,84 C228,104 224,130 228,150' }
        ],
        zonas: [
          { id: 'cresta-sacra-media', tipo: 'rect', x: 144, y: 84, w: 12, h: 160, ancla: [150, 150], ly: 140 },
          { id: 'hiato-sacro', tipo: 'path', d: 'M140,248 L160,248 C160,262 158,272 150,278 C142,272 140,262 140,248 Z', ancla: [150, 262], ly: 255 },
          { id: 'cuernos-sacros', tipo: 'elipse', cx: 136, cy: 262, rx: 5, ry: 7, ancla: [136, 262], ly: 290 },
          { id: 'cuernos-sacros', tipo: 'elipse', cx: 164, cy: 262, rx: 5, ry: 7 },
          { id: 'cara-auricular', tipo: 'path', d: 'M60,80 C70,100 76,128 72,152 L84,150 C88,126 82,100 72,76 Z' },
          { id: 'cara-auricular', tipo: 'path', d: 'M240,80 C230,100 224,128 228,152 L216,150 C212,126 218,100 228,76 Z', ancla: [226, 120], ly: 120 },
          { id: 'proceso-articular-superior', tipo: 'elipse', cx: 118, cy: 68, rx: 11, ry: 8 },
          { id: 'proceso-articular-superior', tipo: 'elipse', cx: 182, cy: 68, rx: 11, ry: 8, ancla: [182, 66], ly: 55 },
          con(COCCIX, { ancla: [150, 340], ly: 340 })
        ].concat(forZonas('foramenes-sacros-posteriores'))
      }
    ]
  };

  window.LAMINAS.sacro = LAMINA;
  window.LAMINAS.coccix = LAMINA;   // el cóccix abre la misma lámina
})();
