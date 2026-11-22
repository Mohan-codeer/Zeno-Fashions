/* Zeno Fasions — cart state (persisted in localStorage). */

const Cart = (function () {
  const KEY = "zf-cart-v1";
  let items = []; // { id, size, qty }
  const listeners = [];

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      // keep only items that still exist in the catalogue
      items = raw.filter((i) => PRODUCTS.some((p) => p.id === i.id) && i.qty > 0);
    } catch (e) { items = []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ }
    listeners.forEach((fn) => fn());
  }
  const find = (id, size) => items.find((i) => i.id === id && i.size === size);

  return {
    load,
    onChange(fn) { listeners.push(fn); },
    add(id, size) {
      const existing = find(id, size);
      if (existing) existing.qty = Math.min(existing.qty + 1, 10);
      else items.push({ id, size, qty: 1 });
      save();
    },
    setQty(id, size, qty) {
      const it = find(id, size);
      if (!it) return;
      it.qty = Math.max(0, Math.min(qty, 10));
      if (it.qty === 0) items = items.filter((i) => i !== it);
      save();
    },
    remove(id, size) {
      items = items.filter((i) => !(i.id === id && i.size === size));
      save();
    },
    clear() { items = []; save(); },
    // detailed lines, joined with product data
    lines() {
      return items.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }));
    },
    count() { return items.reduce((n, i) => n + i.qty, 0); },
    subtotal() {
      return items.reduce((sum, i) => sum + PRODUCTS.find((p) => p.id === i.id).price * i.qty, 0);
    },
    shipping() {
      const s = this.subtotal();
      return s === 0 || s >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
    },
    total() { return this.subtotal() + this.shipping(); },
  };
})();
