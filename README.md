# Zeno Fasions

A modern fashion storefront — streetwear to suits. Front-end only (HTML, CSS, vanilla JS), no build step.

## Run it

Open `index.html` in a browser. Or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Structure

```
zeno-fasions/
├── index.html          page markup (header, hero, categories, grid, cart drawer, checkout dialog)
├── css/styles.css      all styling, light + dark themes via CSS variables
├── js/
│   ├── products.js     catalogue data, categories, currency, shipping rules
│   ├── garments.js     generic SVG garment illustrations (+ real-image override)
│   ├── cart.js         cart state, saved in localStorage
│   └── app.js          rendering, filters, cart drawer, checkout template, dark mode
└── assets/
    ├── logo.svg        full logo (serif wordmark + hanger-Z mark)
    └── favicon.svg
```

## Features

- Light / dark mode (remembers choice, follows system preference by default)
- 7 categories, 26 products, category filter, search and sorting
- Cart drawer: size selection, add, +/- quantity, remove, clear, free-shipping progress, saved between visits
- Template checkout (form + order summary + confirmation). Nothing is sent anywhere.
- Fully responsive, keyboard accessible, respects reduced motion

## Customising

- **Currency / shipping:** top of `js/products.js` (`CURRENCY`, `FREE_SHIPPING_AT`, `FLAT_SHIPPING`).
- **Add a product:** add an object to `PRODUCTS`. `type` picks the illustration (`tee, hoodie, bomber, puffer, pants, cargo, shirt, suit, tux, tie, coat, dress, sneaker, chunky, oxford, cap, bag, tote`).
- **Use real photos:** add `image: "assets/img/my-photo.jpg"` to a product — it replaces the illustration.
- **Colours:** edit the variables at the top of `css/styles.css`.
- **Fonts:** Cormorant Garamond (logo/headings) and Inter load from Google Fonts; offline it falls back to Georgia / system sans.
