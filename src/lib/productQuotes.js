const quotes = [
  "✨ Discover something new today!",
  "🛍️ Your next favorite item is here",
  "🔥 Don’t miss out on trending products",
  "🌟 Great picks just for you",
  "🎯 Find exactly what you need",
  "💖 Shopping made fun!",
  "👀 Something caught your eye?",
  "✨ Explore. Choose. Enjoy.",
  "🛒 The perfect product is waiting for you",
  "🌟 Every great shopping journey starts with one click",
  "💎 You deserve quality products",
  "😍 Treat yourself to something special today",
  "🛍️ Don’t just scroll… find something you love!",
  "🔥 This might be exactly what you’re looking for!",
  "💖 A little shopping never hurt anyone 😉",
  "💸 Smart shopping starts right here",
  "👀 Take a closer look… it’s worth it!",
  "🛒 Add it now before it’s gone!",
  "💡 Great choices start with one click",
  "🛍️ Why wait? Treat yourself today!",
  "🎉 You deserve something new!",
  "⚡ Don’t miss out on this!",
  "💖 Fall in love with your next purchase",
  "🚀 Click. Add. Enjoy.",
  "🌈 Make your day better with a new product",
  "👑 Shop like you mean it!",
  "💥 Best finds are just one scroll away!"
];


export function getProductQuote(product = null) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}