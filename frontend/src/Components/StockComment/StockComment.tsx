import React, { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinners/Spinners"; 
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComments = () => {
    setLoading(true);
    commentGetAPI(stockSymbol).then((res) => {
      setLoading(false);
      
      const responseData = res?.data;
      
      if (Array.isArray(responseData)) {
        setComments(responseData);
      } 
      else if (responseData && Array.isArray(responseData.comments)) {
        setComments(responseData.comments);
      } 
      else {
        setComments([]);
      }
    });
  };

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Note saved successfully!");
          getComments(); 
        }
      })
      .catch((err) => {
        console.error("Failed to save comment", err);
      });
  };

  return (
    <div className="w-full mt-6">
      {loading ? <Spinner /> : <StockCommentList comments={comments || []} onCommentChange={getComments} />}
      
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;