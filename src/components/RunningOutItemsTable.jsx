import { useEffect, useState } from "react";
import useStock from "../hooks/useStock";
import TableIndex from "./TableIndex";
import { Link } from "react-router-dom";

export default function RunningOutItemsTable() {
    const {itemsController} = useStock();

    const [response, setResponse] = useState({});
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    const buildStates = (result) => {
        setResponse(result);
        setItems(result.data);

        if (currentPage >= result.totalPages) {
            setCurrentPage(curr => curr - 1);
        }
    }

    useEffect(function() {
        
        async function fetchAndSetResponse() {
            const result = await fetchItems();
            buildStates(result);
        }

        fetchAndSetResponse();
    }, [currentPage]);

    const fetchItems = async () => {
        const result = await itemsController.listAll({
            page: currentPage,
            pageSize: 3,
            minQuantity: 0,
            maxQuantity: 10,
            sortBy: 'quantity',
            direction: 'ASC'
        });
        return result;
    }

    return (
        <>
            <TableIndex 
                currentPage={currentPage}
                totalPages={response.totalPages}
                setCurrentPage={setCurrentPage} />
                
            <table>
                <thead>
                    <tr>
                        <td>Acabando</td>
                        <td>Qtd.</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Link to={`/items/${item.id}`} className="button is-primary">
                                    Ver
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}