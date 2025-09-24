const API_URL = 'http://localhost:8080/categories';

export default function categoriesLib() {
    const listAll = async (filter) => {
        const params = new URLSearchParams(filter).toString();
        const response = await fetch(API_URL + "?" + params);
        const result = await response.json();
        return result;
    }

    return {listAll};
}