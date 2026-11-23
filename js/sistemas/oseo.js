/*
 * Sistema óseo: regiones, fichas de estudio y dibujo SVG (vistas anterior y posterior).
 *
 * Cómo está dibujado:
 *  - El lienzo mide 400 de ancho; el eje del cuerpo está en x = 200.
 *  - Las formas con `par: true` se dibujan una vez (lado izquierdo de la pantalla)
 *    y la app crea automáticamente su copia en espejo.
 *  - Tipos de forma: path, rects, circulos, elipse, curvas (trazos), huesos (hueso largo a -> b).
 *  - `deco: true` = detalle visual no clicable (órbitas, dientes, agujeros).
 *  - `formas` es la vista anterior; `formasPosterior` (al final del archivo) la posterior.
 *    En cada vista solo se estudian las estructuras que tienen alguna forma clicable.
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
      id: 'parietal', nombre: 'Hueso parietal', clase: 'Hueso plano', par: true, regiones: ['cabeza'],
      descripcion: 'Los dos parietales forman la mayor parte del techo y de las paredes laterales de la bóveda craneal.',
      puntos: ['Se unen entre sí por la sutura sagital, al frontal por la coronal, al occipital por la lambdoidea y al temporal por la escamosa.', 'Su cara interna tiene los surcos de la arteria meníngea media.', 'En el recién nacido, la fontanela anterior queda entre los parietales y el frontal.'],
      articula: ['Parietal opuesto', 'Frontal', 'Occipital', 'Temporal', 'Esfenoides'],
      clinica: 'Un golpe en el pterion (donde se unen frontal, parietal, temporal y esfenoides) puede romper la arteria meníngea media y causar un hematoma epidural.',
      pista: 'Forman el techo del cráneo y se unen en la sutura sagital'
    },
    {
      id: 'occipital', nombre: 'Hueso occipital', clase: 'Hueso plano', par: false, regiones: ['cabeza'],
      descripcion: 'Forma la parte posterior e inferior del cráneo. Se ve en la vista posterior.',
      puntos: ['Tiene el foramen magno (agujero occipital), por donde el bulbo raquídeo se continúa con la médula espinal y entran las arterias vertebrales.', 'Sus cóndilos articulan con el atlas (C1): es la articulación del movimiento de decir "sí".', 'La protuberancia occipital externa se palpa en la nuca.', 'Se une a los parietales por la sutura lambdoidea.'],
      articula: ['Parietales', 'Temporales', 'Esfenoides', 'Atlas (C1)'],
      clinica: 'Si la presión intracraneal sube mucho, el cerebelo puede herniarse por el foramen magno y comprimir el bulbo, donde están los centros de la respiración: es una urgencia vital.',
      pista: 'Hueso de la nuca con el foramen magno'
    },
    {
      id: 'temporal', nombre: 'Hueso temporal', clase: 'Hueso irregular', par: true, regiones: ['cabeza'],
      descripcion: 'Forma las paredes laterales y parte de la base del cráneo.',
      puntos: ['Su porción petrosa aloja el oído medio e interno.', 'Tiene los procesos mastoides, estiloides y cigomático.', 'La fosa mandibular recibe al cóndilo de la mandíbula.'],
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
      puntos: ['Junto con el proceso cigomático del temporal forma el arco cigomático.', 'Inserción del músculo masetero.'],
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
      puntos: ['Partes: cuerpo, dos ramas, cóndilos y procesos coronoides.', 'Aloja los dientes inferiores.', 'Por el foramen mentoniano salen el nervio y los vasos mentonianos.'],
      articula: ['Temporales (articulación temporomandibular)'],
      pista: 'El único hueso móvil del cráneo'
    },
    {
      id: 'esfenoides', nombre: 'Esfenoides', clase: 'Hueso irregular', par: false, regiones: ['cabeza'],
      descripcion: 'Hueso impar con forma de mariposa en el centro de la base del cráneo. De frente se ven sus alas en el fondo de las órbitas.',
      puntos: ['Articula con todos los demás huesos del cráneo.', 'Su silla turca aloja la hipófisis.', 'Tiene alas mayores y menores, el conducto óptico y la fisura orbitaria superior, y los forámenes redondo, oval y espinoso.', 'Contiene el seno esfenoidal.'],
      articula: ['Frontal', 'Parietales', 'Temporales', 'Occipital', 'Etmoides', 'Vómer', 'Cigomáticos', 'Palatinos'],
      clinica: 'Los tumores de la hipófisis suelen operarse por vía transesfenoidal, entrando por la nariz y el seno esfenoidal.',
      pista: 'Hueso en mariposa cuya silla turca aloja la hipófisis'
    },
    {
      id: 'etmoides', nombre: 'Etmoides', clase: 'Hueso irregular', par: false, regiones: ['cabeza'],
      descripcion: 'Hueso impar, ligero y esponjoso, situado entre las dos órbitas y sobre la cavidad nasal.',
      puntos: ['Su lámina cribosa deja pasar los filetes del nervio olfatorio.', 'La lámina perpendicular forma la parte alta del tabique nasal.', 'Lleva los cornetes nasales superior y medio, y las celdillas etmoidales (un seno paranasal).', 'Su lámina orbitaria forma gran parte de la pared medial de la órbita.'],
      articula: ['Frontal', 'Esfenoides', 'Nasales', 'Maxilares', 'Lagrimales', 'Vómer', 'Palatinos'],
      clinica: 'Una fractura de la lámina cribosa puede causar rinorraquia (salida de líquido cefalorraquídeo por la nariz) y pérdida del olfato.',
      pista: 'Su lámina cribosa deja pasar los nervios del olfato'
    },
    {
      id: 'lagrimal', nombre: 'Hueso lagrimal', clase: 'Hueso plano pequeño', par: true, regiones: ['cabeza'],
      descripcion: 'El hueso más pequeño y frágil de la cara, en la parte anterior de la pared medial de la órbita.',
      puntos: ['Forma la fosa del saco lagrimal.', 'De ahí parte el conducto nasolagrimal, que lleva las lágrimas a la nariz (meato inferior).'],
      articula: ['Frontal', 'Maxilar', 'Etmoides', 'Cornete nasal inferior'],
      clinica: 'Los colirios drenan por el conducto nasolagrimal a la nariz y pueden absorberse a la sangre (por ejemplo, el timolol puede bajar la frecuencia cardíaca). Presionar el ángulo interno del ojo uno o dos minutos tras aplicarlos reduce esa absorción.',
      pista: 'El hueso más pequeño de la cara; aloja el saco lagrimal'
    },
    {
      id: 'vomer', nombre: 'Vómer', clase: 'Hueso plano', par: false, regiones: ['cabeza'],
      descripcion: 'Lámina ósea impar que forma la parte inferior y posterior del tabique nasal.',
      puntos: ['El tabique nasal está formado por el vómer, la lámina perpendicular del etmoides y el cartílago septal.'],
      articula: ['Esfenoides', 'Etmoides', 'Maxilares', 'Palatinos'],
      clinica: 'La desviación del tabique nasal puede dificultar la respiración por la nariz y favorecer la sinusitis.',
      pista: 'Forma la parte inferior del tabique nasal'
    },
    {
      id: 'cornete-inferior', nombre: 'Cornete nasal inferior', alias: 'Concha nasal inferior', clase: 'Hueso irregular', par: true, regiones: ['cabeza'],
      descripcion: 'Lámina ósea enrollada en la pared lateral de la cavidad nasal. Es un hueso propio (los cornetes superior y medio son parte del etmoides).',
      puntos: ['Los cornetes, cubiertos de mucosa, calientan y humedecen el aire.', 'Bajo él (meato inferior) desemboca el conducto nasolagrimal.'],
      articula: ['Maxilar', 'Lagrimal', 'Etmoides', 'Palatino'],
      clinica: 'La mucosa nasal está muy irrigada, por eso la vía intranasal sirve para administrar fármacos. Los descongestionantes nasales (como la oximetazolina) usados más de unos días causan rinitis medicamentosa por efecto rebote.',
      pista: 'Hueso propio de la pared lateral nasal bajo el que desemboca el conducto nasolagrimal'
    },
    {
      id: 'cervicales', nombre: 'Vértebras cervicales', clase: 'Huesos irregulares (7)', par: false, regiones: ['cabeza'],
      descripcion: 'Las siete vértebras del cuello (C1–C7), las más pequeñas y móviles de la columna.',
      puntos: ['C1 (atlas) no tiene cuerpo y sostiene el cráneo.', 'C2 (axis) tiene el diente (proceso odontoides), eje de rotación de la cabeza.', 'Tienen forámenes transversos por donde pasan las arterias vertebrales.', 'C7 es la vértebra prominente: su proceso espinoso se palpa en la nuca.'],
      articula: ['Occipital (C1)', 'Entre sí', 'Primera vértebra torácica (C7)'],
      pista: 'Incluyen el atlas y el axis'
    },
    {
      id: 'hioides', nombre: 'Hioides', clase: 'Hueso irregular', par: false, regiones: ['cabeza'],
      descripcion: 'Hueso en forma de U situado en el cuello, a la altura de C3, entre la mandíbula y la laringe.',
      puntos: ['Es el único hueso que no articula con ningún otro: está suspendido por músculos y ligamentos.', 'Tiene un cuerpo y dos pares de astas (mayores y menores).', 'En él se insertan la lengua y los músculos supra e infrahioideos; participa en la deglución.'],
      articula: ['Ninguno (unido por ligamentos al proceso estiloides del temporal)'],
      clinica: 'Su fractura es rara y, en medicina legal, sugiere estrangulación.',
      pista: 'Hueso en U del cuello que no articula con ningún otro'
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
      puntos: ['Estructuras clave: espina, acromion, proceso coracoides y cavidad glenoidal.', 'La cavidad glenoidal recibe la cabeza del húmero.', 'Origen de los músculos del manguito rotador.'],
      articula: ['Húmero (glenohumeral)', 'Clavícula (acromioclavicular)'],
      pista: 'Hueso triangular con acromion y cavidad glenoidal'
    },
    {
      id: 'esternon', nombre: 'Esternón', clase: 'Hueso plano', par: false, regiones: ['torax'],
      descripcion: 'Hueso plano en la línea media anterior del tórax.',
      puntos: ['Tres partes: manubrio, cuerpo y proceso xifoides.', 'El ángulo esternal (de Louis) marca el nivel de la 2.ª costilla.', 'Contiene médula ósea roja en el adulto.'],
      articula: ['Clavículas', 'Cartílagos costales de las costillas 1 a 7'],
      clinica: 'Por su médula ósea roja y su posición superficial es un sitio para punción o aspiración de médula ósea. El proceso xifoides es referencia en la RCP.',
      pista: 'Formado por manubrio, cuerpo y proceso xifoides'
    },
    {
      id: 'costillas-verdaderas', nombre: 'Costillas verdaderas', alias: 'Costillas vertebroesternales (1.ª a 7.ª)', clase: 'Huesos planos (7 pares)', par: true, regiones: ['torax'],
      descripcion: 'Los siete primeros pares de costillas. Cada una se une directamente al esternón por su propio cartílago costal.',
      puntos: ['Por detrás, la cabeza articula con los cuerpos vertebrales y el tubérculo con el proceso transverso.', 'La 1.ª costilla es la más corta, ancha y curva; tiene los surcos de la arteria y la vena subclavias.', 'Las costillas 3.ª a 9.ª son "típicas": cabeza, cuello, tubérculo, ángulo y cuerpo.'],
      articula: ['Vértebras torácicas', 'Esternón (por su cartílago costal)'],
      clinica: 'Los vasos y el nervio intercostales corren por el borde inferior de cada costilla. Por eso los drenajes y punciones del tórax se hacen por el borde superior de la costilla de abajo, y el bloqueo intercostal con anestésico local (lidocaína, bupivacaína) se inyecta junto al borde inferior.',
      pista: 'Costillas 1.ª a 7.ª, unidas al esternón por su propio cartílago'
    },
    {
      id: 'costillas-falsas', nombre: 'Costillas falsas', alias: 'Costillas vertebrocondrales (8.ª a 10.ª)', clase: 'Huesos planos (3 pares)', par: true, regiones: ['torax'],
      descripcion: 'Los pares 8.º a 10.º. Su cartílago no llega al esternón: se une al cartílago de la costilla de arriba.',
      puntos: ['Sus cartílagos unidos forman el reborde (arco) costal.', 'Algunos textos cuentan también las flotantes como costillas falsas.'],
      articula: ['Vértebras torácicas', 'Cartílago de la costilla superior'],
      clinica: 'El reborde costal es la referencia para palpar el hígado (a la derecha) y el bazo (a la izquierda). Las fracturas costales duelen mucho al respirar; un buen control del dolor evita que la persona respire superficialmente y haga una neumonía.',
      pista: 'Costillas 8.ª a 10.ª, unidas al cartílago de la costilla de arriba'
    },
    {
      id: 'costillas-flotantes', nombre: 'Costillas flotantes', alias: 'Costillas vertebrales (11.ª y 12.ª)', clase: 'Huesos planos (2 pares)', par: true, regiones: ['torax'],
      descripcion: 'Los dos últimos pares. Son cortas y su extremo anterior queda libre entre los músculos del abdomen.',
      puntos: ['Solo articulan con las vértebras torácicas T11 y T12.', 'No tienen cuello ni tubérculo marcados.', 'La 12.ª cruza por detrás el polo superior del riñón.'],
      articula: ['Vértebras torácicas (T11 y T12)'],
      clinica: 'Una fractura de las costillas bajas puede lesionar el riñón o el bazo.',
      pista: 'Las dos últimas, con el extremo anterior libre'
    },
    {
      id: 'toracicas', nombre: 'Vértebras torácicas', alias: 'Vértebras dorsales', clase: 'Huesos irregulares (12)', par: false, regiones: ['torax'],
      descripcion: 'Las doce vértebras del tórax (T1–T12). Desde delante las tapa el esternón; se ven en la vista posterior.',
      puntos: ['Son las únicas que articulan con las costillas, por fositas en el cuerpo y en los procesos transversos.', 'Sus procesos espinosos son largos y se inclinan hacia abajo como tejas.', 'En conjunto forman la curva de cifosis torácica.'],
      articula: ['Costillas', 'Entre sí', 'C7 y L1'],
      clinica: 'La osteoporosis causa fracturas vertebrales por aplastamiento, con pérdida de estatura y aumento de la cifosis. El uso prolongado de corticoides es una causa frecuente de osteoporosis.',
      pista: 'Las doce vértebras que articulan con las costillas'
    },

    // ---------------- Columna lumbar y pelvis ----------------
    {
      id: 'lumbares', nombre: 'Vértebras lumbares', clase: 'Huesos irregulares (5)', par: false, regiones: ['abdomen'],
      descripcion: 'Las cinco vértebras de la parte baja de la espalda (L1–L5), las más grandes de la columna.',
      puntos: ['Tienen cuerpos voluminosos porque soportan gran parte del peso.', 'Sus procesos espinosos son cortos y horizontales.', 'La médula espinal termina hacia L1–L2.'],
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
      puntos: ['Los dos coxales y el sacro forman la pelvis.', 'El acetábulo recibe la cabeza del fémur.', 'El foramen obturado está cerrado casi por completo por una membrana.', 'La pelvis femenina es más ancha y con abertura superior más redondeada.'],
      articula: ['Sacro (sacroilíaca)', 'Fémur (cadera)', 'Coxal opuesto (sínfisis del pubis)'],
      clinica: 'La cresta ilíaca es un sitio habitual para biopsia de médula ósea.',
      pista: 'Resulta de la fusión de ilion, isquion y pubis'
    },

    // ---------------- Miembro superior ----------------
    {
      id: 'humero', nombre: 'Húmero', clase: 'Hueso largo', par: true, regiones: ['msup'],
      descripcion: 'El hueso del brazo, entre el hombro y el codo.',
      puntos: ['Extremo proximal: cabeza, cuello anatómico, cuello quirúrgico y tubérculos mayor y menor.', 'En la diáfisis está el surco del nervio radial.', 'Extremo distal: tróclea, capítulo (cóndilo) y epicóndilos medial y lateral.'],
      articula: ['Escápula', 'Radio', 'Ulna'],
      clinica: 'El nervio ulnar (cubital) pasa por detrás del epicóndilo medial: el golpe en esa zona produce el hormigueo del "hueso de la risa".',
      pista: 'Hueso del brazo con cuello anatómico y quirúrgico'
    },
    {
      id: 'radio', nombre: 'Radio', clase: 'Hueso largo', par: true, regiones: ['msup'],
      descripcion: 'Hueso lateral del antebrazo (del lado del pulgar).',
      puntos: ['Su cabeza en forma de disco gira sobre la ulna y permite la pronación y supinación.', 'Su extremo distal es ancho y forma la mayor parte de la muñeca.', 'Tiene el proceso estiloides del radio.'],
      articula: ['Húmero', 'Ulna', 'Escafoides y semilunar'],
      clinica: 'La fractura de Colles (extremo distal del radio) es típica al caer sobre la mano extendida. El pulso radial se toma sobre este hueso.',
      pista: 'Hueso lateral del antebrazo, del lado del pulgar'
    },
    {
      id: 'cubito', nombre: 'Ulna', alias: 'Cúbito', clase: 'Hueso largo', par: true, regiones: ['msup'],
      descripcion: 'Hueso medial del antebrazo (del lado del meñique).',
      puntos: ['El olécranon forma la punta del codo.', 'La incisura troclear abraza la tróclea del húmero.', 'Su extremo distal (cabeza) es pequeño.'],
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
      articula: ['Coxal (cadera)', 'Tibia', 'Patela'],
      clinica: 'La fractura del cuello del fémur es típica de adultos mayores con osteoporosis. La osteoporosis se trata con fármacos como los bisfosfonatos (por ejemplo, alendronato), junto con calcio y vitamina D.',
      pista: 'El hueso más largo y resistente del cuerpo'
    },
    {
      id: 'rotula', nombre: 'Patela', alias: 'Rótula', clase: 'Hueso sesamoideo', par: true, regiones: ['minf'],
      descripcion: 'Hueso triangular situado dentro del tendón del cuádriceps, delante de la rodilla.',
      puntos: ['Es el hueso sesamoideo más grande del cuerpo.', 'Protege la rodilla y mejora la palanca del cuádriceps.'],
      articula: ['Fémur'],
      pista: 'El hueso sesamoideo más grande'
    },
    {
      id: 'tibia', nombre: 'Tibia', clase: 'Hueso largo', par: true, regiones: ['minf'],
      descripcion: 'Hueso medial y más grueso de la pierna; soporta el peso del cuerpo.',
      puntos: ['Su extremo superior forma la meseta tibial.', 'En la tuberosidad tibial se inserta el ligamento patelar.', 'Su borde anterior se palpa bajo la piel (la espinilla).', 'Distalmente forma el maléolo medial.'],
      articula: ['Fémur', 'Fíbula', 'Talus'],
      pista: 'Hueso medial de la pierna que soporta el peso'
    },
    {
      id: 'perone', nombre: 'Fíbula', alias: 'Peroné', clase: 'Hueso largo', par: true, regiones: ['minf'],
      descripcion: 'Hueso lateral y delgado de la pierna.',
      puntos: ['Casi no soporta peso; sirve sobre todo para inserción muscular.', 'Distalmente forma el maléolo lateral del tobillo.'],
      articula: ['Tibia', 'Talus'],
      pista: 'Hueso delgado lateral de la pierna que forma el maléolo lateral'
    },
    {
      id: 'tarso', nombre: 'Tarso', clase: 'Huesos cortos (7)', par: true, regiones: ['minf'],
      descripcion: 'Los siete huesos de la parte posterior del pie y el tobillo.',
      puntos: ['Talus (astrágalo): articula con tibia y fíbula formando el tobillo.', 'Calcáneo: el más grande, forma el talón.', 'Además: navicular, cuboides y tres cuneiformes.'],
      articula: ['Tibia', 'Fíbula', 'Metatarsianos', 'Entre sí'],
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
    { id: 'parietal', par: true, tipo: 'path', d: 'M153,68 C151,48 156,34 166,26 C163,40 163,55 167,66 Z' },
    { id: 'maxilar', tipo: 'path', d: 'M168,86 C176,94 188,94 195,90 L205,90 C212,94 224,94 232,86 L234,118 L166,118 Z' },
    { id: 'cigomatico', par: true, tipo: 'path', d: 'M168,67 L174,72 C171,80 172,88 178,94 L176,106 L162,108 L167,98 Z' },
    { id: 'frontal', deco: true, estilo: 'hueco', par: true, tipo: 'elipse', cx: 184, cy: 79, rx: 12, ry: 11 },
    { id: 'esfenoides', par: true, tipo: 'path', d: 'M175,73 C178,70 181,70 183,72 L181,84 C178,83 176,81 175,78 Z' },
    { id: 'etmoides', par: true, tipo: 'path', d: 'M185,73 L188.5,73 L188.5,83 L185,83 Z' },
    { id: 'lagrimal', par: true, tipo: 'path', d: 'M190,75 L193.5,76 L193.5,85 L190,84 Z' },
    { id: 'nasal', tipo: 'path', d: 'M196,66 L204,66 L207,88 L193,88 Z' },
    { id: 'maxilar', deco: true, estilo: 'hueco', tipo: 'path', d: 'M200,91 L192,108 L208,108 Z' },
    { id: 'etmoides', tipo: 'path', d: 'M199,91 L201,91 L201,97 L199,97 Z' },
    { id: 'vomer', tipo: 'path', d: 'M199,97 L201,97 L202,108 L198,108 Z' },
    { id: 'cornete-inferior', par: true, tipo: 'elipse', cx: 195.5, cy: 104, rx: 2, ry: 3 },
    { id: 'maxilar', deco: true, estilo: 'dientes', tipo: 'path', d: 'M177,110 H223 V118 H177 Z M183,110 V118 M189,110 V118 M195,110 V118 M200,110 V118 M205,110 V118 M211,110 V118 M217,110 V118' },
    { id: 'mandibula', tipo: 'path', d: 'M166,116 C166,142 184,154 200,154 C216,154 234,142 234,116 L226,118 L174,118 Z' },
    { id: 'mandibula', deco: true, estilo: 'dientes', tipo: 'path', d: 'M178,118 H222 V124 H178 Z M184,118 V124 M190,118 V124 M195,118 V124 M200,118 V124 M205,118 V124 M210,118 V124 M216,118 V124' },
    { id: 'cervicales', tipo: 'rects', rx: 2, rects: [[193, 156, 14, 6], [193, 164, 14, 6], [193, 172, 14, 6], [193, 180, 14, 6], [193, 188, 14, 6]] },
    { id: 'hioides', tipo: 'curvas', w: 3, ds: ['M186,162 C190,168 210,168 214,162'] },

    // Tórax
    { id: 'escapula', par: true, tipo: 'path', d: 'M132,196 C145,198 155,202 163,207 L160,268 C150,250 140,228 132,196 Z' },
    // Costillas (vista anterior): verdaderas llegan al esternón; falsas, al reborde costal; flotantes, libres
    { id: 'costillas-verdaderas', par: true, tipo: 'curvas', w: 4, ds: (function () {
      var ds = [];
      for (var i = 0; i < 7; i++) {
        var y = 214 + i * 11;
        var lx = 150 - 12 * Math.sin(Math.PI * (i + 1) / 11);
        ds.push('M189,' + y + ' C175,' + (y - 4) + ' ' + lx.toFixed(1) + ',' + (y + 2) + ' ' + lx.toFixed(1) + ',' + (y + 18));
      }
      return ds;
    })() },
    { id: 'costillas-falsas', par: true, tipo: 'curvas', w: 4, ds: (function () {
      var ds = [];
      for (var i = 7; i < 10; i++) {
        var y = 214 + i * 11;
        var lx = 150 - 12 * Math.sin(Math.PI * (i + 1) / 11);
        var mx = 189 - 6 * (i - 6), my = 280 + 7 * (i - 6);   // se apoyan en el reborde costal
        ds.push('M' + mx + ',' + my + ' C' + (mx - 10) + ',' + (my - 2) + ' ' + lx.toFixed(1) + ',' + (y + 2) + ' ' + lx.toFixed(1) + ',' + (y + 18));
      }
      return ds;
    })() },
    { id: 'costillas-flotantes', par: true, tipo: 'curvas', w: 3.5, ds: ['M156,322 C150,325 147,331 146,339', 'M160,334 C156,337 154,342 153,348'] },
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

/*
 * Vista posterior. Mismo lienzo y misma escala que la anterior (las regiones sirven igual).
 * Las formas que se ven igual desde atrás (huesos largos, pelvis...) se reutilizan de la vista anterior.
 */
