import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <header>
                <Link to="/" className="logo">STOCK CLIENT</Link>

                <nav>
                    <Link to="/">Início</Link>
                    <Link to="/items">Itens</Link>
                </nav>
            </header>
            <div>
                <Outlet />
            </div>
            <footer>
                Feito com React & React Router
            </footer>
        </>
    )
}