import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Definations from "./Components/Definations/Definations";
import Header from "./Components/Header/Header";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryAPI = () => {
    word.length > 0 &&
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
        .then((res) => {
          // console.log("Fetched Result is ", res.data);
          toast.info("Data fetched successfully");
          setMeaning(res.data);
        })
        .catch((err) => {
          // console.log("Error occured", err);
          toast.error("Sorry no meaning found");
        });
  };

  useEffect(() => {
    dictionaryAPI();
  }, [word, category]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#CAD5E2" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Light Mode" : "Dark Mode"}</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />

        {meaning && (
          <Definations
            word={word}
            meaning={meaning}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
