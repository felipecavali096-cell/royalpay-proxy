import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/create-payment", async (req, res) => {
  try {
    const response = await fetch("https://app.royalpaybr.com.br/api/v1/gateway/pix/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ROYAL_PAY_SECRET_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro no proxy" });
  }
});

app.listen(PORT, () => {
  console.log("Proxy rodando");
});
