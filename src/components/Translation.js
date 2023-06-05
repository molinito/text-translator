import { useState } from "react";
import "./Translation.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import img from "../img/38.png";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTranslated, setIsTranslated] = useState("");

  const translate = async () => {
    const encodedParams = new URLSearchParams();
    //encodedParams.set("source_language", "en");
    encodedParams.set(
      "target_language",
      document.getElementById("languages").value
    );
    encodedParams.set("text", inputText);
    try {
      let detectedLanguage = "";
      const detect = {
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
            Text: inputText,
          },
        ],
      };

      try {
        const response = await axios.request(detect);
        detectedLanguage = response.data[0].language;
      } catch (error) {
        console.error(error);
      }
      encodedParams.set("source_language", detectedLanguage);

      // Rest of the translation code...
    } catch (error) {
      setIsTranslated(false);
      console.error(error);
    }
    const options = {
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
      const response = await axios.request(options);
      console.log(response.data);

      if (
        response.data &&
        response.data.status === "success" &&
        response.data.data &&
        response.data.data.translatedText
      ) {
        const translatedText = response.data.data.translatedText;
        setOutputText(translatedText);
        setIsTranslated(true);
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
                onChange={(e) => setInputText(e.target.value)}
                value={inputText} // Aqui se declara el valor del input que se va a traducir
              ></textarea>
              {inputText !== "" && (
                <AiOutlineClose
                  className="icon-btn close-btn"
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
                <option value="zh-Hans">Chinese (Simplified)</option>
                <option value="zh-Hant">Chinese (Traditional)</option>
                <option value="ar">Arabic</option>
                <option value="cs">Czech</option>
                <option value="da">Danish</option>
                <option value="fi">Finnish</option>
                <option value="el">Greek</option>
                <option value="ht">Haitian Creole</option>
                <option value="he">Hebrew</option>
                <option value="hi">Hindi</option>
                <option value="hu">Hungarian</option>
                <option value="id">Indonesian</option>
                <option value="ko">Korean</option>
                <option value="ms">Malay</option>
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
