import { useData } from "./hooks/useData";
import WorkshopCard from "./components/WorkshopCard";

import "./App.css";

function App() {
  const { state } = useData();

  return (
    <main className="app">
      <h1>Creative Space 🎨</h1>
      <p>Discover and manage creative workshops.</p>

      <h2>Our Workshops ({state.workshops.length})</h2>

      <div className="workshops-grid">
        {state.workshops.map((workshop) => {
          const studio = state.studios.find(
            (studio) => studio.id === workshop.studioId
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
    </main>
  );
}

export default App;
