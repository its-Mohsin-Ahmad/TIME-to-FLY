import { useEffect } from 'react'
import { CalendarCheck, Gem, Handshake, Plane, ShieldCheck, Star, TicketCheck } from 'lucide-react'
import { serviceFeatures } from '../data/catalog'

const icons = { tag: Gem, headphones: Handshake, calendar: CalendarCheck, shield: ShieldCheck, badge: Star, plane: Plane }

export default function ServiceStrip() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      document.documentElement.style.setProperty('--trust-progress', entries[0].isIntersecting ? '1' : '0')
    })
    const node = document.querySelector('.trust-strip')
    if (node) observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <section className="trust-strip" aria-label="Why book with TIME TO FLY"><div className="container-wide"><span className="trust-intro"><TicketCheck size={18} /><strong>Travel,<br />considered.</strong></span>{serviceFeatures.map((item) => { const Icon = icons[item.icon]; return <div className="trust-item" key={item.title}><span><Icon size={20} /></span><div><strong>{item.title}</strong><p>{item.text}</p></div></div> })}</div></section>
}
