import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { destinations } from '../data/travel'
import { DestinationCard } from './Cards'

export default function DestinationCarousel() {
  const track = useRef(null)
  const [paused, setPaused] = useState(false)
  const [position, setPosition] = useState(0)
  const move = (direction) => {
    const node = track.current
    if (!node) return
    const card = node.querySelector('.destination-card')
    const amount = (card?.getBoundingClientRect().width || 260) + 16
    node.scrollBy({ left: direction * amount * 2, behavior: 'smooth' })
  }
  useEffect(() => {
    const node = track.current
    const update = () => setPosition(Math.max(0, Math.round(node.scrollLeft / (node.scrollWidth - node.clientWidth || 1))))
    node?.addEventListener('scroll', update, { passive: true })
    return () => node?.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(() => {
      const node = track.current
      if (!node) return
      const nearEnd = node.scrollLeft + node.clientWidth > node.scrollWidth - 40
      node.scrollTo({ left: nearEnd ? 0 : node.scrollLeft + 520, behavior: 'smooth' })
    }, 5000)
    return () => clearInterval(timer)
  }, [paused])
  return <section className="popular-destinations container-wide" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-labelledby="popular-title"><div className="popular-head"><div><span className="eyebrow"><i />Places that call to you</span><h2 id="popular-title">Popular destinations</h2></div><div className="carousel-controls"><button className="icon-button icon-button--light" onClick={() => move(-1)} aria-label="Previous destinations"><ArrowLeft size={18} /></button><button className="icon-button icon-button--light" onClick={() => move(1)} aria-label="Next destinations"><ArrowRight size={18} /></button></div></div><div className="destination-track" ref={track} tabIndex="0" aria-label="Destination carousel, swipe to browse"><div className="destination-track__inner">{destinations.map((item) => <DestinationCard item={item} key={item.id} />)}</div><div className="carousel-progress"><span style={{ transform: `scaleX(${Math.max(.08, 1 - position * .22)})` }} /></div></div></section>
}
