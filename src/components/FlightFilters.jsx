import { ChevronDown, CircleCheck, SlidersHorizontal, X } from 'lucide-react'
import { flights } from '../data/travel'

const groups = [
  ['Stops', ['Nonstop', '1 stop', '2+ stops']],
  ['Departure time', ['Morning', 'Afternoon', 'Evening']],
  ['Cabin', ['Economy', 'Business', 'First class']],
]
export default function FlightFilters({ values, setValues, clear, mobile, close }) {
  return <aside className={`filter-panel ${mobile ? 'filter-panel--mobile' : ''}`}><div className="filter-head"><div>{mobile && <X size={20} onClick={close} />}<strong>Filter results</strong></div><button onClick={clear}>Clear all</button></div><label className="price-range"><span>Maximum price <strong>${values.price}</strong></span><input type="range" min="600" max="1200" step="25" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} /></label>{groups.map(([name, options]) => <fieldset key={name}><legend>{name}<ChevronDown size={14} /></legend>{options.map((option) => <label key={option}><input type="checkbox" checked={values[name].includes(option)} onChange={() => setValues({ ...values, [name]: values[name].includes(option) ? values[name].filter((x) => x !== option) : [...values[name], option] })} /><i />{option}<small>{flights.filter((flight) => name === 'Stops' ? (option === 'Nonstop' ? flight.stops === 0 : option === '1 stop' ? flight.stops === 1 : flight.stops > 1) : true).length}</small></label>)}</fieldset>)}<div className="filter-note"><CircleCheck size={18} /><p><strong>Price-drop protection</strong><br />We’ll tell you if your fare gets better.</p></div>{mobile && <button className="btn btn--dark filter-apply" onClick={close}><SlidersHorizontal size={16} />Show flights</button>}</aside>
}
