/*
 * Lámina: Hioides (vista anterosuperior).
 * Es simétrico: el cuerpo al centro y los cuernos mayores hacia atrás y arriba.
 * El contorno es una lista: el hueso principal y los dos cuernos menores aparte.
 */
window.LAMINAS = window.LAMINAS || {};

(function () {
  function espejoX(d) {
    return d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, function (m, x, y) { return (300 - parseFloat(x)) + ',' + y; });
  }

  var HUESO =
    'M150,142 C170,142 186,144 196,148 C214,124 236,94 254,66 C258,58 270,58 270,68 ' +
    'C268,74 266,78 262,82 C244,112 224,144 206,170 C200,180 186,184 150,184 ' +
    'C114,184 100,180 94,170 C76,144 56,112 38,82 C34,78 32,74 30,68 ' +
    'C30,58 42,58 46,66 C64,94 86,124 104,148 C114,144 130,142 150,142 Z';
  var CUERNO_MENOR = 'M192,148 C196,136 200,126 206,120 C212,124 210,138 204,152 Z';
  var CUERNO_MAYOR = 'M196,148 C214,124 236,94 254,66 C258,58 270,58 270,68 C268,74 266,78 262,82 C244,112 224,144 206,170 Z';

  window.LAMINAS.hioides = {
    id: 'hioides',
    estructura: 'hioides',
    titulo: 'Hioides',
    subtitulo: 'Hioides',
    ancho: 300,
    vistaNombres: '-190 30 680 190',
    vistaSola: '15 40 270 160',
    contorno: [HUESO, CUERNO_MENOR, espejoX(CUERNO_MENOR)],
    descripcion: 'Hueso en forma de U situado en el cuello, a la altura de C3, entre la mandíbula y la laringe. Es el único hueso que no articula con ningún otro: lo sostienen músculos y ligamentos.',

    partes: {
      'cuerpo': {
        nombre: 'Cuerpo del hioides',
        descripcion: 'Parte central del hueso, que mira hacia delante.',
        puntos: ['Se palpa en el cuello, justo encima del cartílago tiroides (la "nuez").', 'Inserción de los músculos que lo elevan (milohioideo, geniohioideo) y de los que lo bajan (esternohioideo, omohioideo).'],
        clinica: 'Sube al tragar. Los quistes del conducto tirogloso, frecuentes en niños, se forman junto a él y también se mueven al tragar o sacar la lengua.',
        pista: 'Parte central que se palpa sobre la nuez y sube al tragar'
      },
      'cuernos-mayores': {
        nombre: 'Cuernos mayores',
        descripcion: 'Prolongaciones largas que salen de los extremos del cuerpo hacia atrás.',
        puntos: ['Inserción del hiogloso (músculo de la lengua) y del constrictor medio de la faringe.', 'La membrana tirohioidea los une al cartílago tiroides.'],
        clinica: 'Su fractura, que se palpa a los lados del cuello, es un signo de estrangulación manual en medicina legal.',
        pista: 'Prolongaciones largas hacia atrás desde el cuerpo'
      },
      'cuernos-menores': {
        nombre: 'Cuernos menores',
        descripcion: 'Pequeñas eminencias cónicas en la unión del cuerpo con cada cuerno mayor.',
        puntos: ['De ellos sale el ligamento estilohioideo, que sube hasta el proceso estiloides del temporal y suspende el hioides.'],
        pista: 'Pequeñas eminencias de donde sale el ligamento que suspende el hioides'
      }
    },

    vistas: [
      {
        id: 'anterosuperior',
        nombre: 'Vista anterosuperior',
        espejo: false,
        dibujo: [
          { clase: 'linea', d: 'M108,156 C130,152 170,152 192,156' },
          { clase: 'linea', d: 'M196,150 L204,168 M104,150 L96,168' }
        ],
        zonas: [
          { id: 'cuerpo', tipo: 'path', d: 'M104,148 C114,144 130,142 150,142 C170,142 186,144 196,148 L206,170 C200,180 186,184 150,184 C114,184 100,180 94,170 Z', ancla: [150, 166], ly: 195 },
          { id: 'cuernos-mayores', tipo: 'path', d: CUERNO_MAYOR, ancla: [236, 110], ly: 95 },
          { id: 'cuernos-mayores', tipo: 'path', d: espejoX(CUERNO_MAYOR) },
          { id: 'cuernos-menores', tipo: 'path', d: espejoX(CUERNO_MENOR), ancla: [96, 134], ly: 125 },
          { id: 'cuernos-menores', tipo: 'path', d: CUERNO_MENOR }
        ]
      }
    ]
  };
})();
