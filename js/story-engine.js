/*  StoryEngine v2 — Three.js painted background + GSAP ScrollTrigger + Lenis
 *  Shared module for thedesigns.org storytelling pages.
 *  CDN deps: three.js >= 0.160, gsap + ScrollTrigger >= 3.12, lenis >= 1.1
 */
(function () {
  'use strict';

  var lenis, renderer, scene, camera, material;
  var mouseX = 0.5, mouseY = 0.5;
  var targetMX = 0.5, targetMY = 0.5;
  var isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

  /* ── GLSL ──────────────────────────────────────────────── */

  var VS = [
    'varying vec2 vUv;',
    'void main(){vUv=uv;gl_Position=vec4(position,1.0);}'
  ].join('\n');

  var FS = [
    'precision highp float;',
    'uniform float uTime;',
    'uniform vec2  uMouse;',
    'uniform vec2  uRes;',
    'uniform vec3  uCA;',
    'uniform vec3  uCB;',
    'uniform vec3  uCC;',
    'varying vec2  vUv;',

    'vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}',
    'float snoise(vec2 v){',
    '  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);',
    '  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);',
    '  vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);',
    '  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);',
    '  vec3 p=permute(permute(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));',
    '  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);',
    '  m=m*m;m=m*m;',
    '  vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-.5;',
    '  vec3 ox=floor(x+.5);vec3 a0=x-ox;',
    '  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);',
    '  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;',
    '  return 130.0*dot(m,g);',
    '}',

    'float fbm(vec2 p){float v=0.0,a=.5;for(int i=0;i<5;i++){v+=a*snoise(p);p*=2.0;a*=.5;}return v;}',

    'void main(){',
    '  vec2 uv=vUv;',
    '  vec2 asp=vec2(uRes.x/uRes.y,1.0);',

    '  float md=length((uv-uMouse)*asp);',
    '  float mi=smoothstep(.6,0.0,md)*.18;',

    '  float t=uTime*.05;',

    '  vec2 q=vec2(fbm(uv*2.4+vec2(t*.35,t*.25)),fbm(uv*2.4+vec2(5.2,1.3)+t*.18));',
    '  vec2 r=vec2(fbm(uv*2.4+4.0*q+vec2(1.7,9.2)+(uv-uMouse)*mi*8.0),',
    '             fbm(uv*2.4+4.0*q+vec2(8.3,2.8)+(uv-uMouse)*mi*8.0));',
    '  float f=fbm(uv*2.4+4.0*r);',

    '  float b1=smoothstep(-.6,.6,f);',
    '  float b2=smoothstep(-.4,.4,q.x);',
    '  vec3 col=mix(uCA,uCB,b1);',
    '  col=mix(col,uCC,b2*.6);',

    '  col+=mi*1.2*uCB;',

    '  col*=1.0-smoothstep(.5,1.6,length((uv-.5)*1.5))*.45+.55;',

    '  col+=fract(sin(dot(uv*uTime,vec2(12.9898,78.233)))*43758.5453)*.03-.015;',

    '  col*=.45;',

    '  gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  /* ── LENIS ─────────────────────────────────────────────── */

  function initLenis(cfg) {
    if (!cfg || cfg.smoothScroll === false) return;
    if (typeof Lenis === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ── THREE.JS BACKGROUND ───────────────────────────────── */

  function initBackground(cfg) {
    if (isMobile && cfg.disableOnMobile !== false) return;
    if (typeof THREE === 'undefined') return;

    var canvas = document.createElement('canvas');
    canvas.id = 'story-bg';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:-10;width:100%;height:100%;pointer-events:none';
    document.body.prepend(canvas);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    var c = cfg.colors || { a: '#1a0a3e', b: '#0a2a4e', c: '#2a0a2e' };
    material = new THREE.ShaderMaterial({
      vertexShader: VS,
      fragmentShader: FS,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uCA: { value: new THREE.Color(c.a) },
        uCB: { value: new THREE.Color(c.b) },
        uCC: { value: new THREE.Color(c.c) }
      }
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    document.addEventListener('mousemove', function (e) {
      targetMX = e.clientX / window.innerWidth;
      targetMY = 1.0 - e.clientY / window.innerHeight;
    }, { passive: true });

    window.addEventListener('resize', function () {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    });

    (function loop(t) {
      requestAnimationFrame(loop);
      material.uniforms.uTime.value = t * 0.001;
      mouseX += (targetMX - mouseX) * 0.05;
      mouseY += (targetMY - mouseY) * 0.05;
      material.uniforms.uMouse.value.set(mouseX, mouseY);
      renderer.render(scene, camera);
    })(0);
  }

  /* ── CHAPTER COLOR TRANSITIONS ─────────────────────────── */

  function initChapters(chapters) {
    if (!material || !chapters) return;
    chapters.forEach(function (ch) {
      if (!ch.trigger) return;
      var cA = new THREE.Color(ch.a);
      var cB = new THREE.Color(ch.b);
      var cC = new THREE.Color(ch.c);
      function morph() {
        gsap.to(material.uniforms.uCA.value, { r: cA.r, g: cA.g, b: cA.b, duration: 1.6, ease: 'power2.inOut' });
        gsap.to(material.uniforms.uCB.value, { r: cB.r, g: cB.g, b: cB.b, duration: 1.6, ease: 'power2.inOut' });
        gsap.to(material.uniforms.uCC.value, { r: cC.r, g: cC.g, b: cC.b, duration: 1.6, ease: 'power2.inOut' });
      }
      ScrollTrigger.create({ trigger: ch.trigger, start: 'top 70%', end: 'bottom 30%', onEnter: morph, onEnterBack: morph });
    });
  }

  /* ── CINEMATIC REVEALS ─────────────────────────────────── */

  function initReveals() {
    /* bare data-reveal (no value) — generic fade up */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      var type = el.getAttribute('data-reveal');
      if (type && type !== '') return;
      gsap.fromTo(el, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    /* title – dramatic slide up with scale */
    gsap.utils.toArray('[data-reveal="title"]').forEach(function (el) {
      gsap.fromTo(el, { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    /* fade up */
    gsap.utils.toArray('[data-reveal="fade"]').forEach(function (el) {
      gsap.fromTo(el, { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    /* stagger children */
    gsap.utils.toArray('[data-reveal="stagger"]').forEach(function (el) {
      gsap.fromTo(el.children, { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    /* scale in – images / hero panels */
    gsap.utils.toArray('[data-reveal="scale"]').forEach(function (el) {
      gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    /* wipe from left – cinematic image reveal */
    gsap.utils.toArray('[data-reveal="wipe"]').forEach(function (el) {
      gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });

    /* slide from left */
    gsap.utils.toArray('[data-reveal="left"]').forEach(function (el) {
      gsap.fromTo(el, { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    /* slide from right */
    gsap.utils.toArray('[data-reveal="right"]').forEach(function (el) {
      gsap.fromTo(el, { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    /* parallax */
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax) || 0.2;
      gsap.to(el, {
        y: function () { return -150 * speed; }, ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* horizontal parallax */
    gsap.utils.toArray('[data-parallax-x]').forEach(function (el) {
      var speed = parseFloat(el.dataset.parallaxX) || 0.1;
      gsap.to(el, {
        x: function () { return -100 * speed; }, ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ── PUBLIC API ─────────────────────────────────────────── */

  window.StoryEngine = {
    init: function (cfg) {
      cfg = cfg || {};
      gsap.registerPlugin(ScrollTrigger);
      initLenis();
      initBackground(cfg);
      if (cfg.chapters) initChapters(cfg.chapters);
      initReveals();
    },
    material: function () { return material; },
    lenis: function () { return lenis; }
  };

})();
