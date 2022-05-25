import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HomePageScreen from "./pages/homepage/HomePageScreen";

function App() {
  return (
    <div className="container">

    <Routes >
      <Route path="/" element={<Header/>}/>
      <Route path="you" element={<HomePageScreen />}/>
      {/* <Route path="*" element={<main>This page is not routed yet</main> }/> */}
    </Routes>
    </div>
  );
}

export default App;
