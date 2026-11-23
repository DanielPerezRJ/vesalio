/*
 * Lámina: Costilla típica (por ejemplo, la 6.ª), vista por su cara interna.
 * El extremo vertebral (cabeza) queda a la izquierda y el extremo esternal abajo a la derecha.
 * Mismo formato que humero.js; una sola vista.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var CONTORNO =
    'M22,158 C50,126 88,82 140,74 C206,64 264,112 284,200 C292,240 290,282 282,322 L262,322 ' +
    'C270,282 271,242 263,205 C246,128 198,98 142,104 C100,110 72,142 46,184 ' +
    'C38,192 24,190 18,180 C12,170 14,162 22,158 Z';

  window.LAMINAS['costillas-verdaderas'] = {
    id: 'costilla',
    estructura: 'costillas-verdaderas',
    titulo: 'Costilla típica',
    subtitulo: 'Costilla típica (6.ª)',
    ancho: 300,
    vistaNombres: '-150 30 600 320',
    vistaSola: '0 50 300 290',
    contorno: CONTORNO,
    descripcion: 'Las costillas 3.ª a 9.ª (verdaderas y falsas) tienen la misma forma: un extremo posterior que articula con la columna, un cuerpo largo y curvo, y un extremo anterior que se une al cartílago costal. Las flotantes (11.ª y 12.ª) son más cortas y casi no tienen cuello ni tubérculo.',

    partes: {
      'cabeza': {
        nombre: 'Cabeza de la costilla',
        descripcion: 'Extremo posterior, con dos carillas articulares separadas por una cresta.',
        puntos: ['Articula con los cuerpos de dos vértebras torácicas: la de su mismo número y la de arriba (articulación de la cabeza de la costilla).'],
        pista: 'Extremo posterior con dos carillas que articulan con dos cuerpos vertebrales'
      },
      'cuello': {
        nombre: 'Cuello de la costilla',
        descripcion: 'Segmento estrecho y aplanado entre la cabeza y el tubérculo.',
        puntos: ['Queda por delante del proceso transverso de la vértebra, unido a él por el ligamento costotransverso.'],
        pista: 'Segmento estrecho entre la cabeza y el tubérculo'
      },
      'tuberculo': {
        nombre: 'Tubérculo de la costilla',
        descripcion: 'Eminencia en la cara posterior, donde el cuello se une al cuerpo.',
        puntos: ['Su carilla articula con el proceso transverso de su vértebra (articulación costotransversa).'],
        pista: 'Eminencia que articula con el proceso transverso de la vértebra'
      },
      'angulo': {
        nombre: 'Ángulo de la costilla',
        descripcion: 'Punto donde el cuerpo cambia bruscamente de dirección y se curva hacia delante.',
        puntos: ['Marca el límite lateral de los músculos erectores de la columna (iliocostal).'],
        clinica: 'Es la zona más débil de la costilla y donde más se fractura.',
        pista: 'Zona donde la costilla cambia de dirección; la más frágil'
      },
      'cuerpo': {
        nombre: 'Cuerpo de la costilla',
        descripcion: 'La parte más larga: delgada, plana y curva, con una cara externa, una interna y dos bordes.',
        puntos: ['La cara interna mira hacia la pleura y los pulmones.', 'Entre cuerpos de costillas vecinas están los músculos intercostales.'],
        pista: 'Parte larga, plana y curva de la costilla'
      },
      'surco-costal': {
        nombre: 'Surco costal',
        descripcion: 'Canal a lo largo del borde inferior de la cara interna.',
        puntos: ['Aloja la vena, la arteria y el nervio intercostales, en ese orden de arriba abajo (VAN).'],
        clinica: 'Por eso las punciones y drenajes del tórax se hacen por el borde superior de la costilla de abajo, y el bloqueo intercostal con anestésico local (lidocaína, bupivacaína) se inyecta bajo el borde inferior. Si la aguja entra demasiado puede causar un neumotórax.',
        pista: 'Canal del borde inferior por donde corren vena, arteria y nervio intercostales'
      },
      'extremo-esternal': {
        nombre: 'Extremo esternal',
        alias: 'Extremo anterior',
        descripcion: 'Extremo anterior con una pequeña depresión donde se encaja el cartílago costal.',
        puntos: ['La unión hueso-cartílago es la articulación costocondral.'],
        clinica: 'La inflamación de estas uniones (costocondritis) causa dolor torácico que imita un problema cardíaco; suele tratarse con antiinflamatorios (AINE).',
        pista: 'Extremo anterior donde se une el cartílago costal'
      }
    },

    vistas: [
      {
        id: 'interna',
        nombre: 'Vista interna',
        espejo: false,
        dibujo: [
          { clase: 'sombra', d: elipse(80, 104, 10, 8) },
          { clase: 'linea', d: 'M18,172 C24,168 30,170 36,176' },
          { clase: 'linea', d: 'M112,82 C114,92 116,100 118,108' },
          { clase: 'sombra', d: 'M150,102 C200,98 244,132 258,204 L264,204 C250,126 200,96 146,104 Z' },
          { clase: 'linea', d: 'M262,318 C268,314 276,314 282,318' }
        ],
        zonas: [
          { id: 'cuerpo', tipo: 'path', d: 'M140,74 C206,64 264,112 284,200 C292,240 290,282 286,300 L266,300 C271,262 271,242 263,205 C246,128 198,98 142,104 Z', ancla: [200, 90], ly: 75 },
          { id: 'surco-costal', tipo: 'path', d: 'M148,98 C202,94 248,130 262,204 L256,206 C242,136 198,106 148,106 Z', ancla: [236, 150], ly: 165 },
          { id: 'angulo', tipo: 'path', d: 'M104,86 L128,76 L134,104 L110,110 Z', ancla: [118, 92], ly: 55 },
          { id: 'cuello', tipo: 'path', d: 'M40,156 C52,140 62,128 72,118 L88,134 C74,146 62,162 52,180 Z', ancla: [60, 152], ly: 150 },
          { id: 'tuberculo', tipo: 'elipse', cx: 80, cy: 104, rx: 10, ry: 8, ancla: [80, 102], ly: 100 },
          { id: 'cabeza', tipo: 'elipse', cx: 28, cy: 174, rx: 13, ry: 14, ancla: [26, 176], ly: 200 },
          { id: 'extremo-esternal', tipo: 'path', d: 'M266,300 L286,300 L282,322 L262,322 Z', ancla: [274, 312], ly: 312 }
        ]
      }
    ]
  };
  // Los tres tipos de costilla abren la misma lámina de costilla típica
  window.LAMINAS['costillas-falsas'] = window.LAMINAS['costillas-verdaderas'];
  window.LAMINAS['costillas-flotantes'] = window.LAMINAS['costillas-verdaderas'];
})();
