import { useState } from "react";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";
import { useData } from "../hooks/useData";

export default function WorkshopForm({
                                         initialData = {},
                                         onSubmit,
                                         submitLabel = "Save Workshop"
                                     }) {
    const { state } = useData();

    const [formData, setFormData] = useState({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        price: initialData.price ?? "",
        date: initialData.date ?? "",
        duration: initialData.duration ?? "",
        studioId: initialData.studioId ?? "",
        difficulty: initialData.difficulty ?? "Beginner",
        format: initialData.format ?? "Offline",
        maxParticipants: initialData.maxParticipants ?? "",
        materialIds: initialData.materialIds ?? []
    });

    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const isDirty = JSON.stringify(formData) !== JSON.stringify({
        title: initialData.title ?? "", description: initialData.description ?? "",
        price: initialData.price ?? "", date: initialData.date ?? "",
        duration: initialData.duration ?? "", studioId: initialData.studioId ?? "",
        difficulty: initialData.difficulty ?? "Beginner", format: initialData.format ?? "Offline",
        maxParticipants: initialData.maxParticipants ?? "", materialIds: initialData.materialIds ?? []
    });
    const markSaved = useUnsavedChanges(isDirty);
    const today = new Date().toLocaleDateString("en-CA");
    const errors = {
        title: formData.title.trim().length < 3 ? "Title must contain at least 3 characters." : "",
        description: formData.description.trim().length < 10 ? "Description must contain at least 10 characters." : "",
        price: formData.price === "" || !Number.isFinite(Number(formData.price)) || Number(formData.price) < 0 ? "Enter a non-negative price." : "",
        date: !formData.date || formData.date < today ? "Choose today or a future date." : "",
        duration: formData.duration === "" || Number(formData.duration) <= 0 ? "Duration must be greater than zero." : "",
        studioId: formData.studioId === "" ? "Please select a studio." : "",
        maxParticipants: formData.maxParticipants === "" || !Number.isInteger(Number(formData.maxParticipants)) || Number(formData.maxParticipants) <= 0 ? "Enter a positive whole number." : ""
    };
    const invalid = Object.values(errors).some(Boolean);
    const onBlur = (event) => setTouched((previous) => ({ ...previous, [event.target.name]: true }));
    const errorFor = (name) => (touched[name] || submitted) && errors[name];
    const fieldProps = (name) => ({
        onBlur, "aria-invalid": Boolean(errorFor(name)),
        "aria-describedby": errorFor(name) ? `${name}-error` : undefined
    });
    const errorMessage = (name) => errorFor(name) ? <p className="form-error" id={`${name}-error`} role="alert">{errors[name]}</p> : null;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleMaterialChange = (materialId, checked) => {
        setFormData((previous) => ({
            ...previous,
            materialIds: checked
                ? [...previous.materialIds, materialId]
                : previous.materialIds.filter(
                    (id) => id !== materialId
                )
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        if (invalid) {
            const firstInvalid = Object.keys(errors).find((name) => errors[name]);
            event.currentTarget.elements.namedItem(firstInvalid)?.focus();
            return;
        }
        markSaved();
        onSubmit({
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            duration: Number(formData.duration),
            studioId: Number(formData.studioId),
            maxParticipants: Number(formData.maxParticipants)
        });
    };

    return (
        <form className="workshop-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="title">Workshop Title</label>
            <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                {...fieldProps("title")}
                onChange={handleChange}
                required
            />
            {errorMessage("title")}

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                {...fieldProps("description")}
                onChange={handleChange}
                rows="4"
                required
            />
            {errorMessage("description")}

            <label htmlFor="price">Price (UAH)</label>
            <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                {...fieldProps("price")}
                onChange={handleChange}
                required
            />
            {errorMessage("price")}

            <label htmlFor="date">Date</label>
            <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                {...fieldProps("date")}
                onChange={handleChange}
                required
            />
            {errorMessage("date")}

            <label htmlFor="duration">Duration (minutes)</label>
            <input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                {...fieldProps("duration")}
                onChange={handleChange}
                required
            />
            {errorMessage("duration")}

            <label htmlFor="studioId">Studio</label>
            <select
                id="studioId"
                name="studioId"
                value={formData.studioId}
                {...fieldProps("studioId")}
                onChange={handleChange}
                required
            >
                <option value="">Select a studio</option>
                {state.studios.map((studio) => (
                    <option key={studio.id} value={studio.id}>
                        {studio.name}
                    </option>
                ))}
            </select>
            {errorMessage("studioId")}

            <label htmlFor="difficulty">Difficulty</label>
            <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>

            <label htmlFor="format">Format</label>
            <select
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
            >
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
            </select>

            <label htmlFor="maxParticipants">
                Maximum Participants
            </label>
            <input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                min="1"
                value={formData.maxParticipants}
                {...fieldProps("maxParticipants")}
                onChange={handleChange}
                required
            />
            {errorMessage("maxParticipants")}

            <fieldset className="form-materials">
                <legend>Materials</legend>
                {state.materials.map((material) => (
                    <label key={material.id}>
                        <input
                            type="checkbox"
                            checked={formData.materialIds.includes(material.id)}
                            onChange={(event) =>
                                handleMaterialChange(
                                    material.id,
                                    event.target.checked
                                )
                            }
                        />
                        {material.name}
                    </label>
                ))}
            </fieldset>

            <button type="submit" className="primary-button" disabled={submitted && invalid}>
                {submitLabel}
            </button>
        </form>
    );
}
