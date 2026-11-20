/*
 * Sistema óseo: regiones, fichas de estudio y dibujo SVG (vista anterior).
 *
 * Cómo está dibujado:
 *  - El lienzo mide 400 de ancho; el eje del cuerpo está en x = 200.
 *  - Las formas con `par: true` se dibujan una vez (lado izquierdo de la pantalla)
 *    y la app crea automáticamente su copia en espejo.
 *  - Tipos de forma: path, rects, circulos, elipse, curvas (trazos), huesos (hueso largo a -> b).
 *  - `deco: true` = detalle visual no clicable (órbitas, dientes, agujeros).
 */
window.SISTEMAS = window.SISTEMAS || {};

window.SISTEMAS.oseo = {
  id: 'oseo',
  nombre: 'Óseo',

  regiones: [
    { id: 'todo',    nombre: 'Cuerpo completo',          vista: '60 0 280 920' },
    { id: 'cabeza',  nombre: 'Cabeza y cuello',          vista: '135 5 130 200' },
    { id: 'torax',   nombre: 'Tórax',                    vista: '95 178 210 150' },
    { id: 'msup',    nombre: 'Miembro superior',         vista: '62 178 150 400' },
    { id: 'abdomen', nombre: 'Columna lumbar y pelvis',  vista: '115 305 170 220' },
    { id: 'minf',    nombre: 'Miembro inferior',         vista: '115 455 110 460' }
  ],

  estructuras: [
    // ---------------- Cabeza y cuello ----------------
    {
      id: 'frontal', nombre: 'Hueso frontal', clase: 'Hueso plano', par: false, regiones: ['cabeza'],
      descripcion: 'Forma la frente, la parte anterior de la bóveda craneal y el techo de las órbitas.',
      puntos: ['Contiene los senos frontales.', 'Presenta los arcos superciliares y la glabela.', 'Se une a los parietales por la sutura coronal.'],
      articula: ['Parietales', 'Nasales', 'Maxilares', 'Cigomáticos', 'Esfenoides', 'Etmoides', 'Lagrimales'],
      pista: 'Forma la frente y el techo de las órbitas'
    },
    {
      id: 'temporal', nombre: 'Hueso temporal', clase: 'Hueso irregular', par: true, regiones: ['cabeza'],
      descripcion: 'Forma las paredes laterales y parte de la base del cráneo.',
      puntos: ['Su porción petrosa aloja el oído medio e interno.', 'Tiene las apófisis mastoides, estiloides y cigomática.', 'La fosa mandibular recibe al cóndilo de la mandíbula.'],
      articula: ['Mandíbula (ATM)', 'Parietal', 'Occipital', 'Esfenoides', 'Cigomático'],
      pista: 'Aloja el oído medio e interno'
    },
    {
      id: 'nasal', nombre: 'Huesos nasales', clase: 'Huesos planos pequeños', par: true, regiones: ['cabeza'],
      descripcion: 'Dos pequeños huesos que forman el puente (dorso) de la nariz.',
      puntos: ['El resto de la nariz externa es cartílago.', 'Es una de las fracturas faciales más frecuentes.'],
      articula: ['Frontal', 'Maxilar', 'Etmoides', 'Nasal del lado opuesto'],
      pista: 'Forman el puente de la nariz'
    },
    {
      id: 'cigomatico', nombre: 'Hueso cigomático', alias: 'Malar', clase: 'Hueso irregular', par: true, regiones: ['cabeza'],
      descripcion: 'Forma la prominencia del pómulo y parte de la pared lateral e inferior de la órbita.',
      puntos: ['Junto con la apófisis cigomática del temporal forma el arco cigomático.', 'Inserción del músculo masetero.'],
      articula: ['Frontal', 'Temporal', 'Maxilar', 'Esfenoides'],
      pista: 'El hueso del pómulo'
    },
    {
      id: 'maxilar', nombre: 'Maxilar', alias: 'Maxilar superior', clase: 'Hueso irregular', par: true, regiones: ['cabeza'],
      descripcion: 'Los dos maxilares forman la mandíbula superior, parte del paladar duro, el suelo de la órbita y la pared lateral de la cavidad nasal.',
      puntos: ['Contiene el seno maxilar, el mayor de los senos paranasales.', 'Sus alvéolos alojan los dientes superiores.', 'Articula con todos los huesos de la cara excepto la mandíbula.'],
      articula: ['Frontal', 'Nasal', 'Cigomático', 'Palatino', 'Lagrimal', 'Etmoides', 'Vómer'],
      clinica: 'La sinusitis maxilar es frecuente porque el seno drena por un orificio situado en la parte alta. Las raíces de los molares superiores están muy próximas al seno.',
      pista: 'Contiene el seno paranasal más grande y los dientes superiores'
    },
    {
      id: 'mandibula', nombre: 'Mandíbula', alias: 'Maxilar inferior', clase: 'Hueso irregular', par: false, regiones: ['cabeza'],
      descripcion: 'El hueso más grande y fuerte de la cara y el único hueso móvil del cráneo.',
      puntos: ['Partes: cuerpo, dos ramas, cóndilos y apófisis coronoides.', 'Aloja los dientes inferiores.', 'Por el agujero mentoniano salen el nervio y los vasos mentonianos.'],
      articula: ['Temporales (articulación temporomandibular)'],
      pista: 'El único hueso móvil del cráneo'
    },
    {
      id: 'cervicales', nombre: 'Vértebras cervicales', clase: 'Huesos irregulares (7)', par: false, regiones: ['cabeza'],
      descripcion: 'Las siete vértebras del cuello (C1–C7), las más pequeñas y móviles de la columna.',
      puntos: ['C1 (atlas) no tiene cuerpo y sostiene el cráneo.', 'C2 (axis) tiene la apófisis odontoides (diente), eje de rotación de la cabeza.', 'Tienen forámenes transversos por donde pasan las arterias vertebrales.', 'C7 es la vértebra prominente: su apófisis espinosa se palpa en la nuca.'],
      articula: ['Occipital (C1)', 'Entre sí', 'Primera vértebra torácica (C7)'],
      pista: 'Incluyen el atlas y el axis'
    },

    // ---------------- Tórax ----------------
    {
      id: 'clavicula', nombre: 'Clavícula', clase: 'Hueso largo', par: true, regiones: ['torax', 'msup'],
      descripcion: 'Hueso en forma de S horizontal que une el miembro superior al tronco. Forma la cintura escapular junto con la escápula.',
      puntos: ['Es el primer hueso en comenzar a osificarse.', 'Es el hueso que más se fractura, generalmente en su tercio medio.', 'Mantiene el hombro separado del tórax.'],
      articula: ['Esternón (esternoclavicular)', 'Acromion de la escápula (acromioclavicular)'],
      pista: 'Hueso en forma de S que más se fractura'
    },
    {
      id: 'escapula', nombre: 'Escápula', alias: 'Omóplato', clase: 'Hueso plano', par: true, regiones: ['torax', 'msup'],
      descripcion: 'Hueso triangular en la cara posterior del tórax, entre la 2.ª y la 7.ª costilla.',
      puntos: ['Estructuras clave: espina, acromion, apófisis coracoides y cavidad glenoidea.', 'La cavidad glenoidea recibe la cabeza del húmero.', 'Origen de los músculos del manguito rotador.'],
      articula: ['Húmero (glenohumeral)', 'Clavícula (acromioclavicular)'],
      pista: 'Hueso triangular con acromion y cavidad glenoidea'
    },
    {
      id: 'esternon', nombre: 'Esternón', clase: 'Hueso plano', par: false, regiones: ['torax'],
      descripcion: 'Hueso plano en la línea media anterior del tórax.',
      puntos: ['Tres partes: manubrio, cuerpo y apófisis xifoides.', 'El ángulo esternal (de Louis) marca el nivel de la 2.ª costilla.', 'Contiene médula ósea roja en el adulto.'],
      articula: ['Clavículas', 'Cartílagos costales de las costillas 1 a 7'],
      clinica: 'Por su médula ósea roja y su posición superficial es un sitio para punción o aspiración de médula ósea. La apófisis xifoides es referencia en la RCP.',
      pista: 'Formado por manubrio, cuerpo y apófisis xifoides'
    },
    {
      id: 'costillas', nombre: 'Costillas', clase: 'Huesos planos (12 pares)', par: true, regiones: ['torax'],
      descripcion: 'Doce pares de huesos curvos que forman la caja torácica junto con el esternón y las vértebras torácicas.',
      puntos: ['Verdaderas (1–7): se unen directamente al esternón por su cartílago.', 'Falsas (8–10): se unen al cartílago de la costilla superior.', 'Flotantes (11–12): no llegan al esternón.', 'Protegen el corazón y los pulmones y participan en la respiración.'],
      articula: ['Vértebras torácicas (por detrás)', 'Esternón mediante cartílagos costales'],
      pista: '12 pares que protegen el corazón y los pulmones'
    },

    // ---------------- Columna lumbar y pelvis ----------------
    {
      id: 'lumbares', nombre: 'Vértebras lumbares', clase: 'Huesos irregulares (5)', par: false, regiones: ['abdomen'],
      descripcion: 'Las cinco vértebras de la parte baja de la espalda (L1–L5), las más grandes de la columna.',
      puntos: ['Tienen cuerpos voluminosos porque soportan gran parte del peso.', 'Sus apófisis espinosas son cortas y horizontales.', 'La médula espinal termina hacia L1–L2.'],
      articula: ['T12', 'Entre sí', 'Sacro (L5)'],
      clinica: 'La punción lumbar (para obtener líquido cefalorraquídeo o administrar anestesia raquídea) se hace entre L3–L4 o L4–L5, por debajo del final de la médula.',
      pista: 'Entre ellas se realiza la punción lumbar'
    },
    {
      id: 'sacro', nombre: 'Sacro', clase: 'Hueso irregular', par: false, regiones: ['abdomen'],
      descripcion: 'Hueso triangular formado por cinco vértebras fusionadas, en la parte posterior de la pelvis.',
      puntos: ['Presenta forámenes sacros por donde salen nervios sacros.', 'Su borde anterior superior es el promontorio.', 'Transmite el peso del tronco a la pelvis.'],
      articula: ['L5', 'Coxales (sacroilíacas)', 'Cóccix'],
      pista: 'Cinco vértebras fusionadas que se articulan con los coxales'
    },
    {
      id: 'coccix', nombre: 'Cóccix', clase: 'Hueso irregular', par: false, regiones: ['abdomen'],
      descripcion: 'Extremo inferior de la columna, formado por 3 a 5 vértebras rudimentarias fusionadas.',
      puntos: ['Punto de inserción de músculos y ligamentos del suelo pélvico.'],
      articula: ['Sacro'],
      pista: 'Vértebras rudimentarias al final de la columna'
    },
    {
      id: 'coxal', nombre: 'Hueso coxal', alias: 'Hueso ilíaco o de la cadera', clase: 'Hueso plano', par: true, regiones: ['abdomen', 'minf'],
      descripcion: 'Resulta de la fusión de tres huesos (ilion, isquion y pubis), que se unen en el acetábulo durante la adolescencia.',
      puntos: ['Los dos coxales y el sacro forman la pelvis.', 'El acetábulo recibe la cabeza del fémur.', 'El agujero obturador está cerrado casi por completo por una membrana.', 'La pelvis femenina es más ancha y con abertura superior más redondeada.'],
      articula: ['Sacro (sacroilíaca)', 'Fémur (cadera)', 'Coxal opuesto (sínfisis del pubis)'],
      clinica: 'La cresta ilíaca es un sitio habitual para biopsia de médula ósea.',
      pista: 'Resulta de la fusión de ilion, isquion y pubis'
    },

    // ---------------- Miembro superior ----------------
    {
      id: 'humero', nombre: 'Húmero', clase: 'Hueso largo', par: true, regiones: ['msup'],
      descripcion: 'El hueso del brazo, entre el hombro y el codo.',
      puntos: ['Extremo proximal: cabeza, cuello anatómico, cuello quirúrgico y tubérculos mayor y menor.', 'En la diáfisis está el surco del nervio radial.', 'Extremo distal: tróclea, capítulo (cóndilo) y epicóndilos medial y lateral.'],
      articula: ['Escápula', 'Radio', 'Cúbito'],
      clinica: 'El nervio cubital pasa por detrás del epicóndilo medial: el golpe en esa zona produce el hormigueo del "hueso de la risa".',
      pista: 'Hueso del brazo con cuello anatómico y quirúrgico'
    },
    {
      id: 'radio', nombre: 'Radio', clase: 'Hueso largo', par: true, regiones: ['msup'],
      descripcion: 'Hueso lateral del antebrazo (del lado del pulgar).',
      puntos: ['Su cabeza en forma de disco gira sobre el cúbito y permite la pronación y supinación.', 'Su extremo distal es ancho y forma la mayor parte de la muñeca.', 'Tiene la apófisis estiloides radial.'],
      articula: ['Húmero', 'Cúbito', 'Escafoides y semilunar'],
      clinica: 'La fractura de Colles (extremo distal del radio) es típica al caer sobre la mano extendida. El pulso radial se toma sobre este hueso.',
      pista: 'Hueso lateral del antebrazo, del lado del pulgar'
    },
    {
      id: 'cubito', nombre: 'Cúbito', alias: 'Ulna', clase: 'Hueso largo', par: true, regiones: ['msup'],
      descripcion: 'Hueso medial del antebrazo (del lado del meñique).',
      puntos: ['El olécranon forma la punta del codo.', 'La escotadura troclear abraza la tróclea del húmero.', 'Su extremo distal (cabeza) es pequeño.'],
      articula: ['Húmero', 'Radio'],
      pista: 'Su olécranon forma la punta del codo'
    },
    {
      id: 'carpo', nombre: 'Carpo', clase: 'Huesos cortos (8)', par: true, regiones: ['msup'],
      descripcion: 'Los ocho huesos de la muñeca, dispuestos en dos filas.',
      puntos: ['Fila proximal: escafoides, semilunar, piramidal y pisiforme.', 'Fila distal: trapecio, trapezoide, grande y ganchoso.', 'Forman el suelo del túnel carpiano.'],
      articula: ['Radio', 'Metacarpianos', 'Entre sí'],
      clinica: 'El escafoides es el hueso del carpo que más se fractura. La compresión del nervio mediano en el túnel carpiano causa el síndrome del túnel carpiano.',
      pista: 'Ocho huesos cortos dispuestos en dos filas'
    },
    {
      id: 'metacarpo', nombre: 'Metacarpianos', clase: 'Huesos largos (5)', par: true, regiones: ['msup'],
      descripcion: 'Los cinco huesos de la palma de la mano, numerados del I (pulgar) al V (meñique).',
      puntos: ['Cada uno tiene base, cuerpo y cabeza.', 'Las cabezas forman los nudillos.'],
      articula: ['Carpo', 'Falanges proximales'],
      pista: 'Cinco huesos cuyas cabezas forman los nudillos'
    },
    {
      id: 'falanges-mano', nombre: 'Falanges de la mano', clase: 'Huesos largos (14)', par: true, regiones: ['msup'],
      descripcion: 'Los huesos de los dedos de la mano.',
      puntos: ['Cada dedo tiene falange proximal, media y distal.', 'El pulgar solo tiene dos (proximal y distal).'],
      articula: ['Metacarpianos', 'Entre sí'],
      pista: '14 huesos de los dedos de la mano'
    },

    // ---------------- Miembro inferior ----------------
    {
      id: 'femur', nombre: 'Fémur', clase: 'Hueso largo', par: true, regiones: ['minf'],
      descripcion: 'El hueso del muslo; el más largo, pesado y resistente del cuerpo.',
      puntos: ['Extremo proximal: cabeza, cuello y trocánteres mayor y menor.', 'La línea áspera en la cara posterior es inserción muscular.', 'Extremo distal: cóndilos medial y lateral.'],
      articula: ['Coxal (cadera)', 'Tibia', 'Rótula'],
      clinica: 'La fractura del cuello del fémur es típica de adultos mayores con osteoporosis. La osteoporosis se trata con fármacos como los bisfosfonatos (por ejemplo, alendronato), junto con calcio y vitamina D.',
      pista: 'El hueso más largo y resistente del cuerpo'
    },
    {
      id: 'rotula', nombre: 'Rótula', alias: 'Patela', clase: 'Hueso sesamoideo', par: true, regiones: ['minf'],
      descripcion: 'Hueso triangular situado dentro del tendón del cuádriceps, delante de la rodilla.',
      puntos: ['Es el hueso sesamoideo más grande del cuerpo.', 'Protege la rodilla y mejora la palanca del cuádriceps.'],
      articula: ['Fémur'],
      pista: 'El hueso sesamoideo más grande'
    },
    {
      id: 'tibia', nombre: 'Tibia', clase: 'Hueso largo', par: true, regiones: ['minf'],
      descripcion: 'Hueso medial y más grueso de la pierna; soporta el peso del cuerpo.',
      puntos: ['Su extremo superior forma la meseta tibial.', 'En la tuberosidad tibial se inserta el ligamento rotuliano.', 'Su borde anterior se palpa bajo la piel (la espinilla).', 'Distalmente forma el maléolo medial.'],
      articula: ['Fémur', 'Peroné', 'Astrágalo'],
      pista: 'Hueso medial de la pierna que soporta el peso'
    },
    {
      id: 'perone', nombre: 'Peroné', alias: 'Fíbula', clase: 'Hueso largo', par: true, regiones: ['minf'],
      descripcion: 'Hueso lateral y delgado de la pierna.',
      puntos: ['Casi no soporta peso; sirve sobre todo para inserción muscular.', 'Distalmente forma el maléolo lateral del tobillo.'],
      articula: ['Tibia', 'Astrágalo'],
      pista: 'Hueso delgado lateral de la pierna que forma el maléolo lateral'
    },
    {
      id: 'tarso', nombre: 'Tarso', clase: 'Huesos cortos (7)', par: true, regiones: ['minf'],
      descripcion: 'Los siete huesos de la parte posterior del pie y el tobillo.',
      puntos: ['Astrágalo (talus): articula con tibia y peroné formando el tobillo.', 'Calcáneo: el más grande, forma el talón.', 'Además: navicular, cuboides y tres cuneiformes.'],
      articula: ['Tibia', 'Peroné', 'Metatarsianos', 'Entre sí'],
      pista: 'Siete huesos, entre ellos el astrágalo y el calcáneo'
    },
    {
      id: 'metatarso', nombre: 'Metatarsianos', clase: 'Huesos largos (5)', par: true, regiones: ['minf'],
      descripcion: 'Los cinco huesos del cuerpo del pie, numerados del I (dedo gordo) al V.',
      puntos: ['Junto con el tarso forman los arcos del pie.', 'El I metatarsiano es el más grueso.'],
      articula: ['Tarso', 'Falanges proximales'],
      pista: 'Cinco huesos largos que forman los arcos del pie'
    },
    {
      id: 'falanges-pie', nombre: 'Falanges del pie', clase: 'Huesos largos (14)', par: true, regiones: ['minf'],
      descripcion: 'Los huesos de los dedos del pie.',
      puntos: ['Cada dedo tiene tres falanges, salvo el dedo gordo (hallux), que tiene dos.'],
      articula: ['Metatarsianos', 'Entre sí'],
      pista: 'El hallux tiene solo dos de estos huesos'
    }
  ],

  // Orden = orden de dibujo (lo de abajo queda encima).
  formas: [
    // Cráneo
    { id: 'temporal', par: true, tipo: 'path', d: 'M153,70 L168,67 L167,98 L160,108 C154,98 152,85 153,70 Z' },
    { id: 'frontal', tipo: 'path', d: 'M153,70 C150,30 175,14 200,14 C225,14 250,30 247,70 L232,67 C224,60 210,60 200,65 C190,60 176,60 168,67 Z' },
    { id: 'maxilar', tipo: 'path', d: 'M168,86 C176,94 188,94 195,90 L205,90 C212,94 224,94 232,86 L234,118 L166,118 Z' },
    { id: 'cigomatico', par: true, tipo: 'path', d: 'M168,67 L174,72 C171,80 172,88 178,94 L176,106 L162,108 L167,98 Z' },
    { id: 'frontal', deco: true, estilo: 'hueco', par: true, tipo: 'elipse', cx: 184, cy: 79, rx: 12, ry: 11 },
    { id: 'nasal', tipo: 'path', d: 'M196,66 L204,66 L207,88 L193,88 Z' },
    { id: 'maxilar', deco: true, estilo: 'hueco', tipo: 'path', d: 'M200,91 L192,108 L208,108 Z' },
    { id: 'maxilar', deco: true, estilo: 'dientes', tipo: 'path', d: 'M177,110 H223 V118 H177 Z M183,110 V118 M189,110 V118 M195,110 V118 M200,110 V118 M205,110 V118 M211,110 V118 M217,110 V118' },
    { id: 'mandibula', tipo: 'path', d: 'M166,116 C166,142 184,154 200,154 C216,154 234,142 234,116 L226,118 L174,118 Z' },
    { id: 'mandibula', deco: true, estilo: 'dientes', tipo: 'path', d: 'M178,118 H222 V124 H178 Z M184,118 V124 M190,118 V124 M195,118 V124 M200,118 V124 M205,118 V124 M210,118 V124 M216,118 V124' },
    { id: 'cervicales', tipo: 'rects', rx: 2, rects: [[193, 156, 14, 6], [193, 164, 14, 6], [193, 172, 14, 6], [193, 180, 14, 6], [193, 188, 14, 6]] },

    // Tórax
    { id: 'escapula', par: true, tipo: 'path', d: 'M132,196 C145,198 155,202 163,207 L160,268 C150,250 140,228 132,196 Z' },
    { id: 'costillas', par: true, tipo: 'curvas', w: 4, ds: (function () {
      var ds = [];
      for (var i = 0; i < 10; i++) {
        var y = 214 + i * 11;
        var lx = 150 - 12 * Math.sin(Math.PI * (i + 1) / 11);
        ds.push('M189,' + y + ' C175,' + (y - 4) + ' ' + lx.toFixed(1) + ',' + (y + 2) + ' ' + lx.toFixed(1) + ',' + (y + 18));
      }
      return ds;
    })() },
    { id: 'esternon', tipo: 'path', d: 'M190,203 L210,203 L211,222 L209,224 L208,292 L205,294 L200,308 L195,294 L192,292 L191,224 L189,222 Z' },
    { id: 'clavicula', par: true, tipo: 'curvas', w: 6, ds: ['M191,200 C175,193 160,201 140,197'] },

    // Miembro superior
    { id: 'humero', par: true, tipo: 'huesos', huesos: [{ a: [139, 213], b: [122, 350], w: 8, ra: 11, rb: 10 }] },
    { id: 'radio', par: true, tipo: 'huesos', huesos: [{ a: [113, 362], b: [97, 472], w: 5, ra: 5, rb: 7 }] },
    { id: 'cubito', par: true, tipo: 'huesos', huesos: [{ a: [129, 360], b: [116, 474], w: 5, ra: 7, rb: 4 }] },
    { id: 'carpo', par: true, tipo: 'circulos', circulos: [[99, 482, 4.5], [108, 479, 4.5], [117, 480, 4.5], [126, 484, 4.5], [101, 491, 4.5], [110, 490, 4.5], [119, 491, 4.5], [127, 494, 4.5]] },
    { id: 'metacarpo', par: true, tipo: 'huesos', huesos: [
      { a: [97, 497], b: [86, 518], w: 4, ra: 3, rb: 3 },
      { a: [105, 499], b: [101, 534], w: 3.5, ra: 3, rb: 3 },
      { a: [113, 500], b: [112, 538], w: 3.5, ra: 3, rb: 3 },
      { a: [121, 500], b: [122, 535], w: 3.5, ra: 3, rb: 3 },
      { a: [128, 499], b: [131, 529], w: 3.5, ra: 3, rb: 3 }
    ] },
    { id: 'falanges-mano', par: true, tipo: 'huesos', huesos: [
      { a: [85, 523], b: [79, 544], w: 3.5, ra: 2.5, rb: 2.5 },
      { a: [101, 539], b: [99, 572], w: 3, ra: 2.5, rb: 2 },
      { a: [112, 543], b: [112, 578], w: 3, ra: 2.5, rb: 2 },
      { a: [122, 540], b: [124, 573], w: 3, ra: 2.5, rb: 2 },
      { a: [131, 534], b: [135, 561], w: 3, ra: 2.5, rb: 2 }
    ] },

    // Columna lumbar y pelvis
    { id: 'lumbares', tipo: 'rects', rx: 3, rects: [[189, 322, 22, 14], [189, 339, 22, 14], [189, 356, 22, 14], [189, 373, 22, 14], [189, 390, 22, 14]] },
    { id: 'coxal', par: true, tipo: 'path', d: 'M187,414 C176,398 146,392 134,414 C126,432 138,452 156,466 C160,480 160,496 168,508 C176,516 190,516 197,510 L197,496 C190,494 186,486 188,470 C188,450 184,430 187,414 Z' },
    { id: 'coxal', deco: true, estilo: 'hueco', par: true, tipo: 'elipse', cx: 178, cy: 494, rx: 6, ry: 9 },
    { id: 'sacro', tipo: 'path', d: 'M186,410 L214,410 L207,456 L193,456 Z' },
    { id: 'coccix', tipo: 'path', d: 'M195,459 L205,459 L200,472 Z' },

    // Miembro inferior
    { id: 'femur', par: true, tipo: 'huesos', huesos: [
      { a: [149, 494], b: [164, 650], w: 10, ra: 9, rb: 12 },
      { a: [165, 478], b: [150, 493], w: 8, ra: 10, rb: 0 }
    ] },
    { id: 'rotula', par: true, tipo: 'elipse', cx: 166, cy: 664, rx: 8, ry: 10 },
    { id: 'perone', par: true, tipo: 'huesos', huesos: [{ a: [151, 692], b: [155, 834], w: 4, ra: 5, rb: 5 }] },
    { id: 'tibia', par: true, tipo: 'huesos', huesos: [{ a: [170, 684], b: [172, 830], w: 10, ra: 12, rb: 8 }] },
    { id: 'tarso', par: true, tipo: 'circulos', circulos: [[164, 846, 7], [176, 842, 6], [154, 851, 5], [170, 856, 6], [182, 852, 5]] },
    { id: 'metatarso', par: true, tipo: 'huesos', huesos: [
      { a: [150, 859], b: [144, 884], w: 3.5, ra: 3, rb: 3 },
      { a: [157, 861], b: [151, 886], w: 3.5, ra: 3, rb: 3 },
      { a: [164, 863], b: [160, 888], w: 3.5, ra: 3, rb: 3 },
      { a: [172, 863], b: [170, 888], w: 3.5, ra: 3, rb: 3 },
      { a: [181, 861], b: [184, 886], w: 5, ra: 3.5, rb: 3.5 }
    ] },
    { id: 'falanges-pie', par: true, tipo: 'huesos', huesos: [
      { a: [144, 889], b: [142, 902], w: 3, ra: 2, rb: 2 },
      { a: [151, 891], b: [150, 905], w: 3, ra: 2, rb: 2 },
      { a: [160, 893], b: [159, 908], w: 3, ra: 2, rb: 2 },
      { a: [170, 893], b: [170, 909], w: 3, ra: 2, rb: 2 },
      { a: [185, 891], b: [187, 910], w: 5, ra: 3, rb: 3 }
    ] }
  ]
};
