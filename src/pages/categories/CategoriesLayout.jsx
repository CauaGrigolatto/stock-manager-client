import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {

    const {pathname} = useLocation();

    return (
        <main>
            <h1>Categorias</h1>

            <div className="tabs">
                <Link 
                    to="/categories" 
                    className={`tab ${pathname === "/categories" ? "active" : ""}`} >
                    Todos as categorias
                </Link>
                
                <Link 
                    to="/categories/new" 
                    className={`tab ${pathname === "/categories/new" ? "active" : ""}`} >
                    Nova categoria
                </Link>
            </div>

            <Outlet />
        </main>
    )
}