export const experiences = [
  { id: 301, title: 'Sunrise at Uluwatu', location: 'Bali, Indonesia', category: 'Adventure', duration: '3 hours', rating: 4.9, reviews: 328, price: 58, image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85' },
  { id: 302, title: 'Private Cappadocia Skies', location: 'Göreme, Türkiye', category: 'Photography', duration: '5 hours', rating: 4.9, reviews: 216, price: 135, image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=85' },
  { id: 303, title: 'Aegean Catamaran Escape', location: 'Santorini, Greece', category: 'Beach', duration: '6 hours', rating: 4.8, reviews: 189, price: 112, image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85' },
  { id: 304, title: 'Tokyo After Dark', location: 'Tokyo, Japan', category: 'Food', duration: '4 hours', rating: 4.8, reviews: 504, price: 96, image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85' },
  { id: 305, title: 'Alpine Village by Train', location: 'Swiss Alps', category: 'Nature', duration: 'Full day', rating: 4.9, reviews: 142, price: 148, image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=85' },
  { id: 306, title: 'Paris After Dark', location: 'Paris, France', category: 'Nightlife', duration: '4 hours', rating: 4.7, reviews: 362, price: 74, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=85' },
]

export const vehicles = [
  { id: 'ECON', name: 'Polestar City', category: 'Economy', seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Hybrid', price: 42, deposit: 250, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80' },
  { id: 'SUV', name: 'Volvo XC40', category: 'SUV', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol', price: 68, deposit: 450, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80' },
  { id: 'LUX', name: 'BMW 7 Series', category: 'Luxury', seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol', price: 148, deposit: 1200, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80' },
  { id: 'VAN', name: 'Mercedes V-Class', category: 'Van', seats: 7, doors: 5, transmission: 'Automatic', fuel: 'Diesel', price: 92, deposit: 700, image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80' },
]

export const blogPosts = [
  { id: 401, category: 'Destinations', title: 'The quiet side of Bali: beyond the familiar', author: 'Maya Chen', date: 'Sep 18, 2026', read: '7 min', image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=1000&q=80' },
  { id: 402, category: 'Air Travel', title: 'A smarter way to find the fare you want', author: 'Noah Williams', date: 'Sep 12, 2026', read: '5 min', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80' },
  { id: 403, category: 'Food', title: 'Markets worth planning an entire trip around', author: 'Ana Torres', date: 'Sep 5, 2026', read: '6 min', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1000&q=80' },
]

export const reviews = [
  { name: 'Aisha & Omar', trip: 'Maldives · 8 days', rating: 5, quote: 'Every detail felt considered. Our flight change was handled before we even knew, and the resort recommendation was exactly our pace.', initials: 'AO' },
  { name: 'Sofia Martin', trip: 'Japan · 12 days', rating: 5, quote: 'It genuinely felt like one connected trip. The guide, hotels, and little restaurant notes made planning so much easier.', initials: 'SM' },
  { name: 'Daniel Kim', trip: 'Swiss Alps · 7 days', rating: 5, quote: 'The itinerary left room for spontaneity but had the perfect places already researched. We saw more and spent less.', initials: 'DK' },
]

export const serviceFeatures = [
  { title: 'Best Price Promise', text: 'Confidence with flexible value', icon: 'tag' },
  { title: 'Always Here', text: 'Human support, day or night', icon: 'headphones' },
  { title: 'Travel Flexibly', text: 'Clear, simple change options', icon: 'calendar' },
  { title: 'Secure by Design', text: 'Protected payments and privacy', icon: 'shield' },
  { title: 'Verified Stays', text: 'Quality checked by our team', icon: 'badge' },
  { title: 'Trusted Airlines', text: '50+ global airline partners', icon: 'plane' },
]

export const notifications = [
  { title: 'Check-in is open', text: 'Your Bali flight can be checked in now.', time: '12 min', icon: 'plane', unread: true },
  { title: 'Hotel confirmed', text: 'Solei Resort · Ubud, 12–19 Oct', time: '2 hr', icon: 'hotel', unread: true },
  { title: 'Trip reminder', text: 'Your Tokyo itinerary starts in 18 days.', time: '1 day', icon: 'map' },
]

export const dashboardStats = [
  { label: 'Total Users', value: '48,294', change: '+12.4%', icon: 'users' },
  { label: 'Total Bookings', value: '12,842', change: '+8.7%', icon: 'ticket' },
  { label: 'Flight Revenue', value: '$2.84M', change: '+18.2%', icon: 'plane' },
  { label: 'Hotel Revenue', value: '$1.96M', change: '+9.6%', icon: 'hotel' },
  { label: 'Package Revenue', value: '$1.12M', change: '+14.1%', icon: 'package' },
  { label: 'Total Revenue', value: '$6.24M', change: '+16.8%', icon: 'wallet' },
]
