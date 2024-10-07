import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import { LoginForm } from "./components/Login/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </Router>
  );
}
