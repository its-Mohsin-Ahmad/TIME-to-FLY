import { ArrowUpRight, Check, Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'
import { Stars } from './Motion'

export function SectionHeading({ eyebrow, title, text, action, to = '/destinations', light = false, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      <div>
        {eyebrow && <span className="eyebrow"><i />{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action && <Link className="text-link" to={to}>{action}<ArrowUpRight size={16} /></Link>}
    </div>
  )
}

export function DestinationCard({ item, size = '', horizontal = false }) {
  const { saved, toggleSave } = useTravel()
  const isSaved = saved.includes(item.id)
  return (
    <article className={`destination-card ${size} ${horizontal ? 'destination-card--horizontal' : ''}`}>
      <Link to={`/destinations/${item.id}`} className="destination-card__image" aria-label={`Explore ${item.name}`}>
        <img src={item.image} alt={`${item.name}, ${item.country}`} loading="lazy" />
        <span className="pill pill--glass">{item.tag}</span>
      </Link>
      <button className={`save-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSave(item.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${item.name}`}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>
      <div className="destination-card__body">
        <div><p><MapPin size={13} />{item.country}</p><Link to={`/destinations/${item.id}`}><h3>{item.name}</h3></Link></div>
        <Stars rating={Math.round(item.rating)} count={item.reviews} />
      </div>
    </article>
  )
}

export function HotelCard({ hotel }) {
  const { saved, toggleSave, notify } = useTravel()
  const isSaved = saved.includes(hotel.id)
  return (
    <article className="hotel-card">
      <div className="hotel-card__media">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        <span className="pill pill--dark">Exceptional value</span>
        <button className={`save-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSave(hotel.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${hotel.name}`}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="hotel-card__body">
        <div className="card-title-row"><div><p className="micro-label"><MapPin size={12} />{hotel.location}</p><h3>{hotel.name}</h3></div><span className="rating-badge"><Star size={12} fill="currentColor" />{hotel.rating}</span></div>
        <p className="muted">{hotel.description}</p>
        <div className="amenities">{hotel.amenities.map((item) => <span key={item}><Check size={12} />{item}</span>)}</div>
        <div className="card-price"><p><small>From</small><strong>${hotel.price}</strong><span>/ night</span></p><span>{hotel.distance}</span></div>
        <div className="card-actions"><Link className="btn btn--outline" to={`/hotels/${hotel.id}`}>View hotel</Link><button className="btn btn--primary" onClick={() => notify(`${hotel.name} added for review`)}>Book now</button></div>
      </div>
    </article>
  )
}

export function ExperienceCard({ item }) {
  return (
    <article className="experience-card">
      <Link className="experience-card__image" to={`/experiences?book=${item.id}`}><img src={item.image} alt={item.title} loading="lazy" /><span className="pill pill--glass">{item.category}</span></Link>
      <div className="experience-card__body"><p>{item.location}</p><h3>{item.title}</h3><div><span><Star size={13} fill="currentColor" />{item.rating} <small>({item.reviews})</small></span><span>{item.duration}</span></div><Link to={`/experiences?book=${item.id}`}>Book experience <ArrowUpRight size={15} /></Link></div>
    </article>
  )
}
