import { useState } from 'react'
import { ArrowRight, Heart, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { destinations } from '../data/travel'
import { useTravel } from '../context/TravelContext'
import { EmptyState } from '../components/PageChrome'
import DestinationOverview from '../components/DestinationOverview'
import DestinationSidebar from '../components/DestinationSidebar'
import DestinationMore from '../components/DestinationMore'

export default function DestinationDetailPage() {
  const { id } = useParams()
  const item = destinations.find((x) => x.id === +id)
  const { saved, toggleSave, addBooking, notify } = useTravel()
  const [day, setDay] = useState(1)
  if (!item) return <main id="main-content"><div className="container"><EmptyState title="Destination not found" text="This destination may have moved." action={<Link className="btn btn--dark" to="/destinations">Browse destinations</Link>} /></div></main>
  const savedState = saved.includes(item.id)
  const plan = () => { addBooking({ type: 'Trip idea', title: `${item.name} escape`, date: 'Choose dates', status: 'Planning', total: item.price }); notify(`${item.name} added to a new trip idea`) }
  return <main id="main-content"><section className="destination-detail-hero" style={{ '--detail-image': `url(${item.image})` }}><div className="destination-detail-hero__shade" /><div className="container"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/destinations">Destinations</Link><span>/</span><b>{item.name}</b></div><div className="destination-detail-hero__copy"><div><span className="pill pill--glass">{item.tag}</span><h1>{item.name}</h1><p><MapPin size={16} />{item.country}</p></div><div><button className={`btn btn--glass ${savedState ? 'is-saved' : ''}`} onClick={() => toggleSave(item.id)}><Heart fill={savedState ? 'currentColor' : 'none'} size={16} />{savedState ? 'Saved' : 'Save'}</button><button className="btn btn--aqua" onClick={plan}>Plan this trip <ArrowRight size={16} /></button></div></div></div></section><section className="destination-quickfacts container"><QuickFacts item={item} /></section><div className="destination-detail-grid"><DestinationOverview item={item} day={day} setDay={setDay} /><DestinationSidebar /></div><DestinationMore item={item} /></main>
}

function QuickFacts({ item }) {
  return <><div><span>Now</span><strong>{item.weather}</strong></div><div><span>Best season</span><strong>{item.season}</strong></div><div><span>Ideal trip</span><strong>{item.duration}</strong></div><div><span>Travel style</span><strong>All styles</strong></div><div><span>From</span><strong>${item.price} pp</strong></div></>
}
