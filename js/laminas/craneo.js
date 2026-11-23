/*
 * Lámina: Cráneo (vista anterior y vista lateral derecha).
 * Cada vista tiene su propio contorno. Las fichas de los huesos se toman del sistema óseo
 * (window.SISTEMAS.oseo) para no repetir el texto; los accidentes tienen ficha propia.
 * Vista lateral: ANTERIOR (cara) a la izquierda, POSTERIOR (nuca) a la derecha.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }
  function espejoX(d) {
    return d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, function (m, x, y) { return (300 - parseFloat(x)) + ',' + y; });
  }

  // ---------- Vista anterior ----------
  var ORBITA = 'M72,190 C72,165 95,155 115,158 C135,160 140,180 138,200 C136,222 118,232 100,230 C82,228 72,212 72,190 Z';
  var ORB_DENTRO = 'M80,178 C84,168 94,164 102,166 L104,198 C96,202 86,200 80,194 Z M120,174 L134,180 L134,204 L122,206 Z M126,208 L137,206 L136,222 L127,220 Z';
  var PIRIFORME = 'M150,240 C140,244 132,270 134,292 C138,300 146,302 150,300 C154,302 162,300 166,292 C168,270 160,244 150,240 Z';
  var ANT =
    'M150,30 C220,30 262,80 260,150 C258,190 250,215 244,235 C246,260 240,290 228,305 ' +
    'C232,330 230,360 222,380 C210,410 180,430 150,432 C120,430 90,410 78,380 ' +
    'C70,360 68,330 72,305 C60,290 54,260 56,235 C50,215 42,190 40,150 C38,80 80,30 150,30 Z ' +
    ORBITA + ' ' + espejoX(ORBITA) + ' ' + PIRIFORME;

  // ---------- Vista lateral ----------
  var LAT =
    'M62,170 C50,130 70,70 120,52 C170,30 250,40 276,110 C290,160 282,210 256,240 ' +
    'C246,252 230,256 216,256 C214,270 204,278 196,270 L186,258 C182,280 180,300 182,316 ' +
    'C184,330 176,338 166,338 C140,340 110,346 84,352 C66,354 58,346 60,332 ' +
    'C60,318 62,308 66,300 L64,292 C62,280 64,270 70,262 C64,248 60,236 62,226 ' +
    'C54,214 52,200 56,190 C58,182 60,176 62,170 Z ' + elipse(196, 236, 7, 7);

  var E = {};
  ((window.SISTEMAS && window.SISTEMAS.oseo && window.SISTEMAS.oseo.estructuras) || []).forEach(function (e) { E[e.id] = e; });
  function deHueso(id) {
    var e = E[id] || { nombre: id, descripcion: '' };
    return { nombre: e.nombre, alias: e.alias, descripcion: e.descripcion, puntos: e.puntos, clinica: e.clinica, pista: e.pista };
  }

  var partes = {};
  ['frontal', 'parietal', 'temporal', 'occipital', 'esfenoides', 'etmoides', 'nasal', 'lagrimal', 'cigomatico', 'maxilar', 'mandibula', 'vomer', 'cornete-inferior']
    .forEach(function (id) { partes[id] = deHueso(id); });
  var accidentes = {
    'orbita': { nombre: 'Órbita', descripcion: 'Cavidad que aloja el globo ocular.', puntos: ['La forman siete huesos: frontal, cigomático, maxilar, esfenoides, etmoides, lagrimal y palatino.', 'Por el conducto óptico entra el nervio óptico.'], pista: 'Cavidad del ojo formada por siete huesos' },
    'abertura-piriforme': { nombre: 'Abertura piriforme', descripcion: 'Entrada ósea de la cavidad nasal, con forma de pera.', puntos: ['La limitan los huesos nasales arriba y los maxilares a los lados y abajo.'], pista: 'Entrada en forma de pera de la cavidad nasal' },
    'foramen-supraorbitario': { nombre: 'Foramen supraorbitario', alias: 'Incisura supraorbitaria', descripcion: 'Agujero o escotadura en el borde superior de la órbita.', puntos: ['Por él salen el nervio y los vasos supraorbitarios (ramo del nervio oftálmico, V1).'], pista: 'Agujero del borde superior de la órbita' },
    'foramen-infraorbitario': { nombre: 'Foramen infraorbitario', descripcion: 'Agujero del maxilar, bajo el borde inferior de la órbita.', puntos: ['Por él sale el nervio infraorbitario (ramo del nervio maxilar, V2).'], clinica: 'En odontología se bloquea este nervio con anestésico local para anestesiar los dientes superiores anteriores y el labio superior.', pista: 'Agujero del maxilar bajo la órbita; sitio de bloqueo dental' },
    'foramen-mentoniano': { nombre: 'Foramen mentoniano', descripcion: 'Agujero en la cara externa del cuerpo de la mandíbula, bajo los premolares.', puntos: ['Por él salen el nervio y los vasos mentonianos (del nervio mandibular, V3).'], clinica: 'El bloqueo del nervio mentoniano anestesia el labio inferior y el mentón.', pista: 'Agujero de la mandíbula bajo los premolares' },
    'pterion': { nombre: 'Pterion', descripcion: 'Zona en forma de H donde se unen el frontal, el parietal, el temporal y el ala mayor del esfenoides.', puntos: ['Es la parte más delgada de la pared lateral del cráneo.'], clinica: 'Por dentro pasa la arteria meníngea media: un golpe aquí puede romperla y causar un hematoma epidural, una urgencia neuroquirúrgica.', pista: 'Unión de cuatro huesos en la sien, sobre la arteria meníngea media' },
    'sutura-coronal': { nombre: 'Sutura coronal', descripcion: 'Articulación fibrosa entre el frontal y los parietales.', puntos: ['En el recién nacido, su cruce con la sutura sagital es la fontanela anterior.'], clinica: 'El cierre precoz de una sutura (craneosinostosis) deforma la cabeza del bebé.', pista: 'Sutura entre el frontal y los parietales' },
    'sutura-escamosa': { nombre: 'Sutura escamosa', descripcion: 'Articulación entre la escama del temporal y el parietal.', puntos: ['Tiene forma de arco y los bordes se superponen como escamas.'], pista: 'Sutura en arco entre el temporal y el parietal' },
    'sutura-lambdoidea': { nombre: 'Sutura lambdoidea', descripcion: 'Articulación entre el occipital y los parietales.', puntos: ['Tiene forma de letra lambda (λ); su vértice es la fontanela posterior en el recién nacido.'], pista: 'Sutura entre el occipital y los parietales, en forma de λ' },
    'conducto-auditivo-externo': { nombre: 'Conducto auditivo externo', alias: 'Meato acústico externo', descripcion: 'Orificio del temporal que lleva hasta el tímpano.', puntos: ['El cóndilo de la mandíbula está justo por delante.'], clinica: 'Las gotas óticas se aplican en él; no deben usarse si el tímpano está perforado, porque llegarían al oído medio.', pista: 'Orificio del temporal que lleva al tímpano' },
    'proceso-mastoides': { nombre: 'Proceso mastoides', alias: 'Apófisis mastoides', descripcion: 'Saliente del temporal detrás de la oreja, lleno de celdas de aire.', puntos: ['Inserción del esternocleidomastoideo.'], clinica: 'Una otitis media mal tratada puede extenderse a sus celdas (mastoiditis) y requiere antibióticos.', pista: 'Saliente detrás de la oreja con celdas de aire' },
    'proceso-estiloides': { nombre: 'Proceso estiloides', alias: 'Apófisis estiloides', descripcion: 'Punta ósea delgada que baja desde la cara inferior del temporal.', puntos: ['De ella salen músculos de la lengua y la faringe y el ligamento que sostiene el hioides.'], pista: 'Punta delgada del temporal que sostiene el hioides' },
    'arco-cigomatico': { nombre: 'Arco cigomático', descripcion: 'Puente óseo formado por el proceso temporal del cigomático y el proceso cigomático del temporal.', puntos: ['Origen del músculo masetero.', 'Bajo él pasa el tendón del músculo temporal.'], pista: 'Puente óseo del pómulo hacia la oreja' },
    'proceso-condilar': { nombre: 'Proceso condilar', alias: 'Cóndilo de la mandíbula', descripcion: 'Extremo superior posterior de la rama de la mandíbula.', puntos: ['Articula con la fosa mandibular del temporal (articulación temporomandibular, ATM).', 'Se nota moverse delante de la oreja al abrir la boca.'], clinica: 'Los trastornos de la ATM causan dolor y chasquidos al masticar; si se abre mucho la boca, el cóndilo puede luxarse hacia delante.', pista: 'Extremo de la mandíbula que forma la ATM delante de la oreja' },
    'proceso-coronoides': { nombre: 'Proceso coronoides', alias: 'Apófisis coronoides', descripcion: 'Saliente anterior de la rama de la mandíbula, bajo el arco cigomático.', puntos: ['Inserción del músculo temporal, que cierra la boca.'], pista: 'Saliente anterior de la rama donde se inserta el músculo temporal' },
    'angulo-mandibula': { nombre: 'Ángulo de la mandíbula', descripcion: 'Unión del cuerpo con la rama de la mandíbula.', puntos: ['Allí se insertan el masetero (por fuera) y el pterigoideo medial (por dentro).'], pista: 'Esquina posterior e inferior de la mandíbula' }
  };
  for (var k in accidentes) partes[k] = accidentes[k];

  window.LAMINAS.craneo = {
    id: 'craneo',
    estructura: 'frontal',
    titulo: 'Cráneo',
    subtitulo: 'Cráneo',
    ancho: 300,
    vistaNombres: '-190 15 680 430',
    vistaSola: '25 20 250 420',
    descripcion: 'El cráneo tiene 22 huesos: 8 forman la caja que protege el encéfalo (neurocráneo) y 14 forman la cara (viscerocráneo). Todos se unen por suturas, salvo la mandíbula, que es móvil.',
    // Con qué vista se abre según el hueso desde el que se llega
    vistaPara: { parietal: 'lateral', temporal: 'lateral', occipital: 'lateral' },
    partes: partes,

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        contorno: ANT,
        dibujo: [
          { clase: 'linea', d: 'M88,318 L212,318 M88,334 L212,334' },
          { clase: 'linea', d: 'M100,310 L100,342 M114,312 L114,344 M128,314 L128,346 M142,314 L142,346 M158,314 L158,346 M172,314 L172,346 M186,312 L186,344 M200,310 L200,342' },
          { clase: 'linea', d: 'M46,160 C70,150 100,150 115,156 M254,160 C230,150 200,150 185,156' },
          // Paredes de la órbita (esfenoides, etmoides, lagrimal) y cornetes dentro de la cavidad nasal
          { clase: 'sombra', d: ORB_DENTRO + ' ' + espejoX(ORB_DENTRO) },
          { clase: 'sombra', d: 'M147,262 L153,262 L154,298 L146,298 Z ' + elipse(140, 282, 4, 8) + ' ' + elipse(160, 282, 4, 8) }
        ],
        zonas: [
          { id: 'frontal', tipo: 'path', d: 'M40,150 C38,80 80,30 150,30 C220,30 262,80 260,150 L254,160 C230,150 200,150 185,156 L150,165 L115,156 C100,150 70,150 46,160 Z', ancla: [150, 90], ly: 70 },
          { id: 'temporal', tipo: 'path', d: 'M46,160 C44,190 50,215 56,235 L66,232 C62,210 62,186 66,166 Z', ancla: [56, 200], ly: 195 },
          { id: 'temporal', tipo: 'path', d: espejoX('M46,160 C44,190 50,215 56,235 L66,232 C62,210 62,186 66,166 Z') },
          { id: 'orbita', tipo: 'path', d: espejoX(ORBITA), ancla: [200, 220], ly: 175 },
          { id: 'orbita', tipo: 'path', d: ORBITA },
          { id: 'esfenoides', tipo: 'path', d: 'M80,178 C84,168 94,164 102,166 L104,198 C96,202 86,200 80,194 Z', ancla: [90, 182], ly: 165 },
          { id: 'esfenoides', tipo: 'path', d: espejoX('M80,178 C84,168 94,164 102,166 L104,198 C96,202 86,200 80,194 Z') },
          { id: 'etmoides', tipo: 'path', d: 'M120,174 L134,180 L134,204 L122,206 Z', ancla: [128, 190], ly: 225 },
          { id: 'etmoides', tipo: 'path', d: espejoX('M120,174 L134,180 L134,204 L122,206 Z') },
          { id: 'lagrimal', tipo: 'path', d: 'M126,208 L137,206 L136,222 L127,220 Z', ancla: [131, 214], ly: 250 },
          { id: 'lagrimal', tipo: 'path', d: espejoX('M126,208 L137,206 L136,222 L127,220 Z') },
          { id: 'nasal', tipo: 'path', d: 'M140,186 L160,186 L164,238 C158,241 142,241 136,238 Z', ancla: [156, 212], ly: 215 },
          { id: 'cigomatico', tipo: 'path', d: 'M60,236 C66,226 82,232 96,236 L100,262 C86,268 72,268 64,260 Z', ancla: [78, 250], ly: 280 },
          { id: 'cigomatico', tipo: 'path', d: espejoX('M60,236 C66,226 82,232 96,236 L100,262 C86,268 72,268 64,260 Z') },
          { id: 'maxilar', tipo: 'path', d: 'M96,236 C110,240 124,238 136,238 L134,292 C140,302 160,302 166,292 L164,238 C176,238 190,240 204,236 L208,262 C214,280 222,296 228,305 C210,318 186,326 150,328 C114,326 90,318 72,305 C78,296 86,280 92,262 Z', ancla: [196, 280], ly: 275 },
          { id: 'abertura-piriforme', tipo: 'path', d: PIRIFORME, ancla: [155, 256], ly: 245 },
          { id: 'vomer', tipo: 'path', d: 'M147,262 L153,262 L154,298 L146,298 Z', ancla: [150, 290], ly: 305 },
          { id: 'cornete-inferior', tipo: 'elipse', cx: 140, cy: 282, rx: 5, ry: 9, ancla: [140, 282], ly: 305 },
          { id: 'cornete-inferior', tipo: 'elipse', cx: 160, cy: 282, rx: 5, ry: 9 },
          { id: 'mandibula', tipo: 'path', d: 'M72,330 C70,355 76,375 78,380 C90,410 120,430 150,432 C180,430 210,410 222,380 C226,370 230,350 228,330 C200,340 176,346 150,346 C124,346 100,340 72,330 Z', ancla: [190, 400], ly: 400 },
          { id: 'foramen-supraorbitario', tipo: 'elipse', cx: 104, cy: 157, rx: 5, ry: 5, ancla: [104, 157], ly: 135 },
          { id: 'foramen-supraorbitario', tipo: 'elipse', cx: 196, cy: 157, rx: 5, ry: 5 },
          { id: 'foramen-infraorbitario', tipo: 'elipse', cx: 108, cy: 252, rx: 5, ry: 6, ancla: [108, 252], ly: 330 },
          { id: 'foramen-infraorbitario', tipo: 'elipse', cx: 192, cy: 252, rx: 5, ry: 6 },
          { id: 'foramen-mentoniano', tipo: 'elipse', cx: 104, cy: 392, rx: 5, ry: 5, ancla: [104, 392], ly: 395 },
          { id: 'foramen-mentoniano', tipo: 'elipse', cx: 196, cy: 392, rx: 5, ry: 5 }
        ]
      },
      {
        id: 'lateral',
        nombre: 'Vista lateral',
        espejo: false,
        contorno: LAT,
        dibujo: [
          { clase: 'linea', d: 'M148,46 C140,90 134,130 128,168' },
          { clase: 'linea', d: 'M132,168 C150,156 180,138 200,130 C214,124 222,150 220,200' },
          { clase: 'linea', d: 'M268,96 C240,140 226,180 220,252' },
          { clase: 'sombra', d: 'M74,190 C78,176 96,172 108,180 C112,192 108,206 96,210 C84,210 74,202 74,190 Z' },
          { clase: 'linea', d: 'M70,298 L120,292 M78,292 L78,304 M90,290 L90,302 M102,290 L102,302 M114,290 L114,302' }
        ],
        zonas: [
          { id: 'parietal', tipo: 'path', d: 'M148,46 C190,38 248,48 268,96 C240,140 226,170 220,200 C222,150 214,124 200,130 C180,140 150,156 132,166 C134,128 140,88 148,46 Z', ancla: [200, 90], ly: 60 },
          { id: 'frontal', tipo: 'path', d: 'M62,170 C50,130 70,70 120,52 C130,48 140,46 148,46 C140,90 132,130 128,168 L100,176 C86,172 74,170 62,170 Z', ancla: [96, 110], ly: 100 },
          { id: 'occipital', tipo: 'path', d: 'M268,96 C286,150 284,206 256,240 C246,252 232,256 218,254 C220,190 236,140 268,96 Z', ancla: [258, 180], ly: 175 },
          { id: 'temporal', tipo: 'path', d: 'M132,168 C150,156 180,140 200,130 C214,124 222,150 220,200 L218,254 C210,262 204,270 196,270 C200,260 196,246 190,240 C176,226 160,214 146,208 L140,186 Z', ancla: [186, 180], ly: 200 },
          { id: 'esfenoides', tipo: 'path', d: 'M118,172 L136,170 L144,206 L124,212 C118,198 116,184 118,172 Z', ancla: [130, 196], ly: 165 },
          { id: 'cigomatico', tipo: 'path', d: 'M70,214 C84,206 108,206 120,214 L118,236 C104,244 86,244 74,236 Z', ancla: [96, 226], ly: 235 },
          { id: 'arco-cigomatico', tipo: 'path', d: 'M118,222 L190,226 L188,238 L118,238 Z', ancla: [160, 232], ly: 248 },
          { id: 'maxilar', tipo: 'path', d: 'M60,226 C62,214 66,210 74,212 L74,236 C86,244 104,244 118,236 L120,256 C110,270 90,282 70,286 L66,292 C62,280 64,270 70,262 C64,248 60,236 60,226 Z', ancla: [88, 262], ly: 270 },
          { id: 'nasal', tipo: 'path', d: 'M56,190 C58,182 60,176 62,170 L70,172 L72,200 L60,206 Z', ancla: [64, 188], ly: 205 },
          { id: 'mandibula', tipo: 'path', d: 'M64,296 C66,304 62,316 60,332 C58,346 66,354 84,352 C110,346 140,340 166,338 C176,338 184,330 182,316 C180,300 182,280 186,258 L176,246 C170,262 160,280 150,290 C120,300 90,300 64,296 Z', ancla: [120, 322], ly: 330 },
          { id: 'proceso-coronoides', tipo: 'path', d: 'M146,270 L160,240 L172,262 Z', ancla: [160, 258], ly: 292 },
          { id: 'proceso-condilar', tipo: 'elipse', cx: 182, cy: 248, rx: 7, ry: 9, ancla: [182, 248], ly: 314 },
          { id: 'angulo-mandibula', tipo: 'elipse', cx: 172, cy: 328, rx: 10, ry: 10, ancla: [172, 328], ly: 358 },
          { id: 'foramen-mentoniano', tipo: 'elipse', cx: 90, cy: 330, rx: 5, ry: 5, ancla: [90, 330], ly: 365 },
          { id: 'conducto-auditivo-externo', tipo: 'elipse', cx: 196, cy: 236, rx: 8, ry: 8, ancla: [198, 236], ly: 225 },
          { id: 'proceso-mastoides', tipo: 'path', d: 'M212,256 C214,270 204,278 196,270 L200,256 Z', ancla: [206, 266], ly: 270 },
          { id: 'proceso-estiloides', tipo: 'path', d: 'M188,262 L193,264 L180,298 L176,296 Z', ancla: [186, 278], ly: 336 },
          { id: 'pterion', tipo: 'elipse', cx: 132, cy: 170, rx: 8, ry: 8, ancla: [132, 170], ly: 140 },
          { id: 'sutura-coronal', tipo: 'path', d: 'M145,46 L151,46 C143,90 137,130 131,168 L125,168 C131,128 137,88 145,46 Z', ancla: [140, 100], ly: 60 },
          { id: 'sutura-escamosa', tipo: 'path', d: 'M134,164 C152,152 180,136 200,126 C216,120 225,150 223,200 L217,200 C219,154 212,130 200,134 C180,144 154,160 136,172 Z', ancla: [221, 170], ly: 120 },
          { id: 'sutura-lambdoidea', tipo: 'path', d: 'M265,93 L271,99 C242,140 228,180 223,252 L217,252 C222,180 238,138 265,93 Z', ancla: [240, 150], ly: 145 }
        ]
      }
    ]
  };

  // Todos los huesos del cráneo abren esta lámina
  ['frontal', 'parietal', 'temporal', 'occipital', 'esfenoides', 'etmoides', 'nasal', 'lagrimal', 'cigomatico', 'maxilar', 'mandibula', 'vomer', 'cornete-inferior']
    .forEach(function (id) { window.LAMINAS[id] = window.LAMINAS.craneo; });
})();
