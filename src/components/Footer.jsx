import { useState } from 'react'
import { ArrowRight, Mail, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import { useTravel } from '../context/TravelContext'

const groups = [
  { title: 'Company', links: [['About us', '/about'], ['Careers', '/about'], ['Contact', '/support'], ['Stories', '/blog']] },
  { title: 'Explore', links: [['Destinations', '/destinations'], ['Flights', '/flights'], ['Hotels', '/hotels'], ['Experiences', '/experiences'], ['Packages', '/deals']] },
  { title: 'Support', links: [['Help center', '/support'], ['Travel guides', '/guide'], ['Cancellation', '/support'], ['Contact us', '/support']] },
  { title: 'Legal', links: [['Privacy policy', '/legal'], ['Terms', '/legal'], ['Cookie settings', '/legal'], ['Accessibility', '/legal']] },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { notify } = useTravel()
  const subscribe = (event) => {
    event.preventDefault()
    if (!email.includes('@')) return notify('Enter a valid email address', 'error')
    notify('Welcome aboard — travel inspiration is on its way')
    setEmail('')
  }
  return <footer className="site-footer"><div className="footer-orbit" aria-hidden="true" /><div className="container-wide"><div className="footer-newsletter"><div><span className="eyebrow"><i />Postcards from elsewhere</span><h2>A little inspiration for<br />your next departure.</h2><p>Destination stories, considered escapes, and useful travel advice—occasionally.</p></div><form onSubmit={subscribe}><Mail size={18} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email for newsletter" /><button>Subscribe <Send size={15} /></button><small>By subscribing, you agree to our privacy policy. No clutter, ever.</small></form></div><div className="footer-main"><div className="footer-brand"><Brand light /><p>One beautiful place to plan, book, and remember every journey.</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><span aria-hidden="true">◎</span></a><a href="https://facebook.com" aria-label="Facebook"><span aria-hidden="true">f</span></a><a href="https://linkedin.com" aria-label="LinkedIn"><span aria-hidden="true">in</span></a><a href="https://youtube.com" aria-label="YouTube"><span aria-hidden="true">▶</span></a></div></div><div className="footer-links">{groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}</div>)}</div><div className="footer-trip"><strong>Ready when you are</strong><p>Turn a feeling of possibility into a trip you can look forward to.</p><Link to="/trips">Start planning <ArrowRight size={15} /></Link></div></div><div className="footer-bottom"><p>© 2026 TIME TO FLY. All journeys reserved.</p><p>Made for people who still believe in the magic of going.</p></div></div></footer>
}
