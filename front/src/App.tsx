import Dashboard from '@pages/Dashboard';
import About from '@pages/About';
import Details from '@pages/Details';
import MainLayout from "@layout/MainLayout";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<Details />} />
      </Route>
    </Routes>
  )
}

export default App;
