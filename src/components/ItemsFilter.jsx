import { useEffect, useState } from "react";
import useStock from "../hooks/useStock";

export default function ItemsForm({setFilter}) {

    const {categoriesController} = useStock();
    const [currentFilter, setCurrentFilter] = useState({});
    const [categories, setCategories] = useState([]);
    
    useEffect(function() {
        async function fetchAndSetCategories() {
            const result = await categoriesController.listAll({
                unpaged: true
            });

            setCategories(result.data);
        }

        fetchAndSetCategories();
    }, []);

    const handleChangeFilter = (ev) => {
        const {name, value} = ev.target;
        setCurrentFilter((curr) => {
            return {...curr, [name]: value};
        });
    }

    const handleClear = () => {
        const newFilter = {};
        setCurrentFilter(newFilter);
        setFilter(newFilter);
    }

    const handleFilter = (ev) => {
        ev?.preventDefault();
        setFilter(currentFilter);
    }
    
    return (
        <form onSubmit={handleFilter}>
            <div className="row">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input 
                        id="name" name="name" type="text" 
                        value={currentFilter.name ? currentFilter.name : ''} 
                        onChange={handleChangeFilter} />
                </div>

                <div>
                    <label htmlFor="description">Descrição</label>
                    <input 
                        id="description" 
                        name="description" 
                        type="text" 
                        value={currentFilter.description ? currentFilter.description : ''} onChange={handleChangeFilter} />
                </div>

                <div>
                    <label htmlFor="categoryId">Categoria</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        value={currentFilter.categoryId}
                        onChange={handleChangeFilter}
                    >

                        <option value=""></option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div>
                    <label htmlFor="minQuantity">Qtd mínima</label>
                    <input 
                        id="minQuantity" name="minQuantity" type="number" min={0} 
                        value={currentFilter.minQuantity ? currentFilter.minQuantity : ''} onChange={handleChangeFilter} />
                </div>

                <div>
                    <label htmlFor="maxQuantity">Qtd máxima</label>
                    <input
                        id="maxQuantity" name="maxQuantity" type="number" min={0} 
                        value={currentFilter.maxQuantity ? currentFilter.maxQuantity : ''} onChange={handleChangeFilter} />
                </div>

                <div>
                    <label htmlFor="createdAfter">Criado a partir de</label>
                    <input 
                        id="createdAfter" name="createdAfter" type="date"
                        value={currentFilter.createdAfter ? currentFilter.createdAfter : ''} onChange={handleChangeFilter} />
                </div>

                <div>
                    <label htmlFor="createdBefore">Criado antes</label>
                    <input 
                        id="createdBefore" name="createdBefore" type="date"
                        value={currentFilter.createdBefore ? currentFilter.createdBefore : ''} onChange={handleChangeFilter} />
                </div>
            </div>

            <button type="submit" className="button is-primary is-large">
                Filtrar
            </button>

            <button type="button" className="button is-danger is-large" onClick={handleClear}>
                Limpar
            </button>
        </form>
    )
}