# Evaluate News Article with NLP
A web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. This tool will give us back pertinent information about the article, like whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

<img src="https://github.com/cosmin-cojocar/evaluate_news_article_nlp/blob/master/design/presentation/intro.png">

## Configuration

This project expects certain environment variables to be provided in the `.env` file in project root directory

    - API_ID
    - API_KEY

## Get Started

1. Clone this repo
2. `cd` into your local cloned repo:

    - `npm install` or `yarn install`

3. Create a new .env file and containing the following environment variables for the [Aylien API](https://docs.aylien.com/textapi/endpoints/#api-endpoints):

    - API_ID
    - API_KEY

4. Run: `npm run dev` or `yarn run dev`
5. Open another terminal and run:

    - `npm start` or `yarn start` to start your nodejs server
    

## Credits
1. AYLIEN Text Analysis API
    
    The [AYLIEN](https://aylien.com) Text Analysis API is a package of Natural Language Processing and Machine Learning-powered APIs for analyzing and extracting various kinds of information from textual content.

2. Emblema One & IBM Plex Sans font was downloaded from:
    * https://fonts.google.com/specimen/Emblema+One
    * https://fonts.google.com/specimen/IBM+Plex+Sans

## License

This repo is open source software [licensed as MIT](https://github.com/cosmin-cojocar/evaluate_news_article_nlp/blob/master/LICENSE).
