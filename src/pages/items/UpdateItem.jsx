import { useEffect, useState } from 'react';
import ItemForm from '../../components/ItemForm'
import useStock from '../../hooks/useStock';
import { useParams } from 'react-router-dom';

export default function UpdateItem() {
    const params = useParams();
    const id = params.id;

    const {itemsController} = useStock();

    const [itemToUpdate, setItemToUpdate] = useState(null);

    useEffect(function() {
            const fetchAndSetItem = async () => {
            const response = await itemsController.getItem(id);
            const targetItem = response.data;

            setItemToUpdate({
                id: targetItem.id,
                name: targetItem.name,
                description: targetItem.description,
                price: targetItem.price,
                quantity: targetItem.quantity,
                categoryId: targetItem.category.id
            });
        }

        fetchAndSetItem();
    }, []);

    if (!itemToUpdate) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <h2>Atualizar item</h2>
            <ItemForm itemToUpdate={itemToUpdate} />
        </>
    )
}