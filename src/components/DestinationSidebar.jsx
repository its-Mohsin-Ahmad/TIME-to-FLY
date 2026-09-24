import { Map, ShieldCheck } from 'lucide-react'

export default function DestinationSidebar() {
  return <aside className="detail-aside"><div className="destination-map"><div className="map-grid" /><span className="map-pin"><i /><b>Explore this place</b></span><button><Map size={15} />Open interactive map</button><div className="map-roads" /></div><div className="local-card"><div className="avatar-stack"><span>LOCAL</span></div><h3>Made better with a local</h3><p>Private guides and small hosts chosen for warmth, knowledge, and great stories.</p><button className="btn btn--dark">Find a local experience</button></div><div className="safe-card"><ShieldCheck /><div><strong>Travel with confidence</strong><p>Expert support, secure payments, and clear cancellation terms.</p></div></div></aside>
}
