import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TripCalendar({ days }) {
  return <div className="trip-calendar"><header><button><ChevronLeft /></button><h2>October 2026</h2><button><ChevronRight /></button></header><div className="calendar-grid">{['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18'].map((date, index) => <div key={date}><strong>{date}</strong><span className={index === 0 ? 'calendar-today' : ''}>{12 + index}</span><p>{days[index]?.items.slice(0, 2).map((item) => <button key={item.title}>{item.time} {item.title}</button>)}</p></div>)}</div></div>
}
