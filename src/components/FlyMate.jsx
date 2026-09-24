import { useState } from 'react'
import { Bot, CheckCircle2, Send, Sparkles, X } from 'lucide-react'
import { useTravel } from '../context/TravelContext'

const replies = {
  dubai: 'I found a polished 4-day Dubai plan: stay at The Palm, visit Al Fahidi and the marina, then end with a private desert safari. Estimated budget: $1,180 per person. Want a luxury or value version?',
  istanbul: 'Start with Hagia Sophia and the Blue Mosque before lunch, cross the Bosphorus, and finish around Karaköy. Keep a buffer for the Grand Bazaar and a sunset waterfront dinner. Estimated local spend: $65/day.',
  budget: 'For a budget-friendly week, stay centrally, travel by metro or shared transfer, book free museums, and schedule one paid landmark each day. I can build the full itinerary around your city and dates.',
  hotel: 'For Burj Khalifa views, compare The Address Downtown with stays on Sheikh Zayed Road. The Address has the closest views; I can compare nightly rates and cancellation terms.',
}

export default function FlyMate() {
  const { assistantOpen, setAssistantOpen, notify } = useTravel()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello, I’m FlyMate. Ask me to plan a trip, compare stays, or find something to do.' }])
  const send = (event) => {
    event.preventDefault()
    if (!input.trim()) return
    const value = input.trim()
    const key = Object.keys(replies).find((word) => value.toLowerCase().includes(word))
    setMessages((items) => [...items, { from: 'user', text: value }, { from: 'bot', text: replies[key] || 'I can help with that. Tell me your destination, travel dates, budget, and travel style, and I’ll turn it into a day-by-day plan.' }])
    setInput('')
  }
  return <>
    <button className={`flymate-launcher ${assistantOpen ? 'is-open' : ''}`} onClick={() => setAssistantOpen(!assistantOpen)} aria-label="Open FlyMate AI"><span><Bot size={23} /></span><strong>Ask FlyMate</strong><small>AI travel assistant</small></button>
    {assistantOpen && <aside className="flymate-panel" aria-label="FlyMate travel assistant"><div className="flymate-head"><div><span><Sparkles size={17} /></span><div><strong>FlyMate AI</strong><small><i /> Online · Plans with you</small></div></div><button className="icon-button" onClick={() => setAssistantOpen(false)} aria-label="Close assistant"><X size={19} /></button></div><div className="flymate-body">{messages.map((message, index) => <div className={`chat-message chat-message--${message.from}`} key={index}>{message.from === 'bot' && <span><Bot size={14} /></span>}<p>{message.text}</p></div>)}<div className="quick-prompts">{['Plan 4 days in Dubai', 'Budget itinerary', 'Hotels near Burj Khalifa'].map((text) => <button key={text} onClick={() => setInput(text)}>{text}</button>)}</div></div><form className="flymate-input" onSubmit={send}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about any destination…" aria-label="Message FlyMate" /><button aria-label="Send message"><Send size={17} /></button></form><div className="flymate-foot"><CheckCircle2 size={12} /> Demo planning assistant · Verify before booking</div><button className="flymate-feedback" onClick={() => notify('Thanks for helping FlyMate improve')}>Help improve FlyMate</button></aside>}
  </>
}
