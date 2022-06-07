import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { HomePage, TemplatePage, BookmarkPage, ProfilePage, ExplorePage, SignupPage, LoginPage, LogoutPage, } from "./Pages/index"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
