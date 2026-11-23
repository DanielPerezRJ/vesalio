/*
 * Lámina: Clavícula derecha (vistas superior e inferior).
 * Coordenadas base (vista superior, anterior abajo): extremo ACROMIAL (lateral) a la izquierda,
 * extremo ESTERNAL (medial) a la derecha. La vista inferior usa `espejo: true`.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  var CONTORNO =
    'M24,140 C30,126 60,124 76,130 C100,140 130,150 160,146 C200,140 230,128 252,130 ' +
    'C272,132 286,142 286,156 C286,172 272,180 256,176 C230,170 200,176 168,182 ' +
    'C130,188 100,176 80,166 C64,162 40,168 28,160 C20,154 20,146 24,140 Z';

  var Z = {
    acromial: { id: 'extremo-acromial', tipo: 'path', d: 'M24,140 C30,126 60,124 76,130 L80,166 C64,162 40,168 28,160 C20,154 20,146 24,140 Z' },
    cuerpo: { id: 'cuerpo', tipo: 'path', d: 'M76,130 C100,140 130,150 160,146 C200,140 222,130 240,130 L240,174 C220,172 196,176 168,182 C130,188 100,176 80,166 Z' },
    esternal: { id: 'extremo-esternal', tipo: 'path', d: 'M240,130 C272,132 286,142 286,156 C286,172 272,180 256,176 L240,174 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.clavicula = {
    id: 'clavicula',
    estructura: 'clavicula',
    titulo: 'Clavícula',
    subtitulo: 'Clavícula derecha',
    ancho: 300,
    vistaNombres: '-190 40 680 230',
    vistaSola: '5 85 290 140',
    contorno: CONTORNO,
    descripcion: 'Hueso largo en forma de S tendida que une el esternón con la escápula. Es la única unión ósea entre el miembro superior y el tronco.',

    partes: {
      'extremo-esternal': {
        nombre: 'Extremo esternal',
        descripcion: 'Extremo medial, grueso y redondeado.',
        puntos: ['Articula con el manubrio del esternón y el primer cartílago costal (articulación esternoclavicular).', 'Un disco articular reparte las fuerzas en esta articulación.'],
        pista: 'Extremo medial grueso que articula con el manubrio'
      },
      'extremo-acromial': {
        nombre: 'Extremo acromial',
        descripcion: 'Extremo lateral, ancho y aplanado.',
        puntos: ['Articula con el acromion de la escápula (articulación acromioclavicular).'],
        clinica: 'Una caída sobre el hombro puede luxar esta articulación ("hombro separado"); el extremo de la clavícula queda saliente bajo la piel.',
        pista: 'Extremo lateral aplanado que articula con el acromion'
      },
      'cuerpo': {
        nombre: 'Cuerpo de la clavícula',
        descripcion: 'Porción curva: convexa hacia delante en sus dos tercios mediales y cóncava en el tercio lateral.',
        puntos: ['Origen del deltoides y del pectoral mayor; inserción del trapecio y del esternocleidomastoideo.', 'Se palpa en toda su longitud.'],
        clinica: 'Es el hueso que más se fractura, casi siempre en la unión del tercio medio con el lateral, donde cambia la curvatura. También puede fracturarse en el recién nacido durante el parto.',
        pista: 'Porción en S; el hueso que más se fractura'
      },
      'tuberculo-conoideo': {
        nombre: 'Tubérculo conoideo',
        descripcion: 'Pequeña eminencia en la cara inferior, cerca del extremo lateral.',
        puntos: ['Inserción del ligamento conoideo, parte del ligamento coracoclavicular.'],
        pista: 'Eminencia inferior lateral donde se fija el ligamento conoideo'
      },
      'linea-trapezoidea': {
        nombre: 'Línea trapezoidea',
        descripcion: 'Cresta oblicua de la cara inferior, lateral al tubérculo conoideo.',
        puntos: ['Inserción del ligamento trapezoideo, la otra parte del ligamento coracoclavicular.'],
        pista: 'Cresta inferior donde se fija el ligamento trapezoideo'
      },
      'surco-subclavio': {
        nombre: 'Surco del músculo subclavio',
        descripcion: 'Canal en la cara inferior del tercio medio.',
        puntos: ['Inserción del músculo subclavio.', 'Bajo él pasan la arteria y la vena subclavias y el plexo braquial.'],
        clinica: 'Por eso una fractura de clavícula puede lesionar los vasos subclavios o el plexo braquial.',
        pista: 'Canal inferior del tercio medio; bajo él pasan los vasos subclavios'
      },
      'impresion-costoclavicular': {
        nombre: 'Impresión costoclavicular', alias: 'Impresión del ligamento costoclavicular',
        descripcion: 'Superficie rugosa en la cara inferior del extremo esternal.',
        puntos: ['Inserción del ligamento costoclavicular, que la une a la primera costilla.'],
        pista: 'Rugosidad inferior medial que une la clavícula a la 1.ª costilla'
      }
    },

    vistas: [
      {
        id: 'superior',
        nombre: 'Vista superior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M80,148 C110,160 140,166 170,162 C200,158 226,150 244,150' },
          { clase: 'linea', d: 'M284,148 C288,156 288,164 284,170' }
        ],
        zonas: [
          con(Z.cuerpo, { ancla: [160, 162], ly: 200 }),
          con(Z.acromial, { ancla: [48, 148], ly: 110 }),
          con(Z.esternal, { ancla: [262, 156], ly: 110 })
        ]
      },
      {
        id: 'inferior',
        nombre: 'Vista inferior',
        espejo: true,
        dibujo: [
          { clase: 'sombra', d: 'M120,156 C140,152 170,152 186,156 C170,166 140,166 120,156 Z' },
          { clase: 'rugoso', d: 'M52,140 L82,160' },
          { clase: 'sombra', d: 'M226,160 C232,154 248,154 252,162 C248,170 232,172 226,166 Z' }
        ],
        zonas: [
          con(Z.cuerpo, { ancla: [200, 168], ly: 235 }),
          con(Z.acromial, { ancla: [36, 150], ly: 110 }),
          con(Z.esternal, { ancla: [272, 158], ly: 110 }),
          { id: 'tuberculo-conoideo', tipo: 'elipse', cx: 90, cy: 140, rx: 8, ry: 7, ancla: [90, 140], ly: 80 },
          { id: 'linea-trapezoidea', tipo: 'path', d: 'M48,140 L56,136 L86,158 L78,164 Z', ancla: [66, 150], ly: 200 },
          { id: 'surco-subclavio', tipo: 'path', d: 'M118,156 C140,150 170,150 188,156 C170,168 140,168 118,156 Z', ancla: [154, 158], ly: 80 },
          { id: 'impresion-costoclavicular', tipo: 'path', d: 'M224,160 C232,152 250,152 254,162 C250,172 232,174 224,166 Z', ancla: [240, 162], ly: 196 }
        ]
      }
    ]
  };
})();
