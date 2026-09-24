import { ArrowRight, Plane, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { flights, hotels, packages } from '../data/travel'
import { experiences } from '../data/catalog'
import { CountUp, Reveal } from '../components/Motion'
import { ExperienceCard, HotelCard, SectionHeading } from '../components/Cards'

const stats = [[500, '+', 'Destinations'], [10, 'K+', 'Happy travelers'], [150, '+', 'Travel experiences'], [4.9, '', 'Average rating'], [50, '+', 'Airline partners']]

function FlightsPreview() {
  return <section className="section container section--cream"><Reveal><SectionHeading eyebrow="Fly your way" title="Good journeys begin here." text="Thoughtful options, clear details, and the right fare—without the noise." action="Explore all flights" to="/flights" /></Reveal><div className="flight-preview-grid">{flights.map((flight) => <Reveal className="flight-mini-card" delay={100} key={flight.id}><div className="flight-mini-card__top"><span className="airline-code" style={{ '--accent': flight.accent }}>{flight.code}</span><div><strong>{flight.airline}</strong><small>{flight.id} · Economy</small></div>{flight.recommended && <span className="pill pill--mint">Recommended</span>}</div><div className="flight-mini-route"><div><strong>{flight.depart}</strong><span>{flight.from}</span></div><div><span>{flight.duration}</span><i><Plane size={14} /></i><small>{flight.stops ? `${flight.stops} stop` : 'Nonstop'}</small></div><div><strong>{flight.arrive}</strong><span>{flight.to} <sup>{flight.nextDay}</sup></span></div></div><div className="flight-mini-card__bottom"><p>from <strong>${flight.price}</strong> / person</p><Link to={`/flights?select=${flight.id}`}>View flight <ArrowRight size={14} /></Link></div></Reveal>)}</div></section>
}

function HotelsSection() {
  return <section className="section container"><Reveal><SectionHeading eyebrow="Stay somewhere special" title="Hotels worth the trip." text="From hidden boutique houses to extraordinary resorts, every stay is selected for how it feels." action="Browse all stays" to="/hotels" /></Reveal><div className="home-hotel-grid">{hotels.slice(0, 3).map((hotel, index) => <Reveal delay={index * 100} key={hotel.id}><HotelCard hotel={hotel} /></Reveal>)}</div></section>
}

function PackagesSection() {
  return <section className="section packages-section"><div className="container"><Reveal><SectionHeading eyebrow="Better all together" title="Journeys, already beautifully considered." text="Flights, stays, local experiences, and the details between—wrapped into one clear price." action="Explore all packages" to="/deals" light /></Reveal><div className="package-grid">{packages.map((item, index) => <Reveal className="package-card" delay={index * 100} key={item.id}><img src={item.image} alt={item.name} loading="lazy" /><div className="package-card__shade" /><span className="pill pill--glass">{item.discount}% saved</span><div className="package-card__body"><small>{item.location}</small><h3>{item.name}</h3><p>{item.duration} · From</p><div><strong>${item.price.toLocaleString()}</strong><del>${item.original.toLocaleString()}</del><Link to={`/deals?package=${item.id}`} aria-label={`View ${item.name}`}><ArrowRight /></Link></div></div></Reveal>)}</div></div></section>
}

function ExperiencesSection() {
  return <section className="section container"><Reveal><SectionHeading eyebrow="Do something memorable" title="Experiences with a little soul." text="The best moments are often the ones you could never have planned yourself." action="See all experiences" to="/experiences" /></Reveal><div className="home-experience-grid">{experiences.slice(0, 3).map((item, index) => <Reveal delay={index * 100} key={item.id}><ExperienceCard item={item} /></Reveal>)}</div></section>
}

export default function CommerceSections() {
  return <><section className="stats-section"><div className="container stats-grid">{stats.map(([value, suffix, label], index) => <Reveal key={label} delay={index * 80}><strong><CountUp value={value} suffix={suffix} decimals={value === 4.9 ? 1 : 0} /></strong><span>{label}</span></Reveal>)}</div></section><FlightsPreview /><HotelsSection /><PackagesSection /><ExperiencesSection /></>
}
