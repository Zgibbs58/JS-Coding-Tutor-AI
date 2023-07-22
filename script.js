const { OpenAI } = require("langchain/llms/openai");
require("dotenv").config();
const inquirer = require("inquirer");
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  //  temperature property represents the creativity of the AI.
  //   The higher the temperature, the more creative the AI will be. scale of 0 to 1
  temperature: 0,
  model: "gpt-3.5-turbo",
});

const init = async () => {
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
    const prompt = new PromptTemplate({
      //template property is where we inject the user input using \n immediately followed by curly braces surrounding a variable name.
      template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{question}",
      //   variable name is defined in the next property, inputVariables.
      inputVariables: ["question"],
      partialVariables: { format_instructions: formatInstructions },
    });
    const promptInput = await prompt.format({
      question: input,
    });
    const res = await model.call(input);
    console.log(await parser.parse(res));
  } catch (err) {
    console.error(err);
  }
};

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  code: "Javascript code that answers the user's question",
  explanation: "detailed explanation of the example code provided",
});

const formatInstructions = parser.getFormatInstructions();

init();
