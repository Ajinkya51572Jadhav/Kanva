import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import "./App.css";

// const Home = lazy(() => import("./pages/Home"));
// const DashBoard = lazy(() => import("./pages/DashBoard.jsx"));
// const Editor = lazy(() => import("./pages/Editor.jsx"));


import { setFontList } from "./redux/editorReducer.jsx";
import Home from "./pages/Home.jsx";
import DashBoard from "./pages/DashBoard.jsx";

function App() {
  const dispatch = useDispatch();
  const { fontList } = useSelector((state) => state.editor);

  useEffect(() => {
    if (fontList.length) return;

    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAPmOqdQMrGAW-pp_xdHaAjP9twCEd4G9Y&sort=popularity")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFontList(data.items || []));
      })
      .catch((err) => {
        console.error("Error fetching fonts:", err);
      })
  }, [dispatch, fontList]);

  return (
    <Router>
      <Suspense fallback={<><Spin /></>}>
        <Routes>
          <Route path="/" element={<><Home /></>} />
          <Route path="/dashboard" element={<><DashBoard /></>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;