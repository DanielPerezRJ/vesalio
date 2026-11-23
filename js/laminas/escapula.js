/*
 * Lámina: Escápula derecha (vista anterior o costal, y vista posterior).
 * Coordenadas base: lado LATERAL (cavidad glenoidal) a la izquierda, borde MEDIAL a la derecha.
 * La vista posterior usa `espejo: true`.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var CONTORNO =
    'M258,86 C228,90 196,96 168,100 C164,112 150,114 146,102 L136,100 ' +
    'C130,84 116,66 100,58 C90,54 84,62 90,70 C100,80 108,92 112,108 ' +
    'C104,104 96,98 88,90 C78,70 62,52 46,48 C30,44 24,60 34,70 C44,80 52,96 56,116 ' +
    'C48,130 46,170 56,186 C64,196 76,198 82,192 ' +
    'C100,260 150,400 212,522 C220,530 232,526 234,514 ' +
    'C246,380 258,200 262,100 C262,92 260,88 258,86 Z';

  var Z = {
    acromion: { id: 'acromion', tipo: 'path', d: 'M88,90 C78,70 62,52 46,48 C30,44 24,60 34,70 C44,80 52,96 56,112 Z' },
    glenoidal: { id: 'cavidad-glenoidal', tipo: 'elipse', cx: 56, cy: 152, rx: 10, ry: 32 },
    infraglenoideo: { id: 'tuberculo-infraglenoideo', tipo: 'elipse', cx: 80, cy: 200, rx: 8, ry: 9 },
    incisura: { id: 'incisura-escapular', tipo: 'elipse', cx: 156, cy: 104, rx: 9, ry: 7 },
    anguloSup: { id: 'angulo-superior', tipo: 'elipse', cx: 252, cy: 100, rx: 10, ry: 12 },
    anguloInf: { id: 'angulo-inferior', tipo: 'path', d: 'M204,492 L238,480 C236,500 236,520 230,526 C222,530 214,526 210,518 Z' },
    bordeMedial: { id: 'borde-medial', tipo: 'path', d: 'M248,140 L262,140 C258,260 250,380 240,470 L228,470 C238,380 246,260 248,140 Z' },
    bordeLateral: { id: 'borde-lateral', tipo: 'path', d: 'M88,212 C120,290 160,400 198,480 L188,488 C150,406 110,296 78,216 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.escapula = {
    id: 'escapula',
    estructura: 'escapula',
    titulo: 'Escápula',
    subtitulo: 'Escápula derecha',
    ancho: 300,
    vistaNombres: '-200 20 680 530',
    vistaSola: '10 30 270 510',
    contorno: CONTORNO,
    descripcion: 'Hueso plano y triangular de la parte posterior del tórax. Une el húmero con la clavícula y es el origen de los músculos del manguito rotador.',

    partes: {
      'cavidad-glenoidal': {
        nombre: 'Cavidad glenoidal', alias: 'Cavidad glenoidea',
        descripcion: 'Superficie articular ovalada y poco profunda en el ángulo lateral.',
        puntos: ['Recibe la cabeza del húmero (articulación glenohumeral).', 'Un anillo de fibrocartílago, el labrum glenoideo, la hace algo más profunda.'],
        clinica: 'Como es tan poco profunda, el hombro es la articulación que más se luxa, casi siempre hacia delante.',
        pista: 'Superficie articular poco profunda que recibe la cabeza del húmero'
      },
      'tuberculo-supraglenoideo': {
        nombre: 'Tubérculo supraglenoideo',
        descripcion: 'Pequeña eminencia justo encima de la cavidad glenoidal.',
        puntos: ['Origen de la cabeza larga del bíceps braquial.'],
        pista: 'Eminencia sobre la cavidad glenoidal donde nace la cabeza larga del bíceps'
      },
      'tuberculo-infraglenoideo': {
        nombre: 'Tubérculo infraglenoideo',
        descripcion: 'Superficie rugosa justo debajo de la cavidad glenoidal.',
        puntos: ['Origen de la cabeza larga del tríceps braquial.'],
        pista: 'Rugosidad bajo la cavidad glenoidal donde nace la cabeza larga del tríceps'
      },
      'proceso-coracoides': {
        nombre: 'Proceso coracoides', alias: 'Apófisis coracoides',
        descripcion: 'Proyección en forma de gancho que sale del borde superior y se dirige hacia delante.',
        puntos: ['Inserción del pectoral menor.', 'Origen del coracobraquial y de la cabeza corta del bíceps braquial.', 'Los ligamentos coracoclaviculares la unen a la clavícula.'],
        pista: 'Gancho anterior donde se inserta el pectoral menor'
      },
      'acromion': {
        nombre: 'Acromion',
        descripcion: 'Extremo lateral y aplanado de la espina; forma el punto más alto del hombro.',
        puntos: ['Articula con la clavícula (articulación acromioclavicular).', 'Origen de la parte media del deltoides.'],
        clinica: 'Es la referencia para la inyección intramuscular en el deltoides (por ejemplo, las vacunas): se pincha unos 3 traveses de dedo bajo el acromion para no dañar el nervio axilar.',
        pista: 'Punto más alto del hombro; referencia para la inyección en el deltoides'
      },
      'espina': {
        nombre: 'Espina de la escápula',
        descripcion: 'Cresta ósea gruesa en la cara posterior, que cruza en diagonal y termina en el acromion.',
        puntos: ['Separa la fosa supraespinosa de la infraespinosa.', 'Inserción del trapecio y origen de la parte posterior del deltoides.', 'Se palpa bajo la piel de la espalda.'],
        pista: 'Cresta posterior que separa las fosas supra e infraespinosa'
      },
      'fosa-supraespinosa': {
        nombre: 'Fosa supraespinosa',
        descripcion: 'Depresión de la cara posterior, por encima de la espina.',
        puntos: ['Origen del músculo supraespinoso (manguito rotador).'],
        clinica: 'El tendón del supraespinoso es el que más se lesiona del manguito rotador, por roce bajo el acromion (síndrome de pinzamiento subacromial). A veces se trata con infiltraciones de corticoides.',
        pista: 'Fosa posterior sobre la espina, origen del supraespinoso'
      },
      'fosa-infraespinosa': {
        nombre: 'Fosa infraespinosa',
        descripcion: 'Gran superficie de la cara posterior, por debajo de la espina.',
        puntos: ['Origen del músculo infraespinoso (manguito rotador).'],
        pista: 'Gran fosa posterior bajo la espina, origen del infraespinoso'
      },
      'fosa-subescapular': {
        nombre: 'Fosa subescapular',
        descripcion: 'Cara anterior (costal) de la escápula, cóncava, que mira hacia las costillas.',
        puntos: ['Origen del músculo subescapular (manguito rotador).', 'Tiene crestas oblicuas para los tabiques del músculo.'],
        pista: 'Cara anterior cóncava que mira a las costillas, origen del subescapular'
      },
      'incisura-escapular': {
        nombre: 'Incisura escapular', alias: 'Escotadura coracoidea',
        descripcion: 'Escotadura en el borde superior, junto a la base del proceso coracoides.',
        puntos: ['El ligamento transverso superior la convierte en un agujero.', 'Por ella pasa el nervio supraescapular.'],
        pista: 'Escotadura del borde superior por donde pasa el nervio supraescapular'
      },
      'angulo-superior': {
        nombre: 'Ángulo superior',
        descripcion: 'Unión de los bordes superior y medial.',
        puntos: ['Inserción del elevador de la escápula.', 'Queda a la altura de la 2.ª costilla.'],
        pista: 'Ángulo superomedial donde se inserta el elevador de la escápula'
      },
      'angulo-inferior': {
        nombre: 'Ángulo inferior',
        descripcion: 'Punta inferior de la escápula, unión de los bordes medial y lateral.',
        puntos: ['Queda a la altura de la 7.ª costilla o de la vértebra T7: es una referencia en la exploración del tórax.', 'Origen del redondo mayor.'],
        pista: 'Punta inferior, a la altura de T7'
      },
      'borde-medial': {
        nombre: 'Borde medial', alias: 'Borde vertebral',
        descripcion: 'Borde largo que mira a la columna vertebral.',
        puntos: ['Inserción de los romboides y del elevador de la escápula (por detrás) y del serrato anterior (por delante).'],
        clinica: 'Si se lesiona el nervio torácico largo, el serrato anterior se paraliza y el borde medial se despega del tórax: es la "escápula alada".',
        pista: 'Borde vertebral donde se insertan los romboides y el serrato anterior'
      },
      'borde-lateral': {
        nombre: 'Borde lateral', alias: 'Borde axilar',
        descripcion: 'Borde grueso que va desde la cavidad glenoidal hasta el ángulo inferior, hacia la axila.',
        puntos: ['Origen de los músculos redondo menor y redondo mayor.'],
        pista: 'Borde grueso que mira a la axila'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'sombra', d: elipse(56, 152, 10, 32) },
          { clase: 'linea', d: 'M140,180 C170,200 200,226 232,248 M122,252 C160,272 200,302 234,330 M140,340 C174,362 204,390 230,412' },
          { clase: 'linea', d: 'M112,108 C118,112 126,110 136,100' }
        ],
        zonas: [
          { id: 'fosa-subescapular', tipo: 'path', d: 'M118,128 C160,118 220,110 250,112 C246,250 236,400 226,488 C188,420 140,300 98,204 Z', ancla: [188, 260], ly: 260 },
          con(Z.bordeMedial, { ancla: [250, 320], ly: 330 }),
          con(Z.bordeLateral, { ancla: [138, 340], ly: 340 }),
          con(Z.anguloInf, { ancla: [224, 506], ly: 505 }),
          con(Z.anguloSup, { ancla: [252, 100], ly: 105 }),
          con(Z.incisura, { ancla: [156, 104], ly: 70 }),
          { id: 'proceso-coracoides', tipo: 'path', d: 'M136,100 C130,84 116,66 100,58 C90,54 84,62 90,70 C100,80 108,92 112,108 Z', ancla: [104, 74], ly: 80 },
          con(Z.acromion, { ancla: [42, 60], ly: 45 }),
          { id: 'tuberculo-supraglenoideo', tipo: 'elipse', cx: 64, cy: 114, rx: 7, ry: 6, ancla: [64, 114], ly: 115 },
          con(Z.glenoidal, { ancla: [54, 152], ly: 152 }),
          con(Z.infraglenoideo, { ancla: [80, 200], ly: 200 })
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'sombra', d: 'M252,202 L258,218 C200,192 140,150 92,114 L86,102 C130,128 192,170 252,202 Z' },
          { clase: 'linea', d: 'M86,100 C130,126 192,168 254,198' },
          { clase: 'sombra', d: elipse(54, 152, 7, 30) }
        ],
        zonas: [
          { id: 'fosa-infraespinosa', tipo: 'path', d: 'M98,130 C150,166 200,196 252,220 C248,320 240,410 230,488 C190,420 140,320 94,214 Z', ancla: [186, 290], ly: 290 },
          { id: 'fosa-supraespinosa', tipo: 'path', d: 'M168,104 C196,98 228,92 256,92 L254,196 C200,170 150,136 106,110 C130,106 150,104 168,104 Z', ancla: [212, 128], ly: 130 },
          { id: 'espina', tipo: 'path', d: 'M252,198 L258,220 C200,194 140,152 90,116 L84,98 C130,124 192,166 252,198 Z', ancla: [190, 165], ly: 175 },
          con(Z.bordeMedial, { ancla: [250, 330], ly: 340 }),
          con(Z.bordeLateral, { ancla: [138, 340], ly: 340 }),
          con(Z.anguloInf, { ancla: [224, 506], ly: 505 }),
          con(Z.anguloSup, { ancla: [252, 100], ly: 95 }),
          con(Z.incisura, { ancla: [156, 104], ly: 60 }),
          con(Z.acromion, { ancla: [42, 60], ly: 45 }),
          con(Z.glenoidal, { ancla: [52, 160], ly: 160 }),
          con(Z.infraglenoideo, { ancla: [80, 202], ly: 205 })
        ]
      }
    ]
  };
})();
