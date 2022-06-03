import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { HomePage, TemplatePage, ProfilePage, ExplorePage } from "./Pages/index"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
