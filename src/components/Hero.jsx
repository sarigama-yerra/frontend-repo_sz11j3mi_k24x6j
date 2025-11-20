import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_60%)]" />
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-sm">
          AI Behavior Analysis Engine
        </h1>
        <p className="mt-4 text-slate-200 text-lg md:text-xl">
          Analyze expressions, gaze, posture, voice cues and text to estimate emotion, stress, attention and more.
        </p>
      </div>
    </section>
  )
}

export default Hero
