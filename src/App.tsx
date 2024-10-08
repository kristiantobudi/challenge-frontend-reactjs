import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/Login/Login";
import Page from "./Page/page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/quiz/:id" element={<Page />} />
      </Routes>
    </Router>
  );
}
