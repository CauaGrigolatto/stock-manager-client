import PropTypes from "prop-types";
import { createContext } from "react";
import stockLib from "../../lib/stockLib";


export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node //node do react
}

export function StockContextProvider({children}) {
    const stock = stockLib();

    return (
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}