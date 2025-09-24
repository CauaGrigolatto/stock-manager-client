import { useEffect, useState } from 'react';
import useStock from '../../hooks/useStock';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import currency from 'currency.js';

export default function ShowItem() {
    const params = useParams();
    const id = params.id;

    const {itemsController} = useStock();
    const [item, setItem] = useState(null);

    const navigate = useNavigate();

    useEffect(function() {
        const fetchAndSetItem = async () => {
            const response = await itemsController.getItem(id);
            setItem(response.data);
        }

        fetchAndSetItem();
    }, []);

    const handleDelete = async (id) => {
        try {
            await itemsController.deleteItem(id);
            navigate("/items");
        }
        catch(error) {
            console.log(error);
        }
    }

    if (!item) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="item">
            <h2>{item.name}</h2>
            <Link to={`/items/${item.id}/update`} className="button is-small">Atualizar</Link>
            <button 
                onClick={async () => await handleDelete(item.id)} 
                className="button is-danger is-small">
                Excluir
            </button>

            <div className="row">
                <span>Categoria: {item.category.name}</span>
                <span>Quantidade em estoque: {item.quantity}</span>
                <span>Preço: R$ {currency(item.price).toString()}</span>
            </div>

            <p>{item.description}</p>

            <div className="row">
                <p>Cadastrado em: {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
                <p>Atualizado em: {dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</p>
            </div>
        </div>
    )
}