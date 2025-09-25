import { createBrowserRouter } from "react-router-dom";
import ListCategories from "./pages/categories/ListCategories";
import Home from "./pages/Home";
import CreateItem from "./pages/items/CreateItem";
import ItemsLayout from "./pages/items/ItemsLayout";
import ListItems from "./pages/items/ListItems";
import ShowItem from "./pages/items/ShowItem";
import UpdateItem from "./pages/items/UpdateItem";
import RootLayout from "./pages/RootLayout";
import CategoriesLayout from "./pages/categories/CategoriesLayout";
import CategoryForm from "./components/CategoryForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "items",
                element: <ItemsLayout />,
                children: [
                    {
                        index: true,
                        element: <ListItems />
                    },
                    {
                        path: "new",
                        element: <CreateItem />
                    },
                    {
                        path: ":id",
                        element: <ShowItem />
                    },
                    {
                        path: ":id/update",
                        element: <UpdateItem />
                    }
                ]
            },
            {
                path: "categories",
                element: <CategoriesLayout />,
                children: [
                    {
                        index: true,
                        element: <ListCategories />
                    },
                    {
                        path: "new",
                        element: <CategoryForm />
                    }
                ]
            }
        ]
    }
]);

export default router;