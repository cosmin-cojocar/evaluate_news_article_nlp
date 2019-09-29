import URL_REGEX from "./validator";

// Our own server endpoints url's
const baseURL = "http://localhost:3000/evaluate";

// Method used to validate user input against a URL regex
const validateUrl = (url) => URL_REGEX.test(url);

/**
 * Helper function that helps us making POST calls to the server.
 *
 * @param {String} link - Article url that we want to evaluate.
 * @param {String} path - Path for server endpoint that will help us with evaluation process.
 */
const _evaluateData = async (link, path = baseURL) => {
  return await fetch(path, {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify({link: link})
  })
};

// Method used to submit an article url for evaluation process
const submitAction = (url) => {
  return new Promise((resolve, reject) => {
    _evaluateData(url).then((response) => {
      if (response.status !== 200) {
        reject({
          success: false,
          message: "There was a server error."
        });
      }

      response.json().then((data) => {
        resolve({
          success: true,
          data: data
        });
      });
    }).catch((error) => {
      reject({
        success: false,
        message: error
      });
    })
  });
};

export { submitAction, validateUrl }
