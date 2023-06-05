# Visit deploy
https://splendorous-shortbread-63d3c3.netlify.app/

# Languages Translator

This project is a simple language translator built using React. It allows you to enter text in any language and translates it to the selected target language. The translation is done using the Microsoft Translator Text API.

## Features

- Input text box: Enter the text you want to translate. The text can be in any language.
- Translate button: Clicking this button triggers the translation process.
- Clear button: Removes the input text and translation results.
- Language selection: Choose the target language for translation from the provided options.
- Output text box: Displays the translated text. If translation fails or no language is selected, appropriate messages are shown.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone [repository-url]`
2. Navigate to the project directory: `cd [project-directory]`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your web browser and visit `http://localhost:3000` to see the application running.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Axios: A library for making HTTP requests.
- react-icons: A library for using icons in React components.

## API Key

To use the Microsoft Translator Text API, you need to obtain an API key from the [Microsoft Azure portal](https://portal.azure.com). Once you have the API key, replace the placeholders in the code with your actual API key.

```javascript
headers: {
  "content-type": "application/json",
  "X-RapidAPI-Key": process.env.REACT_APP_API_KEY, // Replace with your API key
  "X-RapidAPI-Host": process.env.REACT_APP_API_HOST1, // Replace with your API host
},
```

## Contact

If you have any questions or suggestions regarding this project, feel free to contact me at molinito48@gmail.com.
