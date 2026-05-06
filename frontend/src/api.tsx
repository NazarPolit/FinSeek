import axios from "axios";
import { CompanyProfile, CompanySearch } from "./company"

interface SearchResponse{
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try{
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error) {
        const err = error as any;

        if (err && err.isAxiosError) {
            // Спеціальна обробка для помилки 429 (Too Many Requests)
            if (err.response?.status === 429) {
                console.warn("API Rate Limit Exceeded!");
                return "API limit reached. Please try again tomorrow or upgrade your API plan.";
            }
            console.log("axios error message:", err.message);
            return err.message;
        } 
        else if (error instanceof Error) {
            console.log("standard error message:", error.message);
            return error.message;
        } 
        else {
            console.log("unexpected error:", error);
            return "An unexpected error has occurred";
        }
    }
}

export const getCompanyProfile = async (query: string) => {
    try{
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`   
        )
        return data;
    } catch (error: any) {
        if (error.response?.status === 429) {
             console.warn("API Rate Limit Exceeded!");
             return "API limit reached.";
        }
        console.log("error message from API: ", error.message);
    }
}