import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentPost } from "../Models/Comment";

const api = "https://localhost:7002/api/comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<any>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete(api + `${id}`);
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const commentPutAPI = async (id: number, title: string, content: string) => {
  try {
    const data = await axios.put(api + `${id}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};