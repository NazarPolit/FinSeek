import React, { useEffect, useState } from "react";
import CompFinderItem from "../CompFinderItem/CompFinderItem"; 
import { getCompData } from "../../api";

type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [peers, setPeers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getComps = async () => {
      setIsLoading(true);
      const value = await getCompData(ticker);
      
      if (typeof value === "string") {
        setErrorMsg(value);
      } else if (value && value.data && Array.isArray(value.data)) {
        if (value.data.length > 0) {
          const symbolsOnly = value.data.map((comp: any) => comp.symbol);
          setPeers(symbolsOnly);
        } else {
          setErrorMsg("No peers data available from API.");
        }
      }
      setIsLoading(false);
    };
    
    getComps();
  }, [ticker]);

  if (isLoading) {
    return (
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Compare with Peers</h4>
        <p className="text-sm text-slate-400 animate-pulse">Loading peers...</p>
      </div>
    );
  }

  if (errorMsg || peers.length === 0) {
    return (
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Compare with Peers</h4>
        <p className="text-sm text-slate-400">
          {errorMsg || "No peer companies found for this ticker."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
        Compare with Peers
      </h4>
      <div className="flex flex-wrap gap-2">
        {peers.map((peerTicker: string) => {
          return <CompFinderItem key={peerTicker} ticker={peerTicker} />;
        })}
      </div>
    </div>
  );
};

export default CompFinder;