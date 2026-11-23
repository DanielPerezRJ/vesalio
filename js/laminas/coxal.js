/*
 * Lámina: Hueso coxal derecho (vista lateral y vista medial).
 * Coordenadas base (vista lateral): POSTERIOR a la izquierda, ANTERIOR (pubis) a la derecha.
 * La vista medial usa `espejo: true`. El foramen obturado es un hueco del contorno (fill-rule evenodd).
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var CONTORNO =
    'M250,92 C230,52 190,36 150,38 C100,40 60,70 40,108 C36,120 40,130 48,134 C44,140 46,150 52,156 ' +
    'C80,176 100,200 96,226 C94,244 86,254 80,262 C88,268 90,280 82,292 ' +
    'C70,310 62,340 66,372 C70,396 90,404 106,398 C130,400 160,410 190,416 C210,420 236,420 252,410 ' +
    'C262,396 262,370 256,356 C250,346 244,340 236,338 C222,330 210,318 200,304 ' +
    'C204,288 214,270 226,250 C232,232 236,206 232,186 C240,180 244,172 240,164 ' +
    'C236,150 236,130 244,116 C250,108 256,98 250,92 Z ' +
    // Foramen obturado (hueco)
    'M120,330 C125,305 175,300 196,320 C210,340 196,372 168,380 C140,388 114,360 120,330 Z';

  var Z = {
    cresta: { id: 'cresta-iliaca', tipo: 'path', d: 'M250,92 C230,52 190,36 150,38 C100,40 60,70 40,108 L52,114 C72,82 106,52 150,50 C188,48 224,62 240,98 Z' },
    eias: { id: 'eias', tipo: 'elipse', cx: 247, cy: 100, rx: 8, ry: 9 },
    eips: { id: 'eips', tipo: 'elipse', cx: 44, cy: 120, rx: 7, ry: 9 },
    espinaIsq: { id: 'espina-isquiatica', tipo: 'elipse', cx: 84, cy: 262, rx: 7, ry: 7 },
    tuberosidad: { id: 'tuberosidad-isquiatica', tipo: 'path', d: 'M66,348 C62,372 72,398 106,398 C110,386 100,368 86,346 Z' },
    obturado: { id: 'foramen-obturado', tipo: 'path', d: 'M120,330 C125,305 175,300 196,320 C210,340 196,372 168,380 C140,388 114,360 120,330 Z' },
    ramaIsq: { id: 'rama-isquiopubica', tipo: 'path', d: 'M106,398 C130,400 160,410 190,416 L194,402 C164,394 134,388 110,386 Z' },
    tuberculoPub: { id: 'tuberculo-pubico', tipo: 'elipse', cx: 236, cy: 338, rx: 7, ry: 7 }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.coxal = {
    id: 'coxal',
    estructura: 'coxal',
    titulo: 'Hueso coxal',
    subtitulo: 'Coxal derecho',
    ancho: 300,
    vistaNombres: '-190 15 680 420',
    vistaSola: '10 20 270 410',
    contorno: CONTORNO,
    descripcion: 'Hueso de la cadera, formado por tres huesos que se fusionan en el acetábulo: el ilion (arriba), el isquion (atrás y abajo) y el pubis (adelante).',

    partes: {
      'cresta-iliaca': {
        nombre: 'Cresta ilíaca',
        descripcion: 'Borde superior grueso y curvo del ilion, entre las dos espinas ilíacas superiores.',
        puntos: ['Se palpa en la cintura.', 'Inserción de los músculos de la pared abdominal.', 'La línea que une ambas crestas pasa por la vértebra L4.'],
        clinica: 'Esa línea sirve de referencia para la punción lumbar y la anestesia epidural (se pincha entre L3–L4 o L4–L5, bajo el final de la médula). La parte posterior de la cresta es el sitio habitual de biopsia y aspirado de médula ósea.',
        pista: 'Borde superior del ilion; referencia de L4 para la punción lumbar'
      },
      'eias': {
        nombre: 'Espina ilíaca anterosuperior', alias: 'EIAS',
        descripcion: 'Extremo anterior de la cresta ilíaca, muy fácil de palpar.',
        puntos: ['Origen del sartorio.', 'Allí se fija el ligamento inguinal.'],
        clinica: 'Es una de las referencias para la inyección intramuscular ventroglútea (región de Hochstetter), que evita el nervio isquiático.',
        pista: 'Extremo anterior palpable de la cresta ilíaca, donde se fija el ligamento inguinal'
      },
      'eiai': {
        nombre: 'Espina ilíaca anteroinferior', alias: 'EIAI',
        descripcion: 'Eminencia del borde anterior del ilion, bajo la EIAS y encima del acetábulo.',
        puntos: ['Origen de la cabeza recta del recto femoral (cuádriceps).'],
        pista: 'Espina anterior bajo la EIAS donde nace el recto femoral'
      },
      'eips': {
        nombre: 'Espina ilíaca posterosuperior', alias: 'EIPS',
        descripcion: 'Extremo posterior de la cresta ilíaca.',
        puntos: ['Se ve en la piel como los "hoyuelos" de la región lumbar baja.', 'Está a la altura de S2.'],
        pista: 'Extremo posterior de la cresta, marcado por hoyuelos en la piel'
      },
      'cara-glutea': {
        nombre: 'Cara glútea del ilion', alias: 'Ala ilíaca, cara externa',
        descripcion: 'Superficie externa ancha del ala del ilion, con las líneas glúteas.',
        puntos: ['Origen de los glúteos mayor, medio y menor.'],
        clinica: 'Las inyecciones intramusculares en la nalga se hacen en el cuadrante superoexterno o en la región ventroglútea, sobre el glúteo medio, para no dañar el nervio isquiático, que pasa por la parte inferomedial.',
        pista: 'Superficie externa del ala ilíaca, origen de los glúteos'
      },
      'acetabulo': {
        nombre: 'Acetábulo',
        descripcion: 'Cavidad profunda y redonda de la cara lateral, donde se unen ilion, isquion y pubis.',
        puntos: ['Recibe la cabeza del fémur (articulación coxofemoral).', 'Tiene una superficie semilunar articular y una escotadura inferior.'],
        clinica: 'En los recién nacidos se busca la displasia del desarrollo de la cadera: si el acetábulo es poco profundo, la cabeza femoral puede salirse.',
        pista: 'Cavidad lateral donde encaja la cabeza del fémur'
      },
      'incisura-isquiatica-mayor': {
        nombre: 'Incisura isquiática mayor', alias: 'Escotadura ciática mayor',
        descripcion: 'Gran escotadura del borde posterior, entre la EIPI y la espina isquiática.',
        puntos: ['Con el ligamento sacroespinoso forma el foramen isquiático mayor.', 'Por él salen el músculo piriforme y el nervio isquiático (ciático).'],
        pista: 'Gran escotadura posterior por donde sale el nervio isquiático'
      },
      'espina-isquiatica': {
        nombre: 'Espina isquiática',
        descripcion: 'Punta ósea del borde posterior del isquion.',
        puntos: ['Allí se fija el ligamento sacroespinoso.', 'Separa las incisuras isquiáticas mayor y menor.'],
        clinica: 'Es la referencia para el bloqueo del nervio pudendo con anestésico local en el parto, porque el nervio rodea esta espina.',
        pista: 'Punta posterior del isquion; referencia del bloqueo pudendo'
      },
      'tuberosidad-isquiatica': {
        nombre: 'Tuberosidad isquiática',
        descripcion: 'Gran prominencia rugosa en la parte inferior y posterior del isquion.',
        puntos: ['Sobre ella nos apoyamos al sentarnos.', 'Origen de los isquiotibiales (semitendinoso, semimembranoso y cabeza larga del bíceps femoral).'],
        pista: 'Prominencia sobre la que nos sentamos, origen de los isquiotibiales'
      },
      'foramen-obturado': {
        nombre: 'Foramen obturado', alias: 'Agujero obturador',
        descripcion: 'Gran orificio rodeado por el isquion y el pubis.',
        puntos: ['Está cerrado casi por completo por la membrana obturatriz.', 'Por el canal obturador, en su parte alta, pasan el nervio y los vasos obturadores.'],
        pista: 'Gran orificio entre isquion y pubis cerrado por una membrana'
      },
      'rama-isquiopubica': {
        nombre: 'Rama isquiopubiana',
        descripcion: 'Barra ósea inferior formada por la rama del isquion y la rama inferior del pubis.',
        puntos: ['Forma el límite inferior del foramen obturado.', 'Junto con la del otro lado forma el arco púbico, más abierto en la mujer.'],
        pista: 'Barra inferior que une isquion y pubis'
      },
      'rama-superior-pubis': {
        nombre: 'Rama superior del pubis',
        descripcion: 'Barra ósea que va del cuerpo del pubis al acetábulo, por encima del foramen obturado.',
        puntos: ['Su borde superior es el pecten del pubis, parte de la línea terminal de la pelvis.'],
        pista: 'Barra del pubis que va hacia el acetábulo, encima del foramen obturado'
      },
      'tuberculo-pubico': {
        nombre: 'Tubérculo púbico',
        descripcion: 'Pequeña eminencia en la parte superior del cuerpo del pubis.',
        puntos: ['Allí termina el ligamento inguinal.'],
        clinica: 'Ayuda a distinguir hernias: la inguinal sale por encima y medial a él; la femoral, por debajo y lateral.',
        pista: 'Eminencia del pubis donde termina el ligamento inguinal'
      },
      'cuerpo-pubis': {
        nombre: 'Cuerpo del pubis',
        descripcion: 'Parte anterior y medial del coxal.',
        puntos: ['Su cara medial se une al pubis del otro lado en la sínfisis del pubis.', 'Origen de los músculos aductores.'],
        pista: 'Parte anterior del coxal donde nacen los aductores'
      },
      'fosa-iliaca': {
        nombre: 'Fosa ilíaca',
        descripcion: 'Gran superficie cóncava de la cara interna del ala ilíaca.',
        puntos: ['Origen del músculo ilíaco, que con el psoas forma el iliopsoas.', 'Forma la pared de la pelvis mayor.'],
        pista: 'Concavidad interna del ala ilíaca, origen del músculo ilíaco'
      },
      'cara-auricular': {
        nombre: 'Cara auricular',
        descripcion: 'Superficie articular con forma de oreja en la parte posterior de la cara interna.',
        puntos: ['Articula con el sacro (articulación sacroilíaca), muy firme y casi inmóvil.'],
        pista: 'Superficie en forma de oreja que articula con el sacro'
      },
      'linea-arcuata': {
        nombre: 'Línea arcuata',
        descripcion: 'Cresta curva de la cara interna, desde la cara auricular hasta el pubis.',
        puntos: ['Forma parte de la línea terminal, que separa la pelvis mayor (arriba) de la pelvis menor (abajo).'],
        pista: 'Cresta interna que separa la pelvis mayor de la menor'
      },
      'cara-sinfisial': {
        nombre: 'Cara sinfisial',
        descripcion: 'Superficie medial ovalada del cuerpo del pubis.',
        puntos: ['Se une al pubis del otro lado por un disco de fibrocartílago (sínfisis del pubis).'],
        clinica: 'En el embarazo, la hormona relaxina afloja la sínfisis y los ligamentos de la pelvis para facilitar el parto.',
        pista: 'Superficie medial del pubis que forma la sínfisis'
      }
    },

    vistas: [
      {
        id: 'lateral',
        nombre: 'Vista lateral',
        espejo: false,
        dibujo: [
          { clase: 'sombra', d: elipse(150, 250, 42, 42) },
          { clase: 'linea', d: 'M150,212 C176,214 190,236 190,256 C188,278 176,290 162,292 M138,292 C120,286 110,270 110,250 C110,232 122,216 140,212' },
          { clase: 'rugoso', d: 'M70,120 C110,92 180,86 230,112 M86,170 C120,140 170,130 214,150' },
          { clase: 'linea', d: 'M232,186 C238,180 242,172 240,164' }
        ],
        zonas: [
          { id: 'cara-glutea', tipo: 'path', d: 'M58,118 C90,70 200,60 238,112 C222,150 200,180 180,206 C150,204 120,206 100,212 C92,180 72,150 58,118 Z', ancla: [120, 130], ly: 150 },
          con(Z.cresta, { ancla: [110, 48], ly: 40 }),
          con(Z.eias, { ancla: [247, 100], ly: 95 }),
          { id: 'eiai', tipo: 'elipse', cx: 236, cy: 172, rx: 7, ry: 9, ancla: [237, 172], ly: 170 },
          con(Z.eips, { ancla: [44, 120], ly: 120 }),
          { id: 'acetabulo', tipo: 'elipse', cx: 150, cy: 250, rx: 42, ry: 42, ancla: [168, 240], ly: 235 },
          { id: 'incisura-isquiatica-mayor', tipo: 'path', d: 'M54,156 C80,176 100,200 96,226 C94,244 86,254 80,262 L94,258 C104,240 110,204 86,176 C76,166 66,158 58,152 Z', ancla: [102, 212], ly: 205 },
          con(Z.espinaIsq, { ancla: [84, 262], ly: 262 }),
          con(Z.tuberosidad, { ancla: [80, 378], ly: 382 }),
          con(Z.obturado, { ancla: [146, 340], ly: 330 }),
          con(Z.ramaIsq, { ancla: [146, 400], ly: 412 }),
          { id: 'rama-superior-pubis', tipo: 'path', d: 'M196,300 C206,290 216,272 226,252 L236,262 C226,284 216,306 208,318 Z', ancla: [214, 286], ly: 280 },
          { id: 'cuerpo-pubis', tipo: 'path', d: 'M210,352 C230,340 250,345 256,356 C262,370 262,396 252,410 C240,414 226,412 214,404 Z', ancla: [236, 382], ly: 378 },
          con(Z.tuberculoPub, { ancla: [236, 338], ly: 330 })
        ]
      },
      {
        id: 'medial',
        nombre: 'Vista medial',
        espejo: true,
        dibujo: [
          { clase: 'linea', d: 'M76,116 C110,74 196,64 234,104 C222,140 206,164 188,184' },
          { clase: 'linea', d: 'M86,192 C120,220 170,250 210,294' },
          { clase: 'rugoso', d: 'M54,132 C68,124 86,132 90,150 C94,168 84,186 70,192' }
        ],
        zonas: [
          { id: 'fosa-iliaca', tipo: 'path', d: 'M70,110 C100,62 200,52 240,100 C230,140 210,170 190,190 C160,170 120,150 70,110 Z', ancla: [176, 112], ly: 130 },
          { id: 'cara-auricular', tipo: 'path', d: 'M48,130 C66,118 88,130 94,150 C98,172 86,192 70,198 C58,180 50,160 48,130 Z', ancla: [72, 162], ly: 165 },
          { id: 'linea-arcuata', tipo: 'path', d: 'M84,196 C118,224 168,254 204,300 L216,292 C178,246 126,214 92,186 Z', ancla: [176, 262], ly: 250 },
          con(Z.cresta, { ancla: [110, 48], ly: 40 }),
          con(Z.eias, { ancla: [247, 100], ly: 95 }),
          con(Z.eips, { ancla: [44, 120], ly: 110 }),
          con(Z.espinaIsq, { ancla: [84, 262], ly: 262 }),
          con(Z.tuberosidad, { ancla: [80, 378], ly: 385 }),
          con(Z.obturado, { ancla: [146, 340], ly: 330 }),
          con(Z.ramaIsq, { ancla: [146, 400], ly: 415 }),
          { id: 'cara-sinfisial', tipo: 'path', d: 'M244,358 C256,370 258,392 250,406 L236,402 C242,390 242,372 236,362 Z', ancla: [246, 384], ly: 385 },
          con(Z.tuberculoPub, { ancla: [236, 338], ly: 335 })
        ]
      }
    ]
  };
})();
