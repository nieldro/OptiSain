/*
  Agujero negro de Schwarzschild trazado por rayos en un fragment shader.

  Cada pixel lanza un rayo de luz desde la camara y lo curva con la aproximacion
  clasica de la gravedad (aceleracion -1.5 * h^2 * r / r^5, con radio de Schwarzschild = 1):
  de ahi salen solos la sombra, el anillo de fotones, el disco "doblado" por encima y
  por debajo del horizonte, y las estrellas deformadas. Sobre eso: disco de acrecion
  con rotacion diferencial (Kepler), efecto Doppler (el lado que se acerca brilla mas)
  y la paleta de marca (ambar -> blanco calido).

  Si WebGL no esta disponible devuelve null y el sitio se queda con el respaldo en CSS.
*/

export interface BHLayout {
  dist: number; // distancia de la camara (radios de Schwarzschild)
  elev: number; // elevacion de la camara sobre el plano del disco (rad)
  roll: number; // giro de la imagen (rad)
  offX: number; // desplazamiento del centro, en alturas de pantalla
  offY: number;
}

export interface BHConfig {
  layout: (aspect: number) => BHLayout;
  disk?: number; // intensidad del disco
  spin?: number; // velocidad de rotacion del disco
  interactive?: boolean; // la camara reacciona al puntero
  onReady?: () => void;
}

