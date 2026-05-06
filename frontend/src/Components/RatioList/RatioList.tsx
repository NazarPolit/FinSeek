import React from "react";

type Props = {
  config: any;
  data: any;
};

const RatioList = ({ config, data }: Props) => {
  const renderedCells = config.map((row: any, index: number) => {
    return (
      <li key={index} className="py-4 px-6 hover:bg-slate-50 transition-colors duration-150">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">
              {row.label}
            </p>
            {row.subTitle && (
              <p className="text-sm text-slate-500 truncate mt-1">
                {row.subTitle}
              </p>
            )}
          </div>
          <div className="inline-flex items-center text-base font-extrabold text-brandBlue">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl w-full border border-slate-100 overflow-hidden mb-6">
      <ul className="divide-y divide-slate-100">{renderedCells}</ul>
    </div>
  );
};

export default RatioList;