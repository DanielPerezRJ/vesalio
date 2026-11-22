(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var CLAVE = 'vesalio-progreso-v1';
  var PROXIMAMENTE = ['Muscular', 'Nervioso', 'Cardiovascular', 'Respiratorio', 'Digestivo'];
  var LAMINAS = window.LAMINAS || {};

  var $ = function (s) { return document.querySelector(s); };
  var svg = $('#figura');
  var panel = $('#panel');
  var visor = $('#visor');
  var etiqueta = $('#etiqueta');

  var estado = {
    sistema: null,
    region: 'todo',
    modo: 'explorar',
    seleccion: null,
    pregunta: null,
    ultimo: null,
    marcador: { aciertos: 0, total: 0, racha: 0 },
    lamina: null,      // lámina abierta (o null = esqueleto completo)
    vista: null,       // id de la vista de la lámina
    nombres: !window.matchMedia('(max-width: 860px)').matches
  };
  var porId = {};
  var progreso = cargarProgreso();

  // Las partes de cada lámina conocen su propio id
  Object.keys(LAMINAS).forEach(function (k) {
    var p = LAMINAS[k].partes;
    Object.keys(p).forEach(function (id) { p[id].id = id; });
  });

  // ---------- Utilidades ----------
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function crear(tag, attrs, padre) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (padre) padre.appendChild(n);
    return n;
  }
  function barajar(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esMovil() { return window.matchMedia('(max-width: 860px)').matches; }

  // ---------- Contexto actual: esqueleto o lámina ----------
  function vistaActual() {
    return estado.lamina.vistas.filter(function (v) { return v.id === estado.vista; })[0];
  }
  function regionActual() {
    return estado.sistema.regiones.filter(function (r) { return r.id === estado.region; })[0];
  }
  function enRegion(id) {
    return estado.region === 'todo' || porId[id].regiones.indexOf(estado.region) !== -1;
  }
  function estructurasRegion() {
    return estado.sistema.estructuras.filter(function (e) { return enRegion(e.id); });
  }
  // Lo que se puede estudiar ahora mismo (estructuras de la región o partes de la vista)
  function items() {
    if (!estado.lamina) return estructurasRegion();
    var vistos = {};
    return vistaActual().zonas.filter(function (z) {
      if (vistos[z.id]) return false;
      vistos[z.id] = true;
      return true;
    }).map(function (z) { return estado.lamina.partes[z.id]; });
  }
  function todosLosItems() {
    if (!estado.lamina) return estado.sistema.estructuras;
    var p = estado.lamina.partes;
    return Object.keys(p).map(function (k) { return p[k]; });
  }
  function info(id) { return estado.lamina ? estado.lamina.partes[id] : porId[id]; }
  function esItem(id) { return items().some(function (e) { return e.id === id; }); }
  function nombreContexto() {
    return estado.lamina ? estado.lamina.titulo + ' · ' + vistaActual().nombre : regionActual().nombre;
  }

  // ---------- Progreso (guardado en este navegador) ----------
  function cargarProgreso() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; }
  }
  function guardarProgreso() {
    try { localStorage.setItem(CLAVE, JSON.stringify(progreso)); } catch (e) { /* sin almacenamiento */ }
  }
  function clave(id) { return estado.lamina ? estado.lamina.id + '/' + id : id; }
  function registrar(id, acierto) {
    var k = clave(id);
    var p = progreso[k] || (progreso[k] = { ok: 0, fail: 0 });
    if (acierto) p.ok++; else p.fail++;
    guardarProgreso();
  }
  function nivel(id) {
    var p = progreso[clave(id)];
    if (!p) return '';
    if (p.ok >= 2 && p.ok > p.fail) return 'bien';
    if (p.fail > 0 && p.fail >= p.ok) return 'mal';
    return '';
  }

  // ---------- Dibujo: esqueleto completo ----------
  function dibujarFigura() {
    svg.innerHTML = '';
    svg.classList.toggle('sin-nombres', !estado.nombres);
    if (estado.lamina) { dibujarLamina(); return; }
    var capa = crear('g', { id: 'capa' }, svg);
    estado.sistema.formas.forEach(function (f) {
      dibujarForma(f, capa);
      if (f.par) dibujarForma(f, crear('g', { transform: 'translate(400,0) scale(-1,1)' }, capa));
    });
    fijarVista(regionActual().vista);
    $('#leyenda').textContent = 'Vista anterior';
    aplicarRegion(false);
  }

  function dibujarForma(f, padre) {
    var g = crear('g', { 'class': f.deco ? 'deco ' + (f.estilo || '') : 'hueso', 'data-id': f.id }, padre);
    switch (f.tipo) {
      case 'path':
        crear('path', { d: f.d, 'class': 'f' }, g); break;
      case 'rects':
        f.rects.forEach(function (r) {
          crear('rect', { x: r[0], y: r[1], width: r[2], height: r[3], rx: f.rx || 2, 'class': 'f' }, g);
        }); break;
      case 'circulos':
        f.circulos.forEach(function (c) { crear('circle', { cx: c[0], cy: c[1], r: c[2], 'class': 'f' }, g); }); break;
      case 'elipse':
        crear('ellipse', { cx: f.cx, cy: f.cy, rx: f.rx, ry: f.ry, 'class': 'f' }, g); break;
      case 'curvas':
        f.ds.forEach(function (d) { crear('path', { d: d, 'class': 'hit', 'stroke-width': Math.max(f.w + 8, 12) }, g); });
        f.ds.forEach(function (d) { crear('path', { d: d, 'class': 'to', 'stroke-width': f.w + 2.6 }, g); });
        f.ds.forEach(function (d) { crear('path', { d: d, 'class': 'ts', 'stroke-width': f.w }, g); });
        break;
      case 'huesos':
        f.huesos.forEach(function (h) { huesoLargo(g, h); }); break;
    }
  }

  // Hueso largo: diáfisis (línea gruesa) + epífisis (círculos), con contorno.
  function huesoLargo(g, h) {
    var a = h.a, b = h.b;
    var linea = { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
    crear('line', Object.assign({ 'class': 'hit', 'stroke-width': Math.max(h.w + 10, 14) }, linea), g);
    if (h.ra) crear('circle', { cx: a[0], cy: a[1], r: h.ra + 1.3, 'class': 'co' }, g);
    if (h.rb) crear('circle', { cx: b[0], cy: b[1], r: h.rb + 1.3, 'class': 'co' }, g);
    crear('line', Object.assign({ 'class': 'to', 'stroke-width': h.w + 2.6 }, linea), g);
    crear('line', Object.assign({ 'class': 'ts', 'stroke-width': h.w }, linea), g);
    if (h.ra) crear('circle', { cx: a[0], cy: a[1], r: h.ra, 'class': 'cf' }, g);
    if (h.rb) crear('circle', { cx: b[0], cy: b[1], r: h.rb, 'class': 'cf' }, g);
  }

  // ---------- Dibujo: lámina detallada ----------
  function dibujarLamina() {
    var L = estado.lamina;
    var v = vistaActual();

    var defs = crear('defs', {}, svg);
    var grad = crear('linearGradient', { id: 'grad-hueso', x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
    [['0', '--hueso-sombra'], ['0.4', '--hueso'], ['0.62', '--hueso'], ['1', '--hueso-sombra']].forEach(function (s) {
      crear('stop', { offset: s[0], style: 'stop-color: var(' + s[1] + ')' }, grad);
    });

    var capa = crear('g', { id: 'capa' }, svg);
    var base = v.espejo ? crear('g', { transform: 'translate(' + L.ancho + ',0) scale(-1,1)' }, capa) : capa;
    crear('path', { d: L.contorno, 'class': 'lam-contorno' }, base);
    v.dibujo.forEach(function (d) { crear('path', { d: d.d, 'class': 'lam-' + d.clase }, base); });

    v.zonas.forEach(function (z) {
      var g = crear('g', { 'class': 'hueso zona', 'data-id': z.id }, base);
      if (z.tipo === 'elipse') crear('ellipse', { cx: z.cx, cy: z.cy, rx: z.rx, ry: z.ry, 'class': 'f' }, g);
      else if (z.tipo === 'rect') crear('rect', { x: z.x, y: z.y, width: z.w, height: z.h, rx: 4, 'class': 'f' }, g);
      else crear('path', { d: z.d, 'class': 'f' }, g);
    });

    // Rótulos (fuera del grupo espejado para que el texto no salga al revés)
    var rotulos = crear('g', { 'class': 'rotulos' }, capa);
    v.zonas.forEach(function (z) {
      if (!z.ancla) return;
      var ax = v.espejo ? L.ancho - z.ancla[0] : z.ancla[0];
      var ay = z.ancla[1];
      var izq = ax < L.ancho / 2;
      var lx = izq ? -6 : L.ancho + 6;
      var g = crear('g', { 'class': 'rotulo', 'data-id': z.id }, rotulos);
      crear('line', { x1: ax, y1: ay, x2: lx, y2: z.ly }, g);
      crear('circle', { cx: ax, cy: ay, r: 2.4 }, g);
      var t = crear('text', { x: izq ? lx - 4 : lx + 4, y: z.ly + 4, 'text-anchor': izq ? 'end' : 'start' }, g);
      t.textContent = L.partes[z.id].nombre;
    });

    fijarVista(estado.nombres && estado.modo === 'explorar' ? L.vistaNombres : L.vistaSola);
    $('#leyenda').textContent = L.subtitulo + ' · ' + v.nombre.toLowerCase();
  }

  // ---------- Marcas en la figura ----------
  function marcar(id, clase, activo) {
    svg.querySelectorAll('[data-id="' + id + '"]').forEach(function (n) { n.classList.toggle(clase, activo); });
  }
  function limpiar(clase) {
    svg.querySelectorAll('.' + clase).forEach(function (n) { n.classList.remove(clase); });
  }
  function limpiarMarcas() { ['activo', 'objetivo', 'acierto', 'error', 'hover'].forEach(limpiar); }
  function destello(id, clase, ms) {
    marcar(id, clase, true);
    setTimeout(function () { marcar(id, clase, false); }, ms);
  }

  function aplicarRegion(animar) {
    if (estado.lamina) return;
    svg.querySelectorAll('[data-id]').forEach(function (n) {
      n.classList.toggle('atenuado', !enRegion(n.getAttribute('data-id')));
    });
    irAVista(regionActual().vista, animar);
  }

  var animacion = null;
  var base = [0, 0, 400, 920];   // encuadre "normal" de la figura actual; el zoom parte de aquí

  function fijarVista(vista) {
    cancelAnimationFrame(animacion);
    base = vista.split(/\s+/).map(Number);
    svg.setAttribute('viewBox', vista);
    actualizarZoomUI();
  }

  function irAVista(vista, animar) {
    var destino = vista.split(/\s+/).map(Number);
    var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    base = destino;
    actualizarZoomUI(destino);
    cancelAnimationFrame(animacion);
    if (!animar || reducir) { svg.setAttribute('viewBox', vista); return; }
    var inicio = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    var t0 = performance.now();
    var paso = function (t) {
      var k = Math.min(1, (t - t0) / 450);
      var e = 1 - Math.pow(1 - k, 3);
      svg.setAttribute('viewBox', inicio.map(function (v, i) { return v + (destino[i] - v) * e; }).join(' '));
      if (k < 1) animacion = requestAnimationFrame(paso);
    };
    animacion = requestAnimationFrame(paso);
  }

  // ---------- Controles ----------
  function renderSistemas() {
    var sel = $('#sistema');
    var html = '';
    Object.keys(window.SISTEMAS).forEach(function (k) {
      html += '<option value="' + k + '">' + esc(window.SISTEMAS[k].nombre) + '</option>';
    });
    PROXIMAMENTE.forEach(function (n) { html += '<option disabled>' + esc(n) + ' (próximamente)</option>'; });
    sel.innerHTML = html;
    sel.value = estado.sistema.id;
  }

  function renderBarra() {
    var c = $('#regiones');
    if (estado.lamina) {
      c.innerHTML = '<button data-barra="cerrar" class="volver">← Esqueleto</button>' +
        estado.lamina.vistas.map(function (v) {
          var act = v.id === estado.vista;
          return '<button role="tab" aria-selected="' + act + '" data-vista="' + v.id + '" class="' + (act ? 'activo' : '') + '">' + esc(v.nombre) + '</button>';
        }).join('') +
        (estado.modo === 'explorar'
          ? '<button data-barra="nombres" aria-pressed="' + estado.nombres + '" class="interruptor' + (estado.nombres ? ' encendido' : '') + '">Nombres</button>'
          : '');
      return;
    }
    c.innerHTML = estado.sistema.regiones.map(function (r) {
      var act = r.id === estado.region;
      return '<button role="tab" aria-selected="' + act + '" data-region="' + r.id + '" class="' + (act ? 'activo' : '') + '">' + esc(r.nombre) + '</button>';
    }).join('');
  }

  function cambiarRegion(id) {
    estado.region = id;
    estado.seleccion = null;
    renderBarra();
    limpiarMarcas();
    aplicarRegion(true);
    iniciarModo();
  }

  function abrirLamina(id) {
    estado.lamina = LAMINAS[id];
    estado.vista = estado.lamina.vistas[0].id;
    estado.seleccion = null;
    estado.ultimo = null;
    estado.marcador = { aciertos: 0, total: 0, racha: 0 };
    renderBarra();
    dibujarFigura();
    iniciarModo();
    if (esMovil()) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cerrarLamina() {
    var estructura = estado.lamina.estructura;
    estado.lamina = null;
    estado.vista = null;
    estado.ultimo = null;
    estado.seleccion = enRegion(estructura) ? estructura : null;
    estado.marcador = { aciertos: 0, total: 0, racha: 0 };
    renderBarra();
    dibujarFigura();
    iniciarModo();
  }

  function cambiarVista(id) {
    estado.vista = id;
    renderBarra();
    dibujarFigura();
    if (estado.seleccion && !esItem(estado.seleccion)) estado.seleccion = null;
    iniciarModo();
  }

  function alternarNombres() {
    estado.nombres = !estado.nombres;
    renderBarra();
    svg.classList.toggle('sin-nombres', !estado.nombres);
    irAVista(estado.nombres ? estado.lamina.vistaNombres : estado.lamina.vistaSola, true);
  }

  function cambiarModo(modo) {
    estado.modo = modo;
    document.querySelectorAll('#modos button').forEach(function (b) {
      b.classList.toggle('activo', b.getAttribute('data-modo') === modo);
    });
    document.body.classList.toggle('modo-quiz', modo === 'quiz');
    document.body.classList.toggle('modo-encuentra', modo === 'encuentra');
    estado.marcador = { aciertos: 0, total: 0, racha: 0 };
    ocultarEtiqueta();
    renderBarra();
    if (estado.lamina) {
      // En Encuentra y Quiz los rótulos se ocultan: se usa el encuadre sin nombres
      var conNombres = modo === 'explorar' && estado.nombres;
      irAVista(conNombres ? estado.lamina.vistaNombres : estado.lamina.vistaSola, true);
    }
    iniciarModo();
  }

  function iniciarModo() {
    limpiarMarcas();
    estado.pregunta = null;
    if (estado.modo === 'encuentra') nuevaPreguntaTocar();
    else if (estado.modo === 'quiz') nuevaPreguntaQuiz();
    else {
      if (estado.seleccion && esItem(estado.seleccion)) marcar(estado.seleccion, 'activo', true);
      else estado.seleccion = null;
      renderPanel();
    }
  }

  // ---------- Elegir la siguiente pregunta (repite más lo que fallas) ----------
  function elegir(lista) {
    var candidatos = lista.length > 1 ? lista.filter(function (e) { return e.id !== estado.ultimo; }) : lista;
    var pesos = candidatos.map(function (e) {
      var p = progreso[clave(e.id)] || { ok: 0, fail: 0 };
      return Math.max(0.3, 1 + 2 * p.fail - 0.4 * p.ok);
    });
    var total = pesos.reduce(function (a, b) { return a + b; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < candidatos.length; i++) {
      r -= pesos[i];
      if (r <= 0) { estado.ultimo = candidatos[i].id; return candidatos[i].id; }
    }
    estado.ultimo = candidatos[0].id;
    return candidatos[0].id;
  }

  // ---------- Modo Explorar ----------
  function seleccionar(id) {
    limpiar('activo');
    estado.seleccion = id;
    marcar(id, 'activo', true);
    renderPanel();
    if (esMovil()) {
      var top = panel.getBoundingClientRect().top;
      var alto = visor.offsetHeight;
      if (top > window.innerHeight - 120 || top < alto - 2) {
        window.scrollBy({ top: top - alto - 4, behavior: 'smooth' });
      }
    } else {
      panel.scrollTop = 0;
    }
  }

  function htmlProgreso() {
    var lista = items();
    var dominadas = lista.filter(function (e) { return nivel(e.id) === 'bien'; }).length;
    var pct = Math.round(100 * dominadas / lista.length);
    return '<div class="progreso-region"><span class="nota">Dominas ' + dominadas + ' de ' + lista.length +
      (estado.lamina ? ' partes de ' : ' estructuras de ') + '<b>' + esc(nombreContexto()) + '</b></span>' +
      '<div class="barra"><span style="width:' + pct + '%"></span></div></div>';
  }

  function htmlComun(e) {
    return '<p>' + esc(e.descripcion) + '</p>' +
      (e.puntos && e.puntos.length ? '<h3>Puntos clave</h3><ul>' + e.puntos.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
      (e.articula ? '<h3>Articula con</h3><p>' + esc(e.articula.join(', ')) + '</p>' : '') +
      (e.clinica ? '<div class="clinica"><h3>Relevancia clínica</h3><p>' + esc(e.clinica) + '</p></div>' : '');
  }

  function htmlPractica(id) {
    var p = progreso[clave(id)];
    return '<p class="nota">' + (p ? 'Tu práctica: ' + p.ok + ' aciertos · ' + p.fail + ' fallos' : 'Aún no lo has practicado en Encuentra o Quiz.') + '</p>';
  }

  function htmlFicha(e) {
    var regiones = e.regiones.map(function (rid) {
      return estado.sistema.regiones.filter(function (r) { return r.id === rid; })[0].nombre;
    });
    return '<article class="ficha">' +
      '<h2>' + esc(e.nombre) + '</h2>' +
      (e.alias ? '<p class="alias">' + esc(e.alias) + '</p>' : '') +
      '<div class="chips"><span class="chip">' + esc(e.clase) + '</span><span class="chip">' + (e.par ? 'Par' : 'Impar') + '</span>' +
      regiones.map(function (n) { return '<span class="chip">' + esc(n) + '</span>'; }).join('') + '</div>' +
      (LAMINAS[e.id] ? '<div class="acciones"><button class="boton primario" data-accion="abrir-lamina" data-lamina="' + e.id + '">Ver lámina detallada →</button></div>' : '') +
      htmlComun(e) + htmlPractica(e.id) +
      '</article>';
  }

  function htmlFichaParte(e) {
    return '<article class="ficha">' +
      '<h2>' + esc(e.nombre) + '</h2>' +
      (e.alias ? '<p class="alias">' + esc(e.alias) + '</p>' : '') +
      '<div class="chips"><span class="chip">' + esc(estado.lamina.titulo) + '</span></div>' +
      htmlComun(e) + htmlPractica(e.id) +
      '</article>';
  }

  function htmlLista() {
    return '<h3>' + (estado.lamina ? 'Partes en esta vista' : 'Estructuras de la región') + '</h3><ul class="lista">' +
      items().map(function (e) {
        return '<li><button data-ver="' + e.id + '" class="' + (e.id === estado.seleccion ? 'activo' : '') + '">' +
          '<span class="punto ' + nivel(e.id) + '"></span><span class="nombre">' + esc(e.nombre) + '</span>' +
          (!estado.lamina && LAMINAS[e.id] ? '<span class="mini">lámina</span>' : '') + '</button></li>';
      }).join('') + '</ul>';
  }

  function panelExplorar() {
    var html = htmlProgreso();
    if (estado.lamina) {
      html += estado.seleccion
        ? htmlFichaParte(info(estado.seleccion))
        : '<h2>Lámina: ' + esc(estado.lamina.titulo) + '</h2><p>' + esc(estado.lamina.descripcion) + '</p>' +
          '<p class="nota">Toca una parte del hueso o su nombre. Cambia entre vista anterior y posterior arriba; con «Nombres» puedes ocultar los rótulos para ponerte a prueba.</p>';
    } else if (estado.seleccion) {
      html += htmlFicha(porId[estado.seleccion]);
    } else {
      html += '<h2>Explora el esqueleto</h2><p>Toca un hueso en la figura o elige uno de la lista para ver su ficha. ' +
        'Cambia de región arriba para acercarte a una zona.</p>' +
        '<p class="nota">Los huesos marcados con «lámina» tienen una lámina detallada con sus accidentes óseos.</p>';
    }
    html += htmlLista();
    html += '<div class="acciones"><button class="boton texto" data-accion="reiniciar">Borrar mi progreso</button></div>';
    return html;
  }

  // ---------- Modo Encuentra ----------
  function nuevaPreguntaTocar() {
    limpiarMarcas();
    estado.pregunta = { tipo: 'tocar', id: elegir(items()), intentos: 0, resuelta: false, mensaje: null };
    renderPanel();
  }

  function responderTocar(id) {
    var p = estado.pregunta;
    if (!p || p.resuelta || !esItem(id)) return;
    var m = estado.marcador;
    if (id === p.id) {
      p.resuelta = true;
      var primera = p.intentos === 0;
      registrar(p.id, primera);
      m.total++;
      if (primera) { m.aciertos++; m.racha++; } else { m.racha = 0; }
      limpiar('hover');
      marcar(p.id, 'acierto', true);
      p.mensaje = { tipo: 'ok', texto: primera ? '¡Correcto!' : 'Correcto, al segundo intento.' };
      renderPanel();
      setTimeout(function () { if (estado.pregunta === p) nuevaPreguntaTocar(); }, 1100);
    } else {
      p.intentos++;
      destello(id, 'error', 700);
      if (p.intentos >= 2) {
        p.resuelta = true;
        registrar(p.id, false);
        m.total++; m.racha = 0;
        marcar(p.id, 'objetivo', true);
        p.mensaje = { tipo: 'error', texto: 'Eso es: ' + info(id).nombre + '. ' + info(p.id).nombre + ' es la zona que parpadea.' };
      } else {
        p.mensaje = { tipo: 'error', texto: 'Eso es: ' + info(id).nombre + '. Inténtalo otra vez.' };
      }
      renderPanel();
    }
  }

  function htmlMarcador() {
    var m = estado.marcador;
    return '<div class="marcador"><div><b>' + m.aciertos + '/' + m.total + '</b><span>aciertos</span></div>' +
      '<div><b>' + m.racha + '</b><span>racha</span></div></div>';
  }

  function panelEncuentra() {
    var p = estado.pregunta;
    var html = htmlProgreso() +
      '<div class="reto"><p class="pide">Toca en la figura:</p><p class="objetivo-nombre">' + esc(info(p.id).nombre) + '</p></div>' +
      htmlMarcador();
    if (p.mensaje) html += '<div class="mensaje ' + p.mensaje.tipo + '">' + esc(p.mensaje.texto) + '</div>';
    html += '<div class="acciones">' +
      (p.resuelta && p.mensaje && p.mensaje.tipo === 'error'
        ? '<button class="boton primario" data-accion="siguiente">Siguiente</button>'
        : '<button class="boton" data-accion="saltar">Saltar</button>') +
      '</div><p class="nota">' + (estado.lamina ? 'Las partes que fallas aparecerán más a menudo.' : 'Puedes tocar el hueso de cualquier lado del cuerpo. Las estructuras que fallas aparecerán más a menudo.') + '</p>';
    return html;
  }

  // ---------- Modo Quiz ----------
  function nuevaPreguntaQuiz() {
    limpiarMarcas();
    var lista = items();
    var id = elegir(lista);
    var e = info(id);
    var tipo = e.pista && Math.random() < 0.4 ? 'pista' : 'resaltado';
    var otros = barajar(lista.filter(function (x) { return x.id !== id; }));
    if (otros.length < 3) {
      otros = otros.concat(barajar(todosLosItems().filter(function (x) {
        return x.id !== id && otros.indexOf(x) === -1;
      })));
    }
    var opciones = barajar([id].concat(otros.slice(0, 3).map(function (x) { return x.id; })));
    estado.pregunta = { tipo: tipo, id: id, opciones: opciones, respuesta: null };
    if (tipo === 'resaltado') marcar(id, 'objetivo', true);
    renderPanel();
  }

  function responderQuiz(elegido) {
    var p = estado.pregunta;
    if (!p || p.respuesta) return;
    p.respuesta = elegido;
    var ok = elegido === p.id;
    registrar(p.id, ok);
    var m = estado.marcador;
    m.total++;
    if (ok) { m.aciertos++; m.racha++; } else { m.racha = 0; }
    limpiar('objetivo');
    marcar(p.id, ok ? 'acierto' : 'objetivo', true);
    renderPanel();
  }

  function panelQuiz() {
    var p = estado.pregunta;
    var e = info(p.id);
    var html = htmlProgreso() + '<div class="reto">' +
      (p.tipo === 'resaltado'
        ? '<p class="pide">¿Qué ' + (estado.lamina ? 'parte' : 'estructura') + ' está resaltada en la figura?</p>'
        : '<p class="pide">¿Qué ' + (estado.lamina ? 'parte' : 'estructura') + ' es?</p><p class="pista">«' + esc(e.pista) + '»</p>') +
      '</div><div class="opciones">' +
      p.opciones.map(function (id) {
        var cls = '';
        if (p.respuesta) {
          if (id === p.id) cls = 'correcta';
          else if (id === p.respuesta) cls = 'incorrecta';
        }
        return '<button data-opcion="' + id + '" class="' + cls + '"' + (p.respuesta ? ' disabled' : '') + '>' + esc(info(id).nombre) + '</button>';
      }).join('') + '</div>' + htmlMarcador();
    if (p.respuesta) {
      var ok = p.respuesta === p.id;
      html += '<div class="mensaje ' + (ok ? 'ok' : 'error') + '">' + (ok ? '¡Correcto!' : 'Era: ' + esc(e.nombre)) + '</div>' +
        '<p>' + esc(e.descripcion) + '</p>' +
        '<div class="acciones"><button class="boton primario" data-accion="siguiente">Siguiente pregunta</button></div>';
    }
    return html;
  }

  // ---------- Panel ----------
  function renderPanel() {
    if (estado.modo === 'explorar') panel.innerHTML = panelExplorar();
    else if (estado.modo === 'encuentra') panel.innerHTML = panelEncuentra();
    else panel.innerHTML = panelQuiz();
  }

  // ---------- Etiqueta flotante (solo Explorar, con ratón) ----------
  function mostrarEtiqueta(ev, id) {
    var r = visor.getBoundingClientRect();
    etiqueta.textContent = info(id).nombre;
    etiqueta.style.left = (ev.clientX - r.left) + 'px';
    etiqueta.style.top = (ev.clientY - r.top) + 'px';
    etiqueta.hidden = false;
  }
  function ocultarEtiqueta() { etiqueta.hidden = true; }

  // ---------- Eventos ----------
  function idDesdeEvento(ev) {
    var g = ev.target.closest && ev.target.closest('.hueso, .rotulo');
    if (!g || g.classList.contains('atenuado')) return null;
    return g.getAttribute('data-id');
  }

  var hoverId = null;
  svg.addEventListener('pointermove', function (ev) {
    if (ev.pointerType === 'touch' || estado.modo === 'quiz') return;
    var id = idDesdeEvento(ev);
    if (id !== hoverId) {
      if (hoverId) marcar(hoverId, 'hover', false);
      if (id) marcar(id, 'hover', true);
      hoverId = id;
    }
    var rotulosVisibles = estado.lamina && estado.nombres;
    if (id && estado.modo === 'explorar' && !rotulosVisibles) mostrarEtiqueta(ev, id); else ocultarEtiqueta();
  });
  svg.addEventListener('pointerleave', function () {
    if (hoverId) marcar(hoverId, 'hover', false);
    hoverId = null;
    ocultarEtiqueta();
  });
  svg.addEventListener('click', function (ev) {
    var id = idDesdeEvento(ev);
    if (!id) return;
    if (estado.modo === 'explorar') seleccionar(id);
    else if (estado.modo === 'encuentra') responderTocar(id);
  });

  // ---------- Zoom y desplazamiento (rueda, arrastre, pellizco con dos dedos y botones) ----------
  var ZOOM_MAX = 8;

  function vistaActualNum() { return svg.getAttribute('viewBox').split(/\s+/).map(Number); }

  function ponerVista(vb) {
    // Limita el zoom entre el encuadre base y ZOOM_MAX, y no deja que el centro salga del encuadre base
    var w = Math.min(base[2], Math.max(base[2] / ZOOM_MAX, vb[2]));
    var h = w * base[3] / base[2];
    var cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2;
    cx = Math.min(base[0] + base[2], Math.max(base[0], cx));
    cy = Math.min(base[1] + base[3], Math.max(base[1], cy));
    if (w >= base[2]) { cx = base[0] + base[2] / 2; cy = base[1] + base[3] / 2; }
    svg.setAttribute('viewBox', [cx - w / 2, cy - h / 2, w, h].map(function (n) { return +n.toFixed(2); }).join(' '));
    actualizarZoomUI();
  }

  function actualizarZoomUI(vb) {
    var w = (vb || vistaActualNum())[2];
    visor.classList.toggle('ampliado', w < base[2] * 0.97);
  }

  // Punto de la pantalla -> coordenadas del SVG
  function aSvg(x, y) {
    var m = svg.getScreenCTM();
    if (!m) return null;
    var p = svg.createSVGPoint(); p.x = x; p.y = y;
    return p.matrixTransform(m.inverse());
  }

  function ampliar(factor, x, y) {
    cancelAnimationFrame(animacion);
    var vb = vistaActualNum();
    var p = x == null ? { x: vb[0] + vb[2] / 2, y: vb[1] + vb[3] / 2 } : aSvg(x, y);
    if (!p) return;
    var w = Math.min(base[2], Math.max(base[2] / ZOOM_MAX, vb[2] / factor));
    var k = vb[2] / w;
    ponerVista([p.x - (p.x - vb[0]) / k, p.y - (p.y - vb[1]) / k, w, vb[3] / k]);
  }

  function desplazar(dx, dy) {
    var m = svg.getScreenCTM();
    if (!m) return;
    var vb = vistaActualNum();
    ponerVista([vb[0] - dx / m.a, vb[1] - dy / m.d, vb[2], vb[3]]);
  }

  svg.addEventListener('wheel', function (ev) {
    ev.preventDefault();
    ampliar(Math.pow(1.0015, -ev.deltaY * (ev.deltaMode === 1 ? 30 : 1)), ev.clientX, ev.clientY);
  }, { passive: false });

  var punteros = {};          // pointerId -> {x, y}
  var arrastrado = false;     // si hubo movimiento, el "click" siguiente no selecciona
  var inicioToque = null;

  svg.addEventListener('pointerdown', function (ev) {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    punteros[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
    if (Object.keys(punteros).length === 1) { arrastrado = false; inicioToque = { x: ev.clientX, y: ev.clientY }; }
    else arrastrado = true;   // dos dedos: es un gesto, no un toque
  });

  svg.addEventListener('pointermove', function (ev) {
    var prev = punteros[ev.pointerId];
    if (!prev) return;
    var ids = Object.keys(punteros);
    if (ids.length >= 2) {
      var otro = punteros[ids[0] == ev.pointerId ? ids[1] : ids[0]];
      var d0 = Math.hypot(prev.x - otro.x, prev.y - otro.y);
      var d1 = Math.hypot(ev.clientX - otro.x, ev.clientY - otro.y);
      var m0x = (prev.x + otro.x) / 2, m0y = (prev.y + otro.y) / 2;
      var m1x = (ev.clientX + otro.x) / 2, m1y = (ev.clientY + otro.y) / 2;
      if (d0 > 0) ampliar(d1 / d0, m0x, m0y);
      desplazar(m1x - m0x, m1y - m0y);
    } else {
      if (!arrastrado && Math.hypot(ev.clientX - inicioToque.x, ev.clientY - inicioToque.y) > 6) arrastrado = true;
      if (arrastrado && visor.classList.contains('ampliado')) desplazar(ev.clientX - prev.x, ev.clientY - prev.y);
    }
    punteros[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
  });

  function soltar(ev) { delete punteros[ev.pointerId]; }
  svg.addEventListener('pointerup', soltar);
  svg.addEventListener('pointercancel', soltar);
  svg.addEventListener('pointerleave', function (ev) { if (ev.pointerType === 'mouse') soltar(ev); });

  // Un arrastre o un pellizco no debe contar como toque sobre un hueso
  svg.addEventListener('click', function (ev) {
    if (arrastrado) { ev.stopImmediatePropagation(); arrastrado = false; }
  }, true);

  svg.addEventListener('dblclick', function (ev) {
    ev.preventDefault();
    if (visor.classList.contains('ampliado')) irAVista(base.join(' '), true);
    else ampliar(2.5, ev.clientX, ev.clientY);
  });

  $('#zoom').addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-zoom]');
    if (!b) return;
    var z = b.getAttribute('data-zoom');
    if (z === 'mas') ampliar(1.6);
    else if (z === 'menos') ampliar(1 / 1.6);
    else irAVista(base.join(' '), true);
  });

  $('#regiones').addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-region')) cambiarRegion(b.getAttribute('data-region'));
    else if (b.hasAttribute('data-vista')) cambiarVista(b.getAttribute('data-vista'));
    else if (b.getAttribute('data-barra') === 'cerrar') cerrarLamina();
    else if (b.getAttribute('data-barra') === 'nombres') alternarNombres();
  });
  $('#modos').addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-modo]');
    if (b) cambiarModo(b.getAttribute('data-modo'));
  });
  $('#sistema').addEventListener('change', function (ev) {
    cargarSistema(ev.target.value);
  });

  panel.addEventListener('click', function (ev) {
    var ver = ev.target.closest('[data-ver]');
    if (ver) { seleccionar(ver.getAttribute('data-ver')); return; }
    var op = ev.target.closest('[data-opcion]');
    if (op) { responderQuiz(op.getAttribute('data-opcion')); return; }
    var acc = ev.target.closest('[data-accion]');
    if (!acc) return;
    var a = acc.getAttribute('data-accion');
    if (a === 'saltar' || a === 'siguiente') {
      if (estado.modo === 'quiz') nuevaPreguntaQuiz(); else nuevaPreguntaTocar();
    } else if (a === 'abrir-lamina') {
      abrirLamina(acc.getAttribute('data-lamina'));
    } else if (a === 'reiniciar') {
      if (window.confirm('¿Borrar todo tu progreso guardado en este navegador?')) {
        progreso = {};
        guardarProgreso();
        renderPanel();
      }
    }
  });

  // ---------- Inicio ----------
  function cargarSistema(id) {
    estado.sistema = window.SISTEMAS[id];
    porId = {};
    estado.sistema.estructuras.forEach(function (e) { porId[e.id] = e; });
    estado.region = 'todo';
    estado.seleccion = null;
    estado.lamina = null;
    renderSistemas();
    renderBarra();
    dibujarFigura();
    iniciarModo();
  }

  cargarSistema('oseo');
})();
