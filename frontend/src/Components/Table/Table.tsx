import React from 'react'

type Props = {
    config: any;
    data: any;
};

const Table = ({ config, data }: Props) => {
    const renderedRows = data.map((company: any, index: number) => {
        return(
            <tr key={company.cik || index} className="hover:bg-slate-50/50 transition-colors duration-150 border-b border-slate-100 last:border-0">
                {config.map((val: any, colIndex: number) => {
                    return (
                        <td key={colIndex} className="p-4 whitespace-nowrap text-sm font-medium text-slate-700">
                            {val.render(company)}
                        </td>
                    )
                })}
            </tr>
        )
    });

    const renderedHeaders = config.map((configItem: any, index: number) => {
        return (
            <th
                className="p-4 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50"
                key={configItem.label || index}
            >
                {configItem.label}
            </th>
        );
    });

    return (
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl w-full border border-slate-100 overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr>{renderedHeaders}</tr>
                    </thead>
                    <tbody>{renderedRows}</tbody>
                </table>
            </div>
        </div>
    )
}

export default Table