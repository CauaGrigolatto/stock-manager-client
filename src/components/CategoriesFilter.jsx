import { useState } from "react";

export default function ItemsForm({setFilter}) {

    const [currentFilter, setCurrentFilter] = useState({});

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