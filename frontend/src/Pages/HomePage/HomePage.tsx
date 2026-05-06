import React from 'react'
import Hero from '../../Components/Hero/Hero'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-textMain tracking-tight mb-4">
              Why choose <span className="text-brandBlue">FinSeek</span>?
            </h2>
            <p className="text-lg text-textMuted max-w-2xl mx-auto">
              We provide the tools you need to make informed decisions without the noise of traditional financial media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-surfaceLight rounded-3xl border border-slate-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-brandBlueLight rounded-2xl flex items-center justify-center text-brandBlue mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-textMain mb-3">Smart Search</h3>
              <p className="text-textMuted leading-relaxed">
                Find exactly what you need with our lightning-fast search. Instantly discover companies by name or ticker symbol.
              </p>
            </div>

            <div className="p-8 bg-surfaceLight rounded-3xl border border-slate-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-brandGreen mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-textMain mb-3">Custom Portfolios</h3>
              <p className="text-textMuted leading-relaxed">
                Build and manage your personalized watchlists. Add or remove assets with a single click to track your favorites.
              </p>
            </div>

            <div className="p-8 bg-surfaceLight rounded-3xl border border-slate-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-brandBlueLight rounded-2xl flex items-center justify-center text-brandBlue mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-textMain mb-3">Pure Analytics</h3>
              <p className="text-textMuted leading-relaxed">
                Focus on pure financial data and core fundamentals. No noise, no biased opinions—just the numbers you need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage