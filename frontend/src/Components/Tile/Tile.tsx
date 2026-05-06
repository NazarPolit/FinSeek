import React from 'react'

type Props = {
    title: string;
    subTitle: string;
}

const Title = ({title, subTitle}: Props) => {
  return (
    <div className="w-full">
        <div className="relative flex flex-col justify-center">
            <h5 className="text-white/80 uppercase font-extrabold text-xs md:text-sm tracking-[0.2em] mb-2">
                {title}
            </h5>  
            <span className="font-extrabold text-4xl md:text-5xl text-white tracking-tight leading-none drop-shadow-sm">
                {subTitle}
            </span>
            
        </div>
    </div>
  )
}

export default Title