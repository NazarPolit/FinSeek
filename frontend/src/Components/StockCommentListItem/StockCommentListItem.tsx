import React from "react";
import { CommentGet } from "../../Models/Comment";

type Props = {
  comment: CommentGet;
};

const StockCommentListItem = ({ comment }: Props) => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100 mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-bold text-slate-800">{comment.title}</h4>
        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-brandBlue rounded-full">
          @{comment.createdBy}
        </span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">
        {comment.content}
      </p>
    </div>
  );
};

export default StockCommentListItem;