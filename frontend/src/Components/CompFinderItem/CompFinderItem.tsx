import React from "react";
import { Link } from "react-router-dom";

type Props = {
  ticker: string;
};

const CompFinderItem = ({ ticker }: Props) => {
  return (
    <Link
      reloadDocument
      to={`/company/${ticker}/company-profile`}
      className="inline-flex items-center px-4 py-2 text-sm font-extrabold text-brandBlue bg-brandBlueLight/50 border border-brandBlue/20 rounded-xl hover:bg-brandBlue hover:text-white hover:shadow-md transition-all duration-300"
    >
      {ticker}
    </Link>
  );
};

export default CompFinderItem;