/*
 * Lámina: Fémur derecho (vistas anterior y posterior).
 *
 * Mismo sistema que humero.js: coordenadas "base" en un lienzo de 300 de ancho,
 * con el lado LATERAL a la izquierda y el MEDIAL a la derecha (fémur derecho visto por delante).
 * La vista posterior usa `espejo: true` y reutiliza las mismas coordenadas.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function elipse(cx, cy, rx, ry) {
    return 'M' + (cx - rx) + ',' + cy + ' a' + rx + ',' + ry + ' 0 1,0 ' + (2 * rx) + ',0 a' + rx + ',' + ry + ' 0 1,0 ' + (-2 * rx) + ',0 Z';
  }

  var CONTORNO =
    'M100,52 C112,50 122,60 128,74 C140,70 165,60 185,52 A36,36 0 1,1 200,103 ' +
    'C190,118 178,135 174,150 C186,152 196,168 190,182 C186,192 176,194 170,198 ' +
    'L178,570 C182,600 200,615 214,620 C226,628 232,650 222,668 C222,690 220,720 200,732 ' +
    'C185,738 170,730 165,718 C158,728 140,735 120,728 C104,720 96,700 98,680 ' +
    'C88,668 86,648 96,636 C112,618 132,600 138,570 L128,200 ' +
    'C126,180 104,160 92,140 C82,118 84,72 100,52 Z';

  // Zonas compartidas por ambas vistas
  var Z = {
    cuello: { id: 'cuello', tipo: 'path', d: 'M130,76 C145,70 165,62 186,54 C182,75 186,95 200,103 C190,118 180,135 174,150 C160,140 145,120 130,100 Z' },
    cabeza: { id: 'cabeza', tipo: 'elipse', cx: 215, cy: 70, rx: 34, ry: 34 },
    trocanterMayor: { id: 'trocanter-mayor', tipo: 'path', d: 'M100,52 C112,50 122,60 128,74 L130,100 C132,120 130,140 128,165 C110,160 96,150 92,140 C82,118 84,72 100,52 Z' },
    trocanterMenor: { id: 'trocanter-menor', tipo: 'path', d: 'M174,150 C186,152 196,168 190,182 C186,192 176,194 168,196 C166,180 168,162 174,150 Z' },
    diafisis: { id: 'diafisis', tipo: 'rect', x: 133, y: 200, w: 40, h: 370 },
    tuberculoAductor: { id: 'tuberculo-aductor', tipo: 'elipse', cx: 210, cy: 613, rx: 6, ry: 7 },
    epicondiloMedial: { id: 'epicondilo-medial', tipo: 'path', d: 'M212,624 C226,632 232,650 222,670 C214,668 208,656 206,640 Z' },
    epicondiloLateral: { id: 'epicondilo-lateral', tipo: 'path', d: 'M100,634 C88,646 86,666 98,680 C106,672 110,658 112,644 Z' },
    condiloMedial: { id: 'condilo-medial', tipo: 'path', d: 'M170,690 C185,684 212,680 222,672 C222,695 218,722 200,732 C185,738 170,730 165,718 Z' },
    condiloLateral: { id: 'condilo-lateral', tipo: 'path', d: 'M98,682 C108,686 130,690 150,692 C155,705 160,712 165,718 C158,728 140,735 120,728 C104,720 96,700 98,682 Z' }
  };
  function con(z, extra) { var o = {}; for (var k in z) o[k] = z[k]; for (var e in extra) o[e] = extra[e]; return o; }

  window.LAMINAS.femur = {
    id: 'femur',
    estructura: 'femur',
    titulo: 'Fémur',
    subtitulo: 'Fémur derecho',
    ancho: 300,
    vistaNombres: '-150 10 600 750',
    vistaSola: '40 10 220 740',
    contorno: CONTORNO,
    descripcion: 'El hueso del muslo, el más largo y resistente del cuerpo. Su extremo proximal articula con el coxal (cadera) y el distal con la tibia y la rótula (rodilla).',

    partes: {
      'cabeza': {
        nombre: 'Cabeza del fémur',
        descripcion: 'Superficie articular lisa, casi una esfera completa, orientada hacia medial, arriba y algo adelante.',
        puntos: ['Articula con el acetábulo del hueso coxal (articulación coxofemoral o de la cadera).', 'Está cubierta de cartílago articular, salvo en la fóvea.'],
        pista: 'Superficie casi esférica que encaja en el acetábulo'
      },
      'fovea': {
        nombre: 'Fóvea de la cabeza', alias: 'Fosita del ligamento redondo',
        descripcion: 'Pequeña depresión sin cartílago en el centro de la cabeza.',
        puntos: ['Allí se fija el ligamento de la cabeza del fémur (ligamento redondo).', 'Por ese ligamento llega una pequeña arteria, rama de la obturatriz, importante sobre todo en niños.'],
        pista: 'Pequeña depresión de la cabeza donde se fija el ligamento redondo'
      },
      'cuello': {
        nombre: 'Cuello del fémur',
        descripcion: 'Segmento oblicuo que une la cabeza con la diáfisis, formando con ella un ángulo de unos 125°.',
        puntos: ['Por su superficie ascienden las ramas de las arterias circunflejas femorales (sobre todo la medial), que irrigan la cabeza.'],
        clinica: 'Su fractura es típica en adultos mayores con osteoporosis. Al cortar la irrigación puede causar necrosis avascular de la cabeza. La osteoporosis se previene y trata con calcio, vitamina D y fármacos como los bisfosfonatos (alendronato).',
        pista: 'Segmento oblicuo que se fractura en adultos mayores con osteoporosis'
      },
      'trocanter-mayor': {
        nombre: 'Trocánter mayor',
        descripcion: 'Gran eminencia cuadrilátera en la parte lateral y superior del extremo proximal.',
        puntos: ['Inserción de los glúteos medio y menor y del piriforme.', 'Se palpa en la cara lateral de la cadera.'],
        clinica: 'La inflamación de la bolsa serosa que lo cubre (bursitis trocantérea) causa dolor en la cara lateral de la cadera.',
        pista: 'Gran eminencia lateral donde se insertan los glúteos medio y menor'
      },
      'trocanter-menor': {
        nombre: 'Trocánter menor',
        descripcion: 'Eminencia cónica en la cara posteromedial, bajo el cuello.',
        puntos: ['Inserción del iliopsoas, el principal flexor de la cadera.'],
        pista: 'Eminencia medial donde se inserta el iliopsoas'
      },
      'linea-intertrocanterea': {
        nombre: 'Línea intertrocantérea',
        descripcion: 'Cresta rugosa en la cara anterior, entre ambos trocánteres.',
        puntos: ['Marca el límite anterior entre el cuello y la diáfisis.', 'Allí se insertan la cápsula de la cadera y el ligamento iliofemoral, el más fuerte del cuerpo.'],
        pista: 'Línea anterior entre los trocánteres donde se inserta la cápsula de la cadera'
      },
      'cresta-intertrocanterea': {
        nombre: 'Cresta intertrocantérea',
        descripcion: 'Relieve grueso en la cara posterior que une los dos trocánteres.',
        puntos: ['Tiene el tubérculo cuadrado, donde se inserta el músculo cuadrado femoral.'],
        pista: 'Relieve posterior grueso que une los dos trocánteres'
      },
      'fosa-trocanterea': {
        nombre: 'Fosa trocantérea', alias: 'Fosa digital',
        descripcion: 'Depresión profunda en la cara medial del trocánter mayor, vista por detrás.',
        puntos: ['Inserción del obturador externo.'],
        pista: 'Depresión posterior en la cara medial del trocánter mayor'
      },
      'diafisis': {
        nombre: 'Cuerpo del fémur', alias: 'Diáfisis',
        descripcion: 'Porción larga y algo arqueada hacia delante, que desciende oblicua hacia medial.',
        puntos: ['En su interior está el canal medular, con médula ósea amarilla en el adulto.', 'Está rodeada por el cuádriceps por delante y los lados.'],
        clinica: 'La cara anterolateral del muslo (músculo vasto lateral) es un sitio de inyección intramuscular, el preferido en lactantes.',
        pista: 'Porción larga central rodeada por el cuádriceps'
      },
      'tuberosidad-glutea': {
        nombre: 'Tuberosidad glútea',
        descripcion: 'Superficie rugosa en la parte superior y lateral de la cara posterior.',
        puntos: ['Inserción del glúteo mayor.'],
        pista: 'Superficie rugosa posterior donde se inserta el glúteo mayor'
      },
      'linea-aspera': {
        nombre: 'Línea áspera',
        descripcion: 'Cresta vertical con dos labios en la mitad de la cara posterior de la diáfisis.',
        puntos: ['Inserción de los aductores y origen de los vastos medial y lateral y de la cabeza corta del bíceps femoral.', 'Hacia abajo se divide en las líneas supracondíleas medial y lateral.'],
        pista: 'Cresta posterior de la diáfisis donde se insertan los aductores'
      },
      'cara-poplitea': {
        nombre: 'Cara poplítea', alias: 'Superficie poplítea',
        descripcion: 'Superficie triangular lisa en la parte distal de la cara posterior, entre las líneas supracondíleas.',
        puntos: ['Forma el suelo de la fosa poplítea (detrás de la rodilla).', 'Sobre ella pasa la arteria poplítea.'],
        clinica: 'Las fracturas supracondíleas pueden lesionar la arteria poplítea, que está muy pegada al hueso.',
        pista: 'Superficie triangular posterior distal sobre la que pasa la arteria poplítea'
      },
      'tuberculo-aductor': {
        nombre: 'Tubérculo del aductor',
        descripcion: 'Pequeña prominencia sobre el epicóndilo medial.',
        puntos: ['Inserción de la porción isquiotibial (tendinosa) del aductor mayor.'],
        pista: 'Pequeña prominencia sobre el epicóndilo medial donde termina el aductor mayor'
      },
      'epicondilo-medial': {
        nombre: 'Epicóndilo medial',
        descripcion: 'Prominencia en la cara medial del cóndilo medial.',
        puntos: ['Inserción del ligamento colateral tibial (medial) de la rodilla.'],
        pista: 'Prominencia medial donde se fija el ligamento colateral tibial'
      },
      'epicondilo-lateral': {
        nombre: 'Epicóndilo lateral',
        descripcion: 'Prominencia, menor que la medial, en la cara lateral del cóndilo lateral.',
        puntos: ['Inserción del ligamento colateral peroneo (lateral) de la rodilla.', 'Bajo él se origina el músculo poplíteo.'],
        pista: 'Prominencia lateral donde se fija el ligamento colateral peroneo'
      },
      'condilo-medial': {
        nombre: 'Cóndilo medial',
        descripcion: 'Gran masa articular redondeada del lado medial del extremo distal; es la más larga de las dos.',
        puntos: ['Articula con el cóndilo medial de la tibia, con el menisco medial entre ambos.'],
        pista: 'Masa articular distal medial que apoya sobre el menisco medial'
      },
      'condilo-lateral': {
        nombre: 'Cóndilo lateral',
        descripcion: 'Masa articular redondeada del lado lateral del extremo distal; más ancha y robusta que la medial.',
        puntos: ['Articula con el cóndilo lateral de la tibia, con el menisco lateral entre ambos.'],
        pista: 'Masa articular distal lateral que apoya sobre el menisco lateral'
      },
      'cara-rotuliana': {
        nombre: 'Cara rotuliana', alias: 'Tróclea femoral',
        descripcion: 'Superficie articular anterior en forma de polea, entre los dos cóndilos.',
        puntos: ['Articula con la cara posterior de la rótula (articulación femororrotuliana).', 'Su labio lateral es más alto y ayuda a que la rótula no se luxe hacia lateral.'],
        pista: 'Superficie anterior en polea por donde se desliza la rótula'
      },
      'fosa-intercondilea': {
        nombre: 'Fosa intercondílea',
        descripcion: 'Escotadura profunda en la cara posterior, entre los dos cóndilos.',
        puntos: ['En sus paredes se insertan los ligamentos cruzados: el anterior en el cóndilo lateral y el posterior en el cóndilo medial.'],
        clinica: 'La rotura del ligamento cruzado anterior es una lesión deportiva muy frecuente (giros bruscos con el pie apoyado).',
        pista: 'Escotadura posterior entre los cóndilos donde se fijan los ligamentos cruzados'
      }
    },

    vistas: [
      {
        id: 'anterior',
        nombre: 'Vista anterior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M186,54 C180,75 186,95 200,103' },
          { clase: 'sombra', d: elipse(238, 74, 5, 5) },
          { clase: 'rugoso', d: 'M128,106 C142,130 157,156 170,186' },
          { clase: 'linea', d: 'M138,570 C134,598 116,618 100,634 M178,570 C182,598 196,612 210,620' },
          { clase: 'linea', d: 'M128,640 C145,630 175,630 192,642 C190,670 180,690 162,700 C145,692 132,670 128,640 Z' },
          { clase: 'linea', d: 'M160,640 C158,660 160,682 162,700' },
          { clase: 'linea', d: 'M150,692 C155,705 160,712 165,718 M170,690 C185,684 212,680 222,672' }
        ],
        zonas: [
          con(Z.diafisis, { ancla: [146, 420], ly: 420 }),
          con(Z.cuello, { ancla: [172, 105], ly: 115 }),
          con(Z.cabeza, { ancla: [222, 48], ly: 30 }),
          { id: 'fovea', tipo: 'elipse', cx: 238, cy: 74, rx: 6, ry: 6, ancla: [238, 74], ly: 72 },
          con(Z.trocanterMayor, { ancla: [102, 95], ly: 80 }),
          con(Z.trocanterMenor, { ancla: [184, 178], ly: 180 }),
          { id: 'linea-intertrocanterea', tipo: 'path', d: 'M124,108 C138,132 153,158 166,190 L176,184 C163,152 147,126 132,100 Z', ancla: [146, 140], ly: 150 },
          con(Z.condiloLateral, { ancla: [124, 712], ly: 718 }),
          con(Z.condiloMedial, { ancla: [198, 714], ly: 718 }),
          { id: 'cara-rotuliana', tipo: 'path', d: 'M128,640 C145,630 175,630 192,642 C190,670 180,690 162,700 C145,692 132,670 128,640 Z', ancla: [162, 664], ly: 628 },
          con(Z.tuberculoAductor, { ancla: [210, 613], ly: 600 }),
          con(Z.epicondiloMedial, { ancla: [220, 650], ly: 658 }),
          con(Z.epicondiloLateral, { ancla: [96, 660], ly: 655 })
        ]
      },
      {
        id: 'posterior',
        nombre: 'Vista posterior',
        espejo: true,
        dibujo: [
          { clase: 'linea', d: 'M186,54 C180,75 186,95 200,103' },
          { clase: 'sombra', d: elipse(124, 94, 6, 12) },
          { clase: 'linea', d: 'M114,78 C130,110 152,150 176,172' },
          { clase: 'rugoso', d: 'M134,205 C137,235 141,262 148,288' },
          { clase: 'rugoso', d: 'M149,290 C150,360 151,430 152,500 M157,290 C158,360 159,430 160,500' },
          { clase: 'linea', d: 'M152,500 C140,540 124,585 106,632 M160,500 C176,540 196,585 210,616' },
          { clase: 'sombra', d: 'M150,670 C155,660 170,660 178,672 L176,720 C170,726 158,726 152,718 Z' }
        ],
        zonas: [
          con(Z.diafisis, { ancla: [140, 455], ly: 455 }),
          con(Z.cuello, { ancla: [175, 100], ly: 105 }),
          con(Z.cabeza, { ancla: [222, 55], ly: 45 }),
          con(Z.trocanterMayor, { ancla: [100, 80], ly: 65 }),
          con(Z.trocanterMenor, { ancla: [186, 180], ly: 185 }),
          { id: 'cresta-intertrocanterea', tipo: 'path', d: 'M110,82 C126,114 150,154 172,178 L182,166 C158,142 136,104 120,72 Z', ancla: [152, 140], ly: 145 },
          { id: 'fosa-trocanterea', tipo: 'elipse', cx: 124, cy: 94, rx: 7, ry: 13, ancla: [124, 96], ly: 100 },
          { id: 'tuberosidad-glutea', tipo: 'path', d: 'M129,202 C132,232 136,262 143,292 L153,288 C146,260 142,230 140,202 Z', ancla: [138, 248], ly: 245 },
          { id: 'linea-aspera', tipo: 'path', d: 'M146,290 C147,360 148,430 149,502 L163,502 C162,430 161,360 160,290 Z', ancla: [155, 390], ly: 390 },
          { id: 'cara-poplitea', tipo: 'path', d: 'M152,504 C140,544 124,588 108,632 C140,622 180,616 208,618 C194,584 176,544 160,504 Z', ancla: [156, 585], ly: 575 },
          { id: 'fosa-intercondilea', tipo: 'path', d: 'M150,670 C155,660 170,660 178,672 L176,720 C170,726 158,726 152,718 Z', ancla: [164, 694], ly: 690 },
          con(Z.condiloLateral, { ancla: [124, 712], ly: 718 }),
          con(Z.condiloMedial, { ancla: [200, 712], ly: 718 }),
          con(Z.tuberculoAductor, { ancla: [210, 613], ly: 615 }),
          con(Z.epicondiloMedial, { ancla: [221, 648], ly: 650 }),
          con(Z.epicondiloLateral, { ancla: [96, 660], ly: 655 })
        ]
      }
    ]
  };
})();
