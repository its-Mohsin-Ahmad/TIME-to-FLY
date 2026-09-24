import { ChevronRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PageHero({ eyebrow, title, text, image, children, compact = false }) {
  return <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`} style={image ? { '--page-image': `url(${image})` } : undefined}><div className="page-hero__veil" /><div className="container page-hero__content"><div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={12} /><span>{eyebrow}</span></div><div className="page-hero__copy"><span className="eyebrow"><i />{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>{children}</div></section>
}

export function PageIntro({ eyebrow, title, text, children }) {
  return <div className="page-intro"><div><span className="eyebrow"><i />{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{children}</div>
}

export function EmptyState({ title = 'Nothing here yet', text, action }) {
  return <div className="empty-state"><Search size={30} /><h3>{title}</h3>{text && <p>{text}</p>}{action}</div>
}
