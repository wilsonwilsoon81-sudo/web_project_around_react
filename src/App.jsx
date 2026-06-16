import { useState, useEffect } from "react";
import api from "./utils/api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/MRR/v1/15/sprint/coyote.jpg",
    _id: "",
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error("❌ Error al cargar el usuario:", err);
      });
  }, []);

  return (
    <div className="page__content">
      {}
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
