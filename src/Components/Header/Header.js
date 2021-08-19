import {
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import "./Header.css";
import categories from "../../data/category";
import { debounce } from "lodash";

const Header = ({ category, setCategory, word, setWord, lightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        //color of input will stay white
        main: lightMode ? "#000" : "#fff",
      },
      type: lightMode ? "light" : "dark",
    },
  });

  const handleChange = (language) => {
    setCategory(language);
    setWord("");
    console.log((document.getElementById("txt").value = ""));
  };

  const searchHandle = debounce((text) => {
    setWord(text);
  }, 1000);

  return (
    <div className="header">
      <span className="title">{word ? word : "Word Hunt"}</span>

      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            id="txt"
            className="search"
            label="Search a word"
            onChange={(e) => searchHandle(e.target.value)}
          />

          <TextField
            className="select"
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;

// ThemeProvider -> provides themes to the material ui components
