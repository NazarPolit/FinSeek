import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  symbol: string;
  handleComment: (e: CommentFormInputs) => void;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const StockCommentForm = ({ symbol, handleComment }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormInputs>({ resolver: yupResolver(validation) });

  const onSubmit = (data: CommentFormInputs) => {
    handleComment(data);
    reset();
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Add your thoughts on {symbol}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-4">
          <input
            type="text"
            id="title"
            className={`appearance-none block w-full px-4 py-2.5 border ${
              errors.title ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-brandBlue focus:border-brandBlue"
            } rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors`}
            placeholder="Investment thesis, summary, or key point..."
            {...register("title")}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500 font-medium">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <textarea
            id="content"
            rows={4}
            className={`appearance-none block w-full px-4 py-2.5 border ${
              errors.content ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-brandBlue focus:border-brandBlue"
            } rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors resize-none`}
            placeholder="Write your detailed analysis or notes here..."
            {...register("content")}
          ></textarea>
          {errors.content && <p className="mt-1 text-sm text-red-500 font-medium">{errors.content.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brandBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-colors"
          >
            Post Note
          </button>
        </div>

      </form>
    </div>
  );
};

export default StockCommentForm;