(function () {
  var o = window.SISTEMAS.oseo;
  function de(id) { return o.formas.filter(function (f) { return f.id === id; }); }
  function solo(id) { return o.formas.filter(function (f) { return f.id === id && !f.deco; }); }

  // 12 pares desde las vértebras torácicas; las flotantes (11.ª y 12.ª) son cortas
  var costillas = { verdaderas: [], falsas: [], flotantes: [] };
  for (var i = 0; i < 12; i++) {
    var y = 204 + i * 10;
    if (i < 10) {
      var lx = 150 - 12 * Math.sin(Math.PI * (i + 1) / 11);
      costillas[i < 7 ? 'verdaderas' : 'falsas'].push('M192,' + y + ' C178,' + (y - 2) + ' ' + lx.toFixed(1) + ',' + (y + 4) + ' ' + lx.toFixed(1) + ',' + (y + 20));
    } else {
      var fx = i === 10 ? 160 : 168;
      costillas.flotantes.push('M192,' + y + ' C182,' + y + ' ' + (fx + 4) + ',' + (y + 4) + ' ' + fx + ',' + (y + 12));
    }
  }
  var toracicas = [];
  for (var t = 0; t < 12; t++) toracicas.push([193, 198 + t * 10, 14, 8]);
  var cervicales = [];
  for (var c = 0; c < 7; c++) cervicales.push([194, 132 + c * 9, 12, 7]);

  o.formasPosterior = [].concat(
    // Tórax
    [{ id: 'costillas-verdaderas', par: true, tipo: 'curvas', w: 4, ds: costillas.verdaderas },
     { id: 'costillas-falsas', par: true, tipo: 'curvas', w: 4, ds: costillas.falsas },
     { id: 'costillas-flotantes', par: true, tipo: 'curvas', w: 3.5, ds: costillas.flotantes }],
    [{ id: 'toracicas', tipo: 'rects', rx: 2, rects: toracicas }],
    solo('clavicula'),
    [{ id: 'escapula', par: true, tipo: 'path', d: 'M133,195 L150,199 L168,204 C171,230 169,252 162,273 C150,259 140,237 134,215 C130,206 130,200 133,195 Z' },
     { id: 'escapula', deco: true, estilo: 'cresta', par: true, tipo: 'path', d: 'M135,201 C148,206 158,211 168,216' }],

    // Miembro superior
    solo('humero'), solo('radio'), solo('cubito'), solo('carpo'), solo('metacarpo'), solo('falanges-mano'),

    // Cabeza y cuello
    [{ id: 'cervicales', tipo: 'rects', rx: 2, rects: cervicales },
     { id: 'mandibula', tipo: 'path', d: 'M164,122 C166,140 180,152 200,154 C220,152 234,140 236,122 L228,124 C224,136 214,142 200,142 C186,142 176,136 172,124 Z' },
     { id: 'temporal', par: true, tipo: 'path', d: 'M152,74 C150,92 154,110 165,125 L171,118 C163,110 158,100 156,90 Z' },
     { id: 'parietal', par: true, tipo: 'path', d: 'M200,14 C175,14 150,30 153,72 L156,90 C172,79 188,68 200,60 Z' },
     { id: 'occipital', tipo: 'path', d: 'M200,60 C188,68 172,79 156,90 C159,110 176,128 200,131 C224,128 241,110 244,90 C228,79 212,68 200,60 Z' },
     { id: 'occipital', deco: true, estilo: 'cresta', tipo: 'path', d: 'M176,106 C186,100 194,100 200,104 C206,100 214,100 224,106' }],

    // Columna lumbar y pelvis
    de('lumbares'), de('coxal'),
    [{ id: 'sacro', tipo: 'path', d: 'M184,408 L216,408 L208,458 L192,458 Z' },
     { id: 'sacro', deco: true, estilo: 'hueco', tipo: 'circulos', circulos: [[193, 420, 2], [207, 420, 2], [194, 432, 2], [206, 432, 2], [195, 443, 1.8], [205, 443, 1.8]] }],
    de('coccix'),

    // Miembro inferior (de espaldas no se ven la patela ni el antepié; del pie asoma el talón)
    solo('femur'), solo('perone'), solo('tibia'),
    [{ id: 'tarso', par: true, tipo: 'elipse', cx: 167, cy: 850, rx: 9, ry: 11 }]
  );
})();
