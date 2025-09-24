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

    const handleSubmit = (ev) => {
        ev.preventDefault();
        try {
            console.log(item);
            
            if (itemToUpdate) {
                itemsController.updateItem(item);
            }
            else {
                itemsController.saveItem(item);
                setItem(defaultItem);
            }

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
                        required
                        value={item.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria...</option>
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