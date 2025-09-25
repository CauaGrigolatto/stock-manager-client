import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import TableIndex from "./TableIndex";
import ItemsFilter from "./ItemsFilter";

export default function ItemsTable() {
    const {itemsController} = useStock();

    const [response, setResponse] = useState({});
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [filter, setFilter] = useState({});

    const fetchItems = useCallback(async () => {
        const result = await itemsController.listAll({
            page: currentPage,
            pageSize: 5,
            sortBy: 'updatedAt',
            direction: 'DESC',
            ...filter
        });

        setResponse(result);
        setItems(result.data);
    }, [currentPage, filter, itemsController]);

    useEffect(function () {
        if (!response) {
            return;
        }

        const totalPages = response.totalPages;

        if (currentPage > 0 && currentPage >= totalPages) {
            setCurrentPage(Math.max(0, totalPages - 1));
        }
        else if (currentPage < 0) {
            setCurrentPage(0);
        }
    }, [response, currentPage]);

    const handleDelete = useCallback(async (id) => {
        try {
            await itemsController.deleteItem(id);
            fetchItems();
        }
        catch (error) {
            console.log(error);
        }
    }, [fetchItems, itemsController]);
    
    useEffect(function() {
        fetchItems();
    }, [fetchItems]);

    if (! items) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <ItemsFilter setFilter={setFilter} />

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