/* ==========================================================
   Checklist del local · lógica de la página
   Contenido = "Checklist de Viabilidad del Local" del dueño.
   Estado en localStorage (CLAVE). Se pinta todo desde DATOS.
   ========================================================== */
(function () {
  "use strict";

  var CLAVE = "monaco-checklist-local-v1";

  /* c: r = 🔴 obligatorio · a = 🟡 se resuelve con presupuesto · v = 🟢 mejora el negocio */
  var ALERTAS = [
    { id: "al-alcantarillado", t: "No tiene conexión al alcantarillado público." },
    { id: "al-piso", t: "El piso es de tierra o madera." },
    { id: "al-escalones", t: "La entrada tiene escalones altos y no se puede poner rampa." },
    { id: "al-residencial", t: "Es zona residencial exclusiva, donde NO permiten negocios." },
    { id: "al-agua", t: "No tiene agua potable con contador propio (independiente)." },
    { id: "al-dueno", t: "El dueño NO deja hacer adecuaciones (romper piso, instalar la trampa de grasas)." }
  ];

  var SECCIONES = [
    { id: "s1", n: 1, t: "Legalidad y uso del suelo",
      intro: "🔴 Si esto no se cumple, no arriendes.",
      items: [
        { id: "uso-suelo", c: "r", t: "Uso de suelo compatible",
          d: "¿Se permite en esa dirección un negocio de \"servicios\", \"limpieza\" o \"lavadero\"? Pregúntale primero al dueño y luego confírmalo en Planeación Municipal." },
        { id: "no-residencial", c: "r", t: "No es zona residencial exclusiva",
          d: "Confírmalo en Planeación Municipal o en el POT/PBOT del municipio." },
        { id: "servicios", c: "r", t: "Servicios públicos legales",
          d: "¿Tiene contadores de agua y luz propios (independientes)? ¿Son comerciales o residenciales?" }
      ],
      tips: [
        "El último recibo del impuesto predial dice si el local es comercial o residencial. Pídeselo al dueño.",
        "Ve en persona a Planeación Municipal o a la Curaduría Urbana a confirmarlo. Esto es obligatorio después de decidir que quieres el local."
      ],
      enlace: { url: "../uso-de-suelo/", t: "Cómo revisar el uso del suelo →" } },

    { id: "s2", n: 2, t: "Agua y desagües",
      items: [
        { id: "presion", c: "a", t: "Buena presión del agua",
          d: "Haz UNA de estas dos pruebas:",
          extra:
            '<div class="cl-prueba"><b>Prueba del balde</b><p>Abre la llave al máximo y llena un balde de 10 litros.</p>' +
            '<ul><li>⏱ Menos de 30 segundos = excelente</li><li>30 a 45 segundos = aceptable</li><li>60 segundos = mala presión</li></ul></div>' +
            '<div class="cl-prueba"><b>Prueba del pulgar</b><p>Abre la llave a toda potencia y trata de tapar la salida con el pulgar.</p>' +
            '<ul><li>No la puedes tapar y salpica = buena presión (30 PSI)</li><li>La tapas fácil = mala presión</li></ul></div>' },
        { id: "desagues", c: "a", t: "Desagües a la vista",
          d: "¿Hay rejillas o puntos de desagüe conectados al alcantarillado?" },
        { id: "trampa", c: "r", t: "Espacio para la trampa de grasas",
          d: "Mínimo 60 × 60 × 60 cm, donde se pueda excavar sin tapar el paso. Debe tener al menos 2 cámaras (una para sedimentos y otra para grasas)." },
        { id: "alcantarillado", c: "a", t: "Conexión al alcantarillado",
          d: "¿Conecta al sistema sanitario? Confírmalo con la empresa de acueducto de tu ciudad." },
        { id: "medidor", c: "a", t: "Tamaño del medidor de agua",
          d: "¿Es de ½\" o de ¾\"? El de ¾\" es mejor para la cantidad de agua que gasta un lavadero." },
        { id: "tanque", c: "v", t: "Espacio para tanque de reserva",
          d: "¿Hay dónde poner un tanque de 500 a 1.000 litros por si cortan el agua?" },
        { id: "tuberia", c: "v", t: "Tubería en buen estado",
          d: "¿Es PVC o galvanizada vieja? La galvanizada le baja la presión al agua." },
        { id: "humedades", c: "a", t: "Humedad en paredes o techo",
          d: "Busca manchas de agua, pintura inflada o moho. Si hay humedad vieja, puede haber daños escondidos en la tubería = gasto extra." }
      ],
      legal: '<b>⚠ Ley ambiental:</b> todo lavadero debe tener la trampa de grasas conectada al alcantarillado <b>ANTES de abrir</b>. ' +
        'En Bogotá se pide permiso de vertimientos ante la Secretaría de Ambiente (Decreto 1076 de 2015, Resolución 631 de 2015). ' +
        'En otras ciudades, ante la CAR o la corporación ambiental de la región. Si no cumples, te pueden poner multas o hasta cerrar el negocio (Ley 1333 de 2009).',
      enlace: { url: "../vertimientos-y-lodos/", t: "Ver la guía de vertimientos y lodos →" } },

    { id: "s3", n: 3, t: "Electricidad",
      items: [
        { id: "voltaje", c: "a", t: "Voltaje 110 V y 220 V",
          d: "¿Tiene acometida de 110 V y de 220 V? Lo ideal es tener las dos. Con 220 V la maquinaria industrial rinde más." },
        { id: "tomas", c: "a", t: "Tomas eléctricas",
          d: "Mínimo 5 tomas de 110 V y 2 tomas de 220 V. Si no las tiene, presupuesta el arreglo eléctrico." },
        { id: "breaker", c: "a", t: "Breaker principal",
          d: "¿De cuántos amperios es? Una hidrolavadora industrial gasta de 15 a 20 A. Lo mínimo recomendado es 40 A." },
        { id: "cableado", c: "a", t: "Estado del cableado",
          d: "¿Es nuevo o viejo? Cables viejos y delgados = riesgo de incendio con máquinas pesadas." },
        { id: "tierra", c: "a", t: "Polo a tierra",
          d: "¿El local tiene sistema de puesta a tierra? Es obligatorio por RETIE donde hay máquinas y agua." },
        { id: "iluminacion", c: "v", t: "Iluminación",
          d: "¿Tiene buena luz o hay que instalar? Hace falta para el detailing y para trabajar de noche." }
      ],
      legal: '<b>⚠ RETIE:</b> las tomas en zonas mojadas deben ser tipo <b>GFCI</b> (protegen contra electrocución). Es obligatorio por el Reglamento Técnico de Instalaciones Eléctricas.' },

    { id: "s4", n: 4, t: "Espacio y distribución",
      items: [
        { grupo: "Entrada (obligatorio)" },
        { id: "entrada-nivel", c: "r", t: "Entrada a nivel o con rampa suave",
          d: "Sin escalones que golpeen las motos." },
        { id: "entrada-ancho", c: "r", t: "Entrada de mínimo 3 metros de ancho",
          d: "Para que entren y salgan 2 motos al tiempo." },
        { grupo: "Zonas de trabajo" },
        { id: "zona-lavado", c: "a", t: "Zona de lavado",
          d: "Dos opciones:",
          extra:
            '<div class="cl-prueba"><b>Opción A · Por cubículos (recomendada)</b><p>3 × 2,20 m por cubículo, separados con cortinas plásticas impermeables.</p></div>' +
            '<div class="cl-prueba"><b>Opción B · Lavado y secado separados</b><p>Lavado: 3 × 2 m por punto (mínimo 3 × 6 m para 3 puntos). Secado: 4 × 3 m.</p></div>' +
            '<p>Cualquiera de las dos aguanta 1.000 motos al mes con 3 operarios.</p>' },
        { id: "cuarto-maquinas", c: "a", t: "Cuarto de máquinas",
          d: "Mínimo 2 × 2 m para tanques, bombas, hidrolavadoras, compresor y shampoocera." },
        { id: "espera", c: "v", t: "Zona de espera para clientes", d: "Mínimo 9 m², con sillas." },
        { id: "bano", c: "v", t: "Baño", d: "Sencillo y que funcione." },
        { id: "bodega", c: "v", t: "Bodega de insumos", d: "Espacio para guardar galones de champú, desengrasante, cera y toallas." },
        { id: "circulacion", c: "v", t: "Pasillo de circulación", d: "Debe tener 1,5 m de ancho." },
        { id: "entrega", c: "v", t: "Zona de entrega", d: "Para dejar las motos listas." },
        { id: "trabajadores", c: "v", t: "Zona de trabajadores", d: "4 m²." },
        { grupo: "Condiciones generales" },
        { id: "piso", c: "r", t: "Piso de concreto, cemento o baldosa antideslizante",
          d: "NO tierra ni madera.",
          nota: "⚠ Si es baldosa lisa, las motos se resbalan con el jabón y se caen. Toca picarla o echarle un producto antideslizante (gasto extra)." },
        { id: "pendiente", c: "a", t: "Piso inclinado hacia el desagüe",
          d: "Si es plano, hay que arreglarlo (presupuesto)." },
        { id: "ventilacion", c: "a", t: "Ventilación y techo alto",
          d: "Altura mínima recomendada: 3 metros. Es clave para evitar humedad, hongos y la nube de agua." }
      ] },

    { id: "s5", n: 5, t: "Ubicación y alrededores",
      items: [
        { id: "visibilidad", c: "v", t: "Se ve desde la calle",
          d: "¿Se ve el local desde la vía principal? Eso ayuda mucho a que lleguen clientes solos." },
        { id: "flujo", c: "v", t: "Pasan muchas motos",
          d: "¿Es vía principal, secundaria o de barrio? ¿Ves pasar muchas motos?" },
        { id: "parqueo", c: "v", t: "Parqueo para motos en espera",
          d: "¿Dónde se parquean las motos mientras esperan turno?" },
        { id: "competencia", c: "v", t: "Competencia cerca",
          d: "¿Cuántos lavaderos hay a 1 km a la redonda? ¿Qué precios cobran?" },
        { id: "internet", c: "v", t: "Internet",
          d: "¿Hay internet o fibra óptica? Lo necesitas para el sistema de gestión, las cámaras y los pagos digitales." },
        { id: "senal", c: "v", t: "Señal de celular",
          d: "Revisa que entre buena señal de datos dentro del local. Sin señal no funciona el datáfono y los clientes se aburren esperando." },
        { id: "vecinos", c: "v", t: "Vecinos",
          d: "¿Quién está al lado? Buenos vecinos: taller de motos, montallantas, venta de repuestos. Malos vecinos: oficinas, panadería fina, restaurante elegante (se van a quejar por el ruido de la hidrolavadora)." },
        { id: "seguridad", c: "v", t: "Seguridad de la zona",
          d: "¿Es seguro dejar motos? ¿Hay vigilancia? Piensa en cámaras y en un seguro." }
      ] },

    { id: "s6", n: 6, t: "Negociar el arriendo",
      items: [
        { grupo: "Antes de firmar" },
        { id: "permiso-obra", c: "r", t: "El dueño deja hacer adecuaciones",
          d: "Romper el piso para la trampa de grasas, pintar, hacer instalaciones eléctricas. Explícale claro lo que vas a hacer." },
        { id: "gracia", c: "a", t: "Tiempo de gracia",
          d: "Negocia mínimo 15 días sin pagar arriendo mientras haces las adecuaciones." },
        { id: "duracion", c: "a", t: "Contrato de mínimo 1 año",
          d: "Así alcanzas a recuperar lo que inviertes en adecuaciones." },
        { grupo: "Lo que debe decir el contrato" },
        { id: "renovacion", c: "a", t: "Renovación automática",
          d: "¿El contrato se renueva solo? ¿Cuánto sube el arriendo?" },
        { id: "mejoras", c: "a", t: "Mejoras al local",
          d: "Deja escrito quién se queda con las adecuaciones fijas si se acaba el contrato (Código de Comercio, artículos 516 a 524: mejoras útiles y necesarias)." },
        { id: "canon", c: "a", t: "Qué incluye el arriendo",
          d: "¿Incluye administración, vigilancia y aseo de zonas comunes?" },
        { id: "seguro", c: "v", t: "Seguro",
          d: "Piensa en un seguro de responsabilidad civil para las motos que te dejan." },
        { id: "aviso", c: "a", t: "Aviso en la fachada",
          d: "¿El dueño deja poner un aviso en la fachada? Es clave para que te vean." }
      ],
      tips: [
        "Para negociar: si el local te gusta, no muestres afán. Di algo como: \"Está interesante, tenemos que revisar los costos de adecuación porque vemos que falta X cosa, para ver si nos dan los números.\" Eso te da poder para negociar el precio después."
      ] }
  ];

  /* Los 7 requisitos mínimos (sección 7). Cada uno depende de estos puntos. */
  var MINIMOS = [
    { t: "Uso de suelo compatible", ids: ["uso-suelo", "no-residencial"] },
    { t: "Piso de concreto o cemento", ids: ["piso"] },
    { t: "Entrada sin escalones y de mínimo 3 m", ids: ["entrada-nivel", "entrada-ancho"] },
    { t: "Conexión al alcantarillado", ids: ["alcantarillado"] },
    { t: "Espacio para la trampa de grasas", ids: ["trampa"] },
    { t: "Servicios públicos independientes", ids: ["servicios"] },
    { t: "El dueño autoriza adecuaciones", ids: ["permiso-obra"] }
  ];

  var FOTOS = [
    { id: "f-panoramico", t: "Video panorámico desde la entrada (que se vea todo el local)" },
    { id: "f-tablero", t: "Foto del tablero eléctrico (caja de breakers)" },
    { id: "f-pisos", t: "Foto de los pisos y de los desagües o rejillas" },
    { id: "f-llaves", t: "Video de las llaves de agua abiertas (para ver la presión)" }
  ];

  var ESTADOS = [
    { v: "ok", t: "✅ Cumple", corto: "Cumple" },
    { v: "inv", t: "⚠️ Toca invertir", corto: "Toca invertir" },
    { v: "no", t: "❌ No cumple", corto: "No cumple" }
  ];
  var COLOR = { r: "Obligatorio", a: "Se arregla con plata", v: "Mejora el negocio" };

  /* ---------- Estado ---------- */
  function vacio() { return { nombre: "", alertas: {}, items: {}, fotos: {} }; }
  function leer() {
    try {
      var s = JSON.parse(localStorage.getItem(CLAVE));
      if (s && s.items) { s.alertas = s.alertas || {}; s.fotos = s.fotos || {}; s.nombre = s.nombre || ""; return s; }
    } catch (e) {}
    return vacio();
  }
  var E = leer();
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(E)); } catch (e) {} }

  var todosItems = [];
  SECCIONES.forEach(function (s) { s.items.forEach(function (it) { if (it.id) { it.sec = s; todosItems.push(it); } }); });
  function item(id) { for (var i = 0; i < todosItems.length; i++) if (todosItems[i].id === id) return todosItems[i]; }

  function $(id) { return document.getElementById(id); }
  function h(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- Pintar ---------- */
  /* Las preguntas ya vienen escritas en el HTML (para que se lean impresas o sin JavaScript).
     Aquí solo se les agregan los botones Sí / No y la línea del resultado. */
  function pintarAlertas() {
    var ul = $("cl-alertas");
    ALERTAS.forEach(function (a) {
      var li = ul.querySelector('[data-id="' + a.id + '"]');
      if (!li) {
        li = h("li", "cl-alerta");
        li.setAttribute("data-id", a.id);
        li.appendChild(h("p", "cl-alerta-t", esc(a.t)));
        ul.appendChild(li);
      }
      var pregunta = li.querySelector(".cl-alerta-t").textContent;
      var g = h("div", "cl-sino");
      g.setAttribute("role", "group");
      g.setAttribute("aria-label", pregunta);
      [["si", "Sí"], ["no", "No"]].forEach(function (op) {
        var b = h("button", "cl-btn cl-" + op[0], op[1]);
        b.type = "button";
        b.setAttribute("data-v", op[0]);
        b.addEventListener("click", function () {
          E.alertas[a.id] = E.alertas[a.id] === op[0] ? undefined : op[0];
          if (!E.alertas[a.id]) delete E.alertas[a.id];
          guardar(); refrescar();
        });
        g.appendChild(b);
      });
      li.appendChild(g);
      li.appendChild(h("p", "cl-alerta-res"));
    });
  }

  function pintarResumenAlertas() {
    var caja = $("cl-al-resumen");
    var rojas = ALERTAS.filter(function (a) { return E.alertas[a.id] === "si"; }).length;
    var verdes = ALERTAS.filter(function (a) { return E.alertas[a.id] === "no"; }).length;
    var total = ALERTAS.length;
    if (rojas) {
      caja.className = "cl-al-resumen cl-res-rojo";
      caja.innerHTML = rojas + " en rojo: este local no se arrienda<small>Descarta este local y busca otro. No vale la pena invertir.</small>";
    } else if (verdes === total) {
      caja.className = "cl-al-resumen cl-res-verde";
      caja.innerHTML = 'Todo en verde: sigue con el uso de suelo<small><a href="../uso-de-suelo/">Cómo revisar el uso del suelo →</a></small>';
    } else {
      caja.className = "cl-al-resumen";
      caja.innerHTML = "Van " + verdes + " de " + total + " en verde" +
        "<small>Te " + (total - verdes === 1 ? "falta 1 pregunta" : "faltan " + (total - verdes) + " preguntas") +
        '. Un solo "Sí" en rojo y el local no se arrienda.</small>';
    }
  }

  function pintarSecciones() {
    var cont = $("cl-secciones");
    SECCIONES.forEach(function (s, i) {
      var d = h("details", "cl-sec");
      d.id = "cl-" + s.id;
      if (i === 0) d.open = true;
      var sum = h("summary", null,
        '<span class="cl-sec-num">' + s.n + '</span>' +
        '<span><span class="cl-sec-t">' + esc(s.t) + '</span>' +
        '<span class="cl-sec-cuenta" data-cuenta="' + s.id + '"></span>' +
        '<span class="cl-mini"><span data-barra="' + s.id + '"></span></span></span>' +
        '<span class="paso-flecha" aria-hidden="true">›</span>');
      d.appendChild(sum);
      var cuerpo = h("div", "cl-sec-cuerpo");
      if (s.intro) cuerpo.appendChild(h("p", "cl-intro", esc(s.intro)));
      var ul = h("ul", "cl-items");
      s.items.forEach(function (it) {
        if (it.grupo) { ul.appendChild(h("li", "cl-grupo", esc(it.grupo))); return; }
        var li = h("li", "cl-item");
        li.setAttribute("data-id", it.id);
        li.appendChild(h("p", "cl-item-t",
          '<span class="cl-punto cl-' + it.c + '" title="' + COLOR[it.c] + '" aria-label="' + COLOR[it.c] + '"></span>' + esc(it.t)));
        li.appendChild(h("p", "cl-item-d", esc(it.d)));
        if (it.extra) li.appendChild(h("div", "cl-extra", it.extra));
        if (it.nota) li.appendChild(h("p", "cl-nota-alerta", esc(it.nota)));
        var g = h("div", "cl-tres");
        g.setAttribute("role", "group");
        g.setAttribute("aria-label", it.t);
        ESTADOS.forEach(function (st) {
          var b = h("button", "cl-btn cl-" + st.v, st.t);
          b.type = "button";
          b.setAttribute("data-v", st.v);
          b.addEventListener("click", function () {
            if (E.items[it.id] === st.v) delete E.items[it.id]; else E.items[it.id] = st.v;
            guardar(); refrescar();
          });
          g.appendChild(b);
        });
        li.appendChild(g);
        ul.appendChild(li);
      });
      cuerpo.appendChild(ul);
      (s.tips || []).forEach(function (t) { cuerpo.appendChild(h("p", "cl-tip", "💡 " + esc(t))); });
      if (s.legal) cuerpo.appendChild(h("p", "cl-legal", s.legal));
      if (s.enlace) {
        var a = h("a", "cl-enlace", esc(s.enlace.t));
        a.href = s.enlace.url;
        cuerpo.appendChild(a);
      }
      d.appendChild(cuerpo);
      cont.appendChild(d);
    });
  }

  function pintarFotos() {
    var ul = $("cl-fotos");
    FOTOS.forEach(function (f) {
      var li = h("li", null,
        '<label><input type="checkbox" data-foto="' + f.id + '"><span>' + esc(f.t) + '</span></label>');
      li.querySelector("input").addEventListener("change", function (e) {
        if (e.target.checked) E.fotos[f.id] = 1; else delete E.fotos[f.id];
        guardar(); refrescar();
      });
      ul.appendChild(li);
    });
  }

  /* ---------- Veredicto ---------- */
  function veredicto() {
    var alertasSi = ALERTAS.filter(function (a) { return E.alertas[a.id] === "si"; });
    var alertasFaltan = ALERTAS.filter(function (a) { return !E.alertas[a.id]; });
    var filas = MINIMOS.map(function (m) {
      var vals = m.ids.map(function (id) { return E.items[id]; });
      var est = vals.indexOf("no") > -1 ? "no" : vals.indexOf(undefined) > -1 ? "falta" : vals.indexOf("inv") > -1 ? "inv" : "ok";
      return { t: m.t, est: est };
    });
    var no = filas.filter(function (f) { return f.est === "no"; });
    var inv = filas.filter(function (f) { return f.est === "inv"; });
    var faltan = filas.filter(function (f) { return f.est === "falta"; }).length + alertasFaltan.length;
    var tipo, titulo, texto;
    if (alertasSi.length || no.length) {
      tipo = "no"; titulo = "❌ NO PASA";
      texto = "Descarta este local y busca otro. No vale la pena invertir.";
    } else if (faltan) {
      tipo = "falta"; titulo = faltan === 1 ? "⏳ Te falta 1 por revisar" : "⏳ Te faltan " + faltan + " por revisar";
      texto = "Revisa las señales de alerta y los 7 requisitos de abajo.";
    } else if (inv.length) {
      tipo = "inv"; titulo = "⚠️ PASA solo si arreglas esto";
      texto = "Estos requisitos mínimos todavía no se cumplen: " + inv.map(function (f) { return f.t.toLowerCase(); }).join(", ") + ". Presupuéstalos antes de firmar.";
    } else {
      tipo = "ok"; titulo = "✅ PASA";
      texto = "Cumple los 7 requisitos mínimos. Se puede arrendar.";
    }
    return { tipo: tipo, titulo: titulo, texto: texto, filas: filas, alertasSi: alertasSi };
  }

  /* ---------- Refrescar todo ---------- */
  function refrescar() {
    // Botones marcados
    Array.prototype.forEach.call(document.querySelectorAll(".cl-alerta"), function (li) {
      var v = E.alertas[li.getAttribute("data-id")];
      li.className = "cl-alerta" + (v ? " cl-hay-" + v : "");
      Array.prototype.forEach.call(li.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-v") === v ? "true" : "false");
      });
      var res = li.querySelector(".cl-alerta-res");
      if (res) res.textContent = v === "si" ? "ROJO · No se arrienda" : v === "no" ? "VERDE · Sigue" : "";
    });
    pintarResumenAlertas();
    Array.prototype.forEach.call(document.querySelectorAll(".cl-item"), function (li) {
      var v = E.items[li.getAttribute("data-id")];
      li.className = "cl-item" + (v ? " cl-hay-" + v : "");
      Array.prototype.forEach.call(li.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-v") === v ? "true" : "false");
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-foto]"), function (c) {
      c.checked = !!E.fotos[c.getAttribute("data-foto")];
    });

    // Progreso total
    var total = ALERTAS.length + todosItems.length;
    var hechos = Object.keys(E.alertas).length + todosItems.filter(function (it) { return E.items[it.id]; }).length;
    $("cl-prog-texto").textContent = "Revisaste " + hechos + " de " + total + " puntos";
    $("cl-prog-barra").style.width = Math.round(hechos / total * 100) + "%";
    $("cl-prog-barra").parentNode.setAttribute("aria-valuenow", hechos);
    $("cl-prog-barra").parentNode.setAttribute("aria-valuemax", total);
    var invs = todosItems.filter(function (it) { return E.items[it.id] === "inv"; }).length;
    $("cl-prog-inv").textContent = invs ? "⚠️ " + invs : "";

    // Mini progreso por sección
    SECCIONES.forEach(function (s) {
      var its = s.items.filter(function (it) { return it.id; });
      var ok = its.filter(function (it) { return E.items[it.id]; }).length;
      document.querySelector('[data-cuenta="' + s.id + '"]').textContent = ok + " de " + its.length + " revisados";
      document.querySelector('[data-barra="' + s.id + '"]').style.width = Math.round(ok / its.length * 100) + "%";
      $("cl-" + s.id).classList.toggle("cl-completa", ok === its.length);
    });

    // Sección 7
    var v = veredicto();
    var caja = $("cl-veredicto");
    caja.className = "cl-veredicto cl-v-" + v.tipo;
    caja.innerHTML = '<p class="cl-v-titulo">' + v.titulo + '</p><p>' + esc(v.texto) + '</p>';
    var ul = $("cl-minimos");
    ul.innerHTML = "";
    var ICON = { ok: "✅", inv: "⚠️", no: "❌", falta: "⏳" };
    v.filas.forEach(function (f) {
      ul.appendChild(h("li", "cl-min-" + f.est, '<span aria-hidden="true">' + ICON[f.est] + '</span> ' + esc(f.t)));
    });
    $("cl-presupuesto").textContent = invs === 1 ? "1 cosa para presupuestar (⚠️)" : invs + " cosas para presupuestar (⚠️)";

    var nf = Object.keys(E.fotos).length;
    $("cl-fotos-cuenta").textContent = nf + " de " + FOTOS.length + " listas";
  }

  /* ---------- Resumen para el asesor (Markdown completo, listo para Claude) ---------- */
  var URL_MANUAL = "https://monaco-principal.github.io/manuales/checklist-local/";
  var ESTADO_MD = { ok: "✅ Cumple", inv: "⚠️ Toca invertir", no: "❌ No cumple" };
  var SIN_REVISAR = "Sin revisar";

  /* Fecha y hora de Colombia (America/Bogota), sin depender de la zona del celular */
  function ahoraBogota() {
    var p = {};
    try {
      new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date())
        .forEach(function (x) { p[x.type] = x.value; });
    } catch (e) {}
    if (!p.year) {
      var d = new Date(Date.now() - 5 * 3600 * 1000);
      function dos(n) { return (n < 10 ? "0" : "") + n; }
      p = { year: d.getUTCFullYear(), month: dos(d.getUTCMonth() + 1), day: dos(d.getUTCDate()), hour: dos(d.getUTCHours()), minute: dos(d.getUTCMinutes()) };
    }
    return { fecha: p.year + "-" + p.month + "-" + p.day, hora: p.hour + ":" + p.minute };
  }

  /* Texto de una celda de tabla Markdown: una sola línea y sin "|" que rompa la tabla */
  function celda(s) { return String(s == null ? "" : s).replace(/\s+/g, " ").replace(/\|/g, "\\|").trim(); }
  function fila(cols) { return "| " + cols.map(celda).join(" | ") + " |"; }

  /* Las pruebas y opciones (vienen en HTML) pasadas a texto de una línea */
  function textoPlano(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    return Array.prototype.map.call(d.querySelectorAll("b, p, li"), function (n) {
      return n.textContent.trim() + (n.tagName === "B" ? ":" : "");
    }).join(" · ").replace(/: ·/g, ":");
  }

  /* La pregunta tal como se ve en la página (Sí / No); si no está, la del listado */
  function preguntaAlerta(a) {
    var li = document.querySelector('.cl-alerta[data-id="' + a.id + '"] .cl-alerta-t');
    return li ? li.textContent.trim() : a.t;
  }

  function resumenMd() {
    var v = veredicto();
    var t = ahoraBogota();
    var nombre = E.nombre.trim();
    var L = [];
    var total = ALERTAS.length + todosItems.length;
    var hechos = Object.keys(E.alertas).length + todosItems.filter(function (it) { return E.items[it.id]; }).length;
    var cuenta = { ok: 0, inv: 0, no: 0 };
    todosItems.forEach(function (it) { if (E.items[it.id]) cuenta[E.items[it.id]]++; });
    var sinRevisar = todosItems.filter(function (it) { return !E.items[it.id]; });
    var alertasFaltan = ALERTAS.filter(function (a) { return !E.alertas[a.id]; });
    var minNo = v.filas.filter(function (f) { return f.est === "no"; });
    var minInv = v.filas.filter(function (f) { return f.est === "inv"; });
    var minFalta = v.filas.filter(function (f) { return f.est === "falta"; });
    var minOk = v.filas.filter(function (f) { return f.est === "ok"; });

    L.push("# Checklist del local · MONACO");
    L.push("");
    L.push("- **Local:** " + (nombre || "Sin nombre (no lo escribió)"));
    L.push("- **Generado:** " + t.fecha + " " + t.hora + " (hora de Colombia, UTC−5)");
    L.push("- **Manual:** " + URL_MANUAL);
    L.push("");

    // Veredicto
    L.push("## Veredicto");
    L.push("");
    var decision = v.tipo === "no" ? "NO se arrienda" : v.tipo === "ok" ? "SÍ se puede arrendar" :
      v.tipo === "inv" ? "Se puede arrendar SOLO si se arregla lo pendiente" : "Todavía no se sabe: faltan puntos por revisar";
    L.push("**" + v.titulo + "** · " + decision + ".");
    L.push("");
    L.push(v.texto);
    L.push("");
    L.push("Por qué:");
    L.push("");
    var porque = [];
    v.alertasSi.forEach(function (a) { porque.push("Señal de alerta en ROJO: " + preguntaAlerta(a) + " → Sí."); });
    minNo.forEach(function (f) { porque.push("Requisito mínimo que NO se cumple: " + f.t + "."); });
    minInv.forEach(function (f) { porque.push("Requisito mínimo que se cumple solo invirtiendo: " + f.t + "."); });
    if (alertasFaltan.length) porque.push("Señales de alerta sin responder: " + alertasFaltan.length + " de " + ALERTAS.length + ".");
    if (minFalta.length) porque.push("Requisitos mínimos sin revisar: " + minFalta.map(function (f) { return f.t; }).join(", ") + ".");
    if (!porque.length) porque.push("Ninguna señal de alerta en rojo y los " + MINIMOS.length + " requisitos mínimos en ✅.");
    porque.forEach(function (x) { L.push("- " + x); });
    L.push("");

    // Señales de alerta
    L.push("## Señales de alerta (Sí = ROJO, no se arrienda · No = VERDE, sigue)");
    L.push("");
    L.push(fila(["#", "Pregunta", "Respuesta", "Resultado"]));
    L.push("|---|---|---|---|");
    ALERTAS.forEach(function (a, i) {
      var r = E.alertas[a.id];
      L.push(fila([i + 1, preguntaAlerta(a), r === "si" ? "Sí" : r === "no" ? "No" : "Sin responder",
        r === "si" ? "🔴 ROJO · no se arrienda" : r === "no" ? "🟢 VERDE · sigue" : "—"]));
    });
    L.push("");

    // Avance
    L.push("## Avance");
    L.push("");
    L.push(fila(["Qué", "Cuántos"]));
    L.push("|---|---|");
    L.push(fila(["Puntos revisados (señales + checklist)", hechos + " de " + total]));
    L.push(fila(["Señales de alerta respondidas", (ALERTAS.length - alertasFaltan.length) + " de " + ALERTAS.length + " (" + v.alertasSi.length + " en rojo)"]));
    L.push(fila(["Puntos del checklist revisados", (todosItems.length - sinRevisar.length) + " de " + todosItems.length]));
    L.push(fila(["✅ Cumple", cuenta.ok]));
    L.push(fila(["⚠️ Toca invertir", cuenta.inv]));
    L.push(fila(["❌ No cumple", cuenta.no]));
    L.push(fila(["Sin revisar", sinRevisar.length]));
    L.push(fila(["Fotos y videos tomados", Object.keys(E.fotos).length + " de " + FOTOS.length]));
    L.push("");
    var cumpleMin = minOk.length === MINIMOS.length ? "Sí, se cumplen los " + MINIMOS.length :
      minNo.length ? "No: " + minNo.length + " no se cumple" + (minNo.length === 1 ? "" : "n") :
      minFalta.length ? "Todavía no se sabe: faltan " + minFalta.length + " por revisar" :
      "Solo si se invierte en " + minInv.length;
    L.push("### Requisitos mínimos para arrendar: " + cumpleMin + " (" + minOk.length + " de " + MINIMOS.length + " en ✅)");
    L.push("");
    L.push(fila(["Requisito", "Estado", "Puntos del checklist que lo definen"]));
    L.push("|---|---|---|");
    var EST_MIN = { ok: "✅ Cumple", inv: "⚠️ Toca invertir", no: "❌ No cumple", falta: SIN_REVISAR };
    MINIMOS.forEach(function (m, i) {
      L.push(fila([m.t, EST_MIN[v.filas[i].est], m.ids.map(function (id) {
        var it = item(id); return it.t + " (" + (ESTADO_MD[E.items[id]] || SIN_REVISAR) + ")";
      }).join("; ")]));
    });
    L.push("");

    // Cada sección
    L.push("## Checklist por secciones");
    L.push("");
    L.push("Tipo de punto: 🔴 Obligatorio · 🟡 Se arregla con plata · 🟢 Mejora el negocio.");
    L.push("");
    var TIPO = { r: "🔴 Obligatorio", a: "🟡 Se arregla con plata", v: "🟢 Mejora el negocio" };
    SECCIONES.forEach(function (s) {
      var its = s.items.filter(function (it) { return it.id; });
      var rev = its.filter(function (it) { return E.items[it.id]; }).length;
      L.push("### " + s.n + ". " + s.t + " (" + rev + " de " + its.length + " revisados)");
      L.push("");
      L.push(fila(["Punto", "Tipo", "Estado", "Qué se revisa"]));
      L.push("|---|---|---|---|");
      var grupo = "";
      s.items.forEach(function (it) {
        if (it.grupo) { grupo = it.grupo; return; }
        var que = it.d + (it.extra ? " " + textoPlano(it.extra) : "") + (it.nota ? " " + it.nota : "");
        L.push(fila([(grupo ? grupo + ": " : "") + it.t, TIPO[it.c], ESTADO_MD[E.items[it.id]] || SIN_REVISAR, que]));
      });
      L.push("");
    });

    // Fotos
    L.push("## Fotos y videos de la visita");
    L.push("");
    FOTOS.forEach(function (f) { L.push("- [" + (E.fotos[f.id] ? "x" : " ") + "] " + f.t + (E.fotos[f.id] ? " (tomado)" : " (falta)")); });
    L.push("");
    L.push("Las fotos y los videos no van dentro de este archivo: el asesorado los envía aparte.");
    L.push("");

    // Pendientes
    L.push("## Pendientes (sin revisar)");
    L.push("");
    if (!alertasFaltan.length && !sinRevisar.length) L.push("- Ninguno: se revisó todo.");
    alertasFaltan.forEach(function (a) { L.push("- Señal de alerta: " + preguntaAlerta(a)); });
    sinRevisar.forEach(function (it) { L.push("- " + it.sec.n + ". " + it.sec.t + " → " + it.t + " (" + TIPO[it.c] + ")"); });
    L.push("");

    L.push("---");
    L.push("");
    L.push("> Nota para la IA: Este resumen lo generó el Checklist del local de MONACO. Úsalo para evaluar si el local sirve para un lavadero de motos.");
    L.push("");
    return L.join("\n");
  }

  function nombreArchivo() {
    var slug = E.nombre.trim().toLowerCase();
    try { slug = slug.normalize("NFD").replace(/[̀-ͯ]/g, ""); } catch (e) {}
    slug = slug.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "sin-nombre";
    return "checklist-local-" + slug + "-" + ahoraBogota().fecha + ".md";
  }

  var TEXTO_WA = "Te envío el resumen del checklist del local (archivo .md adjunto)";

  function descargarMd(md, archivo) {
    var url = URL.createObjectURL(new Blob([md], { type: "text/markdown;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url; a.download = archivo; a.style.display = "none";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
  }

  function enviar() {
    var md = resumenMd();
    var archivo = nombreArchivo();
    var plan = function () {
      descargarMd(md, archivo);
      window.open("https://wa.me/?text=" + encodeURIComponent(TEXTO_WA), "_blank", "noopener");
    };
    var archivos = null;
    if (navigator.canShare && navigator.share && typeof File === "function") {
      // Primero como Markdown; algunos celulares solo aceptan texto plano (el archivo sigue siendo .md)
      ["text/markdown", "text/plain"].some(function (tipo) {
        try {
          var f = [new File([md], archivo, { type: tipo })];
          if (navigator.canShare({ files: f })) { archivos = f; return true; }
        } catch (e) {}
        return false;
      });
    }
    if (!archivos) { plan(); return; }
    navigator.share({ files: archivos, title: "Checklist del local", text: TEXTO_WA }).catch(function (err) {
      if (!err || err.name !== "AbortError") descargarMd(md, archivo);
    });
  }

  function copiar(texto, boton) {
    if (!boton.getAttribute("data-texto")) boton.setAttribute("data-texto", boton.textContent);
    var antes = boton.getAttribute("data-texto");
    boton.textContent = antes;
    function listo() {
      boton.textContent = "✔ Copiado";
      setTimeout(function () { boton.textContent = antes; }, 2000);
    }
    function aMano() {
      var t = $("cl-copia-manual");
      if (!t) {
        t = document.createElement("textarea");
        t.id = "cl-copia-manual";
        t.setAttribute("readonly", "");
        t.setAttribute("aria-label", "Resumen en Markdown: selecciónalo y cópialo");
        t.rows = 10;
        t.style.cssText = "width:100%;font:13px/1.4 ui-monospace,Menlo,monospace;padding:10px;border:1.5px solid var(--tinta);border-radius:var(--radio)";
        boton.parentNode.insertBefore(t, boton.nextSibling);
      }
      t.value = texto;
      t.focus(); t.select();
      try { t.setSelectionRange(0, texto.length); } catch (e) {}
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      if (ok) listo(); else boton.textContent = "Selecciona el texto y cópialo";
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(listo, aMano);
    } else aMano();
  }

  window.MonacoChecklist = { resumenMd: resumenMd, nombreArchivo: nombreArchivo };

  /* ---------- Barra de progreso fija debajo de "← Mapa" ---------- */
  function ajustarFija() {
    var barra = document.querySelector(".rm-barra");
    var alto = barra ? barra.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty("--cl-top", Math.round(alto) + "px");
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    pintarAlertas();
    pintarSecciones();
    pintarFotos();

    var nombre = $("cl-nombre");
    nombre.value = E.nombre;
    nombre.addEventListener("input", function () { E.nombre = nombre.value; guardar(); });

    $("cl-enviar").addEventListener("click", enviar);
    $("cl-copiar").addEventListener("click", function (e) { copiar(resumenMd(), e.currentTarget); });

    var confirma = $("cl-confirma");
    $("cl-reset").addEventListener("click", function () { confirma.hidden = false; $("cl-reset-si").focus(); });
    $("cl-reset-no").addEventListener("click", function () { confirma.hidden = true; });
    $("cl-reset-si").addEventListener("click", function () {
      E = vacio(); guardar();
      nombre.value = "";
      confirma.hidden = true;
      Array.prototype.forEach.call(document.querySelectorAll(".cl-sec"), function (d, i) { d.open = i === 0; });
      refrescar();
      window.scrollTo(0, 0);
    });

    refrescar();
    ajustarFija();
    window.addEventListener("resize", ajustarFija);
    window.addEventListener("load", ajustarFija);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
