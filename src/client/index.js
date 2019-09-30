import {displayResults} from "./js/resultsHandler";
import {submitAction, validateUrl} from "./js/submitHandler";
import "./styles/index.scss";

const _initServiceWorker = () => {
  // Check that service workers are supported
  if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performance
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW registered: ", registration);
      }).catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
    });
  }
};
_initServiceWorker();

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

const _toggleErrorMsg = (message) => {
  if ( message === "" ) {
    // we have a valid url or an empty input so we do not have an error in this case
    inputError.innerHTML = message;
    inputError.classList.add("hidden");
    inputError.classList.remove("visible");
  } else {
    // url entered is not valid, case when we need to show an error to our users
    inputError.innerHTML = message;
    inputError.classList.add("visible");
    inputError.classList.remove("hidden");
  }
};

// user has "finished typing" so we validate his input to be a valid URL
const _doneTyping = () => {
  const url = articleUrlInput.value.trim();

  if ( url === "" || validateUrl(url) ) {
    _toggleErrorMsg("");
  } else {
    _toggleErrorMsg("Please make sure you enter a valid URL");
  }
};

// HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
  navigation = document.getElementsByTagName("header")[0];
  articleUrlInput = document.getElementById("article__url");
  evaluateButton = document.getElementById("submit__button");
  inputError = document.getElementById("input__error");
  const resultCategories = document.getElementById("resultCategories");

  // on keyup, we start the typing countdown for articleUrlInput
  articleUrlInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(_doneTyping, doneTypingInterval);
  });

  // on keydown, we clear the typing countdown for articleUrlInput
  articleUrlInput.addEventListener("keydown", () => {
    clearTimeout(typingTimer);
  });

  evaluateButton.addEventListener("click", (event) => {
    event.preventDefault();

    // we remove result data before we update it
    resultCategories.innerHTML = "";

    const url = articleUrlInput.value.trim();

    if ( url !== "" && validateUrl(url) ) {
      // we have a valid url or an empty input so we do not have an error in this case
      _toggleErrorMsg("");
      submitAction(url).then(res => {
        if (res.success) {
          displayResults(res.data);
        } else {
          _toggleErrorMsg(res.message);
        }
      })
      // we are in situation of a server error so we need to let the user know about it
      .catch(error => window.alert(error));
    } else {
      // url entered is not valid, case when we need to show an error to our users
      _toggleErrorMsg("Please make sure you enter a valid URL");
    }
  });
});
