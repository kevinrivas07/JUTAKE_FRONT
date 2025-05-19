import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap"; // si NO usas reactstrap elimínalo
import Login from "./components/Login";
import Register from "./components/Register";
import AddBook from "./components/AddBook";
import AdminPanel from "./components/AdminPanel";
import ModifyStatus from "./components/ModifyStatus";
import Admin from "./components/Admin";
import UpdateBook from "./components/UpdateBook";
import RegisterLoan from "./components/RegisterLoan"

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/update" element={<UpdateBook />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/modify-status" element={<ModifyStatus />} />
          <Route path="/register-loan" element={<RegisterLoan />} />
          {/* aquí puedes añadir más rutas */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
