import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./supabaseClient";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

/**
 * Main App Component
 * Manages authentication state and routing
 */
function App() {
  // State to store the current user
  const [user, setUser] = useState(null);

  // State to manage loading while checking auth
  const [loading, setLoading] = useState(true);

  /**
   * Check for existing session and listen for auth changes
   * This runs when the component mounts
   */
  useEffect(() => {
    // Check if there's an existing session
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Handle successful authentication
   */
  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  /**
   * Handle sign out
   */
  const handleSignOut = () => {
    setUser(null);
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public route - Sign In/Sign Up */}
        <Route
          path="/signin"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignIn onAuthSuccess={handleAuthSuccess} />
            )
          }
        />

        {/* Protected route - Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Default route - redirect to dashboard if authenticated, otherwise to signin */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
