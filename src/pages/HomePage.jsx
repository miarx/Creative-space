import { Link } from "react-router-dom";

function HomePage() {
    return (
        <section className="home-page">
            <h1>Welcome to Creative Space!</h1>

            <p>
                Discover creative workshops, explore new skills,
                and find inspiration for your next project.
            </p>

            <Link to="/workshops" className="primary-button">
                Explore Workshops
            </Link>
        </section>
    );
}

export default HomePage;