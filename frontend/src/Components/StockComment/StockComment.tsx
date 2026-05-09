import React from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Note saved successfully!");
        }
      })
      .catch((err) => {
        console.error("Failed to save comment", err);
      });
  };

  return (
    <div className="w-full">
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;