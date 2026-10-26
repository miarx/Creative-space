import WorkshopCard from "../components/WorkshopCard";
import { useData } from "../hooks/useData";
import { ACTION_TYPES } from "../context/actionTypes";

function WorkshopsPage() {
    const { state, dispatch } = useData();

    const filteredWorkshops = state.workshops.filter((workshop) =>
    workshop.title
        .toLowerCase()
        .includes(state.search.toLowerCase().trim())
    );

    return (
        <section className="workshops-page">
            <h1>Creative Workshops</h1>

            <p>
                Explore our workshops and find something
                that inspires you.
            </p>

            <div className="workshops-search">
            <input
                type="search"
                placeholder="Search workshops..."
                value={state.search}
                onChange={(event) =>
                 dispatch({
                type: ACTION_TYPES.SEARCH_CHANGED,
                payload: event.target.value
            })
            }
            />
           </div>

           {filteredWorkshops.length === 0 && (
            <p>No workshops found.</p>
           )}

            <div className="workshops-grid">
                 {filteredWorkshops.map((workshop) => {
             const studio = state.studios.find(
            (item) => item.id === workshop.studioId
             );

             return (
            <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                studio={studio} />
            );
            })}
           </div>
        </section>
    );
}

export default WorkshopsPage;