/*
 * Lámina: Huesos del pie derecho (vista dorsal, mirando el pie desde arriba).
 * Coordenadas: dedo gordo (MEDIAL) a la izquierda, dedo pequeño (LATERAL) a la derecha; dedos arriba, talón abajo.
 * El contorno es una lista: cada hueso se dibuja como una pieza aparte.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }
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

  var TARSO = {
    'calcaneo': 'M150,520 C170,514 214,516 228,530 C240,560 236,610 216,636 C200,650 170,650 158,634 C146,610 142,560 150,520 Z',
    'talus': 'M114,452 C134,440 190,440 206,452 C214,470 210,500 196,516 C176,526 146,524 132,512 C112,504 104,476 114,452 Z',
    'navicular': 'M88,404 C110,398 150,398 168,404 C170,418 160,436 140,440 C116,444 92,432 88,416 Z',
    'cuboides': 'M178,362 L208,366 C222,390 228,420 224,446 L184,446 C176,420 174,390 178,362 Z',
    'cuneiforme-medial': 'M88,342 C88,336 120,336 120,342 L122,396 C112,402 96,402 90,396 Z',
    'cuneiforme-intermedio': 'M124,350 L144,350 L146,394 L124,396 Z',
    'cuneiforme-lateral': 'M148,352 L174,354 L176,398 L148,398 Z'
  };
  var META = {
    'metatarsiano-1': [[104, 334], [96, 226], 26],
    'metatarsiano-2': [[134, 344], [128, 208], 16],
    'metatarsiano-3': [[160, 348], [160, 214], 15],
    'metatarsiano-4': [[188, 356], [194, 226], 14],
    'metatarsiano-5': [[212, 362], [230, 250], 14]
  };
  var FALANGES = {
    'falanges-proximales': [[[95, 214], [90, 162], 22], [[128, 198], [130, 156], 12], [[160, 204], [164, 162], 12], [[194, 216], [199, 178], 11], [[231, 240], [240, 208], 11]],
    'falanges-medias': [[[130, 150], [131, 126], 11], [[164, 156], [166, 136], 11], [[199, 172], [201, 154], 10], [[240, 202], [243, 188], 10]],
    'falanges-distales': [[[89, 154], [87, 116], 19], [[131, 120], [132, 102], 10], [[166, 130], [167, 114], 10], [[201, 148], [203, 134], 9], [[243, 182], [245, 170], 9]]
  };

  var trozos = [];
  Object.keys(TARSO).forEach(function (k) { trozos.push(TARSO[k]); });
  Object.keys(META).forEach(function (k) { var m = META[k]; trozos.push(hueso(m[0], m[1], m[2])); });
  Object.keys(FALANGES).forEach(function (k) { FALANGES[k].forEach(function (f) { trozos.push(hueso(f[0], f[1], f[2])); }); });

  var ANCLAS = {
    'falanges-distales': [[88, 134], 110], 'falanges-proximales': [[92, 188], 175], 'falanges-medias': [[131, 138], 140],
    'metatarsiano-1': [[100, 280], 270], 'metatarsiano-2': [[131, 290], 305],
    'cuneiforme-medial': [[104, 370], 350], 'cuneiforme-intermedio': [[134, 374], 385], 'navicular': [[118, 420], 420],
    'talus': [[146, 476], 470],
    'metatarsiano-3': [[160, 290], 250], 'metatarsiano-4': [[191, 300], 285], 'metatarsiano-5': [[222, 306], 320],
    'cuneiforme-lateral': [[162, 376], 360], 'cuboides': [[202, 410], 405], 'calcaneo': [[194, 590], 590]
  };

  var zonas = [];
  Object.keys(META).forEach(function (k) {
    var m = META[k];
    zonas.push({ id: k, tipo: 'path', d: hueso(m[0], m[1], m[2]), ancla: ANCLAS[k][0], ly: ANCLAS[k][1] });
  });
  Object.keys(FALANGES).forEach(function (k) {
    FALANGES[k].forEach(function (f, i) {
      var z = { id: k, tipo: 'path', d: hueso(f[0], f[1], f[2] + 2) };
      if (i === 0) { z.ancla = ANCLAS[k][0]; z.ly = ANCLAS[k][1]; }
      zonas.push(z);
    });
  });
  Object.keys(TARSO).forEach(function (k) { zonas.push({ id: k, tipo: 'path', d: TARSO[k], ancla: ANCLAS[k][0], ly: ANCLAS[k][1] }); });

  var LAMINA = {
    id: 'pie',
    estructura: 'tarso',
    titulo: 'Huesos del pie',
    subtitulo: 'Pie derecho',
    ancho: 300,
    vistaNombres: '-190 90 680 570',
    vistaSola: '30 95 240 560',
    contorno: trozos,
    descripcion: 'El pie tiene 26 huesos: 7 del tarso, 5 metatarsianos y 14 falanges. Forman arcos que reparten el peso del cuerpo.',

    partes: {
      'calcaneo': { nombre: 'Calcáneo', descripcion: 'El hueso más grande del pie; forma el talón.', puntos: ['En su tuberosidad, detrás, se inserta el tendón calcáneo (de Aquiles).', 'Sostiene al talus y articula por delante con el cuboides.'], clinica: 'La inflamación de la fascia plantar donde se une al calcáneo (fascitis plantar) causa dolor de talón al dar los primeros pasos de la mañana.', pista: 'El hueso del talón, donde se inserta el tendón de Aquiles' },
      'talus': { nombre: 'Talus', alias: 'Astrágalo', descripcion: 'Hueso que une la pierna con el pie; transmite el peso de la tibia al resto del pie.', puntos: ['Su tróclea articula con la tibia y la fíbula (articulación talocrural, el tobillo).', 'No tiene inserciones musculares.', 'Su cabeza articula por delante con el navicular.'], clinica: 'Casi toda su superficie es cartílago y recibe poca sangre: sus fracturas del cuello pueden terminar en necrosis.', pista: 'Hueso del tobillo sin músculos, sobre el calcáneo' },
      'navicular': { nombre: 'Navicular', alias: 'Escafoides del pie', descripcion: 'Hueso con forma de bote en el lado medial, entre el talus y los cuneiformes.', puntos: ['Su tuberosidad medial se palpa y en ella se inserta el tibial posterior, que sostiene el arco.'], pista: 'Hueso medial en forma de bote delante del talus' },
      'cuboides': { nombre: 'Cuboides', descripcion: 'Hueso del lado lateral, delante del calcáneo.', puntos: ['Articula con los metatarsianos cuarto y quinto.', 'Por un surco de su cara plantar pasa el tendón del fibular largo.'], pista: 'Hueso lateral del tarso, delante del calcáneo' },
      'cuneiforme-medial': { nombre: 'Cuneiforme medial', descripcion: 'El mayor de los tres cuneiformes.', puntos: ['Articula con el primer metatarsiano.'], pista: 'Cuneiforme más grande, unido al metatarsiano del dedo gordo' },
      'cuneiforme-intermedio': { nombre: 'Cuneiforme intermedio', descripcion: 'El más pequeño de los cuneiformes.', puntos: ['Articula con el segundo metatarsiano, que queda encajado entre los otros dos cuneiformes.'], pista: 'Cuneiforme más pequeño, unido al 2.º metatarsiano' },
      'cuneiforme-lateral': { nombre: 'Cuneiforme lateral', descripcion: 'Cuneiforme situado entre el intermedio y el cuboides.', puntos: ['Articula con el tercer metatarsiano.'], pista: 'Cuneiforme junto al cuboides, unido al 3.er metatarsiano' },
      'metatarsiano-1': { nombre: 'Primer metatarsiano', descripcion: 'El más corto y grueso; corresponde al dedo gordo.', puntos: ['Bajo su cabeza hay dos huesos sesamoideos.', 'Soporta mucho peso al caminar.'], clinica: 'Si se desvía hacia medial y el dedo gordo hacia lateral aparece el hallux valgus ("juanete"). En el pie diabético, por la falta de sensibilidad, se forman úlceras sobre las cabezas de los metatarsianos.', pista: 'Metatarsiano corto y grueso del dedo gordo' },
      'metatarsiano-2': { nombre: 'Segundo metatarsiano', descripcion: 'El más largo de los metatarsianos.', puntos: ['Su base está encajada entre los cuneiformes, por eso es el más estable.'], clinica: 'Es el que más sufre fracturas por estrés (fractura "de marcha") al caminar o correr mucho.', pista: 'El metatarsiano más largo; típico de fracturas por estrés' },
      'metatarsiano-3': { nombre: 'Tercer metatarsiano', descripcion: 'Metatarsiano del tercer dedo.', puntos: ['Articula con el cuneiforme lateral.'], pista: 'Metatarsiano del tercer dedo' },
      'metatarsiano-4': { nombre: 'Cuarto metatarsiano', descripcion: 'Metatarsiano del cuarto dedo.', puntos: ['Articula con el cuboides.'], pista: 'Metatarsiano del cuarto dedo, unido al cuboides' },
      'metatarsiano-5': { nombre: 'Quinto metatarsiano', descripcion: 'Metatarsiano del dedo pequeño; su base tiene una tuberosidad que se palpa en el borde lateral del pie.', puntos: ['En la tuberosidad se inserta el fibular corto.'], clinica: 'En los esguinces de tobillo por inversión, el fibular corto puede arrancar un trozo de la tuberosidad (fractura por avulsión).', pista: 'Metatarsiano del dedo pequeño con una tuberosidad lateral' },
      'falanges-proximales': { nombre: 'Falanges proximales', descripcion: 'Las primeras falanges de cada dedo.', puntos: ['Articulan con las cabezas de los metatarsianos (articulaciones metatarsofalángicas).'], clinica: 'La gota afecta típicamente a la articulación metatarsofalángica del dedo gordo (podagra). Se trata con antiinflamatorios o colchicina en la crisis y con alopurinol para bajar el ácido úrico.', pista: 'Primeras falanges, unidas a los metatarsianos' },
      'falanges-medias': { nombre: 'Falanges medias', descripcion: 'Falanges intermedias de los dedos segundo a quinto.', puntos: ['El dedo gordo (hallux) no tiene falange media.'], pista: 'Falanges intermedias; el dedo gordo no tiene' },
      'falanges-distales': { nombre: 'Falanges distales', descripcion: 'Las últimas falanges, bajo las uñas.', puntos: ['La del dedo gordo es la más grande.'], pista: 'Falanges de la punta de los dedos' }
    },

    vistas: [
      {
        id: 'dorsal',
        nombre: 'Vista dorsal',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M128,470 C146,458 182,458 196,470' },
          { clase: 'sombra', d: elipse(222, 360, 6, 8) }
        ],
        zonas: zonas
      }
    ]
  };

  window.LAMINAS.tarso = LAMINA;
  window.LAMINAS.metatarso = LAMINA;
  window.LAMINAS['falanges-pie'] = LAMINA;
})();
