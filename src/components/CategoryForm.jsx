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

    const [successMessage, setSuccessMessage] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleChange = (ev) => {
        const {name, value} = ev.target;
        setCategory(curr => {
            return {...curr, [name]: value}
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            let response = await categoriesController.saveCategory(category);
            
            if (response.status == 200) {
                setCategory(defaultCategory);
                inputRef.current.focus();
            }
            
            handleFeedback(response);
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleFeedback = (response) => {
        if (response) {
            if (response.status == 200) {
                setSuccessMessage(response.message);
                setErrorMessage(undefined);
            }
            else {
                let error = response.message + '\n';

                for (let key in response.data) {
                    const obj = response.data[key];
                    error = obj.message + '\n';
                }

                setErrorMessage(error);
                setSuccessMessage(undefined);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            {successMessage ? (
                <div className="feedback-container success">
                    {successMessage}
                </div>
            ) : null}

            {errorMessage ? (
                <div className="feedback-container error">
                    {errorMessage}
                </div>
            ) : null}

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