import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_SORT = "title-asc";
const SORTS = ["title-asc", "title-desc", "price-asc", "price-desc", "date-asc", "date-desc"];

export function useWorkshopQuery() {
    const [params, setParams] = useSearchParams();
    const query = useMemo(() => {
        const studio = Number(params.get("studio"));
        const materialIds = (params.get("materials") || "").split(",").map(Number).filter((id) => Number.isInteger(id) && id > 0);
        const sort = params.get("sort") || DEFAULT_SORT;
        return {
            search: params.get("search") || "",
            filters: {
                studioId: params.get("studio") && Number.isInteger(studio) && studio > 0 ? studio : null,
                materialIds,
                minPrice: params.get("minPrice") || "",
                maxPrice: params.get("maxPrice") || ""
            },
            sort: SORTS.includes(sort) ? sort : DEFAULT_SORT,
            page: Math.max(1, Number.parseInt(params.get("page"), 10) || 1)
        };
    }, [params]);

    const updateQuery = useCallback((changes) => {
        setParams((previous) => {
            const next = new URLSearchParams(previous);
            for (const [key, value] of Object.entries(changes)) {
                if (value === null || value === undefined || value === "" || value === DEFAULT_SORT || (Array.isArray(value) && value.length === 0) || (key === "page" && value === 1)) {
                    next.delete(key);
                } else {
                    next.set(key, Array.isArray(value) ? value.join(",") : String(value));
                }
            }
            return next;
        }, { replace: true });
    }, [setParams]);

    const resetFilters = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams]);
    return { ...query, updateQuery, resetFilters };
}
