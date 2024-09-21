import { Link, Route, Routes } from "react-router-dom";
import "./navbar.css";
import Home from "../view/Home";
import Project from "../view/Project";

import Notes from "../view/Notes";
import Question from "../view/Question";
import ErrorPage from "../view/ErrorPage";
export function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project" element={<Project />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/question" element={<Question />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export function RoutesNavbar() {
  return (
    <ul className="m-navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/project">Project</Link>
      </li>
      <li>
        <Link to="/notes">Notes</Link>
      </li>
      <li>
        <Link to="/question">Question</Link>
      </li>
      <li>
        <Link to="/error">ErrorPage</Link>
      </li>
      <li>
        <button>switch</button>
      </li>
    </ul>
  );
}
