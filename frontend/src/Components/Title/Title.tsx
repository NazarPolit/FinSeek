import React from 'react'

type Props = {
    title: string;
    subTitle: string;
}

const Title = ({title, subTitle}: Props) => {
  return (
    <div className="flex flex-col">
        <h5 className="text-white/80 uppercase font-bold text-sm tracking-[0.15em] mb-2">
            {title}
        </h5>  
        <span className="font-extrabold text-4xl md:text-5xl text-white tracking-tight drop-shadow-sm truncate max-w-full" title={subTitle}>
            {subTitle}
        </span>
    </div>
  )
}

export default Title