/*
 * Lámina: Tibia derecha (vistas anterior y posterior).
 * Coordenadas base: lado LATERAL (fíbula) a la izquierda, MEDIAL a la derecha.
 * La vista posterior usa `espejo: true`.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var CONTORNO =
    'M70,70 C66,56 80,46 110,44 C128,42 140,36 150,30 C160,36 172,42 190,44 C220,46 236,56 232,72 ' +
    'C230,92 222,108 206,118 C190,130 180,150 178,180 L172,620 C172,650 186,668 200,680 ' +
    'C210,690 214,710 212,736 C210,750 196,752 190,740 C186,730 182,722 172,722 L130,722 ' +
    'C122,716 116,700 116,686 C116,672 120,660 128,640 L128,180 C126,150 112,128 94,118 ' +
    'C78,108 72,90 70,70 Z';

  var Z = {
    cuerpo: { id: 'cuerpo', tipo: 'rect', x: 128, y: 180, w: 50, h: 440 },
    condLat: { id: 'condilo-lateral', tipo: 'path', d: 'M70,70 C66,56 80,46 110,44 L132,46 L132,112 C114,114 98,118 94,118 C78,108 72,90 70,70 Z' },
    condMed: { id: 'condilo-medial', tipo: 'path', d: 'M232,72 C236,56 220,46 190,44 L168,46 L168,112 C186,114 202,118 206,118 C222,108 230,92 232,72 Z' },
    eminencia: { id: 'eminencia-intercondilea', tipo: 'path', d: 'M132,46 C140,40 146,32 150,30 C154,32 160,40 168,46 L166,58 L134,58 Z' },
    maleolo: { id: 'maleolo-medial', tipo: 'path', d: 'M190,678 C210,690 214,710 212,736 C210,750 196,752 190,740 C186,730 180,720 178,700 Z' },
    incisura: { id: 'incisura-fibular', tipo: 'path', d: 'M118,660 C116,680 116,700 122,712 L134,706 L134,664 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.tibia = {
    id: 'tibia',
    estructura: 'tibia',
    titulo: 'Tibia',
    subtitulo: 'Tibia derecha',
    ancho: 300,
    vistaNombres: '-190 10 680 760',
    vistaSola: '40 15 220 750',
    contorno: CONTORNO,
    descripcion: 'Hueso medial y principal de la pierna: transmite el peso del cuerpo del fémur al pie. Articula arriba con el fémur (rodilla), al lado con la fíbula y abajo con el talus (tobillo).',

    partes: {
      'condilo-medial': {
        nombre: 'Cóndilo medial',
        descripcion: 'Masa ósea medial del extremo proximal; su cara superior es la mitad medial de la meseta tibial.',
        puntos: ['Articula con el cóndilo medial del fémur, con el menisco medial entre ambos.', 'Por detrás se inserta el semimembranoso.'],
        pista: 'Mitad medial de la meseta tibial, bajo el menisco medial'
      },
      'condilo-lateral': {
        nombre: 'Cóndilo lateral',
        descripcion: 'Masa ósea lateral del extremo proximal; su cara superior es la mitad lateral de la meseta tibial.',
        puntos: ['Articula con el cóndilo lateral del fémur, con el menisco lateral entre ambos.', 'Por debajo y detrás tiene la carilla para la cabeza de la fíbula.'],
        pista: 'Mitad lateral de la meseta tibial, junto a la cabeza de la fíbula'
      },
      'eminencia-intercondilea': {
        nombre: 'Eminencia intercondílea',
        descripcion: 'Relieve central de la meseta tibial, con dos tubérculos.',
        puntos: ['Delante y detrás de ella están las áreas donde se fijan los ligamentos cruzados y los cuernos de los meniscos.'],
        pista: 'Relieve central de la meseta entre los cóndilos'
      },
      'tuberosidad-tibial': {
        nombre: 'Tuberosidad tibial',
        descripcion: 'Prominencia rugosa en la cara anterior, bajo los cóndilos.',
        puntos: ['Inserción del ligamento patelar, por el que tira el cuádriceps para extender la rodilla.'],
        clinica: 'En adolescentes deportistas puede inflamarse e hincharse (enfermedad de Osgood-Schlatter).',
        pista: 'Prominencia anterior donde se inserta el ligamento patelar'
      },
      'borde-anterior': {
        nombre: 'Borde anterior',
        alias: 'Cresta tibial',
        descripcion: 'Borde afilado de la cara anterior del cuerpo, justo bajo la piel: es la "espinilla".',
        puntos: ['Se palpa en todo su largo porque no hay músculo encima.'],
        clinica: 'Por eso los golpes en la espinilla duelen tanto, y las fracturas de tibia son a menudo expuestas.',
        pista: 'Borde afilado bajo la piel: la espinilla'
      },
      'cara-medial': {
        nombre: 'Cara medial',
        descripcion: 'Superficie ancha y lisa del cuerpo, cubierta solo por piel.',
        puntos: ['Por su parte alta pasan los tendones de la "pata de ganso" (sartorio, grácil y semitendinoso).'],
        clinica: 'Su parte proximal, bajo la tuberosidad, es el sitio de la vía intraósea: en urgencias, sobre todo en niños, se pincha la médula del hueso para administrar fármacos y sueros cuando no se logra una vía venosa.',
        pista: 'Superficie medial subcutánea, sitio de la vía intraósea'
      },
      'cuerpo': {
        nombre: 'Cuerpo de la tibia', alias: 'Diáfisis',
        descripcion: 'Porción larga de sección triangular, más delgada en el tercio inferior.',
        puntos: ['Tiene tres caras (medial, lateral y posterior) y tres bordes.', 'Su borde interóseo, lateral, se une a la fíbula por la membrana interósea.'],
        clinica: 'El tercio inferior tiene poca irrigación, por eso sus fracturas tardan más en consolidar.',
        pista: 'Porción larga triangular de la tibia'
      },
      'linea-soleo': {
        nombre: 'Línea del sóleo',
        descripcion: 'Cresta oblicua en la parte alta de la cara posterior.',
        puntos: ['Origen del músculo sóleo.'],
        pista: 'Cresta oblicua posterior donde nace el sóleo'
      },
      'carilla-fibular': {
        nombre: 'Carilla articular fibular',
        descripcion: 'Pequeña superficie articular en la cara posterolateral del cóndilo lateral.',
        puntos: ['Articula con la cabeza de la fíbula (articulación tibiofibular proximal).'],
        pista: 'Carilla del cóndilo lateral para la cabeza de la fíbula'
      },
      'maleolo-medial': {
        nombre: 'Maléolo medial',
        descripcion: 'Prolongación del extremo distal hacia abajo; es la prominencia interna del tobillo.',
        puntos: ['Su cara lateral articula con el talus.', 'En él se fija el ligamento deltoideo (colateral medial del tobillo).'],
        clinica: 'Se fractura en las torceduras graves del tobillo.',
        pista: 'Prominencia interna del tobillo'
      },
      'surco-maleolar': {
        nombre: 'Surco maleolar',
        descripcion: 'Canal en la cara posterior del maléolo medial.',
        puntos: ['Por él pasan los tendones del tibial posterior y del flexor largo de los dedos.'],
        pista: 'Canal posterior del maléolo medial para tendones flexores'
      },
      'incisura-fibular': {
        nombre: 'Incisura fibular',
        descripcion: 'Escotadura en la cara lateral del extremo distal.',
        puntos: ['Recibe el extremo distal de la fíbula (sindesmosis tibiofibular).'],
        pista: 'Escotadura distal lateral que recibe la fíbula'
      },
      'cara-articular-inferior': {
        nombre: 'Cara articular inferior',
        descripcion: 'Superficie articular del extremo distal, cuadrangular.',
        puntos: ['Articula con el talus (articulación talocrural, el tobillo).'],
        pista: 'Superficie distal que articula con el talus'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'sombra', d: elipse(152, 150, 14, 18) },
          { clase: 'linea', d: 'M74,96 C110,108 190,108 228,96' },
          { clase: 'linea', d: 'M151,170 C150,300 152,460 156,620' },
          { clase: 'linea', d: 'M130,722 L172,722' }
        ],
        zonas: [
          con(Z.cuerpo, { ancla: [138, 420], ly: 420 }),
          { id: 'cara-medial', tipo: 'path', d: 'M160,180 L178,180 L172,620 L162,620 Z', ancla: [168, 480], ly: 480 },
          { id: 'borde-anterior', tipo: 'path', d: 'M146,172 L156,172 L160,620 L150,620 Z', ancla: [153, 300], ly: 300 },
          con(Z.condLat, { ancla: [100, 80], ly: 70 }),
          con(Z.condMed, { ancla: [200, 80], ly: 70 }),
          con(Z.eminencia, { ancla: [152, 42], ly: 32 }),
          { id: 'tuberosidad-tibial', tipo: 'elipse', cx: 152, cy: 150, rx: 14, ry: 18, ancla: [154, 150], ly: 150 },
          con(Z.incisura, { ancla: [124, 686], ly: 680 }),
          con(Z.maleolo, { ancla: [200, 716], ly: 710 }),
          { id: 'cara-articular-inferior', tipo: 'path', d: 'M126,712 L180,712 L184,724 L128,724 Z', ancla: [160, 718], ly: 745 }
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'rugoso', d: 'M132,186 C148,214 162,244 176,278' },
          { clase: 'sombra', d: elipse(84, 116, 8, 7) },
          { clase: 'sombra', d: elipse(188, 700, 5, 14) },
          { clase: 'linea', d: 'M74,96 C110,108 190,108 228,96' }
        ],
        zonas: [
          con(Z.cuerpo, { ancla: [140, 430], ly: 430 }),
          { id: 'linea-soleo', tipo: 'path', d: 'M128,186 L136,182 C150,210 164,240 178,272 L172,282 C158,250 142,218 128,186 Z', ancla: [160, 236], ly: 230 },
          con(Z.condLat, { ancla: [104, 76], ly: 70 }),
          con(Z.condMed, { ancla: [200, 80], ly: 70 }),
          con(Z.eminencia, { ancla: [148, 42], ly: 32 }),
          { id: 'carilla-fibular', tipo: 'elipse', cx: 84, cy: 116, rx: 9, ry: 8, ancla: [84, 116], ly: 120 },
          con(Z.incisura, { ancla: [124, 686], ly: 680 }),
          con(Z.maleolo, { ancla: [202, 722], ly: 725 }),
          { id: 'surco-maleolar', tipo: 'elipse', cx: 188, cy: 700, rx: 6, ry: 14, ancla: [188, 696], ly: 690 }
        ]
      }
    ]
  };
})();
