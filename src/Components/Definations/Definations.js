import React from "react";
import "./Definations.css";

const Definations = ({ word, category, meaning, lightMode }) => {
  return (
    <div className="meanings">
      {meaning[0] && word && category == "en" && (
        <audio
          src={meaning[0].phonetics[0]?.audio}
          style={{
            borderRadius: "10px",
            width: "100%",
          }}
          controls
        >
          Your browser does not support audio element.
        </audio>
      )}
      {word === "" ? (
        <span className="subTitle">Start by typing a word in search </span>
      ) : (
        meaning.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
                style={{
                  backgroundColor: lightMode ? "#3B5360" : "white",
                  color: lightMode ? "white" : "black",
                }}
              >
                <b> Definition : {def.definition}</b>

                <hr style={{ backgroundColor: "black", width: "100% " }} />
                {def.example && (
                  <span>
                    <b>Example :</b> {def.example}{" "}
                  </span>
                )}

                {def.synonyms.length > 0 && (
                  <span>
                    <b>Synonyms : </b>
                    {def.synonyms.map((s) => `${s} ,`)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definations;
