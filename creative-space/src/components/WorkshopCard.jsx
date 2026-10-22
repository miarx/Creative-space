export default function WorkshopCard({ workshop, studio }) {
  return (
    <article className="workshop-card">
      <h2>{workshop.title}</h2>

      <p>{workshop.description}</p>

      <p>
        <strong>Studio:</strong> {studio?.name ?? "Unknown studio"}
      </p>

      <p>
        <strong>Date:</strong> {workshop.date}
      </p>

      <p>
        <strong>Difficulty:</strong> {workshop.difficulty}
      </p>

      <p>
        <strong>Format:</strong> {workshop.format}
      </p>

      <p>
        <strong>Price:</strong> {workshop.price} UAH
      </p>
    </article>
  );
}
