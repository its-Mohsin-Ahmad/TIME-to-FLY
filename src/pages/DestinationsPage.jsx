import { useMemo, useState } from 'react'
import { ChevronDown, Compass, Search, SlidersHorizontal } from 'lucide-react'
import { destinations } from '../data/travel'
import { DestinationCard } from '../components/Cards'
import PageHero from '../components/PageHero'
import { EmptyState } from '../components/PageChrome'
import { Reveal } from '../components/Motion'

const regions = ['All regions', 'Asia', 'Europe', 'Middle East', 'Africa', 'North America', 'South America', 'Australia', 'Islands']

export default function DestinationsPage() {
  const [region, setRegion] = useState('All regions')
  const [query, setQuery] = useState('')
  const [season, setSeason] = useState('Any season')
  const filtered = useMemo(() => destinations.filter((item) => (region === 'All regions' || item.region === region) && `${item.name} ${item.country} ${item.attractions.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (season === 'Any season' || item.season.includes(season))), [region, query, season])
  return <main id="main-content"><PageHero eyebrow="Destinations" title={<>Find the place that<br /><em>feels like you.</em></>} text="A world of remarkable places, considered for the season, the mood, and the way you want to feel." image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2200&q=90" /><section className="catalog-section container"><div className="catalog-toolbar"><div className="catalog-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by city, country, or attraction" aria-label="Search destinations" /></div><label><span>Region</span><select value={region} onChange={(e) => setRegion(e.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label><label><span>Best time</span><select value={season} onChange={(e) => setSeason(e.target.value)}><option>Any season</option><option>Nov</option><option>Apr</option><option>Jun</option></select><ChevronDown size={14} /></label><button className="btn btn--outline"><SlidersHorizontal size={15} />More filters</button><p>{filtered.length} places</p></div>{filtered.length ? <div className="destination-catalog">{filtered.map((item, index) => <Reveal key={item.id} delay={index % 3 * 80}><DestinationCard item={item} /></Reveal>)}</div> : <EmptyState title="No destinations found" text="Try another region or a broader search." action={<button className="btn btn--dark" onClick={() => { setRegion('All regions'); setQuery('') }}>Reset search</button>} />}<aside className="destination-inspiration"><span><Compass /></span><div><small>FlyMate recommends</small><h3>Somewhere different, not just new.</h3><p>Tell us your pace, season, and budget. We’ll match you with a destination that fits how you want to travel.</p></div><button className="btn btn--aqua" onClick={() => window.dispatchEvent(new CustomEvent('ttf-open-flymate'))}>Ask FlyMate</button></aside></section></main>
}
