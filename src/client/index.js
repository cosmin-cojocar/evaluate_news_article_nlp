import {validateUrl} from "./js/formHandler";
import "./styles/index.scss";

/**
 * Elements References Variables
 */
let navigation;
let articleUrlInput;
let evaluateButton;
let inputError;

// typing countdown reference variable
let typingTimer;
// typing time in ms, 0.5 second until we validate input
const doneTypingInterval = 500;

// user has "finished typing" so we validate his input to be a valid URL
const doneTyping = () => {
  const url = articleUrlInput.value.trim();

  if ( url === "" || validateUrl(url) ) {
    // we have a valid url or an empty input so we do not have an error in this case
    inputError.innerHTML = "";
    inputError.classList.add("hidden");
    inputError.classList.remove("visible");
  } else {
    // url entered is not valid, case when we need to show an error to our users
    inputError.innerHTML = "Please make sure you enter a valid URL";
    inputError.classList.add("visible");
    inputError.classList.remove("hidden");
  }
};

// HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  navigation = document.getElementsByTagName("header")[0];
  articleUrlInput = document.getElementById("article__url");
  evaluateButton = document.getElementById("submit__button");
  inputError = document.getElementById("input__error");

  // on keyup, we start the typing countdown for articleUrlInput
  articleUrlInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  // on keydown, we clear the typing countdown for articleUrlInput
  articleUrlInput.on("keydown", () => {
    clearTimeout(typingTimer);
  });
});
