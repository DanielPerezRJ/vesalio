/*
 * Lámina: Esternón (vista anterior).
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  var CONTORNO =
    'M104,52 C112,44 120,42 128,46 C136,56 164,56 172,46 C180,42 188,44 196,52 ' +
    'C206,70 206,100 194,124 C186,138 184,146 184,152 L182,160 L186,400 C186,412 176,420 166,424 ' +
    'L162,430 C162,456 156,476 150,486 C144,476 138,456 138,430 L134,424 C124,420 114,412 114,400 ' +
    'L118,160 L116,152 C116,146 114,138 106,124 C94,100 94,70 104,52 Z';

  // Incisuras costales: 2.ª en el ángulo esternal, 3.ª a 7.ª en el cuerpo
  var incisuras = [];
  [153, 196, 238, 280, 322, 364, 404].forEach(function (y, i) {
    incisuras.push({ id: 'incisuras-costales', tipo: 'elipse', cx: 116 + (i === 6 ? 2 : 0), cy: y, rx: 5, ry: 7 });
    incisuras.push({ id: 'incisuras-costales', tipo: 'elipse', cx: 184 - (i === 6 ? 2 : 0), cy: y, rx: 5, ry: 7 });
  });
  incisuras[4].ancla = [184, 238]; incisuras[4].ly = 238;

  window.LAMINAS.esternon = {
    id: 'esternon',
    estructura: 'esternon',
    titulo: 'Esternón',
    subtitulo: 'Esternón',
    ancho: 300,
    vistaNombres: '-190 25 680 480',
    vistaSola: '40 30 220 470',
    contorno: CONTORNO,
    descripcion: 'Hueso plano en la línea media del tórax, formado por el manubrio, el cuerpo y el proceso xifoides. Las clavículas y los cartílagos de las siete primeras costillas se unen a él.',

    partes: {
      'manubrio': {
        nombre: 'Manubrio',
        descripcion: 'Parte superior y más ancha del esternón, a la altura de T3–T4.',
        puntos: ['Articula con las clavículas y con el cartílago de la 1.ª costilla.', 'Se une al cuerpo en el ángulo esternal.'],
        pista: 'Parte superior ancha que articula con las clavículas'
      },
      'incisura-yugular': {
        nombre: 'Incisura yugular', alias: 'Escotadura supraesternal',
        descripcion: 'Escotadura en el borde superior del manubrio, entre las dos clavículas.',
        puntos: ['Se palpa en la base del cuello, a la altura de T2.', 'Detrás de ella está la tráquea.'],
        pista: 'Escotadura superior palpable en la base del cuello'
      },
      'incisura-clavicular': {
        nombre: 'Incisura clavicular',
        descripcion: 'Escotadura a cada lado del borde superior del manubrio.',
        puntos: ['Articula con el extremo esternal de la clavícula (articulación esternoclavicular).'],
        pista: 'Escotadura superolateral que recibe la clavícula'
      },
      'angulo-esternal': {
        nombre: 'Ángulo esternal', alias: 'Ángulo de Louis',
        descripcion: 'Relieve transversal donde se unen el manubrio y el cuerpo.',
        puntos: ['A cada lado se une la 2.ª costilla: es la referencia para empezar a contar costillas.', 'Marca el nivel T4–T5, donde se bifurca la tráquea y empieza y termina el arco de la aorta.'],
        pista: 'Relieve entre manubrio y cuerpo, a la altura de la 2.ª costilla'
      },
      'cuerpo': {
        nombre: 'Cuerpo del esternón',
        descripcion: 'Parte media, larga y plana.',
        puntos: ['Articula con los cartílagos de las costillas 2.ª a 7.ª.', 'Contiene médula ósea roja toda la vida.'],
        clinica: 'Por su médula roja y su posición superficial se usa para punción o aspiración de médula ósea. En la RCP se comprime la mitad inferior del esternón.',
        pista: 'Parte media del esternón con médula ósea roja'
      },
      'proceso-xifoides': {
        nombre: 'Proceso xifoides', alias: 'Apófisis xifoides',
        descripcion: 'Extremo inferior, pequeño y puntiagudo; es cartilaginoso en jóvenes y se osifica con la edad.',
        puntos: ['Allí se insertan fibras del diafragma y de los músculos abdominales.', 'Marca el nivel T9.'],
        clinica: 'En la RCP no hay que comprimir sobre él: podría fracturarse y lesionar el hígado.',
        pista: 'Punta inferior del esternón que se evita en la RCP'
      },
      'incisuras-costales': {
        nombre: 'Incisuras costales',
        descripcion: 'Escotaduras en los bordes laterales donde se unen los cartílagos costales.',
        puntos: ['Siete pares: la 1.ª en el manubrio, la 2.ª en el ángulo esternal y de la 3.ª a la 7.ª en el cuerpo.'],
        pista: 'Escotaduras laterales para los cartílagos costales'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M116,152 C130,148 170,148 184,152' },
          { clase: 'linea', d: 'M120,238 L180,238 M120,280 L180,280 M120,322 L180,322 M120,364 L180,364' },
          { clase: 'linea', d: 'M138,430 L162,430' },
          { clase: 'sombra', d: incisuras.map(function (z) {
            return 'M' + (z.cx - 4) + ',' + z.cy + ' a4,6 0 1,0 8,0 a4,6 0 1,0 -8,0 Z';
          }).join(' ') + ' M104,96 a4,6 0 1,0 8,0 a4,6 0 1,0 -8,0 Z M188,96 a4,6 0 1,0 8,0 a4,6 0 1,0 -8,0 Z' }
        ],
        zonas: [
          { id: 'cuerpo', tipo: 'rect', x: 120, y: 160, w: 62, h: 262, ancla: [146, 300], ly: 300 },
          { id: 'manubrio', tipo: 'path', d: 'M104,58 L196,58 C206,76 204,102 194,124 C186,138 184,144 184,148 L116,148 C116,144 114,138 106,124 C94,100 94,76 104,58 Z', ancla: [130, 100], ly: 100 },
          { id: 'incisura-yugular', tipo: 'path', d: 'M128,46 C136,56 164,56 172,46 L172,62 L128,62 Z', ancla: [150, 54], ly: 40 },
          { id: 'incisura-clavicular', tipo: 'elipse', cx: 110, cy: 56, rx: 9, ry: 8, ancla: [108, 56], ly: 58 },
          { id: 'incisura-clavicular', tipo: 'elipse', cx: 190, cy: 56, rx: 9, ry: 8 },
          { id: 'angulo-esternal', tipo: 'rect', x: 118, y: 146, w: 64, h: 12, ancla: [138, 152], ly: 160 },
          { id: 'proceso-xifoides', tipo: 'path', d: 'M138,426 L162,426 C162,456 156,476 150,486 C144,476 138,456 138,426 Z', ancla: [150, 456], ly: 460 }
        ].concat(incisuras)
      }
    ]
  };
})();
