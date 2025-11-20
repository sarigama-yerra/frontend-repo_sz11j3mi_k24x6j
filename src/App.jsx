import { useState } from 'react'
import Hero from './components/Hero'
import AnalyzerForm from './components/AnalyzerForm'
import Results from './components/Results'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Hero />
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur">
            <h3 className="text-xl font-semibold mb-4">Input Signals</h3>
            <AnalyzerForm onResult={setResult} />
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 min-h-[300px]">
            <h3 className="text-xl font-semibold mb-4">Analysis</h3>
            {result ? (
              <Results data={result} />
            ) : (
              <p className="text-slate-300">Provide any combination of cues and click Analyze to see estimated emotions, stress, attention, confidence, honesty, and tailored suggestions.</p>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center text-slate-400 py-8 text-sm">This tool provides indicative insights only and should not be used for medical or legal decisions.</footer>
    </div>
  )
}

export default App
