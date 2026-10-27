
import WorkshopCard from "../components/WorkshopCard";
import { useData } from "../hooks/useData";
import { ACTION_TYPES } from "../context/actionTypes";

function WorkshopsPage() {
    const { state, dispatch } = useData();

    const filteredWorkshops = state.workshops.filter((workshop) => {
        const matchesSearch = workshop.title
            .toLowerCase()
            .includes(state.search.toLowerCase().trim());

        const matchesStudio =
            state.filters.studioId === null ||
            workshop.studioId === state.filters.studioId;

        const matchesMaterials =
            state.filters.materialIds.length === 0 ||
            state.filters.materialIds.every((id) =>
                workshop.materialIds.includes(id)
            );

        const matchesMinPrice =
            state.filters.minPrice === "" ||
            workshop.price >= Number(state.filters.minPrice);

        const matchesMaxPrice =
            state.filters.maxPrice === "" ||
            workshop.price <= Number(state.filters.maxPrice);

        return (
            matchesSearch &&
            matchesStudio &&
            matchesMaterials &&
            matchesMinPrice &&
            matchesMaxPrice
        );
    });

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

            <div className="workshops-filters">
                <label htmlFor="studio-filter">Studio:</label>

                <select
                    id="studio-filter"
                    value={state.filters.studioId ?? ""}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPES.FILTER_CHANGED,
                            payload: {
                                studioId: event.target.value
                                    ? Number(event.target.value)
                                    : null
                            }
                        })
                    }
                >
                    <option value="">All Studios</option>

                    {state.studios.map((studio) => (
                        <option key={studio.id} value={studio.id}>
                            {studio.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="min-price">Min Price:</label>
                <input
                    id="min-price"
                    type="number"
                    min="0"
                    placeholder="Min price"
                    value={state.filters.minPrice}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPES.FILTER_CHANGED,
                            payload: {
                                minPrice: event.target.value
                            }
                        })
                    }
                />

                <label htmlFor="max-price">Max Price:</label>
                <input
                    id="max-price"
                    type="number"
                    min="0"
                    placeholder="Max price"
                    value={state.filters.maxPrice}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPES.FILTER_CHANGED,
                            payload: {
                                maxPrice: event.target.value
                            }
                        })
                    }
                />

                <fieldset className="materials-filter">
                    <legend>Materials:</legend>

                    {state.materials.map((material) => (
                        <label key={material.id}>
                            <input
                                type="checkbox"
                                checked={state.filters.materialIds.includes(material.id)}
                                onChange={(event) => {
                                    const selectedIds = state.filters.materialIds;

                                    const updatedIds = event.target.checked
                                        ? [...selectedIds, material.id]
                                        : selectedIds.filter(
                                            (id) => id !== material.id
                                        );

                                    dispatch({
                                        type: ACTION_TYPES.FILTER_CHANGED,
                                        payload: {
                                            materialIds: updatedIds
                                        }
                                    });
                                }}
                            />
                            {material.name}
                        </label>
                    ))}
                </fieldset>
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
                            studio={studio}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default WorkshopsPage;
