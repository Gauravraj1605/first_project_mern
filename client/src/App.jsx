import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Register from './components/register';
import Login from './components/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
              </>
            }
          />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/signin" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
