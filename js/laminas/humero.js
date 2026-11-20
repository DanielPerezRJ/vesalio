/*
 * Lámina: Húmero derecho (vistas anterior y posterior).
 *
 * Coordenadas "base": hueso vertical en un lienzo de 300 de ancho.
 * En la base el lado LATERAL queda a la izquierda (x pequeña) y el MEDIAL a la derecha,
 * que es como se ve un húmero derecho en vista anterior.
 * La vista posterior usa `espejo: true`: el dibujo y las zonas se reflejan automáticamente,
 * así que todas las coordenadas se escriben en el mismo sistema base.
 *
 * Zonas: { id, tipo: 'path' | 'elipse' | 'rect', ..., ancla: [x, y] (punto del rótulo), ly: y del texto }
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var CONTORNO =
    'M96,95 C92,70 105,52 130,50 L140,56 C150,30 190,20 215,40 C238,58 240,105 216,130 ' +
    'C205,140 192,148 186,165 C180,190 172,215 170,240 L168,560 C170,600 190,620 214,640 ' +
    'C226,648 226,668 210,674 C202,678 198,690 198,705 C198,725 180,730 168,722 ' +
    'C158,730 148,730 140,722 C130,735 110,730 105,712 C100,700 96,690 92,680 ' +
    'C84,670 86,650 96,640 C115,615 130,590 132,560 L132,380 C124,360 124,320 130,300 ' +
    'C132,260 130,230 124,200 C112,170 98,130 96,95 Z';

  // Zonas compartidas por ambas vistas
  var Z = {
    cabeza: { id: 'cabeza', tipo: 'path', d: 'M140,58 C150,30 190,20 215,40 C238,58 240,105 216,130 C195,110 165,80 140,58 Z' },
    tuberculoMayor: { id: 'tuberculo-mayor', tipo: 'path', d: 'M96,95 C92,70 105,52 130,50 L140,58 L128,64 C126,100 128,130 132,150 C118,150 104,130 96,95 Z' },
    cuelloQuirurgico: { id: 'cuello-quirurgico', tipo: 'path', d: 'M112,165 C140,175 160,175 186,165 L174,205 C155,212 140,212 125,205 Z' },
    diafisis: { id: 'diafisis', tipo: 'rect', x: 133, y: 215, w: 35, h: 345 },
    epicondiloMedial: { id: 'epicondilo-medial', tipo: 'path', d: 'M194,626 C214,636 230,652 214,675 C206,677 200,672 195,664 Z' },
    epicondiloLateral: { id: 'epicondilo-lateral', tipo: 'path', d: 'M100,634 C88,646 84,668 94,682 C102,676 106,662 110,648 Z' },
    troclea: { id: 'troclea', tipo: 'path', d: 'M142,690 C155,700 185,700 198,690 C200,710 196,726 184,727 C172,730 156,730 142,722 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.humero = {
    id: 'humero',
    estructura: 'humero',
    titulo: 'Húmero',
    subtitulo: 'Húmero derecho',
    ancho: 300,
    vistaNombres: '-150 12 600 750',
    vistaSola: '40 12 220 740',
    contorno: CONTORNO,
    descripcion: 'Hueso largo del brazo. Su extremo proximal articula con la escápula (hombro) y el distal con el radio y el cúbito (codo).',

    partes: {
      'cabeza': {
        nombre: 'Cabeza del húmero',
        descripcion: 'Superficie articular lisa y semiesférica, orientada hacia medial, arriba y atrás.',
        puntos: ['Articula con la cavidad glenoidea de la escápula (articulación glenohumeral).', 'Está cubierta de cartílago articular.'],
        pista: 'Superficie semiesférica que articula con la cavidad glenoidea'
      },
      'cuello-anatomico': {
        nombre: 'Cuello anatómico',
        descripcion: 'Surco poco marcado que rodea la cabeza y la separa de los tubérculos.',
        puntos: ['Allí se inserta la cápsula articular del hombro.'],
        pista: 'Surco que rodea la cabeza y donde se inserta la cápsula articular'
      },
      'tuberculo-mayor': {
        nombre: 'Tubérculo mayor', alias: 'Troquíter',
        descripcion: 'Eminencia lateral del extremo proximal.',
        puntos: ['Inserción de los músculos supraespinoso, infraespinoso y redondo menor (parte del manguito rotador).'],
        pista: 'Eminencia lateral donde se insertan supraespinoso, infraespinoso y redondo menor'
      },
      'tuberculo-menor': {
        nombre: 'Tubérculo menor', alias: 'Troquín',
        descripcion: 'Eminencia más pequeña situada en la cara anterior, medial al surco intertubercular.',
        puntos: ['Inserción del músculo subescapular.'],
        pista: 'Eminencia anterior donde se inserta el subescapular'
      },
      'surco-intertubercular': {
        nombre: 'Surco intertubercular', alias: 'Corredera bicipital',
        descripcion: 'Canal vertical entre los tubérculos mayor y menor.',
        puntos: ['Por él pasa el tendón de la cabeza larga del bíceps braquial.', 'Labio lateral: pectoral mayor. Fondo: dorsal ancho. Labio medial: redondo mayor.'],
        pista: 'Canal por donde pasa el tendón de la cabeza larga del bíceps'
      },
      'cuello-quirurgico': {
        nombre: 'Cuello quirúrgico',
        descripcion: 'Zona estrecha bajo los tubérculos, donde el extremo proximal se une a la diáfisis.',
        puntos: ['Se relaciona con el nervio axilar y las arterias circunflejas humerales.'],
        clinica: 'Es un sitio frecuente de fractura, sobre todo en adultos mayores, y puede lesionar el nervio axilar (que inerva el deltoides).',
        pista: 'Zona estrecha bajo los tubérculos, sitio frecuente de fractura'
      },
      'tuberosidad-deltoidea': {
        nombre: 'Tuberosidad deltoidea',
        descripcion: 'Superficie rugosa en la cara lateral, hacia la mitad de la diáfisis.',
        puntos: ['Inserción del músculo deltoides.'],
        pista: 'Superficie rugosa lateral donde se inserta el deltoides'
      },
      'diafisis': {
        nombre: 'Cuerpo del húmero', alias: 'Diáfisis',
        descripcion: 'Porción alargada entre los dos extremos; cilíndrica arriba y más prismática (triangular) abajo.',
        puntos: ['En su interior está el canal medular, con médula ósea amarilla en el adulto.', 'Su cara anterior da origen al braquial.'],
        pista: 'Porción alargada central del hueso con el canal medular'
      },
      'surco-nervio-radial': {
        nombre: 'Surco del nervio radial', alias: 'Canal de torsión',
        descripcion: 'Surco oblicuo en la cara posterior de la diáfisis, que desciende hacia lateral.',
        puntos: ['Por él pasan el nervio radial y la arteria braquial profunda.'],
        clinica: 'Las fracturas de la diáfisis pueden lesionar el nervio radial y causar "mano caída" (no se puede extender la muñeca).',
        pista: 'Surco posterior por donde pasa el nervio que se lesiona en la "mano caída"'
      },
      'epicondilo-medial': {
        nombre: 'Epicóndilo medial', alias: 'Epitróclea',
        descripcion: 'Prominencia medial del extremo distal, más saliente que la lateral.',
        puntos: ['Origen de los músculos flexores del antebrazo y del pronador redondo.', 'Por detrás pasa el nervio cubital.'],
        pista: 'Prominencia distal medial donde se originan los flexores del antebrazo'
      },
      'surco-nervio-cubital': {
        nombre: 'Surco del nervio cubital',
        descripcion: 'Canal en la cara posterior del epicóndilo medial.',
        puntos: ['Aloja el nervio cubital, que aquí está muy superficial.'],
        clinica: 'Un golpe en esta zona comprime el nervio cubital y produce el hormigueo del "hueso de la risa".',
        pista: 'Canal posterior del epicóndilo medial; zona del "hueso de la risa"'
      },
      'epicondilo-lateral': {
        nombre: 'Epicóndilo lateral', alias: 'Epicóndilo',
        descripcion: 'Prominencia lateral del extremo distal.',
        puntos: ['Origen de los músculos extensores del antebrazo y del supinador.'],
        clinica: 'Su inflamación por sobreuso es la epicondilitis lateral o "codo de tenista".',
        pista: 'Prominencia donde se originan los extensores; "codo de tenista"'
      },
      'capitulo': {
        nombre: 'Capítulo', alias: 'Cóndilo humeral',
        descripcion: 'Eminencia articular redondeada en la parte lateral del extremo distal.',
        puntos: ['Articula con la cabeza del radio.'],
        pista: 'Eminencia redondeada lateral que articula con el radio'
      },
      'troclea': {
        nombre: 'Tróclea',
        descripcion: 'Superficie articular en forma de polea en la parte medial del extremo distal.',
        puntos: ['Articula con la escotadura troclear del cúbito.'],
        pista: 'Superficie en forma de polea que articula con el cúbito'
      },
      'fosa-coronoidea': {
        nombre: 'Fosa coronoidea',
        descripcion: 'Depresión anterior por encima de la tróclea.',
        puntos: ['Recibe la apófisis coronoides del cúbito cuando el codo se flexiona.'],
        pista: 'Depresión anterior que recibe una apófisis del cúbito en la flexión'
      },
      'fosa-radial': {
        nombre: 'Fosa radial',
        descripcion: 'Pequeña depresión anterior por encima del capítulo.',
        puntos: ['Recibe la cabeza del radio en la flexión completa del codo.'],
        pista: 'Pequeña depresión anterior que recibe la cabeza del radio'
      },
      'fosa-olecraniana': {
        nombre: 'Fosa olecraniana',
        descripcion: 'Depresión profunda en la cara posterior, por encima de la tróclea.',
        puntos: ['Recibe el olécranon del cúbito cuando el codo se extiende.'],
        pista: 'Depresión posterior profunda que recibe el olécranon'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'sombra', d: 'M126,62 C132,110 136,160 140,220 L148,220 C146,160 142,110 138,62 Z' },
          { clase: 'linea', d: elipse(160, 112, 14, 20) },
          { clase: 'linea', d: 'M140,58 C165,80 195,110 216,130' },
          { clase: 'rugoso', d: 'M130,298 C127,325 128,355 134,380 M135,300 C133,328 134,352 139,376' },
          { clase: 'sombra', d: elipse(172, 652, 13, 11) },
          { clase: 'sombra', d: elipse(126, 662, 8, 7) },
          { clase: 'linea', d: elipse(122, 708, 18, 17) },
          { clase: 'linea', d: 'M142,690 C155,700 185,700 198,690 M168,694 C166,705 166,715 168,724' },
          { clase: 'linea', d: 'M168,560 C172,595 188,620 208,636 M132,560 C128,590 115,615 100,634' }
        ],
        zonas: [
          con(Z.diafisis, { ancla: [150, 470], ly: 470 }),
          con(Z.cabeza, { ancla: [205, 62], ly: 40 }),
          { id: 'cuello-anatomico', tipo: 'path', d: 'M136,62 C162,86 192,114 212,136 L220,126 C196,104 166,76 142,52 Z', ancla: [188, 104], ly: 100 },
          con(Z.tuberculoMayor, { ancla: [108, 95], ly: 80 }),
          { id: 'surco-intertubercular', tipo: 'path', d: 'M124,60 C130,110 134,160 138,222 L150,222 C148,160 144,110 140,60 Z', ancla: [138, 150], ly: 140 },
          { id: 'tuberculo-menor', tipo: 'elipse', cx: 160, cy: 112, rx: 14, ry: 20, ancla: [164, 118], ly: 160 },
          con(Z.cuelloQuirurgico, { ancla: [150, 192], ly: 200 }),
          { id: 'tuberosidad-deltoidea', tipo: 'path', d: 'M127,292 C122,320 124,360 131,384 L143,380 C140,350 139,320 138,294 Z', ancla: [131, 340], ly: 340 },
          { id: 'fosa-coronoidea', tipo: 'elipse', cx: 172, cy: 652, rx: 13, ry: 11, ancla: [172, 652], ly: 600 },
          { id: 'fosa-radial', tipo: 'elipse', cx: 126, cy: 662, rx: 8, ry: 7, ancla: [126, 662], ly: 610 },
          con(Z.epicondiloMedial, { ancla: [214, 654], ly: 650 }),
          con(Z.epicondiloLateral, { ancla: [94, 662], ly: 660 }),
          { id: 'capitulo', tipo: 'elipse', cx: 122, cy: 708, rx: 18, ry: 17, ancla: [116, 714], ly: 715 },
          con(Z.troclea, { ancla: [180, 714], ly: 710 })
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'linea', d: 'M140,58 C165,80 195,110 216,130' },
          { clase: 'linea', d: 'M100,92 C108,84 118,80 130,80 M102,118 C110,112 120,110 130,112' },
          { clase: 'sombra', d: 'M160,245 C155,300 145,350 130,405 L141,410 C154,355 164,300 171,250 Z' },
          { clase: 'sombra', d: elipse(158, 652, 20, 25) },
          { clase: 'sombra', d: elipse(205, 664, 5, 11) },
          { clase: 'linea', d: 'M142,690 C155,700 185,700 198,690 M168,694 C166,705 166,715 168,724' },
          { clase: 'linea', d: 'M168,560 C172,595 188,620 208,636 M132,560 C128,590 115,615 100,634' }
        ],
        zonas: [
          con(Z.diafisis, { ancla: [160, 480], ly: 480 }),
          con(Z.cabeza, { ancla: [205, 70], ly: 50 }),
          con(Z.tuberculoMayor, { ancla: [108, 100], ly: 95 }),
          con(Z.cuelloQuirurgico, { ancla: [130, 192], ly: 190 }),
          { id: 'surco-nervio-radial', tipo: 'path', d: 'M158,243 C153,300 143,350 128,405 L143,412 C156,355 166,300 173,250 Z', ancla: [143, 360], ly: 340 },
          { id: 'fosa-olecraniana', tipo: 'elipse', cx: 158, cy: 652, rx: 20, ry: 25, ancla: [160, 645], ly: 600 },
          con(Z.epicondiloMedial, { ancla: [217, 646], ly: 650 }),
          { id: 'surco-nervio-cubital', tipo: 'elipse', cx: 205, cy: 664, rx: 6, ry: 12, ancla: [205, 668], ly: 695 },
          con(Z.epicondiloLateral, { ancla: [94, 662], ly: 660 }),
          con(Z.troclea, { ancla: [175, 716], ly: 740 })
        ]
      }
    ]
  };
})();
