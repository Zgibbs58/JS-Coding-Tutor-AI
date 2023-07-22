const { OpenAI } = require("langchain/llms/openai");
require("dotenv").config();
const inquirer = require("inquirer");
const { PromptTemplates } = require("langchain/prompts");

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  //  temperature property represents the creativity of the AI.
  //   The higher the temperature, the more creative the AI will be. scale of 0 to 1
  temperature: 0,
  model: "gpt-3.5-turbo",
});

const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "input",
        message: "Ask a coding question: ",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.input);
    });
};

const promptFunc = async (input) => {
  try {
    const res = await model.call(input);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

init();
