import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

export default function Brand({ light = false, compact = false }) {
  return (
    <Link className={`brand ${light ? 'brand--light' : ''}`} to="/" aria-label="TIME TO FLY home">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path d="M5 34 19 7l5 16L43 11 26 40l-5-15L5 34Z" fill="currentColor" />
          <path d="M9 35 41 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 5" opacity=".75" />
        </svg>
      </span>
      {!compact && <span className="brand__words"><strong>TIME TO FLY</strong><small>YOUR JOURNEY STARTS HERE</small></span>}
      <Plane className="brand__plane" size={12} aria-hidden="true" />
    </Link>
  )
}
