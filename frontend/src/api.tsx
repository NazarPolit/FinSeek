import axios from "axios";
import { CompanyBalanceSheet, CompanyCashFlow, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch } from "./company"

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

export const getKeyMetrics = async (query: string) => {
    try{
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`   
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

export const getIncomeStatement = async (
  query: string
): Promise<CompanyIncomeStatement[]> => {
  try {
    const response = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error("API limit reached.");
    }

    throw new Error(error.message);
  }
};

export const getBalanceSheet = async (query: string) => {
    try{
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`  
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

export const getCashFlow = async (query: string) => {
    try{
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
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