import { useState } from 'react'

const FEELS = ["neutral","happy","sad","angry","surprised","fearful","disgust","contempt"]
const EYES = ["steady","frequent_blinks","rapid_saccades","averted_gaze","downcast","closed"]
const HEAD = ["neutral","left","right","forward","back"]
const BODY = ["still","restless","open_posture","closed_posture","fidgeting"]
const VOICE = ["calm","tense","shaky","loud","soft","monotone","varied"]

function Select({label, value, onChange, options}){
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <select value={value || ''} onChange={(e)=>onChange(e.target.value || null)} className="mt-1 w-full bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2">
        <option value="">Not provided</option>
        {options.map(o => <option key={o} value={o}>{o.replace(/_/g,' ')}</option>)}
      </select>
    </label>
  )
}

function NumberInput({label, value, onChange, min, max, step}){
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <input type="number" value={value ?? ''} onChange={(e)=>onChange(e.target.value === '' ? null : Number(e.target.value))} min={min} max={max} step={step}
        className="mt-1 w-full bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2" />
    </label>
  )
}

function AnalyzerForm({onResult}){
  const [form, setForm] = useState({
    facial_expression: null,
    eye_movement: null,
    head_tilt: null,
    upper_body_movement: null,
    voice_tone: null,
    text_message: '',
    blink_rate: null,
    gaze_stability: null,
    speech_rate_wpm: null,
    pitch_variability: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = { ...form }
      if (!payload.text_message) delete payload.text_message
      const res = await fetch(`${baseUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      onResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Select label="Facial expression" value={form.facial_expression} onChange={v=>setForm(f=>({...f, facial_expression: v||null}))} options={FEELS} />
        <Select label="Eye movement" value={form.eye_movement} onChange={v=>setForm(f=>({...f, eye_movement: v||null}))} options={EYES} />
        <Select label="Head tilt" value={form.head_tilt} onChange={v=>setForm(f=>({...f, head_tilt: v||null}))} options={HEAD} />
        <Select label="Upper-body movement" value={form.upper_body_movement} onChange={v=>setForm(f=>({...f, upper_body_movement: v||null}))} options={BODY} />
        <Select label="Voice tone" value={form.voice_tone} onChange={v=>setForm(f=>({...f, voice_tone: v||null}))} options={VOICE} />
      </div>

      <label className="block">
        <span className="text-sm text-slate-300">Text message (optional)</span>
        <textarea value={form.text_message} onChange={e=>setForm(f=>({...f, text_message: e.target.value}))}
          className="mt-1 w-full bg-slate-800 text-slate-100 border border-slate-700 rounded px-3 py-2 h-24" placeholder="Type any transcript or chat message here" />
      </label>

      <div className="grid md:grid-cols-2 gap-4">
        <NumberInput label="Blink rate (blinks/min)" value={form.blink_rate} onChange={v=>setForm(f=>({...f, blink_rate: v}))} min={0} max={100} step={1} />
        <NumberInput label="Gaze stability (0-1)" value={form.gaze_stability} onChange={v=>setForm(f=>({...f, gaze_stability: v}))} min={0} max={1} step={0.01} />
        <NumberInput label="Speech rate (wpm)" value={form.speech_rate_wpm} onChange={v=>setForm(f=>({...f, speech_rate_wpm: v}))} min={0} max={400} step={1} />
        <NumberInput label="Pitch variability (0-1)" value={form.pitch_variability} onChange={v=>setForm(f=>({...f, pitch_variability: v}))} min={0} max={1} step={0.01} />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button disabled={loading} className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-6 py-2 rounded">
        {loading ? 'Analyzing…' : 'Analyze'}
      </button>
    </form>
  )
}

export default AnalyzerForm
