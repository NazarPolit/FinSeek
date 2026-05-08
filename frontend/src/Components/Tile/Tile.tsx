import React from 'react'

type Props = {
    title: string;
    subTitle: string;
}

const Tile = ({title, subTitle}: Props) => {
  return (
    <div className="bg-white rounded-2xl px-5 py-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col justify-center h-full">
        <h5 className="text-slate-500 uppercase font-bold text-xs tracking-widest mb-2">
            {title}
        </h5>
        <span 
            className="font-extrabold text-xl md:text-2xl text-slate-900 tracking-tight break-words line-clamp-2 leading-tight" 
            title={subTitle}
        >
            {subTitle}
        </span>
    </div>
  )
}

export default Tile