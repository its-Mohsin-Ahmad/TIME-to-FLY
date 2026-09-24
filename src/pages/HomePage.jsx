import { useEffect, useState } from 'react'
import { ArrowRight, CirclePlay, MapPin, MoveRight, Play, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import DestinationCarousel from '../components/DestinationCarousel'
import { CountUp, Reveal } from '../components/Motion'

function VideoModal({ onClose }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <div className="video-modal" role="dialog" aria-modal="true" aria-label="TIME TO FLY film"><button className="video-backdrop" onClick={onClose} aria-label="Close video" /><div className="video-frame"><button className="video-close icon-button" onClick={onClose} aria-label="Close video"><X /></button><div className="video-poster"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=90" alt="Aerial mountain landscape" /><div><span>TIME TO FLY PRESENTS</span><h2>Some places stay<br />with you.</h2><p>Real journeys. Unscripted moments. A world worth crossing for.</p><button onClick={onClose}><Play size={20} fill="currentColor" />Play film · 1:24</button></div></div></div></div>
}

export default function HomePage() {
  const [video, setVideo] = useState(false)
  return <>
    <section className="home-hero">
      <img className="home-hero__image" src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2200&q=90" alt="Cliffside islands surrounded by clear turquoise water" />
      <div className="home-hero__veil" />
      <div className="home-hero__flight-path" aria-hidden="true"><svg viewBox="0 0 440 250"><path d="M8 213C104 209 108 18 244 93S365 37 432 24" /><circle cx="8" cy="213" r="6" /><circle cx="432" cy="24" r="6" /><path d="m247 93-21 20 26-6-5-14Z" /></svg></div>
      <div className="home-hero__content container-wide"><div className="hero-copy"><span className="eyebrow"><i />The world is waiting</span><h1>Journeys that<br /><em>stay with you.</em></h1><p>Discover extraordinary places, thoughtful stays, and flights that open the way—then keep every detail of your journey in one beautiful place.</p><div className="hero-actions"><Link className="btn btn--aqua" to="/destinations">Explore destinations <ArrowRight size={16} /></Link><button className="btn btn--glass" onClick={() => setVideo(true)}><CirclePlay size={18} />Watch our story</button></div><div className="hero-proof"><div className="avatar-stack"><span>AM</span><span>JD</span><span>SL</span></div><div><span className="stars stars--light">★★★★★</span><p>Loved by 10,000+ curious travelers</p></div></div></div><div className="hero-booking"><div className="hero-booking__head"><div><span>Where would you like to go?</span><small>Build your journey in a few easy steps</small></div><span className="secure-chip">Secure booking</span></div><BookingWidget /><p className="booking-note"><Star size={12} fill="currentColor" /> Price-drop protection and flexible options on select journeys</p></div></div>
      <div className="hero-scroll"><span>Scroll to wander</span><i /></div>
    </section>
    <DestinationCarousel />
    {video && <VideoModal onClose={() => setVideo(false)} />}
  </>
}
