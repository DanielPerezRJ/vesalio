/*
 * Lámina: Huesos de la mano derecha (vista palmar).
 * Coordenadas: pulgar (LATERAL) a la izquierda, meñique (MEDIAL) a la derecha; dedos arriba.
 * El contorno es una lista: cada hueso se dibuja como una pieza aparte.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }
  // Hueso largo pequeño (metacarpiano o falange) de a hasta b: extremos redondeados y cintura más fina
  function hueso(a, b, w) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy);
    var ux = dx / L, uy = dy / L, nx = -uy * w / 2, ny = ux * w / 2, k = w * 0.55;
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    function p(x, y) { return x.toFixed(1) + ',' + y.toFixed(1); }
    return 'M' + p(a[0] + nx, a[1] + ny) +
      ' Q' + p(mx + nx * 0.5, my + ny * 0.5) + ' ' + p(b[0] + nx, b[1] + ny) +
      ' C' + p(b[0] + nx + ux * k, b[1] + ny + uy * k) + ' ' + p(b[0] - nx + ux * k, b[1] - ny + uy * k) + ' ' + p(b[0] - nx, b[1] - ny) +
      ' Q' + p(mx - nx * 0.5, my - ny * 0.5) + ' ' + p(a[0] - nx, a[1] - ny) +
      ' C' + p(a[0] - nx - ux * k, a[1] - ny - uy * k) + ' ' + p(a[0] + nx - ux * k, a[1] + ny - uy * k) + ' ' + p(a[0] + nx, a[1] + ny) + ' Z';
  }

  var CARPO = {
    'escafoides': 'M72,566 C70,548 90,536 112,540 C128,544 130,560 124,574 C118,590 96,598 82,590 C74,584 72,576 72,566 Z',
    'semilunar': 'M128,548 C140,540 160,540 168,550 C172,566 166,584 150,590 C136,592 126,580 126,566 Z',
    'piramidal': 'M172,546 C186,538 206,540 214,552 C218,566 210,580 194,582 C180,582 172,570 172,546 Z',
    'pisiforme': elipse(210, 570, 12, 11),
    'trapecio': 'M62,500 C66,486 86,480 100,488 C108,496 108,514 100,526 C90,536 70,534 64,522 C60,514 60,506 62,500 Z',
    'trapezoide': 'M104,488 C112,480 130,480 136,490 L136,524 C130,534 112,534 106,524 Z',
    'grande': 'M138,482 C146,470 164,470 170,482 L172,532 C168,544 144,546 138,534 Z',
    'ganchoso': 'M174,486 C186,476 206,480 214,494 C220,512 214,532 200,538 C186,540 174,532 174,516 Z'
  };
  var META = {
    'metacarpiano-1': [[82, 482], [60, 410], 17],
    'metacarpiano-2': [[118, 478], [110, 330], 15],
    'metacarpiano-3': [[154, 470], [154, 320], 16],
    'metacarpiano-4': [[188, 474], [194, 334], 14],
    'metacarpiano-5': [[206, 484], [226, 356], 13]
  };
  var FALANGES = {
    'falanges-proximales': [[[58, 400], [46, 350], 14], [[109, 322], [104, 250], 13], [[154, 312], [155, 232], 13], [[195, 326], [201, 254], 12], [[227, 348], [238, 292], 11]],
    'falanges-medias': [[[104, 244], [101, 200], 11], [[155, 226], [156, 176], 11], [[202, 248], [205, 204], 10], [[239, 286], [244, 256], 9]],
    'falanges-distales': [[[45, 344], [38, 306], 12], [[101, 194], [99, 164], 9], [[156, 170], [157, 136], 9], [[205, 198], [207, 168], 9], [[245, 250], [248, 226], 8]]
  };

  var ANCHO = 1.45;   // grosor de metacarpianos y falanges
  var trozos = [];
  Object.keys(CARPO).forEach(function (k) { trozos.push(CARPO[k]); });
  Object.keys(META).forEach(function (k) { var m = META[k]; trozos.push(hueso(m[0], m[1], m[2] * ANCHO)); });
  Object.keys(FALANGES).forEach(function (k) { FALANGES[k].forEach(function (f) { trozos.push(hueso(f[0], f[1], f[2] * ANCHO)); }); });

  var ANCLAS = {
    'escafoides': [[96, 568], 610], 'semilunar': [[146, 568], 640], 'trapecio': [[82, 510], 530], 'trapezoide': [[120, 506], 495],
    'grande': [[154, 508], 480], 'ganchoso': [[194, 510], 510], 'piramidal': [[190, 556], 545], 'pisiforme': [[212, 572], 580],
    'metacarpiano-1': [[72, 446], 445], 'metacarpiano-2': [[114, 400], 405], 'metacarpiano-3': [[155, 400], 380],
    'metacarpiano-4': [[191, 404], 415], 'metacarpiano-5': [[216, 420], 450],
    'falanges-proximales': [[106, 286], 285], 'falanges-medias': [[102, 222], 225], 'falanges-distales': [[100, 178], 170]
  };

  var zonas = [];
  function zona(id, d, i) {
    var z = { id: id, tipo: 'path', d: d };
    if (i === 0 || i === undefined) { z.ancla = ANCLAS[id][0]; z.ly = ANCLAS[id][1]; }
    zonas.push(z);
  }
  Object.keys(META).forEach(function (k) { var m = META[k]; zona(k, hueso(m[0], m[1], m[2] * ANCHO)); });
  Object.keys(FALANGES).forEach(function (k) {
    // la falange que lleva el rótulo es la del índice (posición 1) salvo en las medias (posición 0)
    var conRotulo = k === 'falanges-medias' ? 0 : 1;
    FALANGES[k].forEach(function (f, i) {
      var z = { id: k, tipo: 'path', d: hueso(f[0], f[1], f[2] * ANCHO + 2) };
      if (i === conRotulo) { z.ancla = ANCLAS[k][0]; z.ly = ANCLAS[k][1]; }
      zonas.push(z);
    });
  });
  Object.keys(CARPO).forEach(function (k) { zona(k, CARPO[k]); });

  var LAMINA = {
    id: 'mano',
    estructura: 'carpo',
    titulo: 'Huesos de la mano',
    subtitulo: 'Mano derecha',
    ancho: 300,
    vistaNombres: '-190 110 680 545',
    vistaSola: '20 115 260 500',
    contorno: trozos,
    descripcion: 'La mano tiene 27 huesos: 8 del carpo (muñeca), 5 metacarpianos (palma) y 14 falanges (dedos).',

    partes: {
      'escafoides': { nombre: 'Escafoides', descripcion: 'El mayor de la fila proximal del carpo, del lado del pulgar.', puntos: ['Articula con el radio.', 'Se palpa en el fondo de la tabaquera anatómica.'], clinica: 'Es el hueso del carpo que más se fractura (caída sobre la mano extendida). Su sangre entra por el extremo distal, así que el fragmento proximal puede quedar sin irrigación y necrosarse.', pista: 'Hueso proximal del carpo del lado del pulgar; el que más se fractura' },
      'semilunar': { nombre: 'Semilunar', descripcion: 'Hueso con forma de media luna, en el centro de la fila proximal.', puntos: ['Articula con el radio.'], clinica: 'Es el hueso del carpo que más se luxa; su necrosis se llama enfermedad de Kienböck.', pista: 'Hueso central de la fila proximal con forma de media luna' },
      'piramidal': { nombre: 'Piramidal', descripcion: 'Hueso de la fila proximal del lado del meñique.', puntos: ['Articula por delante con el pisiforme.'], pista: 'Hueso proximal del carpo del lado del meñique' },
      'pisiforme': { nombre: 'Pisiforme', descripcion: 'Hueso pequeño con forma de guisante, sobre la cara palmar del piramidal.', puntos: ['Es un sesamoideo dentro del tendón del flexor ulnar del carpo.', 'Se palpa en la base de la eminencia hipotenar.'], pista: 'Hueso pequeño en forma de guisante sobre el piramidal' },
      'trapecio': { nombre: 'Trapecio', descripcion: 'Hueso de la fila distal del lado del pulgar.', puntos: ['Articula con el primer metacarpiano en una articulación en silla de montar, que permite la oposición del pulgar.'], clinica: 'La artrosis de esta articulación (rizartrosis) es muy frecuente en mujeres mayores y causa dolor al hacer pinza.', pista: 'Hueso distal del carpo que articula con el metacarpiano del pulgar' },
      'trapezoide': { nombre: 'Trapezoide', descripcion: 'El hueso más pequeño de la fila distal.', puntos: ['Articula con el segundo metacarpiano.'], pista: 'Pequeño hueso distal que articula con el 2.º metacarpiano' },
      'grande': { nombre: 'Hueso grande', alias: 'Capitato', descripcion: 'El mayor hueso del carpo, en el centro de la fila distal.', puntos: ['Articula sobre todo con el tercer metacarpiano.'], pista: 'El hueso más grande del carpo, en el centro' },
      'ganchoso': { nombre: 'Ganchoso', alias: 'Hamato', descripcion: 'Hueso de la fila distal del lado del meñique, con un gancho en su cara palmar.', puntos: ['Articula con los metacarpianos cuarto y quinto.', 'Su gancho, con el pisiforme, sostiene el retináculo flexor, que es el techo del túnel carpiano.'], clinica: 'Por el túnel carpiano pasa el nervio mediano: su compresión es el síndrome del túnel carpiano (hormigueo en los tres primeros dedos), que a veces se trata con infiltraciones de corticoides.', pista: 'Hueso distal del lado del meñique con un gancho palmar' },
      'metacarpiano-1': { nombre: 'Primer metacarpiano', alias: 'Metacarpiano del pulgar', descripcion: 'El más corto y grueso de los metacarpianos.', puntos: ['Es muy móvil gracias a su articulación con el trapecio.'], clinica: 'La fractura de su base que entra en la articulación se llama fractura de Bennett.', pista: 'Metacarpiano corto y grueso del pulgar' },
      'metacarpiano-2': { nombre: 'Segundo metacarpiano', descripcion: 'El más largo de los metacarpianos, del dedo índice.', puntos: ['Su base articula con el trapezoide, el trapecio y el hueso grande.'], pista: 'El metacarpiano más largo, del índice' },
      'metacarpiano-3': { nombre: 'Tercer metacarpiano', descripcion: 'Metacarpiano del dedo medio.', puntos: ['Su base tiene un proceso estiloides y articula con el hueso grande.'], pista: 'Metacarpiano del dedo medio' },
      'metacarpiano-4': { nombre: 'Cuarto metacarpiano', descripcion: 'Metacarpiano del dedo anular.', puntos: ['Articula con el hueso grande y el ganchoso.'], pista: 'Metacarpiano del dedo anular' },
      'metacarpiano-5': { nombre: 'Quinto metacarpiano', descripcion: 'Metacarpiano del meñique.', puntos: ['Articula con el ganchoso.'], clinica: 'La fractura de su cuello al golpear con el puño cerrado se llama "fractura del boxeador".', pista: 'Metacarpiano del meñique; se fractura al dar un puñetazo' },
      'falanges-proximales': { nombre: 'Falanges proximales', descripcion: 'Las primeras falanges de cada dedo, las más largas.', puntos: ['Articulan con las cabezas de los metacarpianos (articulaciones metacarpofalángicas, los nudillos).'], pista: 'Primeras falanges, unidas a los metacarpianos' },
      'falanges-medias': { nombre: 'Falanges medias', descripcion: 'Falanges intermedias de los dedos índice a meñique.', puntos: ['El pulgar no tiene falange media.'], pista: 'Falanges intermedias; el pulgar no tiene' },
      'falanges-distales': { nombre: 'Falanges distales', descripcion: 'Las últimas falanges, en la punta de los dedos.', puntos: ['Terminan en una tuberosidad que sostiene el pulpejo y la uña.'], pista: 'Falanges de la punta de los dedos, bajo la uña' }
    },

    vistas: [
      {
        id: 'palmar',
        nombre: 'Vista palmar',
        espejo: false,
        dibujo: [{ clase: 'sombra', d: elipse(198, 512, 6, 9) }],
        zonas: zonas
      }
    ]
  };

  window.LAMINAS.carpo = LAMINA;
  window.LAMINAS.metacarpo = LAMINA;
  window.LAMINAS['falanges-mano'] = LAMINA;
})();
