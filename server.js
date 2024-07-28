import express from "express";
import cors from "cors";
import ollama from "ollama";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


console.log("Starting server...");




app.post("/ask", async (req, res) => {
  const { prompt, model, systemMessage } = req.body;
  if (!prompt) {
    res.status(400).send("Please provide a question in the request body.");
  } else {
    try {
      const response = await ollama.chat({
        // model: "mistral",
        model: model,

        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          { role: "user", content: prompt },
        ],
      });
      res.status(200).send(response.message.content);
    } catch (error) {
      res.status(500).send("An error occurred while processing your request.");
    }
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
