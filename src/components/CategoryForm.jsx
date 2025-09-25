import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useStock from '../hooks/useStock';

CategoryForm.propTypes = {
    itemToUpdate: PropTypes.object
}

export default function CategoryForm() {

    const defaultCategory = {
        name: ""
    }

    const {categoriesController} = useStock();

    const [category, setCategory] = useState(defaultCategory);
    const inputRef = useRef(null);

    const handleChange = (ev) => {
        const {name, value} = ev.target;
        setCategory(curr => {
            return {...curr, [name]: value}
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        try {
            console.log(category);
            categoriesController.saveCategory(category);
            setCategory(defaultCategory);
            inputRef.current.focus();
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="row">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={category.name}
                        ref={inputRef}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button className="button is-primary is-large">
                Salvar
            </button>
        </form>
    )
}