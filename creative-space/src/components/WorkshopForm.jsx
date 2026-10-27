
import { useState } from "react";
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

    if (formData.title.trim().length < 3) {
        alert("Title must contain at least 3 characters.");
        return;
    }

    if (formData.description.trim().length < 10) {
        alert("Description must contain at least 10 characters.");
        return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
        alert("Price cannot be negative.");
        return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (!formData.date || formData.date < today) {
        alert("Workshop date cannot be in the past.");
        return;
    }

    if (Number(formData.duration) <= 0) {
        alert("Duration must be greater than zero.");
        return;
    }

    if (
        !Number.isInteger(Number(formData.maxParticipants)) ||
        Number(formData.maxParticipants) <= 0
    ) {
        alert("Number of participants must be a positive integer.");
        return;
    }

    if (formData.studioId === "") {
        alert("Please select a studio.");
        return;
    }

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
        <form className="workshop-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Workshop Title</label>
            <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
            />

            <label htmlFor="price">Price (UAH)</label>
            <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
            />

            <label htmlFor="date">Date</label>
            <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <label htmlFor="duration">Duration (minutes)</label>
            <input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                required
            />

            <label htmlFor="studioId">Studio</label>
            <select
                id="studioId"
                name="studioId"
                value={formData.studioId}
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
                onChange={handleChange}
                required
            />

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

            <button type="submit" className="primary-button">
                {submitLabel}
            </button>
        </form>
    );
}
