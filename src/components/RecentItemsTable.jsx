import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import TableIndex from "./TableIndex";

export default function RecentItemsTable() {
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
            createdBefore: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            createdAfter: dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
            sortBy: 'createdAt',
            direction: 'DESC'
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
                        <td>Recentes</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
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