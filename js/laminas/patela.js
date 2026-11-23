/*
 * Lámina: Patela derecha (vistas anterior y posterior).
 * Coordenadas base (vista anterior): LATERAL a la izquierda, MEDIAL a la derecha.
 * La vista posterior usa `espejo: true` (la carilla lateral, más grande, queda a la derecha).
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  var CONTORNO =
    'M70,80 C100,60 200,60 232,82 C246,100 240,140 226,180 C210,230 180,280 156,300 ' +
    'C150,304 146,304 140,300 C116,280 84,232 70,184 C58,146 56,104 70,80 Z';

  var Z = {
    base: { id: 'base', tipo: 'path', d: 'M70,80 C100,60 200,60 232,82 L230,100 C196,84 104,84 72,100 Z' },
    vertice: { id: 'vertice', tipo: 'path', d: 'M126,276 L172,276 C164,290 158,298 152,302 C146,304 136,292 126,276 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.rotula = {
    id: 'patela',
    estructura: 'rotula',
    titulo: 'Patela',
    subtitulo: 'Patela derecha',
    ancho: 300,
    vistaNombres: '-190 40 680 290',
    vistaSola: '30 45 240 275',
    contorno: CONTORNO,
    descripcion: 'El hueso sesamoideo más grande del cuerpo, dentro del tendón del cuádriceps. Protege la rodilla por delante y aumenta la fuerza con que el cuádriceps extiende la pierna.',

    partes: {
      'base': {
        nombre: 'Base de la patela',
        descripcion: 'Borde superior, ancho y grueso.',
        puntos: ['Inserción del tendón del cuádriceps femoral.'],
        pista: 'Borde superior donde se inserta el tendón del cuádriceps'
      },
      'vertice': {
        nombre: 'Vértice de la patela',
        descripcion: 'Extremo inferior puntiagudo.',
        puntos: ['Origen del ligamento patelar, que baja hasta la tuberosidad tibial.'],
        clinica: 'El reflejo patelar se provoca golpeando el ligamento patelar justo debajo del vértice.',
        pista: 'Extremo inferior donde nace el ligamento patelar'
      },
      'cara-anterior': {
        nombre: 'Cara anterior',
        descripcion: 'Superficie convexa y rugosa, cubierta por fibras del tendón del cuádriceps.',
        puntos: ['Queda justo bajo la piel.'],
        clinica: 'La bolsa serosa que la cubre se inflama al arrodillarse mucho (bursitis prepatelar).',
        pista: 'Superficie anterior rugosa bajo la piel'
      },
      'carilla-lateral': {
        nombre: 'Carilla articular lateral',
        descripcion: 'La mayor de las dos superficies articulares de la cara posterior.',
        puntos: ['Articula con el labio lateral de la cara patelar del fémur.'],
        pista: 'Carilla posterior más grande, del lado lateral'
      },
      'carilla-medial': {
        nombre: 'Carilla articular medial',
        descripcion: 'Superficie articular medial, más pequeña.',
        puntos: ['Articula con el labio medial de la cara patelar del fémur.'],
        pista: 'Carilla posterior más pequeña, del lado medial'
      },
      'cresta-vertical': {
        nombre: 'Cresta vertical',
        descripcion: 'Relieve que separa las dos carillas articulares.',
        puntos: ['Encaja en el surco de la cara patelar del fémur y guía el deslizamiento de la patela.'],
        clinica: 'El desgaste del cartílago de la cara posterior (condromalacia patelar) causa dolor al subir escaleras o al estar mucho rato sentado.',
        pista: 'Relieve posterior que separa las carillas y guía a la patela'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M100,110 L104,200 M130,104 L134,240 M160,104 L158,250 M190,108 L182,220 M216,116 L206,180' }
        ],
        zonas: [
          { id: 'cara-anterior', tipo: 'path', d: 'M72,100 C104,84 196,84 230,100 C236,130 228,160 220,190 C204,232 182,264 172,276 L126,276 C110,250 86,220 76,184 C66,150 66,120 72,100 Z', ancla: [150, 180], ly: 180 },
          con(Z.base, { ancla: [150, 76], ly: 60 }),
          con(Z.vertice, { ancla: [150, 290], ly: 290 })
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'sombra', d: 'M80,100 C110,92 140,92 150,100 L150,240 C120,230 96,200 84,160 Z' },
          { clase: 'linea', d: 'M150,96 L150,244' }
        ],
        zonas: [
          { id: 'carilla-lateral', tipo: 'path', d: 'M80,100 C110,92 140,92 148,100 L148,238 C120,230 96,200 84,160 Z', ancla: [112, 160], ly: 160 },
          { id: 'carilla-medial', tipo: 'path', d: 'M152,100 C170,92 200,92 222,104 C220,150 200,200 152,238 Z', ancla: [190, 140], ly: 140 },
          { id: 'cresta-vertical', tipo: 'rect', x: 147, y: 100, w: 6, h: 140, ancla: [150, 200], ly: 230 },
          con(Z.base, { ancla: [150, 76], ly: 60 }),
          con(Z.vertice, { ancla: [150, 290], ly: 290 })
        ]
      }
    ]
  };
})();
