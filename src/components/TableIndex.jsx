import { func, number } from "prop-types";

TableIndex.propTypes = {
    currentPage: number,
    totalPages: number,
    setCurrentPage: func
}

export default function TableIndex({currentPage, totalPages, setCurrentPage}) {

    const handleIncrementPage = () => {
        setCurrentPage(curr => curr+1);
    }

    const handleDecrementPage = () => {
        setCurrentPage(curr => curr-1);
    }

    return (
        <div className="table-index">
            <button 
                onClick={handleDecrementPage} 
                disabled={currentPage <= 0} 
                className="change-index-button">
                Anterior
            </button>

            <span>
                Página {currentPage + 1} de {totalPages}
            </span>

            <button 
                onClick={handleIncrementPage} 
                disabled={currentPage >= totalPages-1}
                className="change-index-button">
                Próxima
            </button>
        </div>
    );
}