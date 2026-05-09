import React from 'react'
import { Outlet } from 'react-router-dom'
import Tile from '../Tile/Tile'

type Props = {
    children: React.ReactNode;
    ticker: string;
    companyData?: any;
}

const CompanyDashboard = ({children, ticker, companyData}: Props) => {
  return (
    <div className="relative md:ml-64 bg-slate-50 min-h-screen flex flex-col w-full md:w-[calc(100%-16rem)]">
        
        <div className="relative pt-12 pb-32 bg-gradient-to-r from-brandBlue to-blue-700 shadow-md">
            <div className="px-6 md:px-10 mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>

        <div className="relative z-10 px-6 md:px-10 mx-auto max-w-7xl w-full -mt-20"> 
            
            {companyData && (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <Tile title="Symbol" subTitle={ticker} />
                        <Tile title="Price" subTitle={companyData.price ? `$${companyData.price.toFixed(2)}` : "N/A"} />
                        <Tile title="DCF" subTitle={companyData.dcf ? `$${companyData.dcf.toFixed(2)}` : "N/A"} />
                        <Tile title="Sector" subTitle={companyData.sector || "N/A"} />
                    </div>
                </>
            )}

            <div className="pb-10">
                <Outlet context={ticker}/>
            </div>
        </div>
        
    </div>
  )
}

export default CompanyDashboard