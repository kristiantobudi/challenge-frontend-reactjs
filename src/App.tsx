import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/Login/Login";
import Page from "./Page/page";
import ResultPage from "./Page/Result";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/quiz/:id" element={<Page />} />
        <Route path="/quiz/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
