import { useCallback, useEffect, useState } from "react";
import useStock from "../hooks/useStock"
import TableIndex from "./TableIndex";
import CategoriesFilter from "./CategoriesFilter"
import Swal from "sweetalert2";
import swalFire from "../lib/swalFire";

export default function CategoriesTable() {
    const {categoriesController} = useStock();

    const [response, setResponse] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState([]);

    const [filter, setFilter] = useState({});

    const fetchCategories = useCallback(async () => {
        const result = await categoriesController.listAll({
            page: currentPage,
            pageSize: 5,
            sortBy: 'name',
            direction: 'ASC',
            ...filter
        });

        setResponse(result);
        setCategories(result.data);
    }, [currentPage, filter, categoriesController]);

    useEffect(function() {
        if (! response) {
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
            const result = await swalFire().confirmAction();

            if (result.isConfirmed) {
                await categoriesController.deleteCategory(id);
                fetchCategories();
            }
        }
        catch(error) {
            console.log(error);
        }

    }, [fetchCategories, categoriesController]);

    useEffect(function() {
        fetchCategories();
    }, [fetchCategories]);

    if (! categories) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <CategoriesFilter setFilter={setFilter} />

            <TableIndex 
                currentPage={currentPage}
                totalPages={response.totalPages}
                setCurrentPage={setCurrentPage} />
                
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Categoria</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>#{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>
                                <button 
                                    onClick={async () => await handleDelete(cat.id)}
                                    className="button is-danger is-small">
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