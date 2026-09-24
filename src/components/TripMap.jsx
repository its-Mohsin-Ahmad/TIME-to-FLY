import { MapPin } from 'lucide-react'

export default function TripMap() {
  return <div className="trip-map-view"><div className="map-grid" /><span className="map-route"><i /><i /><i /><i /></span><div className="trip-map-label label-1"><MapPin />Solei Resort</div><div className="trip-map-label label-2"><MapPin />Ubud Market</div><div className="trip-map-label label-3"><MapPin />Nusa Penida</div><div className="map-legend"><strong>7 days in Bali</strong><p>4 stays · 8 experiences · 2 transfers</p></div></div>
}
