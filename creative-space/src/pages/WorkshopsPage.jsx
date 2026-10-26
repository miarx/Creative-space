import WorkshopCard from "../components/WorkshopCard";
import { useData } from "../hooks/useData";

function WorkshopsPage() {
    const { state } = useData();

    return (
        <section className="workshops-page">
            <h1>Creative Workshops</h1>

            <p>
                Explore our workshops and find something
                that inspires you.
            </p>

            <div className="workshops-grid">
                {state.workshops.map((workshop) => (
                    <WorkshopCard
                        key={workshop.id}
                        workshop={workshop}
                    />
                ))}
            </div>
        </section>
    );
}

export default WorkshopsPage;