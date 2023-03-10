import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

//OpenAI config

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/codex", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log(response);
    return res.status(200).send({ bot: response.data.choices[0].text });
  } catch (error) {
    //console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}...`);
});
