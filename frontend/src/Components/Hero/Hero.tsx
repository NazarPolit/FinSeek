import React from 'react'
import hero from "./hero.png"
import { Link } from 'react-router-dom'

interface Props {}

const Hero = (props: Props) => {
  return (
     <section id="hero" className="bg-surfaceLight pt-10 pb-20">
      <div className="container flex flex-col-reverse mx-auto px-6 lg:flex-row items-center">
        <div className="flex flex-col space-y-8 lg:w-1/2 mt-10 lg:mt-0">
          <h1 className="text-5xl font-extrabold text-center text-textMain lg:text-6xl lg:text-left leading-tight tracking-tight">
            Financial data with <span className="text-brandBlue">no news.</span>
          </h1>
          <p className="text-xl text-center text-textMuted lg:text-left md:max-w-xl mx-auto lg:mx-0">
            Search relevant financial documents, track your portfolio, and evaluate stocks without fear-mongering and fake news.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/search"
              className="px-8 py-4 text-lg font-bold text-white bg-brandGreen rounded-xl hover:bg-brandGreenHover shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Now
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-brandBlue opacity-10 rounded-full blur-3xl transform scale-110"></div>
            <img src={hero} alt="Financial Dashboard Analysis" className="relative z-10 drop-shadow-2xl md:w-[500px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero