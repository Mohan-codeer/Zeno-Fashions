/* Zeno Fasions — UI logic: rendering, filters, cart drawer, checkout, theme. */

(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const money = (n) => "£" + n.toFixed(2);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const state = { cat: "All", q: "", sort: "featured" };

  /* ---------------- Theme ---------------- */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");

  function applyTheme(t, persist) {
    root.setAttribute("data-theme", t);
    themeBtn.setAttribute("aria-pressed", String(t === "dark"));
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    $('meta[name="theme-color"]').setAttribute("content", t === "dark" ? "#0e0e0f" : "#f6f3ee");
    if (persist) { try { localStorage.setItem("zf-theme", t); } catch (e) {} }
  }
  themeBtn.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("zf-theme"); } catch (err) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light", false);
  });
  applyTheme(root.getAttribute("data-theme") || "light", false);

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------------- Navigation / chips / tiles ---------------- */
  function setCategory(cat, scroll) {
    state.cat = cat;
    renderChips();
    renderNav();
    renderGrid();
    if (scroll) $("#shop").scrollIntoView({ behavior: "smooth" });
  }

  function renderNav() {
    $("#mainNav").innerHTML = CATEGORIES.map(
      (c) => `<button type="button" data-cat="${esc(c)}" class="${state.cat === c ? "active" : ""}">${esc(c)}</button>`
    ).join("");
  }

  function renderChips() {
    $("#chips").innerHTML = ["All", ...CATEGORIES]
      .map((c) => `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${state.cat === c}">${esc(c)}</button>`)
      .join("");
  }

  function renderTiles() {
    $("#tiles").innerHTML = CATEGORIES.map((c) => {
      const list = PRODUCTS.filter((p) => p.category === c);
      const hero = list[0];
      return `<button type="button" class="tile" data-cat="${esc(c)}" aria-label="Shop ${esc(c)}">
        <div class="tile-art" style="background:${hero.bg}">${productVisual(hero)}</div>
        <h3>${esc(c)}</h3><span>${list.length} styles</span>
      </button>`;
    }).join("");
  }

  function renderFooterLinks() {
    $("#footerLinks").innerHTML = CATEGORIES.map((c) => `<li><button type="button" data-cat="${esc(c)}">${esc(c)}</button></li>`).join("");
  }

  function renderHeroArt() {
    const pick = (id) => PRODUCTS.find((p) => p.id === id);
    $("#heroArt").innerHTML = `
      <div class="disc"></div>
      <div class="piece p1">${productVisual(pick(2))}</div>
      <div class="piece p2">${productVisual(pick(9))}</div>
      <div class="piece p3">${productVisual(pick(22))}</div>`;
  }

  // one delegated listener for every element that filters by category
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-cat]");
    if (el) {
      $("#mainNav").classList.remove("open");
      $("#navToggle").setAttribute("aria-expanded", "false");
      setCategory(el.dataset.cat, true);
      return;
    }
    const all = e.target.closest("[data-cat-link]");
    if (all) setCategory(all.dataset.catLink, false);
  });

  $("#navToggle").addEventListener("click", () => {
    const nav = $("#mainNav");
    const open = nav.classList.toggle("open");
    $("#navToggle").setAttribute("aria-expanded", String(open));
  });

  /* ---------------- Product grid ---------------- */
  function visibleProducts() {
    let list = PRODUCTS.filter((p) => state.cat === "All" || p.category === state.cat);
    const q = state.q.trim().toLowerCase();
    if (q) list = list.filter((p) => (p.name + " " + p.category + " " + p.desc).toLowerCase().includes(q));
    const sorters = {
      featured: null,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);
    return list;
  }

  function renderGrid() {
    const list = visibleProducts();
    $("#grid").innerHTML = list
      .map(
        (p, i) => `
      <article class="card" data-id="${p.id}" style="animation-delay:${Math.min(i, 12) * 35}ms">
        <div class="thumb" style="--tint:${p.bg}">
          ${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ""}
          ${productVisual(p)}
        </div>
        <div class="card-body">
          <span class="cat">${esc(p.category)}</span>
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.desc)}</p>
          <p class="price">${money(p.price)}</p>
          <div class="sizes" role="group" aria-label="Choose size for ${esc(p.name)}">
            ${p.sizes.map((s, idx) => `<button type="button" class="size" data-size="${esc(s)}" aria-pressed="${idx === 0 && p.sizes.length === 1}">${esc(s)}</button>`).join("")}
          </div>
          <button type="button" class="btn btn-primary" data-add>Add to cart</button>
        </div>
      </article>`
      )
      .join("");
    $("#empty").hidden = list.length > 0;
    $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "style" : "styles"}${state.cat !== "All" ? " in " + state.cat : ""}`;
  }

  $("#grid").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const sizeBtn = e.target.closest(".size");
    if (sizeBtn) {
      $$(".size", card).forEach((b) => b.setAttribute("aria-pressed", String(b === sizeBtn)));
      return;
    }
    if (e.target.closest("[data-add]")) {
      const id = Number(card.dataset.id);
      const chosen = $(".size[aria-pressed='true']", card);
      if (!chosen) {
        toast("Please choose a size first");
        $(".sizes", card).animate([{ transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "none" }], { duration: 250 });
        return;
      }
      Cart.add(id, chosen.dataset.size);
      const p = PRODUCTS.find((x) => x.id === id);
      toast(`Added ${p.name} (${chosen.dataset.size})`);
      bumpBadge();
    }
  });

  $("#search").addEventListener("input", (e) => { state.q = e.target.value; renderGrid(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });

  /* ---------------- Cart drawer ---------------- */
  const drawer = $("#drawer");
  const scrim = $("#scrim");
  let lastFocus = null;

  function openCart() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add("show"));
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#closeCart").focus();
  }
  function closeCart() {
    scrim.classList.remove("show");
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => { scrim.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus();
  }
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("open")) closeCart(); });

  function bumpBadge() {
    const b = $("#cartCount");
    b.classList.remove("bump");
    void b.offsetWidth;
    b.classList.add("bump");
  }

  function renderCart() {
    const lines = Cart.lines();
    const count = Cart.count();

    const badge = $("#cartCount");
    badge.textContent = count;
    badge.hidden = count === 0;
    $("#cartBtn").setAttribute("aria-label", `Open cart, ${count} ${count === 1 ? "item" : "items"}`);

    // free-shipping progress
    const sub = Cart.subtotal();
    const remaining = FREE_SHIPPING_AT - sub;
    $("#shipProgress").innerHTML = sub === 0 ? "" : `
      <div>${remaining > 0 ? `You're <strong>${money(remaining)}</strong> away from free shipping` : "🎉 You've unlocked free shipping"}</div>
      <div class="bar"><i style="width:${Math.min(100, (sub / FREE_SHIPPING_AT) * 100)}%"></i></div>`;

    if (!lines.length) {
      $("#cartItems").innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>
          <h3>Your cart is empty</h3>
          <p>Add a few pieces and they'll show up here.</p>
          <button type="button" class="btn btn-primary" id="startShopping">Start shopping</button>
        </div>`;
      $("#cartFoot").innerHTML = "";
      return;
    }

    $("#cartItems").innerHTML = lines
      .map(({ product: p, size, qty }) => `
        <div class="line" data-id="${p.id}" data-size="${esc(size)}">
          <div class="line-thumb" style="--tint:${p.bg}">${productVisual(p)}</div>
          <div>
            <h4>${esc(p.name)}</h4>
            <div class="meta">Size ${esc(size)} · ${money(p.price)}</div>
            <div class="qty" role="group" aria-label="Quantity">
              <button type="button" data-dec aria-label="Decrease quantity">−</button>
              <span aria-live="polite">${qty}</span>
              <button type="button" data-inc aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="line-right">
            <span class="amt">${money(p.price * qty)}</span>
            <button type="button" class="remove" data-remove aria-label="Remove ${esc(p.name)} from cart">Remove</button>
          </div>
        </div>`)
      .join("");

    $("#cartFoot").innerHTML = `
      <div class="totals">
        <div><span>Subtotal</span><span>${money(sub)}</span></div>
        <div><span>Shipping</span><span>${Cart.shipping() === 0 ? "Free" : money(Cart.shipping())}</span></div>
        <div class="grand"><span>Total</span><span>${money(Cart.total())}</span></div>
      </div>
      <button type="button" class="btn btn-primary btn-block" id="goCheckout">Checkout</button>
      <button type="button" class="link-btn" id="clearCart">Clear cart</button>
      <p class="foot-note">Demo checkout — no payment is taken.</p>`;
  }

  $("#cartItems").addEventListener("click", (e) => {
    if (e.target.id === "startShopping") { closeCart(); $("#shop").scrollIntoView({ behavior: "smooth" }); return; }
    const line = e.target.closest(".line");
    if (!line) return;
    const id = Number(line.dataset.id);
    const size = line.dataset.size;
    const cur = Cart.lines().find((l) => l.id === id && l.size === size);
    if (!cur) return;
    if (e.target.closest("[data-inc]")) Cart.setQty(id, size, cur.qty + 1);
    else if (e.target.closest("[data-dec]")) Cart.setQty(id, size, cur.qty - 1);
    else if (e.target.closest("[data-remove]")) { Cart.remove(id, size); toast("Removed from cart"); }
  });

  $("#cartFoot").addEventListener("click", (e) => {
    if (e.target.id === "goCheckout") openCheckout();
    if (e.target.id === "clearCart") { Cart.clear(); toast("Cart cleared"); }
  });

  Cart.onChange(renderCart);

  /* ---------------- Checkout (template) ---------------- */
  const dlg = $("#checkout");

  function renderSummary() {
    const rows = Cart.lines()
      .map(({ product: p, size, qty }) => `
        <div class="sum-line">
          <div class="line-thumb" style="--tint:${p.bg}">${productVisual(p)}</div>
          <div>${esc(p.name)}<small>Size ${esc(size)} · Qty ${qty}</small></div>
          <span>${money(p.price * qty)}</span>
        </div>`)
      .join("");
    $("#orderSummary").innerHTML = `
      <h3>Order summary</h3>${rows}
      <div class="totals">
        <div><span>Subtotal</span><span>${money(Cart.subtotal())}</span></div>
        <div><span>Shipping</span><span>${Cart.shipping() === 0 ? "Free" : money(Cart.shipping())}</span></div>
        <div class="grand"><span>Total</span><span>${money(Cart.total())}</span></div>
      </div>`;
  }

  function openCheckout() {
    if (!Cart.count()) return;
    closeCart();
    renderSummary();
    $("#checkoutForm").hidden = false;
    $("#checkoutDone").hidden = true;
    dlg.showModal();
  }
  $("#closeCheckout").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); }); // click on backdrop

  $("#orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!Cart.count()) return;
    $("#orderNo").textContent = "ZF-" + Math.floor(100000 + Math.random() * 900000);
    $("#checkoutForm").hidden = true;
    $("#checkoutDone").hidden = false;
    $("#orderForm").reset();
    Cart.clear();
  });
  $("#doneBtn").addEventListener("click", () => {
    dlg.close();
    $("#shop").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------------- Misc ---------------- */
  $("#newsletter").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Thanks for subscribing (demo only)");
  });

  /* ---------------- Init ---------------- */
  $("#freeShipText").textContent = money(FREE_SHIPPING_AT).replace(/\.00$/, "");
  Cart.load();
  renderNav();
  renderChips();
  renderTiles();
  renderFooterLinks();
  renderHeroArt();
  renderGrid();
  renderCart();
})();
