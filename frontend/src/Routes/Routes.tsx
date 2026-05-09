import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignGuide/DesignGuide";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement";
import FinancialTrends from "../Components/FinancialTrends/FinancialTrends";
import LoginPage from "../Pages/LoginPage/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            { path: "login", element: <LoginPage /> },
            {path: "search", element: <SearchPage />},
            {path: "design-guid", element: <DesignPage />},
            {
                path: "company/:ticker", 
                element: <CompanyPage />,
                children: [
                    { index: true, element: <Navigate to="company-profile" replace /> },
                    {path: "company-profile", element: <CompanyProfile />},
                    {path: "income-statement", element: <IncomeStatement />},
                    {path: "balance-sheet", element: <BalanceSheet />},
                    { path: "cashflow-statement", element: <CashflowStatement /> },
                    { path: "financial-trends", element: <FinancialTrends /> },
                ],
            },
        ]
    }
])