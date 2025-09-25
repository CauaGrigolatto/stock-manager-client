const API_URL = 'http://localhost:8080/categories';

export default function categoriesLib() {
    const listAll = async (filter) => {
        const params = new URLSearchParams(filter).toString();
        const response = await fetch(API_URL + "?" + params);
        const result = await response.json();
        return result;
    }

    const deleteCategory = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result;
    }

    const saveCategory = async (category) => {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(category)
        });
        const result = await response.json();
        return result;
    }

    return {listAll, deleteCategory, saveCategory};
}