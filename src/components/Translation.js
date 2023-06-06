import { useState } from "react";
import "./Translation.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import img from "../img/38.png";

const Translator = () => {
  const [inputText, setInputText] = useState(""); //input text state
  const [outputText, setOutputText] = useState(""); //output text state
  const [isTranslated, setIsTranslated] = useState(""); //translation state

  const translate = async () => {
    //translate function
    const encodedParams = new URLSearchParams(); //URLSearchParams object
    encodedParams.set(
      "target_language", //set target language
      document.getElementById("languages").value //get value from select
    );
    encodedParams.set("text", inputText); //set text to translate
    try {
      let detectedLanguage = ""; //detected language variable
      const detect = {
        //detect language object
        method: "POST",
        url: "https://microsoft-translator-text.p.rapidapi.com/Detect",
        params: {
          "api-version": "3.0",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_API_HOST1,
        },
        data: [
          {
            Text: inputText, //text to detect
          },
        ],
      };

      try {
        const response = await axios.request(detect); //detect language request
        detectedLanguage = response.data[0].language; //detected language
      } catch (error) {
        console.error(error);
      }
      encodedParams.set("source_language", detectedLanguage); //set source language
    } catch (error) {
      setIsTranslated(false);
      console.error(error);
    }
    const options = {
      //translate options object
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options); //translate request
      console.log(response.data);

      if (
        //check response
        response.data &&
        response.data.status === "success" &&
        response.data.data &&
        response.data.data.translatedText
      ) {
        const translatedText = response.data.data.translatedText; //translated text
        setOutputText(translatedText); //set output text
        setIsTranslated(true); //set translation state
        console.log(outputText);
      } else {
        setIsTranslated(false);
        console.error("Invalid response format or missing data");
        setOutputText("");
      }
    } catch (error) {
      setIsTranslated(false);
      console.error(error);
    }
  };

  const clearInput = () => {
    //clear input function
    setInputText("");
    setOutputText("");
    setIsTranslated("");
  };

  return (
    <div className="app bg-warning">
      <h1 className="title">Languages Translator</h1>

      <img src={img} alt="img" className="img" />

      <section className="translator">
        <div className="row-wrapper">
          <div className="translator-container input-lang">
            <div className="top-row">
              <button
                className="btn btn-primary btn-translate"
                onClick={translate}
              >
                Translate
              </button>
            </div>
            <form className="input-form">
              <textarea
                className="text-box"
                placeholder="Enter text (any language)"
                onChange={(e) => setInputText(e.target.value)} //set input text
                value={inputText}
              ></textarea>
              {inputText !== "" && ( //check input text
                <AiOutlineClose
                  className="icon-btn close-btn"
                  style={{ color: "red" }}
                  onClick={clearInput}
                />
              )}
            </form>
          </div>
          <div className="translator-container output-lang">
            <div className="top-row">
              <select
                name="languages"
                id="languages"
                className="form-select form-select-sm"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ar">Arabic</option>
                <option value="cs">Czech</option>
                <option value="da">Danish</option>
                <option value="fi">Finnish</option>
                <option value="el">Greek</option>
                <option value="he">Hebrew</option>
                <option value="hu">Hungarian</option>
                <option value="id">Indonesian</option>
                <option value="ko">Korean</option>
                <option value="nl">Dutch</option>
                <option value="no">Norwegian</option>
                <option value="pl">Polish</option>
              </select>
            </div>
            <p className="text-box output-box">
              {isTranslated === false ? (
                <span className="output-placeholder translation-error">
                  Translation failed
                </span>
              ) : outputText === "" ? (
                <span className="output-placeholder">Select a language</span>
              ) : (
                outputText
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="footer-container">
        <p className="footer-text">
          Created by molinito:
          <a href="mailto:molinito48@gmail.com" className="footer-link">
            {" "}
            Contact me
          </a>
        </p>
      </div>
    </div>
  );
};

export default Translator;
