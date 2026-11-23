/*
 * Lámina: Radio y ulna derechos (vistas anterior y posterior), en supinación.
 * Coordenadas base: LATERAL (radio) a la izquierda, MEDIAL (ulna) a la derecha.
 * La vista posterior usa `espejo: true`. La misma lámina sirve al radio y a la ulna.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var RADIO =
    'M74,134 C80,128 116,128 122,134 L122,156 C116,162 112,166 110,176 C112,190 122,200 126,214 ' +
    'C128,226 120,236 116,240 L118,600 C126,640 138,664 142,686 C144,700 140,716 132,722 L70,728 ' +
    'C64,734 58,740 52,742 C46,734 46,716 52,700 C58,670 70,640 84,600 L88,240 ' +
    'C86,210 86,190 86,176 C84,166 78,162 74,156 Z ';
  var ULNA =
    'M156,40 C164,24 202,20 214,44 C222,72 216,110 202,140 L186,640 C186,668 194,690 194,712 ' +
    'C196,730 192,742 186,746 C180,740 178,732 174,726 C166,728 158,722 158,708 ' +
    'C156,690 164,668 166,640 L162,200 C158,172 152,150 148,136 C140,130 138,120 144,116 ' +
    'C162,108 174,92 172,78 C170,62 164,50 156,40 Z';

  var Z = {
    cabezaRadio: { id: 'cabeza-radio', tipo: 'path', d: 'M74,134 C80,128 116,128 122,134 L122,156 L74,156 Z' },
    cuelloRadio: { id: 'cuello-radio', tipo: 'path', d: 'M76,158 L120,158 C114,164 112,168 110,178 L88,178 C86,168 80,162 76,158 Z' },
    cuerpoRadio: { id: 'cuerpo-radio', tipo: 'rect', x: 88, y: 240, w: 30, h: 360 },
    estiloidesRadio: { id: 'proceso-estiloides-radio', tipo: 'path', d: 'M64,712 C60,724 56,734 52,742 C46,734 46,716 52,700 Z' },
    olecranon: { id: 'olecranon', tipo: 'path', d: 'M156,40 C164,24 202,20 214,44 C218,56 217,64 215,72 L172,70 C170,58 164,50 156,40 Z' },
    cuerpoUlna: { id: 'cuerpo-ulna', tipo: 'rect', x: 166, y: 200, w: 22, h: 440 },
    cabezaUlna: { id: 'cabeza-ulna', tipo: 'elipse', cx: 176, cy: 696, rx: 16, ry: 22 },
    estiloidesUlna: { id: 'proceso-estiloides-ulna', tipo: 'path', d: 'M188,712 C196,722 192,740 186,746 C180,740 178,732 174,726 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  var LAMINA = {
    id: 'antebrazo',
    estructura: 'radio',
    titulo: 'Radio y ulna',
    subtitulo: 'Antebrazo derecho',
    ancho: 300,
    vistaNombres: '-190 10 680 770',
    vistaSola: '30 15 220 750',
    contorno: RADIO + ULNA,
    descripcion: 'Los dos huesos del antebrazo. El radio, lateral, gira alrededor de la ulna para la pronación y la supinación; la ulna, medial, forma el codo con el húmero.',

    partes: {
      'cabeza-radio': {
        nombre: 'Cabeza del radio',
        descripcion: 'Extremo proximal del radio, con forma de disco.',
        puntos: ['Su cara superior cóncava articula con el capítulo del húmero.', 'Su borde gira dentro del ligamento anular y contra la incisura radial de la ulna: así se hacen la pronación y la supinación.'],
        clinica: 'En niños pequeños, un tirón del brazo puede sacar la cabeza del radio del ligamento anular ("codo de niñera" o pronación dolorosa).',
        pista: 'Disco proximal del radio que gira en la pronación y la supinación'
      },
      'cuello-radio': {
        nombre: 'Cuello del radio',
        descripcion: 'Segmento estrecho bajo la cabeza.',
        puntos: ['Une la cabeza con el cuerpo; queda rodeado por la parte baja del ligamento anular.'],
        pista: 'Segmento estrecho bajo la cabeza del radio'
      },
      'tuberosidad-radio': {
        nombre: 'Tuberosidad del radio',
        descripcion: 'Prominencia en la cara medial, bajo el cuello.',
        puntos: ['Inserción del bíceps braquial, que además de flexionar el codo es el supinador más potente.'],
        pista: 'Prominencia bajo el cuello donde se inserta el bíceps'
      },
      'cuerpo-radio': {
        nombre: 'Cuerpo del radio',
        descripcion: 'Porción larga, más ancha hacia abajo.',
        puntos: ['Su borde interóseo, medial, se une a la ulna por la membrana interósea.'],
        pista: 'Porción larga del radio, más ancha hacia la muñeca'
      },
      'proceso-estiloides-radio': {
        nombre: 'Proceso estiloides del radio', alias: 'Apófisis estiloides radial',
        descripcion: 'Punta ósea del lado lateral del extremo distal; baja más que la de la ulna.',
        puntos: ['Se palpa en la base de la tabaquera anatómica.', 'El pulso radial se toma justo por delante y medial a él.'],
        pista: 'Punta lateral distal del radio, junto al pulso radial'
      },
      'incisura-ulnar': {
        nombre: 'Incisura ulnar',
        descripcion: 'Escotadura en la cara medial del extremo distal del radio.',
        puntos: ['Recibe la cabeza de la ulna (articulación radioulnar distal).'],
        pista: 'Escotadura distal del radio que recibe la cabeza de la ulna'
      },
      'cara-carpiana': {
        nombre: 'Cara articular carpiana',
        descripcion: 'Superficie articular del extremo distal del radio.',
        puntos: ['Articula con el escafoides y el semilunar (articulación radiocarpiana, la muñeca).'],
        clinica: 'La fractura del extremo distal del radio (fractura de Colles) es típica al caer sobre la mano extendida, sobre todo en mujeres mayores con osteoporosis.',
        pista: 'Superficie distal del radio que articula con el escafoides y el semilunar'
      },
      'tuberculo-dorsal': {
        nombre: 'Tubérculo dorsal del radio', alias: 'Tubérculo de Lister',
        descripcion: 'Pequeña eminencia en la cara posterior del extremo distal.',
        puntos: ['El tendón del extensor largo del pulgar lo rodea como a una polea.'],
        pista: 'Eminencia posterior distal que hace de polea a un tendón del pulgar'
      },
      'olecranon': {
        nombre: 'Olécranon',
        descripcion: 'Gran saliente proximal y posterior de la ulna: la punta del codo.',
        puntos: ['Inserción del tríceps braquial.', 'Encaja en la fosa del olécranon del húmero al extender el codo.'],
        clinica: 'La bolsa serosa que lo cubre puede inflamarse por apoyo repetido (bursitis olecraniana).',
        pista: 'La punta del codo, donde se inserta el tríceps'
      },
      'incisura-troclear': {
        nombre: 'Incisura troclear', alias: 'Escotadura troclear',
        descripcion: 'Gran escotadura en forma de media luna entre el olécranon y el proceso coronoides.',
        puntos: ['Abraza la tróclea del húmero (articulación humeroulnar).'],
        pista: 'Escotadura en media luna que abraza la tróclea del húmero'
      },
      'proceso-coronoides': {
        nombre: 'Proceso coronoides', alias: 'Apófisis coronoides',
        descripcion: 'Saliente anterior que forma el borde inferior de la incisura troclear.',
        puntos: ['Encaja en la fosa coronoidea del húmero al flexionar el codo.', 'En él y en la tuberosidad de la ulna se inserta el músculo braquial.'],
        pista: 'Saliente anterior bajo la incisura troclear'
      },
      'incisura-radial': {
        nombre: 'Incisura radial',
        descripcion: 'Pequeña escotadura en la cara lateral del proceso coronoides.',
        puntos: ['Recibe el borde de la cabeza del radio (articulación radioulnar proximal).'],
        pista: 'Escotadura lateral de la ulna donde gira la cabeza del radio'
      },
      'tuberosidad-ulna': {
        nombre: 'Tuberosidad de la ulna',
        descripcion: 'Superficie rugosa bajo el proceso coronoides.',
        puntos: ['Inserción del músculo braquial, el principal flexor del codo.'],
        pista: 'Rugosidad bajo el coronoides donde se inserta el braquial'
      },
      'cuerpo-ulna': {
        nombre: 'Cuerpo de la ulna',
        descripcion: 'Porción larga, más gruesa arriba y delgada abajo (al revés que el radio).',
        puntos: ['Su borde posterior se palpa bajo la piel en todo el antebrazo.', 'Su borde interóseo se une al radio por la membrana interósea.'],
        pista: 'Porción larga de la ulna, palpable por detrás'
      },
      'cabeza-ulna': {
        nombre: 'Cabeza de la ulna',
        descripcion: 'Extremo distal redondeado de la ulna; forma el bulto del lado del meñique en la muñeca.',
        puntos: ['Articula con la incisura ulnar del radio.', 'Un disco de fibrocartílago la separa del carpo.'],
        pista: 'Extremo distal redondeado de la ulna, del lado del meñique'
      },
      'proceso-estiloides-ulna': {
        nombre: 'Proceso estiloides de la ulna', alias: 'Apófisis estiloides cubital',
        descripcion: 'Pequeña punta ósea en la parte posteromedial de la cabeza de la ulna.',
        puntos: ['Allí se fija el ligamento colateral ulnar de la muñeca.'],
        pista: 'Pequeña punta distal de la ulna'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'sombra', d: elipse(180, 84, 12, 26) },
          { clase: 'linea', d: 'M74,156 L122,156' },
          { clase: 'sombra', d: elipse(118, 218, 9, 14) },
          { clase: 'sombra', d: elipse(170, 160, 7, 12) },
          { clase: 'linea', d: 'M58,722 L132,716' }
        ],
        zonas: [
          con(Z.cuerpoRadio, { ancla: [100, 420], ly: 420 }),
          con(Z.cuerpoUlna, { ancla: [176, 420], ly: 420 }),
          con(Z.cabezaRadio, { ancla: [96, 144], ly: 140 }),
          con(Z.cuelloRadio, { ancla: [98, 168], ly: 170 }),
          { id: 'tuberosidad-radio', tipo: 'elipse', cx: 118, cy: 218, rx: 10, ry: 15, ancla: [118, 218], ly: 215 },
          con(Z.estiloidesRadio, { ancla: [54, 726], ly: 725 }),
          { id: 'incisura-ulnar', tipo: 'elipse', cx: 138, cy: 692, rx: 6, ry: 14, ancla: [138, 690], ly: 690 },
          { id: 'cara-carpiana', tipo: 'path', d: 'M58,714 L132,710 L132,724 L70,730 Z', ancla: [96, 722], ly: 755 },
          con(Z.olecranon, { ancla: [194, 36], ly: 30 }),
          { id: 'incisura-troclear', tipo: 'elipse', cx: 180, cy: 84, rx: 12, ry: 26, ancla: [182, 84], ly: 80 },
          { id: 'proceso-coronoides', tipo: 'path', d: 'M144,116 C152,112 162,110 170,114 L172,132 C162,134 152,132 148,136 C140,130 138,120 144,116 Z', ancla: [158, 122], ly: 120 },
          { id: 'incisura-radial', tipo: 'elipse', cx: 154, cy: 140, rx: 6, ry: 8, ancla: [154, 140], ly: 148 },
          { id: 'tuberosidad-ulna', tipo: 'elipse', cx: 170, cy: 160, rx: 8, ry: 13, ancla: [172, 162], ly: 176 },
          con(Z.cabezaUlna, { ancla: [178, 694], ly: 690 }),
          con(Z.estiloidesUlna, { ancla: [186, 734], ly: 730 })
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'sombra', d: elipse(98, 652, 7, 12) },
          { clase: 'linea', d: 'M74,156 L122,156' },
          { clase: 'linea', d: 'M190,150 C184,300 178,460 176,640' }
        ],
        zonas: [
          con(Z.cuerpoRadio, { ancla: [100, 420], ly: 420 }),
          con(Z.cuerpoUlna, { ancla: [176, 420], ly: 420 }),
          con(Z.cabezaRadio, { ancla: [96, 144], ly: 140 }),
          con(Z.cuelloRadio, { ancla: [98, 168], ly: 170 }),
          { id: 'tuberculo-dorsal', tipo: 'elipse', cx: 98, cy: 652, rx: 8, ry: 13, ancla: [98, 652], ly: 650 },
          con(Z.estiloidesRadio, { ancla: [54, 726], ly: 725 }),
          con(Z.olecranon, { ancla: [194, 40], ly: 40 }),
          con(Z.cabezaUlna, { ancla: [178, 694], ly: 690 }),
          con(Z.estiloidesUlna, { ancla: [186, 734], ly: 730 })
        ]
      }
    ]
  };

  window.LAMINAS.radio = LAMINA;
  window.LAMINAS.cubito = LAMINA;   // la ulna (id interno 'cubito') abre la misma lámina
})();
