/*
 * Láminas: vértebra cervical, torácica y lumbar típicas.
 * Vista superior: CUERPO (anterior) arriba, proceso espinoso (posterior) abajo; es simétrica.
 * Vista lateral: ANTERIOR a la izquierda, POSTERIOR a la derecha.
 * Cada vista trae su propio contorno; los forámenes son huecos (fill-rule evenodd).
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }
  // Refleja un path "M x,y ..." de coordenadas absolutas respecto de x = 150 (para el lado derecho)
  function espejoX(d) {
    return d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, function (m, x, y) { return (300 - parseFloat(x)) + ',' + y; });
  }
  function par(id, d, extra) {
    var a = { id: id, tipo: 'path', d: d }, b = { id: id, tipo: 'path', d: espejoX(d) };
    for (var k in extra) a[k] = extra[k];
    return [a, b];
  }
  function parElipse(id, cx, cy, rx, ry, extra) {
    var a = { id: id, tipo: 'elipse', cx: cx, cy: cy, rx: rx, ry: ry }, b = { id: id, tipo: 'elipse', cx: 300 - cx, cy: cy, rx: rx, ry: ry };
    for (var k in extra) a[k] = extra[k];
    return [a, b];
  }

  // ======================= Vértebra cervical (C4) =======================
  var CERV_SUP =
    'M108,74 C108,64 116,62 124,66 L176,66 C184,62 192,64 192,74 L192,116 C200,116 214,108 228,108 ' +
    'C244,108 250,124 244,138 C238,148 226,150 214,148 L206,152 C212,160 214,172 208,182 ' +
    'C196,198 178,210 166,216 L172,244 C172,252 164,254 160,246 L150,228 L140,246 ' +
    'C136,254 128,252 128,244 L134,216 C122,210 104,198 92,182 C86,172 88,160 94,152 L86,148 ' +
    'C74,150 62,148 56,138 C50,124 56,108 72,108 C86,108 100,116 108,116 Z ' +
    'M150,130 C170,130 190,170 184,186 C170,198 130,198 116,186 C110,170 130,130 150,130 Z ' +
    elipse(88, 128, 8, 8) + ' ' + elipse(212, 128, 8, 8);

  window.LAMINAS.cervicales = {
    id: 'vertebra-cervical',
    estructura: 'cervicales',
    titulo: 'Vértebra cervical',
    subtitulo: 'Vértebra cervical típica (C4)',
    ancho: 300,
    vistaNombres: '-190 40 680 240',
    vistaSola: '40 50 220 220',
    descripcion: 'Las vértebras cervicales típicas (C3 a C6) son pequeñas y tienen dos rasgos únicos: forámenes en los procesos transversos y un proceso espinoso bífido. C1 (atlas) y C2 (axis) tienen formas especiales.',
    partes: {
      'cuerpo': { nombre: 'Cuerpo vertebral', descripcion: 'Pequeño, rectangular y más ancho que alto.', puntos: ['Entre los cuerpos están los discos intervertebrales.'], pista: 'Cuerpo pequeño y rectangular' },
      'proceso-unciforme': { nombre: 'Proceso unciforme', alias: 'Uncus', descripcion: 'Labio que sube desde cada borde lateral de la cara superior del cuerpo.', puntos: ['Forma con la vértebra de arriba las articulaciones uncovertebrales (de Luschka).'], clinica: 'Con la artrosis crecen osteofitos aquí que pueden estrechar el foramen intervertebral y comprimir la raíz nerviosa (dolor que baja por el brazo).', pista: 'Labio lateral del cuerpo, típico de las cervicales' },
      'proceso-transverso': { nombre: 'Proceso transverso', descripcion: 'Corto, con un tubérculo anterior y uno posterior y un canal para el nervio espinal.', puntos: ['El tubérculo anterior de C6 (tubérculo carotídeo) es una referencia para comprimir la arteria carótida.'], pista: 'Proceso lateral con dos tubérculos y un foramen' },
      'foramen-transverso': { nombre: 'Foramen transverso', descripcion: 'Agujero en cada proceso transverso; es exclusivo de las vértebras cervicales.', puntos: ['Por los de C1 a C6 suben la arteria y la vena vertebrales.'], clinica: 'La arteria vertebral irriga el tronco encefálico y el cerebelo; una manipulación brusca del cuello puede dañarla.', pista: 'Agujero del proceso transverso por donde sube la arteria vertebral' },
      'pilar-articular': { nombre: 'Pilar articular', alias: 'Procesos articulares', descripcion: 'Columna ósea formada por los procesos articulares superior e inferior de cada lado.', puntos: ['Sus carillas son planas e inclinadas unos 45°, lo que permite mucha flexión, extensión y rotación.'], pista: 'Columna lateral de procesos articulares con carillas inclinadas' },
      'lamina': { nombre: 'Lámina', descripcion: 'Placa delgada que une el pilar articular con el proceso espinoso.', puntos: ['Las dos láminas forman el techo del foramen vertebral.'], pista: 'Placa posterior que forma el techo del canal' },
      'proceso-espinoso': { nombre: 'Proceso espinoso', descripcion: 'Corto y bífido (con dos puntas) de C3 a C6.', puntos: ['C7, la vértebra prominente, tiene un proceso espinoso largo y no bífido que se palpa en la nuca.'], pista: 'Proceso posterior corto con dos puntas' },
      'foramen-vertebral': { nombre: 'Foramen vertebral', descripcion: 'Grande y triangular.', puntos: ['Aloja la médula espinal, que en el cuello es más gruesa porque de ella salen los nervios del brazo (intumescencia cervical).'], pista: 'Canal grande y triangular para la médula espinal' }
    },
    vistas: [
      {
        id: 'superior', nombre: 'Vista superior', espejo: false,
        contorno: CERV_SUP,
        dibujo: [
          { clase: 'linea', d: 'M112,74 L188,74' },
          { clase: 'linea', d: 'M150,228 L150,216' }
        ],
        zonas: [].concat(
          [{ id: 'cuerpo', tipo: 'path', d: 'M116,76 L184,76 L190,114 L110,114 Z', ancla: [176, 94], ly: 70 }],
          parElipse('proceso-unciforme', 112, 72, 6, 9, { ancla: [112, 70], ly: 60 }),
          par('proceso-transverso', 'M108,116 C100,116 86,108 72,108 C56,108 50,124 56,138 C62,148 74,150 86,148 L100,140 Z', { ancla: [64, 120], ly: 110 }),
          parElipse('foramen-transverso', 88, 128, 9, 9, { ancla: [88, 128], ly: 140 }),
          parElipse('pilar-articular', 98, 166, 10, 15, { ancla: [96, 168], ly: 175 }),
          par('lamina', 'M104,188 C114,200 126,208 136,214 L140,202 C130,198 118,192 110,180 Z', { ancla: [120, 200], ly: 210 }),
          [{ id: 'proceso-espinoso', tipo: 'path', d: 'M134,214 L166,214 L172,244 C172,252 164,254 160,246 L150,228 L140,246 C136,254 128,252 128,244 Z', ancla: [162, 236], ly: 240 },
           { id: 'foramen-vertebral', tipo: 'path', d: 'M150,134 C168,134 186,168 180,184 C168,194 132,194 120,184 C114,168 132,134 150,134 Z', ancla: [160, 168], ly: 160 }]
        )
      }
    ]
  };

  // ======================= Vértebra torácica (T6) =======================
  var TOR_SUP =
    'M100,100 C100,64 128,54 150,62 C172,54 200,64 200,100 C200,126 186,140 174,146 L176,158 ' +
    'C196,160 226,170 244,184 C254,192 248,208 236,206 C218,204 200,200 186,198 ' +
    'C184,206 178,212 166,216 L158,290 C156,298 144,298 142,290 L134,216 C122,212 116,206 114,198 ' +
    'C100,200 82,204 64,206 C52,208 46,192 56,184 C74,170 104,160 124,158 L126,146 ' +
    'C114,140 100,126 100,100 Z ' +
    'M150,152 C138,152 132,162 132,172 C132,184 140,192 150,192 C160,192 168,184 168,172 C168,162 162,152 150,152 Z';
  var TOR_LAT =
    'M54,92 C80,86 112,86 140,92 L142,106 L162,104 L164,72 C168,64 178,64 180,72 L184,106 L200,112 ' +
    'C230,140 262,190 282,232 C288,246 276,254 268,244 C246,214 214,180 192,160 L190,192 ' +
    'C186,200 174,200 170,192 L166,158 C160,152 152,146 150,138 L142,138 L140,170 ' +
    'C112,176 80,176 54,170 C48,144 48,118 54,92 Z';

  window.LAMINAS.toracicas = {
    id: 'vertebra-toracica',
    estructura: 'toracicas',
    titulo: 'Vértebra torácica',
    subtitulo: 'Vértebra torácica típica (T6)',
    ancho: 300,
    vistaNombres: '-190 40 680 270',
    vistaSola: '30 45 260 260',
    descripcion: 'Las vértebras torácicas se reconocen por sus fositas costales, donde articulan las costillas, y por su proceso espinoso largo e inclinado hacia abajo.',
    partes: {
      'cuerpo': { nombre: 'Cuerpo vertebral', descripcion: 'Mediano y con forma de corazón visto desde arriba.', puntos: ['Soporta el peso del tronco junto con los discos intervertebrales.'], clinica: 'En la osteoporosis los cuerpos torácicos se aplastan (fracturas por compresión), con pérdida de estatura y joroba. Los corticoides en uso prolongado aumentan este riesgo.', pista: 'Cuerpo con forma de corazón' },
      'fosita-costal-superior': { nombre: 'Fosita costal superior', descripcion: 'Media carilla en el borde superior y posterior del cuerpo.', puntos: ['Con la fosita inferior de la vértebra de arriba recibe la cabeza de una costilla.'], pista: 'Media carilla superior del cuerpo para la cabeza de la costilla' },
      'fosita-costal-inferior': { nombre: 'Fosita costal inferior', descripcion: 'Media carilla en el borde inferior y posterior del cuerpo.', puntos: ['Recibe parte de la cabeza de la costilla de abajo.'], pista: 'Media carilla inferior del cuerpo para la costilla siguiente' },
      'fosita-costal-transversa': { nombre: 'Fosita costal transversa', alias: 'Fosita costal del proceso transverso', descripcion: 'Carilla en la cara anterior del extremo del proceso transverso.', puntos: ['Articula con el tubérculo de la costilla (articulación costotransversa).'], pista: 'Carilla del proceso transverso para el tubérculo de la costilla' },
      'pediculo': { nombre: 'Pedículo', descripcion: 'Columna corta que une el cuerpo con el arco vertebral.', puntos: ['Sus escotaduras forman el foramen intervertebral, por donde sale el nervio espinal.'], pista: 'Puente entre el cuerpo y el arco vertebral' },
      'proceso-transverso': { nombre: 'Proceso transverso', descripcion: 'Largo y robusto, dirigido hacia atrás y afuera.', puntos: ['Lleva la fosita costal transversa en su extremo.'], pista: 'Proceso lateral que articula con el tubérculo de la costilla' },
      'proceso-articular-superior': { nombre: 'Proceso articular superior', descripcion: 'Saliente que sube desde la unión del pedículo y la lámina.', puntos: ['Sus carillas miran hacia atrás (plano frontal): permiten rotar, aunque las costillas limitan el movimiento.'], pista: 'Saliente superior con carillas que miran hacia atrás' },
      'proceso-articular-inferior': { nombre: 'Proceso articular inferior', descripcion: 'Saliente que baja desde la lámina.', puntos: ['Articula con el proceso articular superior de la vértebra de abajo (articulación cigapofisaria).'], pista: 'Saliente inferior que articula con la vértebra de abajo' },
      'lamina': { nombre: 'Lámina', descripcion: 'Placa ancha que une el pedículo con el proceso espinoso.', puntos: ['Las láminas se superponen como tejas y protegen la médula por detrás.'], pista: 'Placa posterior que forma el techo del canal' },
      'proceso-espinoso': { nombre: 'Proceso espinoso', descripcion: 'Largo, delgado e inclinado hacia abajo.', puntos: ['Cada uno cubre al de la vértebra siguiente, como tejas.'], clinica: 'Por esa inclinación, la anestesia epidural torácica se hace con la aguja muy inclinada hacia arriba.', pista: 'Proceso posterior largo e inclinado hacia abajo' },
      'foramen-vertebral': { nombre: 'Foramen vertebral', descripcion: 'Pequeño y redondo.', puntos: ['Aloja la médula espinal torácica.'], pista: 'Canal pequeño y redondo para la médula' }
    },
    vistas: [
      {
        id: 'superior', nombre: 'Vista superior', espejo: false,
        contorno: TOR_SUP,
        dibujo: [{ clase: 'linea', d: 'M150,214 L150,286' }],
        zonas: [].concat(
          [{ id: 'cuerpo', tipo: 'elipse', cx: 150, cy: 98, rx: 48, ry: 40, ancla: [174, 92], ly: 80 }],
          par('pediculo', 'M126,144 L138,150 L136,164 L122,160 Z', { ancla: [130, 154], ly: 130 }),
          par('proceso-transverso', 'M124,160 C104,162 74,170 56,184 C46,192 52,208 64,206 C82,204 100,200 116,196 Z', { ancla: [90, 180], ly: 170 }),
          parElipse('fosita-costal-transversa', 62, 194, 7, 8, { ancla: [60, 194], ly: 210 }),
          par('lamina', 'M116,198 C120,206 126,212 136,216 L140,204 C132,202 124,196 120,190 Z', { ancla: [126, 204], ly: 240 }),
          [{ id: 'proceso-espinoso', tipo: 'path', d: 'M134,214 L166,214 L158,290 C156,298 144,298 142,290 Z', ancla: [152, 260], ly: 260 },
           { id: 'foramen-vertebral', tipo: 'elipse', cx: 150, cy: 172, rx: 18, ry: 19, ancla: [156, 172], ly: 165 }]
        )
      },
      {
        id: 'lateral', nombre: 'Vista lateral', espejo: false,
        contorno: TOR_LAT,
        dibujo: [{ clase: 'sombra', d: elipse(132, 100, 7, 6) }, { clase: 'sombra', d: elipse(132, 162, 7, 6) }, { clase: 'sombra', d: elipse(188, 126, 5, 5) }],
        zonas: [
          { id: 'cuerpo', tipo: 'path', d: 'M54,92 C80,86 112,86 140,92 L140,170 C112,176 80,176 54,170 C48,144 48,118 54,92 Z', ancla: [90, 130], ly: 130 },
          { id: 'fosita-costal-superior', tipo: 'elipse', cx: 132, cy: 100, rx: 8, ry: 7, ancla: [132, 100], ly: 80 },
          { id: 'fosita-costal-inferior', tipo: 'elipse', cx: 132, cy: 162, rx: 8, ry: 7, ancla: [132, 162], ly: 180 },
          { id: 'pediculo', tipo: 'path', d: 'M142,106 L162,104 L162,136 L144,138 Z', ancla: [152, 124], ly: 160 },
          { id: 'proceso-articular-superior', tipo: 'path', d: 'M162,104 L164,72 C168,64 178,64 180,72 L184,106 Z', ancla: [172, 80], ly: 50 },
          { id: 'proceso-transverso', tipo: 'elipse', cx: 192, cy: 126, rx: 13, ry: 12, ancla: [198, 122], ly: 90 },
          { id: 'fosita-costal-transversa', tipo: 'elipse', cx: 187, cy: 127, rx: 5, ry: 5, ancla: [187, 128], ly: 125 },
          { id: 'proceso-articular-inferior', tipo: 'path', d: 'M166,156 L190,160 L190,192 C186,200 174,200 170,192 Z', ancla: [178, 180], ly: 195 },
          { id: 'proceso-espinoso', tipo: 'path', d: 'M200,112 C230,140 262,190 282,232 C288,246 276,254 268,244 C246,214 214,180 192,160 Z', ancla: [240, 190], ly: 235 }
        ]
      }
    ]
  };

  // ======================= Vértebra lumbar (L3) =======================
  var LUM_SUP =
    'M80,110 C80,70 120,58 150,60 C180,58 220,70 220,110 C220,140 204,154 190,158 L194,176 ' +
    'C220,170 250,162 270,160 C280,160 282,172 272,178 C250,186 222,192 200,196 ' +
    'C206,206 210,214 204,222 C196,228 180,232 166,238 L166,300 C166,308 134,308 134,300 L134,238 ' +
    'C120,232 104,228 96,222 C90,214 94,206 100,196 C78,192 50,186 28,178 C18,172 20,160 30,160 ' +
    'C50,162 80,170 106,176 L110,158 C96,154 80,140 80,110 Z ' +
    'M150,166 C134,166 122,180 122,200 C122,214 136,220 150,222 C164,220 178,214 178,200 C178,180 166,166 150,166 Z';
  var LUM_LAT =
    'M44,84 C80,78 116,78 150,84 L152,100 L176,98 L178,64 C184,56 196,58 198,66 L202,100 L216,108 ' +
    'L280,108 C292,108 294,126 290,140 C286,156 276,162 262,160 L222,156 L216,196 ' +
    'C212,204 200,204 196,196 L188,160 C176,152 166,146 160,136 L152,136 L150,180 ' +
    'C116,186 80,186 44,180 C38,150 38,114 44,84 Z';

  window.LAMINAS.lumbares = {
    id: 'vertebra-lumbar',
    estructura: 'lumbares',
    titulo: 'Vértebra lumbar',
    subtitulo: 'Vértebra lumbar típica (L3)',
    ancho: 300,
    vistaNombres: '-190 40 680 280',
    vistaSola: '10 45 285 270',
    descripcion: 'Las vértebras lumbares son las más grandes porque soportan más peso. No tienen forámenes transversos ni fositas costales, y su proceso espinoso es corto y horizontal.',
    partes: {
      'cuerpo': { nombre: 'Cuerpo vertebral', descripcion: 'Grande y con forma de riñón visto desde arriba.', puntos: ['Soporta la mayor parte del peso del tronco.', 'Entre los cuerpos, los discos intervertebrales amortiguan la carga.'], clinica: 'La hernia de disco lumbar (sobre todo L4–L5 y L5–S1) comprime una raíz nerviosa y causa ciática: dolor que baja por la pierna. Suele tratarse primero con analgésicos y antiinflamatorios.', pista: 'Cuerpo grande con forma de riñón' },
      'pediculo': { nombre: 'Pedículo', descripcion: 'Columna corta y gruesa que une el cuerpo con el arco vertebral.', puntos: ['Sus escotaduras forman el foramen intervertebral.'], pista: 'Puente grueso entre el cuerpo y el arco' },
      'proceso-transverso': { nombre: 'Proceso transverso', descripcion: 'Largo y delgado, dirigido hacia los lados.', puntos: ['Inserción del psoas mayor y del cuadrado lumbar.'], pista: 'Proceso lateral largo y delgado' },
      'proceso-articular-superior': { nombre: 'Proceso articular superior', descripcion: 'Saliente que sube desde la unión del pedículo y la lámina; tiene un tubérculo llamado proceso mamilar.', puntos: ['Sus carillas miran hacia medial: casi impiden la rotación de la columna lumbar.'], pista: 'Saliente superior con carillas que miran hacia medial' },
      'proceso-articular-inferior': { nombre: 'Proceso articular inferior', descripcion: 'Saliente que baja desde la lámina; sus carillas miran hacia lateral.', puntos: ['Encaja entre los procesos superiores de la vértebra de abajo.'], pista: 'Saliente inferior con carillas que miran hacia lateral' },
      'lamina': { nombre: 'Lámina', descripcion: 'Placa gruesa que une el proceso articular con el proceso espinoso.', puntos: ['Forma el techo del canal vertebral.'], clinica: 'En la laminectomía se quita parte de la lámina para descomprimir los nervios.', pista: 'Placa posterior gruesa del arco vertebral' },
      'proceso-espinoso': { nombre: 'Proceso espinoso', descripcion: 'Corto, ancho y horizontal, con forma de hacha.', puntos: ['Entre ellos quedan espacios amplios, que se abren aún más al flexionar la columna.'], clinica: 'Por eso la punción lumbar y la anestesia epidural o raquídea se hacen entre L3–L4 o L4–L5, con la persona encorvada.', pista: 'Proceso posterior corto y horizontal, con forma de hacha' },
      'foramen-vertebral': { nombre: 'Foramen vertebral', descripcion: 'Triangular, más pequeño que el cervical.', puntos: ['Por debajo de L1–L2 ya no contiene médula, sino la cola de caballo (las raíces de los nervios lumbares y sacros) y líquido cefalorraquídeo.'], clinica: 'Por eso una aguja de punción lumbar bajo L2 no daña la médula: obtiene líquido cefalorraquídeo o permite inyectar anestésico.', pista: 'Canal triangular que contiene la cola de caballo' },
      'incisura-vertebral-inferior': { nombre: 'Incisura vertebral inferior', descripcion: 'Escotadura profunda bajo el pedículo.', puntos: ['Junto con la incisura superior de la vértebra de abajo forma el foramen intervertebral, por donde sale el nervio espinal.'], clinica: 'Si el foramen se estrecha (artrosis, hernia), la raíz nerviosa queda comprimida.', pista: 'Escotadura bajo el pedículo que forma el foramen intervertebral' }
    },
    vistas: [
      {
        id: 'superior', nombre: 'Vista superior', espejo: false,
        contorno: LUM_SUP,
        dibujo: [{ clase: 'linea', d: 'M90,110 C90,80 120,70 150,70 C180,70 210,80 210,110' }],
        zonas: [].concat(
          [{ id: 'cuerpo', tipo: 'elipse', cx: 150, cy: 108, rx: 68, ry: 46, ancla: [190, 100], ly: 80 }],
          par('pediculo', 'M110,156 L124,158 L126,182 L106,180 Z', { ancla: [116, 168], ly: 130 }),
          par('proceso-transverso', 'M106,176 C80,170 50,162 30,160 C20,160 18,172 28,178 C50,186 78,192 100,196 Z', { ancla: [44, 172], ly: 165 }),
          parElipse('proceso-articular-superior', 104, 210, 10, 12, { ancla: [102, 210], ly: 215 }),
          par('lamina', 'M104,222 C114,228 126,234 136,240 L140,226 C130,222 120,216 112,206 Z', { ancla: [122, 224], ly: 255 }),
          [{ id: 'proceso-espinoso', tipo: 'rect', x: 134, y: 238, w: 32, h: 66, ancla: [156, 280], ly: 285 },
           { id: 'foramen-vertebral', tipo: 'elipse', cx: 150, cy: 194, rx: 26, ry: 26, ancla: [160, 196], ly: 200 }]
        )
      },
      {
        id: 'lateral', nombre: 'Vista lateral', espejo: false,
        contorno: LUM_LAT,
        dibujo: [{ clase: 'sombra', d: elipse(196, 124, 9, 8) }],
        zonas: [
          { id: 'cuerpo', tipo: 'path', d: 'M44,84 C80,78 116,78 150,84 L150,180 C116,186 80,186 44,180 C38,150 38,114 44,84 Z', ancla: [90, 132], ly: 132 },
          { id: 'incisura-vertebral-inferior', tipo: 'path', d: 'M152,140 L162,140 C170,150 178,156 186,162 L152,176 Z', ancla: [160, 156], ly: 225 },
          { id: 'pediculo', tipo: 'path', d: 'M150,100 L178,98 L176,134 L152,136 Z', ancla: [164, 118], ly: 180 },
          { id: 'proceso-articular-superior', tipo: 'path', d: 'M178,98 L178,64 C184,56 196,58 198,66 L202,100 Z', ancla: [188, 76], ly: 45 },
          { id: 'proceso-transverso', tipo: 'elipse', cx: 196, cy: 124, rx: 11, ry: 10, ancla: [198, 124], ly: 90 },
          { id: 'proceso-articular-inferior', tipo: 'path', d: 'M188,158 L216,156 L216,196 C212,204 200,204 196,196 Z', ancla: [204, 182], ly: 265 },
          { id: 'proceso-espinoso', tipo: 'path', d: 'M216,108 L280,108 C292,108 294,126 290,140 C286,156 276,162 262,160 L222,156 Z', ancla: [256, 132], ly: 135 }
        ]
      }
    ]
  };
})();
