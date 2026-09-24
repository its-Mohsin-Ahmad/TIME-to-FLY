import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Plane } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { flights } from '../data/travel'
import { defaultFilters, resetFilters } from '../data/filterState'
import { useTravel } from '../context/TravelContext'
import PageHero from '../components/PageHero'
import { EmptyState } from '../components/PageChrome'
import FlightFilters from '../components/FlightFilters'
import { FlightInsight, FlightResult } from '../components/FlightResults'

const today = new Date().toISOString().split('T')[0]
const sortLabels = ['Recommended', 'Cheapest', 'Fastest', 'Best schedule']

export default function FlightsPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { addBooking } = useTravel()
  const [sort, setSort] = useState('Recommended')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [filters, setFilters] = useState(defaultFilters())
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState({ from: params.get('from') || 'New York (JFK)', to: params.get('to') || 'Bali (DPS)', depart: params.get('depart') || '', return: params.get('return') || '', trip: params.get('trip') || 'Round trip' })
  const visible = useMemo(() => {
    const items = flights.filter((flight) => flight.price <= +filters.price && (!filters.Stops.length || filters.Stops.some((item) => item === 'Nonstop' ? flight.stops === 0 : item === '1 stop' ? flight.stops === 1 : flight.stops > 1)))
    return [...items].sort((a, b) => sort === 'Cheapest' ? a.price - b.price : sort === 'Fastest' ? parseInt(a.duration) - parseInt(b.duration) : sort === 'Best schedule' ? Number(Boolean(b.schedule)) - Number(Boolean(a.schedule)) : Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)))
  }, [filters, sort])
  const runSearch = (event) => { event.preventDefault(); setSearching(true); setTimeout(() => { setSearching(false); document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }) }, 500) }
  const select = (flight) => {
    const booking = addBooking({ type: 'Flight', title: `${flight.from} to ${flight.to}`, airline: flight.airline, date: query.depart || 'Oct 12, 2026', status: 'Confirmed', total: flight.price * 2 })
    navigate(`/ticket/${booking.id}?flight=${flight.id}`)
  }
  return <main id="main-content"><PageHero compact eyebrow="Flights" title={<>The whole world,<br />one departure away.</>} text="Compare thoughtful options from trusted airlines, with fares designed to be clear and flexible." image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=90"><FlightSearch query={query} setQuery={setQuery} runSearch={runSearch} /></PageHero><section className="results-section container" id="results"><div className="results-top"><div><span className="micro-label">{query.from} <ArrowRight size={12} /> {query.to}</span><h2>{searching ? 'Finding your best fares…' : `${visible.length} flights found`}</h2><p>Oct 12–19 · Economy · Prices include taxes</p></div><div><button className="btn btn--outline filter-mobile" onClick={() => setMobileFilters(true)}>Filters</button><label className="sort-select"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}>{sortLabels.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label></div></div><div className="results-layout"><FlightFilters values={filters} setValues={setFilters} clear={() => setFilters(resetFilters())} /><div className="flight-results">{searching ? [1, 2, 3].map((item) => <div className="skeleton-flight" key={item} />) : visible.length ? visible.map((flight) => <FlightResult flight={flight} key={flight.id} onSelect={() => select(flight)} />) : <EmptyState title="No flights match these filters" text="Try a higher price or fewer filters." action={<button className="btn btn--dark" onClick={() => setFilters(resetFilters())}>Clear filters</button>} />}</div><FlightInsight /></div></section><div className={`mobile-filter-wrap ${mobileFilters ? 'is-open' : ''}`}><button className="drawer-overlay" onClick={() => setMobileFilters(false)} aria-label="Close filters" /><FlightFilters mobile values={filters} setValues={setFilters} clear={() => setFilters(resetFilters())} close={() => setMobileFilters(false)} /></div></main>
}

function FlightSearch({ query, setQuery, runSearch }) {
  const change = (key) => (event) => setQuery({ ...query, [key]: event.target.value })
  return <form className="page-flight-search glass-panel" onSubmit={runSearch}><div className="trip-switcher">{['One way', 'Round trip', 'Multi city'].map((type) => <button type="button" className={query.trip === type ? 'is-active' : ''} onClick={() => setQuery({ ...query, trip: type })} key={type}>{type}</button>)}</div><div className="page-search-fields"><label><span>From</span><input value={query.from} onChange={change('from')} /></label><label><span>To</span><input value={query.to} onChange={change('to')} /></label><label><span>Departure</span><input type="date" min={today} value={query.depart} onChange={change('depart')} /></label><label><span>Return</span><input type="date" min={today} value={query.return} onChange={change('return')} /></label><label><span>Travelers</span><select><option>1 traveler</option><option>2 travelers</option><option>3 travelers</option></select></label><label><span>Cabin</span><select><option>Economy</option><option>Premium economy</option><option>Business</option><option>First class</option></select></label><button className="btn btn--aqua"><Plane size={17} />Search</button></div></form>
}
