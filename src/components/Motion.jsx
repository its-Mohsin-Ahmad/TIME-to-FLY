import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</Tag>
}

export function CountUp({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 1300
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        setCount(value * eased)
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.5 })
    observer.observe(node)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [value])
  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>
}

export function Stars({ rating = 5, count, light = false }) {
  return <span className={`stars ${light ? 'stars--light' : ''}`} aria-label={`${rating} out of 5 stars`}><span aria-hidden="true">★★★★★</span>{count !== undefined && <small>({count})</small>}</span>
}
