import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header className="site-header">
                <div className="header-container">
                    <NavLink to="/" className="logo">
                        ☀️ Creative Space
                    </NavLink>

                    <nav className="site-nav">
                        <NavLink to="/" end>
                            Home
                        </NavLink>

                        <NavLink to="/workshops">
                            Workshops
                        </NavLink>

                        <NavLink to="/create">
                            Create Workshop
                        </NavLink>
                    </nav>
                </div>
            </header>

            <Outlet />

            <footer className="site-footer">
                <p>© 2026 Creative Space. Made with creativity ♡</p>
            </footer>
        </>
    );
}
