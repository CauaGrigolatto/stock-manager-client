const API_URL = 'http://localhost:8080/items';

export default function itemsLib() {
    const listAll = async (filter) => {
        const response = await fetch(API_URL + "?" + new URLSearchParams(filter).toString());
        const result = await response.json();
        return result;
    }

    const saveItem = async (item) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });
        const result = await response.json();
        return result;
    }

    const deleteItem = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result;
    }

    const updateItem = async (item) => {
        const response = await fetch(`${API_URL}/${item.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });
        const result = await response.json();
        return result;
    }

    const getItem = async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        return result;
    }

    const countAll = async () => {
        const response = await fetch(`${API_URL}/count-total`);
        const result = await response.json();
        return result;
    }

    const countByCategories = async () => {
        const response = await fetch(`${API_URL}/count-by-categories`);
        const result = await response.json();
        return result;
    }

    const countByCreationDate = async (filter) => {
        const response = await fetch(`${API_URL}/count-by-creation-date?${new URLSearchParams(filter).toString()}`);
        const result = await response.json();
        return result;
    }

    const countByQuantity = async (filter) => {
        const response = await fetch(`${API_URL}/count-by-quantity?${new URLSearchParams(filter).toString()}`);
        const result = await response.json();
        return result;
    }

    return {
        listAll, 
        saveItem, 
        deleteItem, 
        updateItem, 
        getItem, 
        countAll, 
        countByCategories, 
        countByCreationDate, 
        countByQuantity
    };
}