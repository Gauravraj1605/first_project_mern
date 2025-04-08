import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import { Loader } from 'lucide-react';
import { useUserStore } from './context/useUserStore';
import { useEffect } from 'react';
import Gallery from './components/Gallery';
import Profile from './components/Profile';

function App() {

  const checkAuth = useUserStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-14">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Gallery/>
              </>
            }
          />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
