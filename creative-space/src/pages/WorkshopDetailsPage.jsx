import { Link, useParams } from "react-router-dom";

function WorkshopDetailsPage() {
  const { id } = useParams();

  return (
    <main className="workshop-details">
      <h1>Workshop Details</h1>

      <p>Workshop ID: {id}</p>

      <Link to="/workshops">
        Back to Workshops
      </Link>
    </main>
  );
}

export default WorkshopDetailsPage;