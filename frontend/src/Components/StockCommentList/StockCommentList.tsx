import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <div className="mb-6 w-full">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Community Notes</h3>
      
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => {
          return <StockCommentListItem key={comment.id || index} comment={comment} />;
        })
      ) : (
        <p className="text-slate-500 text-sm italic">
          No notes available for this stock yet. Be the first to share your analysis!
        </p>
      )}
    </div>
  );
};

export default StockCommentList;