import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import SideBar from '../../Components/SideBar/SideBar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileInit = async () => {
        setError(null); 
        
        const result = await getCompanyProfile(ticker!);
        
        if (typeof result === "string") {
            setError(result);
        } 
        else if (result?.data && result.data.length > 0) {
            setCompany(result.data[0]);
        }
    }
    
    if (ticker) {
        getProfileInit();
    }
    
  }, [ticker]);

  return (
    <div className="w-full min-h-screen bg-surfaceLight font-sans">
      {error ? (
        <div className="container mx-auto p-6 mt-10">
            <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">
              {error}
            </div>
        </div>
      ) : company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
            <SideBar />
            <CompanyDashboard>
                <Tile title="Company Name" subTitle={company.companyName}></Tile>
            </CompanyDashboard>
        </div>
      ) : (
        <div className="container mx-auto p-6 mt-10 text-center">
            <div className="text-textMuted font-bold text-lg animate-pulse">
              Loading company data...
            </div>
        </div>
      )}
    </div>
  )
}

export default CompanyPage