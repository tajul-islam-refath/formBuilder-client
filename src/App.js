import { Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/NavBar/NavBar';
import Form from "./components/Pages/Form";
import Formresults from "./components/Pages/FormResults";
import GenerateForm from "./components/Pages/GenerateForm";
import Home from "./components/Pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="generate-form" element={<GenerateForm />} />
        <Route path="forms/:id" element={<Form />} />
        <Route path="results/:formId" element={<Formresults />} />

      </Routes>
    </div>
  );
}

export default App;
