# Creative Space 🎨

Creative Space is a React web application for discovering and managing creative workshops. Users can browse workshops, search and filter available activities, view detailed information, and create, edit, or delete workshops.

## Features

- Browse creative workshops with detailed information
- Search workshops by title
- Filter workshops by studio, materials, and price
- Sort workshops by title, price, or date
- Navigate through paginated workshop listings
- Create, edit, and delete workshops (CRUD)
- Validate workshop form inputs
- Save workshop data using browser localStorage
- Responsive design for desktop, tablet, and mobile devices

## Technologies Used

- React
- JavaScript (ES6+)
- Vite
- React Router
- Context API
- useReducer
- HTML5 and CSS3
- localStorage

## Project Structure

```text
src/
├── components/    # Reusable UI components
├── context/       # Global state management
├── data/          # Initial workshop, studio, and material data
├── hooks/         # Custom React hooks
├── pages/         # Application pages
├── App.jsx        # Application routes
└── main.jsx       # Application entry point
```

## Installation and Setup

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd creative-space
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Production Build

```bash
npm run build
npm run preview
```

## Data Storage

The application uses browser localStorage to persist workshop changes between page reloads. Initial workshop data is provided in `src/data/workshops.js`.

Data is stored locally in each browser. The application does not currently use a backend or external database.


## Project Purpose

This project was developed to practice React application architecture, component-based development, routing, state management, CRUD operations, and responsive web design.
