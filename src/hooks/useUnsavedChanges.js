import { useBeforeUnload, useBlocker } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";

export function useUnsavedChanges(isDirty) {
    const savingRef = useRef(false);
    const blocker = useBlocker(({ currentLocation, nextLocation }) =>
        isDirty && !savingRef.current && (currentLocation.pathname !== nextLocation.pathname || currentLocation.search !== nextLocation.search)
    );

    useEffect(() => {
        if (blocker.state !== "blocked") return;
        if (window.confirm("You have unsaved changes. Leave without saving?")) {
            blocker.proceed();
        } else {
            blocker.reset();
        }
    }, [blocker]);

    useBeforeUnload(useCallback((event) => {
        if (!isDirty || savingRef.current) return;
        event.preventDefault();
        event.returnValue = "";
    }, [isDirty]));

    return () => { savingRef.current = true; };
}
