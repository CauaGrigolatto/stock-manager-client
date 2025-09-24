import itemsLib from './itemsLib'
import categoriesLib  from './categoriesLib'

export default function stockLib() {
    const itemsController = itemsLib();
    const categoriesController = categoriesLib();
    return {itemsController, categoriesController};
}