/* ------------------------------------------------------------------
   THE ROLLING ROOSTER — menu data
   Transcribed from the printed menu. Prices in PKR (Rs).
   Edit here to update the website menu — the page renders from this.
   ------------------------------------------------------------------ */
window.RR_MENU = {
  currency: 'Rs',
  sizes: ['Small', 'Medium', 'Large'],
  categories: [
    {
      id: 'biryani',
      name: "Rooster's Special Biryani",
      short: 'Biryani',
      blurb: 'The house special. Karachi-style, cooked in-house every day.',
      image: 'assets/products/karachi-biryani.webp',
      items: [
        { name: "Rooster's Special Karachi Biryani", price: 300, image: 'assets/products/thumb-biryani.webp', star: true },
      ],
    },
    {
      id: 'pizza',
      name: 'Pizza',
      short: 'Pizza',
      blurb: 'Six chicken pizzas in three sizes. Loaded edge to edge.',
      image: 'assets/products/pizza-lazania.webp',
      sized: true, sizeLabel: 'Chicken pizzas',
      items: [
        { name: 'Chicken Classic Fajita', prices: [500, 1000, 1400] },
        { name: 'Chicken Tikka Delight', prices: [500, 1000, 1400], star: true },
        { name: 'Chicken Tandoori', prices: [500, 1000, 1400] },
        { name: 'Chicken Supreme', prices: [500, 1000, 1400] },
        { name: 'Chicken Mexican', prices: [500, 1000, 1400] },
        { name: 'Chicken BBQ', prices: [500, 1000, 1400] },
      ],
    },
    {
      id: 'extra-topping-pizza',
      name: "Rooster's Special Extra Topping Pizza",
      short: 'Special Pizza',
      blurb: 'Extra toppings, stuffed and crowned crusts. For serious appetites.',
      image: 'assets/products/pizza-lazania.webp',
      sized: true, sizeLabel: 'Extra topping pizzas',
      items: [
        { name: "Rooster's Special Lazania Pizza", prices: [600, 1100, 1600], star: true },
        { name: 'Chicken Malai Boti', prices: [600, 1100, 1600] },
        { name: 'Cheese Gold Rooster', prices: [600, 1100, 1600] },
        { name: 'Crown Crust', prices: [600, 1100, 1600] },
        { name: 'Cheese Crust', prices: [600, 1100, 1600] },
        { name: 'Stuff Crust', prices: [600, 1100, 1600] },
      ],
    },
    {
      id: 'burgers',
      name: 'Burgers',
      short: 'Burgers',
      blurb: 'Zinger, patty, tower and Afghani styles. Built fresh to order.',
      image: 'assets/products/zinger-classic.webp',
      items: [
        { name: 'Zinger Burger', price: 350, image: 'assets/products/thumb-burger-zinger.webp', star: true },
        { name: 'Zinger Burger With Cheese', price: 400 },
        { name: 'Patty Burger', price: 350 },
        { name: 'Patty Burger With Cheese', price: 400 },
        { name: 'Tower Burger With Cheese', price: 500, image: 'assets/products/thumb-burger-tower.webp' },
        { name: 'Chicken BBQ Burger', price: 300 },
        { name: 'Chicken Burger', price: 250 },
        { name: 'Afghani Burger Simple', price: 200 },
        { name: 'Afghani Burger (Beef Sausage)', price: 250 },
        { name: 'Afghani Burger (Chicken Sausage)', price: 250 },
        { name: 'Special Tikka Afghani Burger', price: 300 },
      ],
    },
    {
      id: 'wings',
      name: 'Wings & Chicken Piece',
      short: 'Wings',
      blurb: 'Crispy, BBQ or masala. Three or five pieces.',
      image: 'assets/products/crispy-chicken.webp',
      items: [
        { name: 'Crispy Wings', note: '5 pieces', price: 350, image: 'assets/products/thumb-wings-crispy.webp', star: true },
        { name: 'BBQ Wings', note: '5 pieces', price: 300, image: 'assets/products/thumb-wings-bbq.webp' },
        { name: 'Masala Wings', note: '5 pieces', price: 300 },
        { name: 'Crispy Wings', note: '3 pieces', price: 250 },
        { name: 'BBQ Wings', note: '3 pieces', price: 200 },
        { name: 'Masala Wings', note: '3 pieces', price: 200 },
        { name: 'Chicken Piece (Leg Piece)', price: 200, image: 'assets/products/thumb-leg-piece.webp' },
      ],
    },
    {
      id: 'shawarma',
      name: 'Chicken Shawarma',
      short: 'Shawarma',
      blurb: 'Rolled tight, sauced right. Or go for the full platter.',
      image: 'assets/products/thumb-shawarma-zinger.webp',
      items: [
        { name: 'Chicken Shawarma', price: 200, image: 'assets/products/thumb-shawarma.webp' },
        { name: 'Chicken Cheese Shawarma', price: 250 },
        { name: 'Chicken Zinger Shawarma', price: 300, image: 'assets/products/thumb-shawarma-zinger.webp', star: true },
        { name: 'Chicken Arabic Shawarma', price: 250, image: 'assets/products/thumb-wrap-arabic.webp' },
        { name: 'Chicken Platter Shawarma', price: 400, image: 'assets/products/thumb-shawarma-platter.webp' },
      ],
    },
    {
      id: 'paratha-rolls',
      name: 'Chicken Paratha Roll',
      short: 'Paratha Rolls',
      blurb: 'Flaky paratha wrapped around chicken, cheese, BBQ or zinger.',
      image: 'assets/products/thumb-paratha-roll.webp',
      items: [
        { name: 'Chicken Paratha Roll', price: 250, image: 'assets/products/thumb-paratha-roll.webp' },
        { name: 'Chicken Cheese Paratha Roll', price: 300 },
        { name: 'Chicken BBQ Paratha Roll', price: 300 },
        { name: 'Chicken Zinger Paratha Roll', price: 350, image: 'assets/products/thumb-paratha-roll-zinger.webp', star: true },
      ],
    },
    {
      id: 'pasta',
      name: 'Pasta',
      short: 'Pasta',
      blurb: 'Creamy, saucy and generous — plus our pizza fries.',
      image: 'assets/products/special-pasta.webp',
      items: [
        { name: "Rooster's Special Pasta", price: 600, image: 'assets/products/thumb-pasta-special.webp', star: true },
        { name: 'Chicken Pasta', price: 500 },
        { name: 'Pizza Fries', price: 400, image: 'assets/products/thumb-pizza-fries.webp' },
        { name: 'Mushroom Pasta', price: 400 },
        { name: "Veggie Lover's Pasta", price: 400 },
      ],
    },
    {
      id: 'fries',
      name: 'French Fries',
      short: 'Fries',
      blurb: 'Plain, masala or mayo garlic.',
      image: 'assets/products/thumb-fries-mayo.webp',
      items: [
        { name: 'Plain Fries', note: 'Small', price: 100 },
        { name: 'Masala Fries', note: 'Medium', price: 150 },
        { name: 'Mayo Garlic Fries', price: 200, image: 'assets/products/thumb-fries-mayo.webp', star: true },
      ],
    },
    {
      id: 'drinks',
      name: 'Cold Drinks',
      short: 'Drinks',
      blurb: 'Cold drinks and beverages available — ask when you order.',
      image: 'assets/products/drinks.webp',
      items: [
        { name: 'Cold Drinks & Beverages', note: 'Available', priceLabel: 'Ask in store', image: 'assets/products/drinks.webp' },
      ],
    },
  ],

  deals: [
    { n: 1, title: 'Deal 1', persons: '1 Person', price: 600,
      includes: ['1 Zinger Burger', '1 Chicken Piece', 'Plain Fries'], image: 'assets/products/zinger-classic.webp' },
    { n: 2, title: 'Deal 2', persons: '2 Persons', price: 1000,
      includes: ['2 Zinger Burgers', '5 Pieces BBQ Wings', 'Plain Fries'], image: 'assets/products/crispy-chicken.webp' },
    { n: 3, title: 'Deal 3', persons: '3 Persons', price: 1700,
      includes: ['3 Zinger Burgers', '10 Pieces BBQ Wings', 'Mayo Garlic Fries'], image: 'assets/products/zinger-classic.webp' },
    { n: 4, title: 'Deal 4', persons: '4 Persons', price: 2500,
      includes: ['4 Zinger Burgers', '15 Pieces BBQ Wings', '2 Mayo Garlic Fries'], image: 'assets/products/crispy-chicken.webp', hot: true },
    { n: 5, title: 'Pizza Deal', persons: 'Deal 5', price: 2000,
      includes: ['Large Pizza', 'Small Pizza', '1.5 Litre Cold Drink'], image: 'assets/products/pizza-lazania.webp' },
    { n: 6, title: 'Double Pizza', persons: 'Deal 6', price: null,
      includes: ['2 Small — Rs 950', '2 Medium — Rs 1900', '2 Large — Rs 2600'], image: 'assets/products/pizza-lazania.webp', tiers: true },
  ],

  business: {
    name: 'The Rolling Rooster',
    tagline: 'Fast Food · Roof Top Dine Inn',
    address: 'Inayat Market, I-11/2, Islamabad',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Rolling+Rooster+Inayat+Market+I-11%2F2+Islamabad',
    hours: '12:00 PM – 1:30 AM',
    hoursNote: 'Open daily',
    phones: ['0300-5453645', '0331-5453644', '0307-5143425', '0343-5667183'],
    deliveryPhones: ['0300-5453645', '0331-5453644'],
    instagram: 'The Rolling Rooster',
    instagramUrl: 'https://www.instagram.com/',
    features: ['Delivery Available', 'Dine-In Space for Families', 'Free Birthday Decor Available', 'Roof Top Dine Inn'],
  },
};

/* Helpers ------------------------------------------------------------- */
window.RR_UTIL = {
  /** 0300-5453645 -> tel:+923005453645 */
  tel(pk) { return 'tel:+92' + pk.replace(/\D/g, '').replace(/^0/, ''); },
  /** 0300-5453645 -> https://wa.me/923005453645 */
  wa(pk, text) {
    const n = '92' + pk.replace(/\D/g, '').replace(/^0/, '');
    return 'https://wa.me/' + n + (text ? '?text=' + encodeURIComponent(text) : '');
  },
  money(v) { return 'Rs ' + v.toLocaleString('en-PK'); },
};
