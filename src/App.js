import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleInitialData } from "./features/shared/sharedActions";
import Nav from "./components/Nav";
import Home from "./components/Home";
import AddPoll from "./components/AddPoll";
import Leaderboard from "./components/Leaderboard";
import PollDetail from "./components/PollDetail";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddPoll />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:question_id"
            element={
              <PrivateRoute>
                <PollDetail />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
