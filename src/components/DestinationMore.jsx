import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { hotels } from '../data/travel'
import { experiences } from '../data/catalog'
import { ExperienceCard, HotelCard } from './Cards'

export default function DestinationMore({ item }) {
  return <><section className="section container"><div className="section-heading"><div><span className="eyebrow"><i />Stay close to the feeling</span><h2>Places we’d book in a heartbeat</h2><p>Handpicked stays near {item.name}, chosen for atmosphere and ease.</p></div><Link className="text-link" to="/hotels">All stays <ArrowRight size={15} /></Link></div><div className="home-hotel-grid">{hotels.slice(0, 2).map((hotel) => <HotelCard hotel={hotel} key={hotel.id} />)}</div></section><section className="section destination-experiences"><div className="container"><div className="section-heading section-heading--light"><div><span className="eyebrow"><i />Make a day of it</span><h2>Experiences in {item.name}</h2></div><Link className="text-link" to="/experiences">See everything <ArrowRight size={15} /></Link></div><div className="home-experience-grid">{experiences.slice(0, 3).map((experience) => <ExperienceCard item={experience} key={experience.id} />)}</div></div></section></>
}
