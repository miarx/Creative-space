import { useMemo } from "react";
import WorkshopCard from "../components/WorkshopCard";
import { useData } from "../hooks/useData";
import { useWorkshopQuery } from "../hooks/useWorkshopQuery";

function WorkshopsPage() {
    const { state } = useData();
    const { search, filters, sort, page, updateQuery, resetFilters } = useWorkshopQuery();


    const filteredWorkshops = useMemo(() => {
        return state.workshops.filter((workshop) => {
            const matchesSearch = workshop.title
                .toLowerCase()
                .includes(search.toLowerCase().trim());

            const matchesStudio =
                filters.studioId === null ||
                workshop.studioId === filters.studioId;

            const matchesMaterials =
                filters.materialIds.length === 0 ||
                filters.materialIds.every((id) =>
                    workshop.materialIds.includes(id)
                );

            const matchesMinPrice =
                filters.minPrice === "" ||
                workshop.price >= Number(filters.minPrice);

            const matchesMaxPrice =
                filters.maxPrice === "" ||
                workshop.price <= Number(filters.maxPrice);

            return (
                matchesSearch &&
                matchesStudio &&
                matchesMaterials &&
                matchesMinPrice &&
                matchesMaxPrice
            );
        });
    }, [state.workshops, search, filters]);

    // 2. Sorting
    const sortedWorkshops = useMemo(() => {
        return [...filteredWorkshops].sort((a, b) => {
            const [field, direction] = sort.split("-");

            let comparison = 0;

            if (field === "title") {
                comparison = a.title.localeCompare(b.title);
            } else if (field === "price") {
                comparison = a.price - b.price;
            } else if (field === "date") {
                comparison = a.date.localeCompare(b.date);
            }

            return direction === "asc" ? comparison : -comparison;
        });
    }, [filteredWorkshops, sort]);

    // 3. Pagination
    const itemsPerPage = 6;

    const totalPages = Math.ceil(
        sortedWorkshops.length / itemsPerPage
    );

    const currentPage = Math.min(
        Math.max(page, 1),
        Math.max(totalPages, 1)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedWorkshops = useMemo(() => {
        return sortedWorkshops.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    }, [sortedWorkshops, startIndex]);

    const handlePageChange = (nextPage) => updateQuery({ page: nextPage });

    return (
        <section className="workshops-page">
            <h1>Creative Workshops</h1>

            <p>
                Explore our workshops and find something
                that inspires you.
            </p>

            {/* Search */}
            <div className="workshops-search">
                <input
                    type="search"
                    placeholder="Search workshops..."
                    value={search}
                    onChange={(event) => updateQuery({ search: event.target.value, page: 1 })}
                />
            </div>

            {/* Filters */}
            <div className="workshops-filters">
                <label htmlFor="studio-filter">Studio:</label>

                <select
                    id="studio-filter"
                    value={filters.studioId ?? ""}
                    onChange={(event) => updateQuery({ studio: event.target.value, page: 1 })}
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
                    value={filters.minPrice}
                    onChange={(event) => updateQuery({ minPrice: event.target.value, page: 1 })}
                />

                <label htmlFor="max-price">Max Price:</label>

                <input
                    id="max-price"
                    type="number"
                    min="0"
                    placeholder="Max price"
                    value={filters.maxPrice}
                    onChange={(event) => updateQuery({ maxPrice: event.target.value, page: 1 })}
                />

                <fieldset className="materials-filter">
                    <legend>Materials:</legend>

                    {state.materials.map((material) => (
                        <label key={material.id}>
                            <input
                                type="checkbox"
                                checked={filters.materialIds.includes(
                                    material.id
                                )}
                                onChange={(event) => {
                                    const selectedIds =
                                        filters.materialIds;

                                    const updatedIds = event.target.checked
                                        ? [...selectedIds, material.id]
                                        : selectedIds.filter(
                                            (id) => id !== material.id
                                        );

                                    updateQuery({ materials: updatedIds, page: 1 });
                                }}
                            />
                            {material.name}
                        </label>
                    ))}
                </fieldset>
            </div>

            {/* Sorting */}
            <div className="workshops-sorting">
                <label htmlFor="sort-select">Sort by:</label>

                <select
                    id="sort-select"
                    value={sort}
                    onChange={(event) => updateQuery({ sort: event.target.value, page: 1 })}
                >
                    <option value="title-asc">Name: A to Z</option>
                    <option value="title-desc">Name: Z to A</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="date-asc">Date: Earliest First</option>
                    <option value="date-desc">Date: Latest First</option>
                </select>
            </div>

            {/* Empty state */}
            {filteredWorkshops.length === 0 && (
                <div className="workshops-empty" role="status"><p>No workshops found. Try changing your search or filters.</p><button type="button" className="primary-button" onClick={resetFilters}>Reset Filters</button></div>
            )}

            {/* Workshop cards */}
            <div className="workshops-grid">
                {paginatedWorkshops.map((workshop) => {
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                            <button
                                key={page}
                                type="button"
                                className={
                                    currentPage === page ? "active" : ""
                                }
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}

export default WorkshopsPage;
