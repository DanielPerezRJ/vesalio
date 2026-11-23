/*
 * Lámina: Fíbula derecha (vistas anterior y posterior).
 * Coordenadas base: LATERAL a la izquierda, MEDIAL (lado de la tibia) a la derecha.
 * La vista posterior usa `espejo: true`.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  var CONTORNO =
    'M118,46 C122,36 132,34 136,44 C150,44 168,52 172,66 C176,82 168,98 156,106 ' +
    'L154,140 L158,620 C166,640 170,666 166,696 C162,722 148,738 132,736 ' +
    'C118,734 112,716 114,692 C116,664 128,640 136,620 L138,140 L134,110 ' +
    'C120,100 110,82 112,64 C112,56 114,50 118,46 Z';

  var Z = {
    cabeza: { id: 'cabeza', tipo: 'path', d: 'M118,46 C122,36 132,34 136,44 C150,44 168,52 172,66 C176,82 168,98 156,106 L134,108 C120,100 110,82 112,64 C112,56 114,50 118,46 Z' },
    vertice: { id: 'vertice', tipo: 'elipse', cx: 127, cy: 44, rx: 8, ry: 8 },
    cuello: { id: 'cuello', tipo: 'rect', x: 135, y: 108, w: 20, h: 32 },
    cuerpo: { id: 'cuerpo', tipo: 'rect', x: 137, y: 140, w: 19, h: 480 },
    maleolo: { id: 'maleolo-lateral', tipo: 'path', d: 'M136,620 L158,620 C166,640 170,666 166,696 C162,722 148,738 132,736 C118,734 112,716 114,692 C116,664 128,640 136,620 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.perone = {
    id: 'fibula',
    estructura: 'perone',
    titulo: 'Fíbula',
    subtitulo: 'Fíbula derecha',
    ancho: 300,
    vistaNombres: '-190 15 680 750',
    vistaSola: '40 20 220 740',
    contorno: CONTORNO,
    descripcion: 'Hueso largo y delgado, lateral a la tibia. Casi no soporta peso: sirve de inserción muscular y forma la parte lateral del tobillo.',

    partes: {
      'cabeza': {
        nombre: 'Cabeza de la fíbula',
        descripcion: 'Extremo proximal engrosado, bajo el cóndilo lateral de la tibia.',
        puntos: ['Su carilla articular se une a la tibia (articulación tibiofibular proximal).', 'Inserción del bíceps femoral y del ligamento colateral fibular de la rodilla.', 'Se palpa en la cara lateral de la rodilla.'],
        pista: 'Extremo proximal que se palpa en la cara lateral de la rodilla'
      },
      'vertice': {
        nombre: 'Vértice de la cabeza', alias: 'Proceso estiloides de la fíbula',
        descripcion: 'Punta que sobresale hacia arriba desde la cabeza.',
        puntos: ['Allí se fija parte del ligamento colateral fibular.'],
        pista: 'Punta superior de la cabeza de la fíbula'
      },
      'carilla-cabeza': {
        nombre: 'Carilla articular de la cabeza',
        descripcion: 'Superficie articular en la cara medial de la cabeza.',
        puntos: ['Articula con la carilla fibular del cóndilo lateral de la tibia.'],
        pista: 'Carilla medial de la cabeza que articula con la tibia'
      },
      'cuello': {
        nombre: 'Cuello de la fíbula',
        descripcion: 'Segmento estrecho bajo la cabeza.',
        puntos: ['El nervio fibular común lo rodea por fuera, muy superficial.'],
        clinica: 'Una fractura o un yeso apretado a este nivel pueden lesionar el nervio fibular común y causar "pie caído" (no se puede levantar la punta del pie).',
        pista: 'Segmento estrecho rodeado por el nervio fibular común'
      },
      'cuerpo': {
        nombre: 'Cuerpo de la fíbula', alias: 'Diáfisis',
        descripcion: 'Porción larga, delgada y retorcida.',
        puntos: ['Su borde interóseo se une a la tibia por la membrana interósea.', 'Origen de los músculos fibulares y de parte de los flexores y extensores del pie.'],
        clinica: 'Como casi no soporta peso, un segmento de su cuerpo puede usarse como injerto óseo con sus vasos (por ejemplo, para reconstruir la mandíbula).',
        pista: 'Porción larga y delgada que casi no soporta peso'
      },
      'maleolo-lateral': {
        nombre: 'Maléolo lateral',
        descripcion: 'Extremo distal; es la prominencia externa del tobillo y baja más que el maléolo medial.',
        puntos: ['Allí se fijan los ligamentos laterales del tobillo (talofibulares anterior y posterior y calcaneofibular).'],
        clinica: 'El esguince de tobillo más común (por inversión del pie) rompe el ligamento talofibular anterior, que sale del borde anterior de este maléolo.',
        pista: 'Prominencia externa del tobillo, más baja que la interna'
      },
      'carilla-maleolar': {
        nombre: 'Carilla articular del maléolo',
        descripcion: 'Superficie articular triangular en la cara medial del maléolo lateral.',
        puntos: ['Articula con la cara lateral del talus (articulación talocrural).'],
        pista: 'Cara medial del maléolo que articula con el talus'
      },
      'fosa-maleolar': {
        nombre: 'Fosa maleolar',
        descripcion: 'Depresión en la cara posterior y medial del maléolo lateral.',
        puntos: ['Allí se fija el ligamento talofibular posterior.'],
        pista: 'Depresión posterior del maléolo lateral'
      },
      'surco-maleolar': {
        nombre: 'Surco maleolar',
        descripcion: 'Canal en la cara posterior del maléolo lateral.',
        puntos: ['Por él pasan los tendones de los músculos fibulares largo y corto.'],
        pista: 'Canal posterior por donde pasan los tendones fibulares'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M146,140 C144,300 146,460 148,620' },
          { clase: 'sombra', d: 'M156,668 C160,676 160,694 156,702 C152,694 152,676 156,668 Z' }
        ],
        zonas: [
          con(Z.cuerpo, { ancla: [146, 400], ly: 400 }),
          con(Z.cabeza, { ancla: [142, 76], ly: 90 }),
          { id: 'carilla-cabeza', tipo: 'elipse', cx: 166, cy: 76, rx: 6, ry: 11, ancla: [168, 76], ly: 70 },
          con(Z.vertice, { ancla: [127, 42], ly: 40 }),
          con(Z.cuello, { ancla: [146, 124], ly: 130 }),
          con(Z.maleolo, { ancla: [138, 700], ly: 700 }),
          { id: 'carilla-maleolar', tipo: 'elipse', cx: 158, cy: 684, rx: 6, ry: 18, ancla: [158, 684], ly: 670 }
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'sombra', d: 'M150,690 C160,684 166,700 162,714 C154,718 148,708 150,690 Z' },
          { clase: 'sombra', d: 'M120,672 C124,668 128,680 126,708 C122,712 118,700 120,672 Z' }
        ],
        zonas: [
          con(Z.cuerpo, { ancla: [146, 400], ly: 400 }),
          con(Z.cabeza, { ancla: [146, 76], ly: 90 }),
          con(Z.vertice, { ancla: [127, 42], ly: 40 }),
          con(Z.cuello, { ancla: [146, 124], ly: 130 }),
          con(Z.maleolo, { ancla: [134, 724], ly: 735 }),
          { id: 'fosa-maleolar', tipo: 'path', d: 'M150,688 C160,682 168,700 162,716 C152,720 146,708 150,688 Z', ancla: [156, 702], ly: 700 },
          { id: 'surco-maleolar', tipo: 'path', d: 'M118,670 C124,664 130,680 128,710 C122,714 116,700 118,670 Z', ancla: [123, 690], ly: 680 }
        ]
      }
    ]
  };
})();
