import { useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronDown, Filter, MapPin, Search, Star, Users } from 'lucide-react'
import { experiences } from '../data/catalog'
import { ExperienceCard } from '../components/Cards'
import PageHero from '../components/PageHero'
import { EmptyState } from '../components/PageChrome'

const categories = ['All', 'Adventure', 'Beach', 'Luxury', 'Family', 'Honeymoon', 'Nature', 'Cultural', 'Food', 'Shopping', 'Nightlife', 'Photography', 'Sports']

export default function ExperiencesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => experiences.filter((item) => (category === 'All' || item.category === category) && `${item.title} ${item.location}`.toLowerCase().includes(query.toLowerCase())), [query, category])
  return <main id="main-content"><PageHero eyebrow="Experiences" title={<>The moments you’ll<br />still be talking about.</>} text="Small-group adventures, generous tables, remarkable guides, and the kind of days that become stories." image="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=2200&q=90"><div className="page-inline-search glass-panel"><label><span>Where</span><div><MapPin size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Destination" /></div></label><label><span>When</span><input type="date" /></label><label><span>Travelers</span><select><option>2 travelers</option><option>1 traveler</option><option>4 travelers</option></select></label><button className="btn btn--aqua"><Search size={17} />Find experiences</button></div></PageHero><section className="catalog-section container"><div className="category-pills" role="list">{categories.map((item) => <button className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="catalog-result-head"><div><span className="eyebrow"><i />Curated locally</span><h2>{category === 'All' ? 'Experiences worth leaving the resort for' : `${category} experiences`}</h2></div><label><select><option>Recommended</option><option>Top rated</option><option>Price: low to high</option></select><ChevronDown size={14} /></label></div>{filtered.length ? <div className="experience-catalog">{filtered.map((item) => <ExperienceCard item={item} key={item.id} />)}</div> : <EmptyState title="No experiences found" text="Try a different category or destination." />}</section></main>
}
