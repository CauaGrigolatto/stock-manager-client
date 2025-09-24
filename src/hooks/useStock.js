import { useContext } from "react";
import { StockContext } from "../pages/contexts/StockContext";

export default function useStock() {
    return useContext(StockContext);
}