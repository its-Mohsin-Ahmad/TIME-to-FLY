import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CirclePlay, Heart, MapPin, Pause, Play, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'
import { heroDestinations } from '../data/heroDestinations'
import BookingWidget from './BookingWidget'

const AUTOPLAY_DELAY = 6500
const INTERACTION_PAUSE = 3500

function DestinationCard({ destination, active, onSelect }) {
  const { saved, toggleSave } = useTravel()
  const isSaved = saved.includes(destination.id)
  return <article className={`hero-destination-card ${active ? 'is-active' : ''}`}>
    <div className="hero-destination-card__image">
      <button className="hero-destination-card__image-hit" onClick={() => onSelect(destination.id)} aria-label={`Open ${destination.name} destination`}>
        <img src={destination.cardImage} alt={`${destination.name}, ${destination.location}`} loading="lazy" />
        <span className="hero-destination-card__shade" />
        {active && <span className="hero-featured-badge">Featured</span>}
      </button>
      <button className="hero-destination-card__heart" onClick={() => toggleSave(destination.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${destination.name}`}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="hero-destination-card__body">
      <div><Link to={destination.route}><h3>{destination.name}</h3></Link><p><MapPin size={12} />{destination.location}</p></div>
      <span className="hero-rating"><Star size={12} fill="currentColor" />{destination.rating}</span>
    </div>
  </article>
}

function DestinationCardCarousel({ activeId, onSelect }) {
  const trackRef = useRef(null)
  useEffect(() => {
    const activeCard = trackRef.current?.querySelector('.is-active')
    activeCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])
  return <div className="hero-card-carousel">
    <div className="hero-card-carousel__track" ref={trackRef}>{heroDestinations.map((destination) => <DestinationCard key={destination.id} destination={destination} active={activeId === destination.id} onSelect={onSelect} />)}</div>
    <div className="hero-card-carousel__hint"><ArrowRight size={14} /> Swipe to explore</div>
  </div>
}

function CarouselControls({ onPrevious, onNext, paused, onTogglePause }) {
  return <div className="hero-controls"><div className="hero-arrows"><button className="hero-control" onClick={onPrevious} aria-label="Previous destination"><ArrowLeft size={20} /></button><button className="hero-control" onClick={onNext} aria-label="Next destination"><ArrowRight size={20} /></button></div><button className="hero-pause" onClick={onTogglePause} aria-label={paused ? 'Play carousel' : 'Pause carousel'}>{paused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}<span>{paused ? 'Play' : 'Pause'}</span></button></div>
}

function SlideCounter({ current, total }) {
  return <div className="hero-counter" aria-live="polite"><strong>{String(current + 1).padStart(2, '0')}</strong><span>/</span><small>{String(total).padStart(2, '0')}</small></div>
}

function ProgressIndicator({ current, onSelect }) {
  return <div className="hero-progress" role="tablist" aria-label="Choose destination slide">{heroDestinations.map((destination, index) => <button key={destination.id} className={index === current ? 'is-active' : ''} onClick={() => onSelect(index)} role="tab" aria-selected={index === current} aria-label={`Go to slide ${index + 1}: ${destination.name}`}><span /></button>)}</div>
}

function VideoModal({ destination, onClose }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <div className="hero-video-modal" role="dialog" aria-modal="true" aria-label={`${destination.name} destination video`}><button className="hero-video-backdrop" onClick={onClose} aria-label="Close video" /><div className="hero-video-dialog"><div className="hero-video-dialog__head"><span><CirclePlay size={17} /> TIME TO FLY / {destination.category}</span><button onClick={onClose} aria-label="Close video"><X size={19} /></button></div><div className="hero-video-frame"><iframe src={destination.videoUrl} title={`${destination.name} destination film`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div><div className="hero-video-dialog__caption"><span>Featured destination</span><h2>{destination.title} <em>{destination.subtitle}</em></h2><p>{destination.location} · A TIME TO FLY original escape</p></div></div></div>
}

function HeroSlide({ destination, setVideoOpen, index, total }) {
  return <div className="hero-slide" role="tabpanel" aria-label={`${destination.name} destination`}><div className="hero-slide__background"><img src={destination.heroImage} alt={`${destination.name}, ${destination.location}`} loading={destination.id === 2 ? 'eager' : 'lazy'} fetchPriority={destination.id === 2 ? 'high' : 'auto'} /></div><div className="hero-slide__overlay" /><div className="hero-slide__content container-wide"><div className="hero-copy"><span className="hero-category"><i />{destination.category}</span><h1>{destination.title}<br /><em>{destination.subtitle}</em></h1><p>{destination.description} Your next chapter is closer than you think.</p><div className="hero-actions"><Link className="btn btn--aqua hero-primary-cta" to={destination.route}>Explore destination <ArrowRight size={17} /></Link><button className="hero-video-cta" onClick={() => setVideoOpen(destination)} aria-label={`Watch ${destination.name} video`}><span><Play size={14} fill="currentColor" /></span><strong>Watch video</strong><small>See the feeling</small></button></div><div className="hero-proof"><span className="hero-proof__line" /><div><span className="stars stars--light">★★★★★</span><p>Curated for your kind of extraordinary</p></div></div></div><div className="hero-slide__right"><div className="hero-location-pill"><MapPin size={14} /><span>{destination.location}</span><i /></div><div className="hero-side-note"><span>{String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}</span><small>Curated escapes</small></div></div></div></div>
}

function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [videoDestination, setVideoDestination] = useState(null)
  const heroRef = useRef(null)
  const dragRef = useRef({ startX: 0, startY: 0, active: false })
  const interactionTimer = useRef(null)
  const { notify } = useTravel()

  const pauseTemporarily = useCallback(() => {
    setPaused(true)
    window.clearTimeout(interactionTimer.current)
    interactionTimer.current = window.setTimeout(() => setPaused(false), INTERACTION_PAUSE)
  }, [])

  const goTo = useCallback((next, interaction = true) => {
    const normalized = (next + heroDestinations.length) % heroDestinations.length
    setActive(normalized)
    if (interaction) pauseTemporarily()
  }, [pauseTemporarily])

  const previous = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  useEffect(() => {
    if (paused || hovered) return undefined
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % heroDestinations.length), AUTOPLAY_DELAY)
    return () => window.clearTimeout(timer)
  }, [active, hovered, paused])

  useEffect(() => () => window.clearTimeout(interactionTimer.current), [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target.closest('input, textarea, select')) return
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous() }
      if (event.key === 'ArrowRight') { event.preventDefault(); next() }
      if (event.key === ' ' && !event.target.closest('button')) { event.preventDefault(); setPaused((value) => !value) }
    }
    const node = heroRef.current
    node?.addEventListener('keydown', onKeyDown)
    return () => node?.removeEventListener('keydown', onKeyDown)
  }, [next, previous])

  const setParallax = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX / bounds.width - .5) * -10
    const y = (event.clientY / bounds.height - .5) * -6
    event.currentTarget.style.setProperty('--hero-parallax-x', `${x}px`)
    event.currentTarget.style.setProperty('--hero-parallax-y', `${y}px`)
  }

  useEffect(() => {
    const node = heroRef.current
    if (!node) return undefined
    const onPointerMove = (event) => {
      if (event.pointerType === 'mouse') setParallax(event)
    }
    node.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => node.removeEventListener('pointermove', onPointerMove)
  }, [])

  const pointerDown = (event) => {
    if (event.pointerType === 'mouse') return
    dragRef.current = { startX: event.clientX, startY: event.clientY, active: true }
    pauseTemporarily()
  }
  const pointerMove = (event) => {
    if (!dragRef.current.active) return
    if (Math.abs(event.clientX - dragRef.current.startX) > 10 || Math.abs(event.clientY - dragRef.current.startY) > 10) dragRef.current.moved = true
  }
  const pointerUp = (event) => {
    if (!dragRef.current.active) return
    const deltaX = event.clientX - dragRef.current.startX
    const deltaY = event.clientY - dragRef.current.startY
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) deltaX < 0 ? next() : previous()
    dragRef.current.active = false
  }

  return <section ref={heroRef} className="hero-carousel" tabIndex="0" aria-roledescription="carousel" aria-label="TIME TO FLY featured destinations" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div className="hero-visual" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
      <div className="hero-slides">{heroDestinations.map((destination, index) => <div className={`hero-slide-wrap ${index === active ? 'is-active' : ''}`} key={destination.id} aria-hidden={index !== active} inert={index !== active}><HeroSlide destination={destination} setVideoOpen={setVideoDestination} index={index} total={heroDestinations.length} /></div>)}</div>
      <div className="hero-card-dock"><div className="hero-card-dock__header"><span><span className="hero-live-dot" /> Your next escape</span><small>Choose a destination to begin</small></div><DestinationCardCarousel activeId={heroDestinations[active].id} onSelect={(id) => goTo(heroDestinations.findIndex((item) => item.id === id))} /></div>
      <div className="hero-bottom-bar container-wide"><SlideCounter current={active} total={heroDestinations.length} /><div className="hero-progress-wrap"><ProgressIndicator current={active} onSelect={(index) => goTo(index)} /><span className="hero-progress-caption">Discover the places that stay with you</span></div><CarouselControls onPrevious={previous} onNext={next} paused={paused} onTogglePause={() => { setPaused((value) => !value); notify(paused ? 'Carousel resumed' : 'Carousel paused') }} /></div>
    </div>
    <div className="hero-booking-dock container-wide"><div className="hero-booking-dock__title"><span className="eyebrow"><i />Make it yours</span><strong>Start planning your escape</strong></div><BookingWidget /></div>
    {videoDestination && <VideoModal destination={videoDestination} onClose={() => setVideoDestination(null)} />}
  </section>
}

export default HeroCarousel
