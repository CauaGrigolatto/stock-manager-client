import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import TableIndex from "./TableIndex";


export default function ItemsTable() {
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

    const handleDelete = async (id) => {
        try {
            await itemsController.deleteItem(id);
            const result = await fetchItems();
            buildStates(result);
        }
        catch(error) {
            console.log(error);
        }
    }

    const fetchItems = async () => {
        const result = await itemsController.listAll({
            page: currentPage,
            pageSize: 5,
            sortBy: 'updatedAt',
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
                        <td>ID</td>
                        <td>Nome</td>
                        <td>Em estoque</td>
                        <td>Categoria</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.category?.name}</td>
                            <td>
                                <Link to={`/items/${item.id}`} className="button is-primary">
                                    Ver
                                </Link>
                                <Link to={`/items/${item.id}/update`} className="button is-small">
                                    Atualizar
                                </Link>
                                <button onClick={async () => await handleDelete(item.id)} className="button is-danger is-small">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}