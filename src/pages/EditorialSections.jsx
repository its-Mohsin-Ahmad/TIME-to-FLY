import { ArrowRight, Quote, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogPosts, reviews } from '../data/catalog'
import { Reveal, Stars } from '../components/Motion'
import { SectionHeading } from '../components/Cards'

export default function EditorialSections() {
  return <><Reviews /><Guides /><section className="assurance-banner"><div className="container"><div><span><ShieldCheck /></span><p><strong>Travel with confidence.</strong> Secure payments, human support, and clear policies from search to landing.</p></div><Link to="/support">How we protect your journey <ArrowRight size={15} /></Link></div></section></>
}

function Reviews() {
  return <section className="section review-section"><div className="container"><Reveal><SectionHeading eyebrow="Stories from the other side" title="Already planning the next one." text="Travel stories from people who found their way there with us." /></Reveal><div className="review-grid">{reviews.map((item, index) => <Reveal className="review-card" delay={index * 100} key={item.name}><Quote size={26} /><Stars rating={item.rating} light /><blockquote>“{item.quote}”</blockquote><div><span>{item.initials}</span><p><strong>{item.name}</strong><small>{item.trip}</small></p></div></Reveal>)}</div></div></section>
}

function Guides() {
  return <section className="section container guide-preview"><Reveal><SectionHeading eyebrow="Know before you go" title="Travel guides, written by people who went." action="Open the travel guide" to="/guide" /><div className="guide-grid">{blogPosts.map((post, index) => <Reveal className="guide-card" delay={index * 100} key={post.id}><img src={post.image} alt={post.title} loading="lazy" /><div><span>{post.category}</span><h3>{post.title}</h3><p>By {post.author} · {post.read} read</p><Link to="/guide" aria-label={`Read ${post.title}`}><ArrowRight /></Link></div></Reveal>)}</div></Reveal></section>
}
