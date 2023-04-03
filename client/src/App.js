import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import { store } from "./app/store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateContact from "./components//contact-form/CreateContact";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import AdminDashboard from "./components/admin/AdminDashboard";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<CreateContact />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/user/:id" element={<Profile />} />

        <Route /////////////  Profile Routes  ////////////////
          path="/create-profile"
          element={<PrivateRoute component={CreateProfile} />}
        />

        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />

        <Route
          path="/edit-profile"
          element={<PrivateRoute component={EditProfile} />}
        />

        <Route
          path="/add-experience"
          element={<PrivateRoute component={AddExperience} />}
        />

        <Route
          path="/add-education"
          element={<PrivateRoute component={AddEducation} />}
        />

        <Route ///////////////  Post Routes  ////////////////
          path="/posts"
          element={<PrivateRoute component={Posts} />}
        />

        <Route path="/post/:id" element={<PrivateRoute component={Post} />} />

        <Route ///////////////  Adimin Routes  ////////////////
          path="/admin"
          element={<PrivateRoute component={AdminDashboard} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
