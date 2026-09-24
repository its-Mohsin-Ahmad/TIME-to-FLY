export const adminSeed = {
  users: [
    { id: 'USR-1048', name: 'Alex Morgan', email: 'alex.morgan@time-to-fly.com', role: 'Administrator', status: 'Active', joined: 'Jan 12, 2024' },
    { id: 'USR-1047', name: 'Olivia Martin', email: 'olivia.martin@example.com', role: 'Traveler', status: 'Active', joined: 'Feb 04, 2024' },
    { id: 'USR-1046', name: 'Noah Wilson', email: 'noah.wilson@example.com', role: 'Agent', status: 'Active', joined: 'Mar 18, 2024' },
    { id: 'USR-1045', name: 'Mia Anderson', email: 'mia.anderson@example.com', role: 'Traveler', status: 'Pending', joined: 'Apr 02, 2024' },
    { id: 'USR-1044', name: 'Ethan Clark', email: 'ethan.clark@example.com', role: 'Agent', status: 'Active', joined: 'Apr 19, 2024' },
    { id: 'USR-1043', name: 'Amelia Hall', email: 'amelia.hall@example.com', role: 'Traveler', status: 'Suspended', joined: 'May 07, 2024' },
    { id: 'USR-1042', name: 'Sofia Kim', email: 'sofia.kim@example.com', role: 'Traveler', status: 'Active', joined: 'May 28, 2024' },
  ],
  flights: [
    { id: 'FL-204', flightNumber: 'TF 204', airline: 'Northstar Air', departure: 'JFK', arrival: 'DPS', departTime: '18:40', arriveTime: '10:55 +1', duration: '16h 15m', aircraft: 'Boeing 787-9', terminal: '2', gate: 'B14', price: 689, seats: 42, status: 'Scheduled' },
    { id: 'FL-118', flightNumber: 'NS 118', airline: 'Northstar Air', departure: 'LHR', arrival: 'DXB', departTime: '08:15', arriveTime: '17:20', duration: '7h 05m', aircraft: 'Airbus A350', terminal: '5', gate: 'A06', price: 542, seats: 18, status: 'Boarding' },
    { id: 'FL-921', flightNumber: 'TA 921', airline: 'Tunisair', departure: 'CDG', arrival: 'IST', departTime: '13:45', arriveTime: '17:55', duration: '3h 10m', aircraft: 'Airbus A321', terminal: '2E', gate: 'K31', price: 286, seats: 67, status: 'Delayed' },
    { id: 'FL-443', flightNumber: 'EK 443', airline: 'Emirates', departure: 'DXB', arrival: 'JFK', departTime: '02:20', arriveTime: '08:15', duration: '14h 55m', aircraft: 'Boeing 777-300ER', terminal: '3', gate: 'A12', price: 914, seats: 29, status: 'Departed' },
    { id: 'FL-762', flightNumber: 'JL 762', airline: 'Japan Airlines', departure: 'NRT', arrival: 'SFO', departTime: '16:30', arriveTime: '10:05', duration: '9h 35m', aircraft: 'Boeing 787-8', terminal: '1', gate: 'G08', price: 834, seats: 36, status: 'Arrived' },
  ],
  airlines: [
    { id: 'AIR-01', name: 'Northstar Air', iata: 'NS', icao: 'NSA', country: 'United States', logo: 'N', status: 'Active' },
    { id: 'AIR-02', name: 'Emirates', iata: 'EK', icao: 'UAE', country: 'United Arab Emirates', logo: 'E', status: 'Active' },
    { id: 'AIR-03', name: 'Japan Airlines', iata: 'JL', icao: 'JAL', country: 'Japan', logo: 'J', status: 'Active' },
    { id: 'AIR-04', name: 'Tunisair', iata: 'TU', icao: 'TUI', country: 'Tunisia', logo: 'T', status: 'Review' },
  ],
  airports: [
    { id: 'APT-JFK', name: 'John F. Kennedy International', iata: 'JFK', icao: 'KJFK', city: 'New York', country: 'United States', timezone: 'EST', terminals: '4', status: 'Active' },
    { id: 'APT-DXB', name: 'Dubai International', iata: 'DXB', icao: 'OMDB', city: 'Dubai', country: 'United Arab Emirates', timezone: 'GST', terminals: '3', status: 'Active' },
    { id: 'APT-IST', name: 'Istanbul Airport', iata: 'IST', icao: 'LTFM', city: 'Istanbul', country: 'Türkiye', timezone: 'TRT', terminals: '1', status: 'Active' },
    { id: 'APT-NRT', name: 'Narita International', iata: 'NRT', icao: 'RJAA', city: 'Tokyo', country: 'Japan', timezone: 'JST', terminals: '2', status: 'Maintenance' },
  ],
  hotels: [
    { id: 'HTL-01', name: 'Solei Resort & Spa', location: 'Ubud, Bali', country: 'Indonesia', rating: 4.9, description: 'A restorative jungle retreat with thoughtful service.', amenities: 'Pool, Spa, Wi-Fi', contact: 'stay@solei.example', status: 'Active' },
    { id: 'HTL-02', name: 'Caldera Cliff Retreat', location: 'Santorini', country: 'Greece', rating: 4.8, description: 'A private cliffside sanctuary above the Aegean.', amenities: 'Pool, Breakfast, Parking', contact: 'hello@caldera.example', status: 'Active' },
    { id: 'HTL-03', name: 'The Alpine House', location: 'Zermatt', country: 'Switzerland', rating: 4.7, description: 'Warm modern design with Matterhorn views.', amenities: 'Spa, Breakfast, Parking', status: 'Active' },
    { id: 'HTL-04', name: 'Maison Marais', location: 'Paris', country: 'France', rating: 4.8, description: 'A refined Left Bank residence for slow city days.', amenities: 'Breakfast, Wi-Fi, Concierge', status: 'Review' },
  ],

  rooms: [
    { id: 'RM-101', hotel: 'Solei Resort & Spa', number: 'Villa 14', type: 'Pool Villa', capacity: 2, price: 685, availability: 'Available', amenities: 'Ocean view, Private pool' },
    { id: 'RM-102', hotel: 'Caldera Cliff Retreat', number: 'Suite 208', type: 'Caldera Suite', capacity: 3, price: 420, availability: 'Occupied', amenities: 'Sea view, Breakfast' },
    { id: 'RM-103', hotel: 'The Alpine House', number: 'Chalet 7', type: 'Family Chalet', capacity: 5, price: 540, availability: 'Available', amenities: 'Fireplace, Kitchenette' },
    { id: 'RM-104', hotel: 'Maison Marais', number: 'Room 32', type: 'Deluxe Room', capacity: 2, price: 310, availability: 'Maintenance', amenities: 'City view, Minibar' },
  ],
  bookings: [
    { id: 'TTF-8K2LP', customer: 'Olivia Martin', type: 'Flight', date: 'Oct 12, 2026', amount: 1428, payment: 'Paid', status: 'Confirmed', item: 'JFK → DPS' },
    { id: 'TTF-3M7QA', customer: 'Noah Wilson', type: 'Hotel', date: 'Oct 12–19, 2026', amount: 1560, payment: 'Pending', status: 'Pending', item: 'Solei Resort, Bali' },
    { id: 'TTF-9P4XD', customer: 'Mia Anderson', type: 'Package', date: 'Nov 03–10, 2026', amount: 2190, payment: 'Paid', status: 'Confirmed', item: 'Swiss Adventure' },
    { id: 'TTF-6T1RV', customer: 'Ethan Clark', type: 'Flight', date: 'Sep 28, 2026', amount: 980, payment: 'Paid', status: 'Confirmed', item: 'JFK → NRT' },
    { id: 'TTF-2H8BW', customer: 'Amelia Hall', type: 'Experience', date: 'Oct 05, 2026', amount: 224, payment: 'Paid', status: 'Completed', item: 'Aegean Catamaran' },
    { id: 'TTF-7C2AA', customer: 'Sofia Kim', type: 'Transfer', date: 'Oct 12, 2026', amount: 78, payment: 'Paid', status: 'Cancelled', item: 'DPS Airport transfer' },
  ],
  tickets: [
    { id: 'PNR-7A2LP', passenger: 'Olivia Martin', flight: 'TF 204', departure: 'JFK', arrival: 'DPS', seat: '18A', gate: 'B14', terminal: '2', boardingTime: '16:10', status: 'Confirmed' },
    { id: 'PNR-3M7QA', passenger: 'Noah Wilson', flight: 'EK 443', departure: 'DXB', arrival: 'JFK', seat: '4C', gate: 'A12', terminal: '3', boardingTime: '00:20', status: 'Confirmed' },
    { id: 'PNR-9P4XD', passenger: 'Mia Anderson', flight: 'JL 762', departure: 'NRT', arrival: 'SFO', seat: '32K', gate: 'G08', terminal: '1', boardingTime: '14:45', status: 'Boarding' },
  ],
  destinations: [
    { id: 'DST-01', name: 'Bali', country: 'Indonesia', region: 'Asia', rating: 4.8, status: 'Active' },
    { id: 'DST-02', name: 'Maldives', country: 'Indian Ocean', region: 'Islands', rating: 4.9, status: 'Active' },
    { id: 'DST-03', name: 'Swiss Alps', country: 'Switzerland', region: 'Europe', rating: 4.8, status: 'Active' },
    { id: 'DST-04', name: 'Istanbul', country: 'Türkiye', region: 'Europe', rating: 4.7, status: 'Active' },
  ],
  packages: [
    { id: 'PKG-01', name: 'Bali Escape', location: 'Indonesia', duration: '7 days / 6 nights', price: 1280, status: 'Active' },
    { id: 'PKG-02', name: 'Swiss Adventure', location: 'Switzerland', duration: '8 days / 7 nights', price: 2190, status: 'Active' },
    { id: 'PKG-03', name: 'Maldives Paradise', location: 'Indian Ocean', duration: '6 days / 5 nights', price: 2490, status: 'Paused' },
  ],
  experiences: [
    { id: 'EXP-01', name: 'Sunrise at Uluwatu', location: 'Bali, Indonesia', category: 'Adventure', price: 58, status: 'Active' },
    { id: 'EXP-02', name: 'Aegean Catamaran Escape', location: 'Santorini, Greece', category: 'Beach', price: 112, status: 'Active' },
    { id: 'EXP-03', name: 'Tokyo After Dark', location: 'Tokyo, Japan', category: 'Food', price: 96, status: 'Active' },
  ],
  cars: [
    { id: 'CAR-01', name: 'Polestar City', location: 'Bali, Indonesia', category: 'Economy', price: 42, status: 'Active' },
    { id: 'CAR-02', name: 'Volvo XC40', location: 'Switzerland', category: 'SUV', price: 68, status: 'Active' },
  ],
  transfers: [
    { id: 'TRF-01', name: 'DPS Airport Transfer', location: 'Bali, Indonesia', category: 'Private', price: 32, status: 'Active' },
    { id: 'TRF-02', name: 'JFK Airport Transfer', location: 'New York, USA', category: 'Premium', price: 78, status: 'Active' },
  ],
  payments: [
    { id: 'PAY-01', reference: 'PAY-8842', customer: 'Olivia Martin', amount: 1428, method: 'Visa •••• 4242', status: 'Paid' },
    { id: 'PAY-02', reference: 'PAY-8843', customer: 'Noah Wilson', amount: 1560, method: 'Bank transfer', status: 'Pending' },
    { id: 'PAY-03', reference: 'PAY-8844', customer: 'Mia Anderson', amount: 2190, method: 'Amex •••• 9001', status: 'Paid' },
  ],
  coupons: [
    { id: 'CPN-01', code: 'FLY20', discount: 20, expires: 'Dec 31, 2026', status: 'Active' },
    { id: 'CPN-02', code: 'STAY15', discount: 15, expires: 'Nov 30, 2026', status: 'Active' },
  ],
  reviews: [
    { id: 'REV-01', name: 'Aisha & Omar', rating: 5, quote: 'Every detail felt considered and calm.', status: 'Published' },
    { id: 'REV-02', name: 'Sofia Martin', rating: 5, quote: 'One connected trip from takeoff to touchdown.', status: 'Published' },
  ],

  notifications: [
    { id: 'NTF-1', title: 'Flight delayed', text: 'TA 921 from CDG is delayed by 35 minutes.', time: '8 min ago', type: 'Flight', read: false },
    { id: 'NTF-2', title: 'New booking received', text: 'A new hotel booking was received for Bali.', time: '22 min ago', type: 'Booking', read: false },
    { id: 'NTF-3', title: 'Hotel booking confirmed', text: 'Solei Resort confirmed the reservation for Oct 12.', time: '1 hr ago', type: 'Hotel', read: false },
    { id: 'NTF-4', title: 'New user registered', text: 'Sofia Kim created a TIME TO FLY account.', time: '3 hrs ago', type: 'User', read: true },
    { id: 'NTF-5', title: 'Payment completed', text: 'Payment for TTF-9P4XD was received.', time: 'Yesterday', type: 'Payment', read: true },
  ],
  services: [
    { name: 'API', status: 'Operational' }, { name: 'Database', status: 'Operational' }, { name: 'Flight Service', status: 'Operational' }, { name: 'Hotel Service', status: 'Operational' }, { name: 'Payment Service', status: 'Operational' },
  ],
}
