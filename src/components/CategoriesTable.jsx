import { useEffect, useState } from "react";
import useStock from "../hooks/useStock"
import TableIndex from "./TableIndex";

export default function CategoriesTable() {
    const {categoriesController} = useStock();

    const [response, setResponse] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(function() {
        const fetchAndBuildStates = async () => {
            const response = await fetchCategories();
            buildStates(response);
        }

        fetchAndBuildStates();
    }, [currentPage]);

    const fetchCategories = async () => {
        const response = await categoriesController.listAll({
            page: currentPage,
            pageSize: 5,
            sortBy: 'name',
            direction: 'ASC'
        });

        return response;
    }

    const buildStates = (response) => {
        setResponse(response);
        setCategories(response.data);
    }

    const handleDelete = async (id) => {
        await categoriesController.deleteCategory(id);
        const response = await fetchCategories();
        buildStates(response);
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