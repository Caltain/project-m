import { Link } from 'react-router-dom';

const Header = ({
    isAuthenticated,
    user,
}) => {
    let guestNavigation = (
        <div id="guest">
            <Link className="button" to="/login">Login</Link>
            <Link to="/register" className="button">Register</Link>
        </div>
    );

    let userNavigation = (
        <div id="user">
            <span>Welcome, {user}</span>
            <Link className="button" to="/my-furniture">My Furniture</Link>
            <Link className="button" to="/create">Add Furniture</Link>
            <Link className="button" to="/logout">Logout</Link>
        </div>
    );

    return (
        <header id="site-header">
            <nav className="navbar">
                <section className="navbar-catalog">
                    <Link to="/catalog">Catalog</Link>

                    {isAuthenticated
                        ? userNavigation
                        : guestNavigation
                    }
                </section>
            </nav>
        </header>
    );
}

export default Header;