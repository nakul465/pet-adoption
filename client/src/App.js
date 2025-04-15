import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pets from "./pages/Pets";
import ContactUs from "./pages/ContactUs";
import PostPet from "./pages/PostPet";
import AdoptionApplication from "./pages/AdoptionApplication"; // Import new page
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard"; // import your AdminDashboard component
import AdminContactMessages from "./pages/AdminContactMessages";
import PendingApplications from "./pages/PendingApplications";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin-contact-us" element={<AdminContactMessages />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin dashboard route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/post-pet" element={<PostPet />} />
        <Route path="/adoption-application" element={<AdoptionApplication />} /> 
        <Route path="/pending-applications" element={<PendingApplications />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