export interface BHController {
  setProgress: (p: number) => void;
  destroy: () => void;
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uDist;
uniform float uElev;
uniform float uAzim;
uniform float uRoll;
uniform vec2  uOff;
uniform float uDisk;
uniform float uSpin;
uniform float uProg;

#define STEPS 260
#define RIN  2.35
#define ROUT 9.0

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float hash31(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return s;
}

// Paleta de marca: ember -> ambar #FFB547 -> blanco calido
vec3 ramp(float t) {
  vec3 c0 = vec3(0.16, 0.055, 0.02);
  vec3 c1 = vec3(1.00, 0.71, 0.28);
  vec3 c2 = vec3(1.00, 0.95, 0.86);
  vec3 c3 = vec3(0.83, 0.87, 0.95);
  t = clamp(t, 0.0, 1.6);
  if (t < 0.55) return mix(c0, c1, t / 0.55);
  if (t < 1.05) return mix(c1, c2, (t - 0.55) / 0.5);
  return mix(c2, c3, (t - 1.05) / 0.55);
}

vec3 stars(vec3 d) {
  vec3 col = vec3(0.0);
  for (int L = 0; L < 2; L++) {
    float scale = 55.0 + 70.0 * float(L);
    vec3 q = d * scale;
    vec3 id = floor(q);
    vec3 f = fract(q) - 0.5;
    float h = hash31(id + float(L) * 7.0);
    vec3 o = vec3(hash31(id + 1.7), hash31(id + 3.1), hash31(id + 5.3)) - 0.5;
    float dist = length(f - o * 0.55);
    float present = step(0.94, h);
    float size = 0.07 + 0.1 * hash31(id + 9.0);
    float s = present * smoothstep(size, 0.0, dist);
    vec3 tint = mix(vec3(0.78, 0.86, 1.0), vec3(1.0, 0.84, 0.58), hash31(id + 2.2));
    float tw = 0.8 + 0.2 * sin(uTime * 2.0 + h * 60.0);
    col += s * tint * (0.5 + 1.1 * hash31(id + 4.4)) * tw;
  }
  // nebulosa tenue en gunmetal
  float n = fbm(d.xy * 2.3 + d.z * 1.7);
  col += vec3(0.07, 0.11, 0.17) * pow(n, 2.6) * 0.9;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y - uOff;
  float cr = cos(uRoll), sr = sin(uRoll);
  uv = mat2(cr, -sr, sr, cr) * uv;

  // camara: orbita a distancia uDist, mirando al origen
  float ce = cos(uElev), se = sin(uElev);
  vec3 ro = vec3(sin(uAzim) * ce, se, cos(uAzim) * ce) * uDist;
  vec3 fwd = normalize(-ro);
  vec3 rgt = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(rgt, fwd);
  vec3 rd = normalize(fwd + (uv.x * rgt + uv.y * up) * 0.74);

  vec3 p = ro;
  vec3 v = rd;
  vec3 hv = cross(p, v);
  float h2 = dot(hv, hv);

  vec3 acc = vec3(0.0);
  float trans = 1.0;
  float minr = 1e9;
  bool hole = false;
  bool escaped = false;

  for (int i = 0; i < STEPS; i++) {
    float r2 = dot(p, p);
    float r = sqrt(r2);
    minr = min(minr, r);
    if (r < 1.0) { hole = true; break; }
    if (r > 30.0 && dot(p, v) > 0.0) { escaped = true; break; }

    float dt = min(0.035 * (r - 0.6) + 0.012, 0.9);
    v += (-1.5 * h2 * p / (r2 * r2 * r)) * dt;
    vec3 pn = p + v * dt;

    // cruce del plano del disco (y = 0)
    if (p.y * pn.y < 0.0) {
      vec3 q = mix(p, pn, p.y / (p.y - pn.y));
      float rr = length(q.xz);
      if (rr > RIN && rr < ROUT) {
        float om = uSpin * pow(rr, -1.5) * 2.6;
        float ca = cos(om * uTime), sa = sin(om * uTime);
        vec2 rq = mat2(ca, -sa, sa, ca) * q.xz;

        float cloud = fbm(rq * 1.35);
        float fine = fbm(rq * 3.4 + 4.0);
        float rings = noise(vec2(rr * 5.5, 3.0));
        float edgeIn = smoothstep(RIN, RIN + 0.55, rr);
        float edgeOut = 1.0 - smoothstep(ROUT - 3.2, ROUT, rr);
        float prof = pow(RIN / rr, 1.9) * edgeIn * edgeOut;
        float dens = prof * (0.35 + 1.05 * cloud) * (0.62 + 0.55 * rings) * (0.75 + 0.5 * fine);

        // Doppler: el material que se acerca se ve mas brillante y mas caliente
        vec3 vd = normalize(vec3(-q.z, 0.0, q.x));
        float beta = min(sqrt(0.5 / rr) * 1.25, 0.62);
        float cosT = dot(vd, -normalize(v));
        float g = sqrt(1.0 - beta * beta) / (1.0 - beta * cosT);
        float I = dens * g * g * g;
        float temp = clamp(pow(RIN / rr, 0.75) * 0.95 * g, 0.0, 1.6);

        acc += trans * ramp(temp) * I * uDisk * 1.7;
        trans *= 1.0 - clamp(dens * 0.85, 0.0, 0.93);
      }
    }
    p = pn;
  }

  // un rayo que no llega a escapar esta atrapado orbitando el horizonte: cuenta como sombra
  if (!escaped && minr < 1.62) hole = true;
  float lit = hole ? 0.0 : smoothstep(1.3, 1.9, minr);

  vec3 base = vec3(0.086, 0.082, 0.086);
  vec3 bg = mix(vec3(0.012), base + stars(normalize(v)), lit);
  vec3 col = bg * trans + acc;

  // aura calida alrededor del agujero (bloom barato en pantalla)
  col += vec3(1.0, 0.62, 0.25) * 0.11 * exp(-length(uv) * 4.2) * uDisk * lit;

  // halo del anillo de fotones: luz que casi orbita el horizonte
  if (!hole) {
    float ring = exp(-9.0 * max(minr - 1.5, 0.0));
    col += vec3(1.0, 0.72, 0.32) * ring * 0.55 * (0.75 + 0.5 * uProg) * uDisk;
  }

  // tonemap suave para que el disco no queme
  col = 1.0 - exp(-col * 1.35);
  col = pow(col, vec3(0.96));
  gl_FragColor = vec4(col, 1.0);
}
`;

// Segundo paso: suaviza bordes (FXAA) para que la sombra y el disco no salgan escalonados.
const FRAG_POST = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;

void main() {
  vec2 inv = 1.0 / uRes;
  vec2 uv = gl_FragCoord.xy * inv;
  vec3 nw = texture2D(uTex, uv + vec2(-1.0, -1.0) * inv).rgb;
  vec3 ne = texture2D(uTex, uv + vec2( 1.0, -1.0) * inv).rgb;
  vec3 sw = texture2D(uTex, uv + vec2(-1.0,  1.0) * inv).rgb;
  vec3 se = texture2D(uTex, uv + vec2( 1.0,  1.0) * inv).rgb;
  vec3 m  = texture2D(uTex, uv).rgb;
  vec3 L = vec3(0.299, 0.587, 0.114);
  float lNW = dot(nw, L), lNE = dot(ne, L), lSW = dot(sw, L), lSE = dot(se, L), lM = dot(m, L);
  float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE)));
  float lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), (lNW + lSW) - (lNE + lSE));
  float reduce = max((lNW + lNE + lSW + lSE) * 0.03125, 0.0078125);
  float rcp = 1.0 / (min(abs(dir.x), abs(dir.y)) + reduce);
  dir = clamp(dir * rcp, vec2(-8.0), vec2(8.0)) * inv;
  vec3 a = 0.5 * (texture2D(uTex, uv + dir * (1.0 / 3.0 - 0.5)).rgb +
                  texture2D(uTex, uv + dir * (2.0 / 3.0 - 0.5)).rgb);
  vec3 b = a * 0.5 + 0.25 * (texture2D(uTex, uv + dir * -0.5).rgb +
                             texture2D(uTex, uv + dir * 0.5).rgb);
  float lB = dot(b, L);
  gl_FragColor = vec4((lB < lMin || lB > lMax) ? a : b, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[blackhole] shader:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function initBlackHole(canvas: HTMLCanvasElement, cfg: BHConfig): BHController | null {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  }) as WebGLRenderingContext | null;
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const fsPost = compile(gl, gl.FRAGMENT_SHADER, FRAG_POST);
  if (!vs || !fs || !fsPost) return null;

  const link = (frag: WebGLShader) => {
    const pr = gl.createProgram();
    if (!pr) return null;
    gl.attachShader(pr, vs);
    gl.attachShader(pr, frag);
    gl.bindAttribLocation(pr, 0, 'aPos');
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      console.warn('[blackhole] link:', gl.getProgramInfoLog(pr));
      return null;
    }
    return pr;
  };
  const prog = link(fs);
  const post = link(fsPost);
  if (!prog || !post) return null;

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // El 1.er paso se dibuja en una textura; el 2.º la pasa al canvas ya suavizada.
  const tex = gl.createTexture();
  const fbo = gl.createFramebuffer();
  if (!tex || !fbo) return null;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const postRes = gl.getUniformLocation(post, 'uRes');
  const postTex = gl.getUniformLocation(post, 'uTex');

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const U = {
    res: u('uRes'),
    time: u('uTime'),
    dist: u('uDist'),
    elev: u('uElev'),
    azim: u('uAzim'),
    roll: u('uRoll'),
    off: u('uOff'),
    disk: u('uDisk'),
    spin: u('uSpin'),
    prog: u('uProg'),
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  // Resolucion nativa de la pantalla (sin submuestrear), con tope de pixeles; en el movil un poco menos.
  const maxScale = Math.min(window.devicePixelRatio || 1, 2) * (coarse ? 0.8 : 1);
  const minScale = 0.55;
  const MAX_PIXELS = 2_600_000;
  let scale = maxScale;

  const state = { progress: 0, targetProgress: 0, px: 0, py: 0, tpx: 0, tpy: 0 };
  let visible = true;
  let raf = 0;
  let last = performance.now();
  let ema = 16;
  let frames = 0;
  let readyFired = false;
  const t0 = performance.now();

  function resize() {
    let s = scale;
    const px = canvas.clientWidth * canvas.clientHeight * s * s;
    if (px > MAX_PIXELS) s *= Math.sqrt(MAX_PIXELS / px);
    const w = Math.max(2, Math.floor(canvas.clientWidth * s));
    const h = Math.max(2, Math.floor(canvas.clientHeight * s));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, w, h, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
    gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
    gl!.viewport(0, 0, w, h);
  }

  function draw(timeSec: number) {
    const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    const L = cfg.layout(aspect);
    const p = state.progress;
    const dist = L.dist * (1 - 0.34 * p);
    const elev = L.elev + 0.2 * p + state.py * 0.05;
    const azim = state.px * 0.16;
    const offX = L.offX * (1 - 0.35 * p);

    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.useProgram(prog);
    gl!.uniform2f(U.res, canvas.width, canvas.height);
    gl!.uniform1f(U.time, timeSec);
    gl!.uniform1f(U.dist, dist);
    gl!.uniform1f(U.elev, elev);
    gl!.uniform1f(U.azim, azim);
    gl!.uniform1f(U.roll, L.roll);
    gl!.uniform2f(U.off, offX, L.offY);
    gl!.uniform1f(U.disk, cfg.disk ?? 1);
    gl!.uniform1f(U.spin, cfg.spin ?? 1);
    gl!.uniform1f(U.prog, p);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

    // 2.º paso: textura -> canvas con suavizado de bordes
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.useProgram(post);
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.uniform1i(postTex, 0);
    gl!.uniform2f(postRes, canvas.width, canvas.height);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

    if (!readyFired) {
      readyFired = true;
      canvas.dataset.ready = '1';
      cfg.onReady?.();
    }
  }

  function frame(now: number) {
    raf = 0;
    if (!visible || document.hidden) return;

    const dtf = now - last;
    last = now;
    if (dtf < 200) {
      ema = ema * 0.9 + dtf * 0.1;
      frames++;
      if (frames % 30 === 0) {
        if (ema > 27 && scale > minScale) {
          scale = Math.max(minScale, scale * 0.82);
          resize();
        } else if (ema < 14 && scale < maxScale) {
          scale = Math.min(maxScale, scale * 1.1);
          resize();
        }
      }
    }

    state.progress += (state.targetProgress - state.progress) * 0.08;
    state.px += (state.tpx - state.px) * 0.05;
    state.py += (state.tpy - state.py) * 0.05;

    draw((now - t0) / 1000 + 2.0);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduceMotion || raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(() => {
    resize();
    if (reduceMotion) draw(3.0);
  });
  ro.observe(canvas);

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) start();
    },
    { rootMargin: '120px' }
  );
  io.observe(canvas);

  const onVis = () => {
    if (!document.hidden) start();
  };
  document.addEventListener('visibilitychange', onVis);

  const onMove = (e: PointerEvent) => {
    state.tpx = (e.clientX / window.innerWidth) * 2 - 1;
    state.tpy = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (cfg.interactive && !coarse && !reduceMotion) {
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  resize();
  if (reduceMotion) {
    draw(3.0);
  } else {
    start();
  }

  return {
    setProgress(p: number) {
      state.targetProgress = Math.min(1, Math.max(0, p));
      if (reduceMotion) {
        state.progress = state.targetProgress;
        draw(3.0);
      }
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
    },
  };
}
