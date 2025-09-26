import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useStock from '../hooks/useStock'

ItemForm.propTypes = {
    itemToUpdate: PropTypes.object
}

export default function ItemForm({itemToUpdate}) {

    const defaultItem = {
        name: "",
        description: "",
        quantity: 0,
        price: 0.0,
        categoryId: "",
    }

    const {itemsController, categoriesController} = useStock();

    const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);
    const [categories, setCategories] = useState([]);
    const inputRef = useRef(null);

    const [successMessage, setSuccessMessage] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    useEffect(function() {
        async function fetchAndSetResponse() {
            const result = await categoriesController.listAll({
                unpaged: true
            });

            setCategories(result.data);
        }

        fetchAndSetResponse();
    }, []);

    const handleChange = (ev) => {
        const {name, value} = ev.target;
        setItem(curr => {
            return {...curr, [name]: value}
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {      
            let response = undefined;

            if (itemToUpdate) {
                response = await itemsController.updateItem(item);
                handleFeedback(response);
            }
            else {
                response = await itemsController.saveItem(item);
                
                if (response.status == 200) {
                    setItem(defaultItem);
                }
            }

            handleFeedback(response);
            inputRef.current.focus();
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
                        value={item.name}
                        ref={inputRef}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantidade</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        min={0}
                        step={1}
                        value={item.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Preço</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min={0.00}
                        step={0.01}
                        value={item.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="categoryId">Categoria</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        value={item.categoryId}
                        onChange={handleChange}
                    >

                        <option value=""></option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                                defaultChecked={item.categoryId === category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="description">Descrição</label>
                <textarea
                    name="description"
                    id="description"
                    required
                    rows={6}
                    value={item.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button className="button is-primary is-large">
                Salvar
            </button>
        </form>
    )
}