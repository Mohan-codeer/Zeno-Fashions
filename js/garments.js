/* Generic garment illustrations (inline SVG, no external images needed).
   productVisual(p) returns an <img> if the product has an `image`,
   otherwise a flat-lay style illustration in the product's colour. */

(function () {
  const STROKE = 'stroke="rgba(0,0,0,.3)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
  const SHADE = "rgba(0,0,0,.14)";

  const shapes = {
    tee: (c, a) => `
      <path d="M62 38 L82 28 Q100 46 118 28 L138 38 L176 76 L156 98 L140 84 L140 206 L60 206 L60 84 L44 98 L24 76 Z" fill="${c}" ${STROKE}/>
      <path d="M82 28 Q100 46 118 28" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="3.5" stroke-linecap="round"/>
      ${a ? `<circle cx="100" cy="112" r="20" fill="${a}" opacity=".92"/><path d="M90 112 H110 M100 102 V122" stroke="${c}" stroke-width="3" stroke-linecap="round"/>` : ""}`,

    hoodie: (c, a) => `
      <path d="M60 48 L84 38 L116 38 L140 48 L180 172 L158 182 L140 112 L140 206 L60 206 L60 112 L42 182 L20 172 Z" fill="${c}" ${STROKE}/>
      <path d="M80 38 Q100 2 120 38 Q100 66 80 38 Z" fill="${c}" ${STROKE}/>
      <path d="M87 38 Q100 15 113 38 Q100 56 87 38 Z" fill="rgba(0,0,0,.4)"/>
      <path d="M94 56 V92 M106 56 V92" stroke="${a || "#eee"}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M70 148 H130 L136 184 H64 Z" fill="${SHADE}" ${STROKE}/>`,

    bomber: (c, a) => `
      <path d="M60 48 L84 38 L116 38 L140 48 L180 172 L158 182 L140 112 L140 206 L60 206 L60 112 L42 182 L20 172 Z" fill="${c}" ${STROKE}/>
      <rect x="76" y="28" width="48" height="16" rx="7" fill="${a}" ${STROKE}/>
      <rect x="58" y="196" width="84" height="14" rx="3" fill="${a}" ${STROKE}/>
      <path d="M20 172 L42 182 L38 194 L15 184 Z M180 172 L158 182 L162 194 L185 184 Z" fill="${a}" ${STROKE}/>
      <path d="M100 44 V198" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
      <circle cx="120" cy="92" r="9" fill="${a}" opacity=".9"/>`,

    puffer: (c, a) => `
      <path d="M60 48 L84 38 L116 38 L140 48 L180 172 L158 182 L140 112 L140 206 L60 206 L60 112 L42 182 L20 172 Z" fill="${c}" ${STROKE}/>
      <rect x="76" y="26" width="48" height="18" rx="9" fill="${c}" ${STROKE}/>
      <path d="M60 78 Q100 88 140 78 M60 108 Q100 118 140 108 M60 138 Q100 148 140 138 M60 168 Q100 178 140 168" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
      <path d="M100 44 V206" stroke="${a}" stroke-width="2.5"/>`,

    pants: (c) => `
      <path d="M64 22 H136 L148 218 H108 L100 90 L92 218 H52 Z" fill="${c}" ${STROKE}/>
      <rect x="64" y="22" width="72" height="12" fill="${SHADE}" ${STROKE}/>
      <path d="M100 34 V90" stroke="rgba(0,0,0,.35)" stroke-width="1.8"/>
      <path d="M70 40 Q82 52 84 62 M130 40 Q118 52 116 62" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.6"/>`,

    cargo: (c, a) => `
      <path d="M64 22 H136 L150 218 H108 L100 90 L92 218 H50 Z" fill="${c}" ${STROKE}/>
      <rect x="64" y="22" width="72" height="12" fill="${SHADE}" ${STROKE}/>
      <path d="M100 34 V90" stroke="rgba(0,0,0,.35)" stroke-width="1.8"/>
      <rect x="57" y="116" width="26" height="34" rx="3" fill="${SHADE}" ${STROKE}/>
      <rect x="117" y="116" width="26" height="34" rx="3" fill="${SHADE}" ${STROKE}/>
      <path d="M57 126 H83 M117 126 H143" stroke="rgba(0,0,0,.3)"/>
      <path d="M64 22 V34 M136 22 V34" stroke="${a}" stroke-width="3"/>`,

    shirt: (c) => `
      <path d="M62 38 L84 28 L116 28 L138 38 L178 150 L158 160 L140 100 L140 208 L60 208 L60 100 L42 160 L22 150 Z" fill="${c}" ${STROKE}/>
      <path d="M84 28 L100 54 L116 28 L108 22 L100 34 L92 22 Z" fill="rgba(255,255,255,.55)" ${STROKE}/>
      <path d="M100 54 V208" stroke="rgba(0,0,0,.3)" stroke-width="1.6"/>
      ${[74, 100, 126, 152, 178].map((y) => `<circle cx="100" cy="${y}" r="2.2" fill="rgba(0,0,0,.4)"/>`).join("")}
      <rect x="110" y="86" width="20" height="22" rx="2" fill="none" stroke="rgba(0,0,0,.25)"/>`,

    suit: (c, a, bow) => `
      <path d="M56 40 L82 28 L118 28 L144 40 L182 188 L156 194 L142 104 L142 212 L58 212 L58 104 L44 194 L18 188 Z" fill="${c}" ${STROKE}/>
      <path d="M82 28 L100 112 L118 28 Z" fill="#f4f1ea"/>
      ${bow
        ? `<path d="M88 42 L100 50 L112 42 V58 L100 50 L88 58 Z" fill="#111"/>`
        : `<path d="M96 40 L104 40 L102 52 L107 92 L100 104 L93 92 L98 52 Z" fill="${a}"/>`}
      <path d="M82 28 L100 114 L72 124 L68 66 Z" fill="${c}" ${STROKE}/>
      <path d="M118 28 L100 114 L128 124 L132 66 Z" fill="${c}" ${STROKE}/>
      ${bow ? `<path d="M82 28 L100 114 L72 124 L68 66 Z M118 28 L100 114 L128 124 L132 66 Z" fill="${a}" opacity=".55"/>` : ""}
      <circle cx="100" cy="146" r="2.6" fill="rgba(255,255,255,.35)"/>
      <circle cx="100" cy="170" r="2.6" fill="rgba(255,255,255,.35)"/>
      <path d="M68 150 H88" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
      <path d="M60 104 V212 M140 104 V212" stroke="rgba(0,0,0,.18)"/>`,

    tie: (c) => `
      <path d="M88 26 H112 L107 56 L122 198 L100 224 L78 198 L93 56 Z" fill="${c}" ${STROKE}/>
      <path d="M88 26 H112 L107 56 H93 Z" fill="rgba(0,0,0,.28)"/>
      <path d="M96 80 L110 74 M95 110 L112 102 M94 140 L114 130 M93 170 L116 158" stroke="rgba(255,255,255,.28)" stroke-width="3" stroke-linecap="round"/>`,

    coat: (c, a) => `
      <path d="M56 34 L82 24 L118 24 L144 34 L180 196 L156 204 L144 110 L146 234 L54 234 L56 110 L44 204 L20 196 Z" fill="${c}" ${STROKE}/>
      <path d="M82 24 L100 74 L118 24 L132 38 L100 124 L68 38 Z" fill="rgba(0,0,0,.18)" ${STROKE}/>
      ${a ? `<rect x="54" y="118" width="92" height="11" rx="2" fill="${a}" ${STROKE}/><rect x="94" y="115" width="12" height="17" rx="2" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1.6"/>` : ""}
      ${[[92, 146], [108, 146], [92, 176], [108, 176]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="rgba(0,0,0,.45)"/>`).join("")}
      <path d="M100 124 V234" stroke="rgba(0,0,0,.3)"/>`,

    dress: (c, a) => `
      <path d="M78 18 L86 18 L92 46 Q100 56 108 46 L114 18 L122 18 L128 64 L158 224 L42 224 L72 64 Z" fill="${c}" ${STROKE}/>
      <path d="M72 76 Q100 90 128 76" fill="none" stroke="${a}" stroke-width="5" stroke-linecap="round"/>
      <path d="M90 100 L80 224 M110 100 L120 224" stroke="rgba(255,255,255,.16)" stroke-width="6" stroke-linecap="round"/>`,

    sneaker: (c, a) => sneaker(c, a, false),
    chunky: (c, a) => sneaker(c, a, true),

    oxford: (c) => `
      <path d="M20 168 Q18 138 44 134 L78 132 Q100 150 140 150 Q184 152 190 172 L20 178 Z" fill="${c}" ${STROKE}/>
      <rect x="16" y="172" width="176" height="14" rx="6" fill="#241810" ${STROKE}/>
      <rect x="20" y="184" width="40" height="8" rx="3" fill="#241810"/>
      <path d="M76 134 L88 144 M84 132 L98 144 M92 133 L106 146 M100 136 L114 148" stroke="rgba(0,0,0,.5)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M150 152 Q148 166 154 174" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
      <path d="M36 150 Q60 142 76 146" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="4" stroke-linecap="round"/>`,

    cap: (c, a) => `
      <path d="M44 142 Q44 70 100 70 Q156 70 156 142 Z" fill="${c}" ${STROKE}/>
      <path d="M100 72 V142 M70 80 Q80 112 78 142 M130 80 Q120 112 122 142" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.6"/>
      <path d="M44 142 H156 Q198 142 192 158 Q150 170 92 154 Q62 150 44 142 Z" fill="${c}" ${STROKE}/>
      <circle cx="100" cy="70" r="5" fill="${a}"/>
      <circle cx="100" cy="112" r="8" fill="${a}" opacity=".9"/>`,

    bag: (c, a) => `
      <path d="M48 92 Q26 132 48 184 M152 92 Q174 132 152 184" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="9" stroke-linecap="round"/>
      <rect x="46" y="58" width="108" height="152" rx="28" fill="${c}" ${STROKE}/>
      <path d="M84 58 Q84 36 100 36 Q116 36 116 58" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/>
      <path d="M46 98 H154" stroke="rgba(0,0,0,.3)" stroke-width="1.6"/>
      <rect x="62" y="130" width="76" height="58" rx="14" fill="${SHADE}" ${STROKE}/>
      <path d="M62 140 H138" stroke="${a}" stroke-width="3" stroke-dasharray="5 4"/>`,

    tote: (c, a) => `
      <path d="M72 96 Q72 40 100 40 Q128 40 128 96" fill="none" stroke="${a}" stroke-width="8" stroke-linecap="round"/>
      <path d="M42 94 H158 L148 214 H52 Z" fill="${c}" ${STROKE}/>
      <path d="M42 94 H158 L157 108 H43 Z" fill="${SHADE}"/>
      <circle cx="100" cy="150" r="12" fill="none" stroke="${a}" stroke-width="3"/>`,
  };

  function sneaker(c, a, chunky) {
    const soleY = chunky ? 164 : 172;
    const soleH = chunky ? 28 : 18;
    return `
      <path d="M18 ${soleY} Q16 118 46 112 L76 110 Q90 136 126 138 Q176 140 186 ${soleY - 4} L186 ${soleY + 6} L18 ${soleY + 6} Z" fill="${c}" ${STROKE}/>
      <path d="M140 139 Q178 142 186 ${soleY - 6} L150 ${soleY - 4} Z" fill="rgba(255,255,255,.28)"/>
      <path d="M58 150 Q92 128 124 150" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/>
      <rect x="14" y="${soleY}" width="176" height="${soleH}" rx="${soleH / 2}" fill="#f6f3ec" ${STROKE}/>
      ${chunky ? `<path d="M30 ${soleY + 18} H176" stroke="${a}" stroke-width="3" stroke-linecap="round"/>` : ""}
      <path d="M78 116 L94 126 M86 112 L102 122 M94 112 L110 124" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <path d="M40 124 Q54 116 72 118" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3" stroke-linecap="round"/>`;
  }

  function garmentSVG(p) {
    const draw = shapes[p.type] || shapes.tee;
    const inner = p.type === "tux" ? shapes.suit(p.color, p.accent, true) : draw(p.color, p.accent);
    return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.name}" focusable="false">
      <ellipse cx="100" cy="228" rx="64" ry="6" fill="rgba(0,0,0,.12)"/>
      ${inner}
    </svg>`;
  }

  window.productVisual = function (p) {
    return p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />`
      : garmentSVG(p);
  };
})();
