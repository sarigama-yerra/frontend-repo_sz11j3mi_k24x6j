function Bar({label, value, color="bg-blue-500"}){
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-300 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded">
        <div className={`h-2 ${color} rounded`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function Results({data}){
  if (!data) return null
  const emotions = data.emotion_percentages || {}
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          {Object.entries(emotions).map(([k,v]) => (
            <Bar key={k} label={k.replace(/_/g,' ')} value={v} />
          ))}
        </div>
        <div className="space-y-4">
          <Bar label="Stress" value={data.stress_score} color="bg-rose-500" />
          <Bar label="Attention" value={data.attention_score} color="bg-emerald-500" />
          <Bar label="Confidence" value={data.confidence_level} color="bg-indigo-500" />
          <Bar label="Honesty" value={data.honesty_probability} color="bg-amber-500" />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded p-4 text-slate-200">
        {data.summary}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
          <h4 className="font-semibold text-white mb-2">Suggestions for Interviewer</h4>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {(data.suggestions?.interviewer || []).map((s,i)=> <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
          <h4 className="font-semibold text-white mb-2">Suggestions for Teacher</h4>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {(data.suggestions?.teacher || []).map((s,i)=> <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
          <h4 className="font-semibold text-white mb-2">Suggestions for You</h4>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {(data.suggestions?.user || []).map((s,i)=> <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Results
