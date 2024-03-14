import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
const port = 3000;

const currencies = [
  {
    name: "Tippaleipä",
    abbreviation: "TIP",
    value: 0.4,
    symbol: "ഗ",
  },
  {
    name: "Munkki",
    abbreviation: "MUN",
    value: 22.5,
    symbol: "◯",
  },
  {
    name: "Mokkapala",
    abbreviation: "MOK",
    value: 1.5,
    symbol: "♢",
  },
  {
    name: "Sima",
    abbreviation: "SIM",
    value: 0.7,
    symbol: "Ṣ",
  },
  {
    name: "Marianne",
    abbreviation: "MAR",
    value: 80.9,
    symbol: "⌘",
  },
  {
    name: "Kotisima",
    abbreviation: "KIL",
    value: 0.02,
    symbol: "k̂",
  },
];

app.get("/", (req: Request, res: Response) => {
  res.json({
    message:
      "VJP Currency converter. Please find the API usage instructions in the readme",
  });
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/currencies", async (req, res) => {
  res.send({
    description: "List of all available currencies",
    currencies: currencies.map((currency) => {
      return {
        name: currency.name,
        abbreviation: currency.abbreviation,
        symbol: currency.symbol,
      };
    }),
  });
});

app.post("/convert", async (req, res) => {
  // request body needs to have the following fields
  // from: string, to: string, amount: number

  if (!req.body.from || !req.body.to || !req.body.amount) {
    return res.status(400).send({
      error:
        "Invalid request body. Please make sure that you have 'from', 'to' and 'amount'",
    });
  }

  const from = req.body.from;
  const to = req.body.to;
  const amount = req.body.amount;

  // if from or to is not a valid currency, return 400
  const fromCurrency = currencies.find(
    (currency) => currency.abbreviation === from
  );
  const toCurrency = currencies.find(
    (currency) => currency.abbreviation === to
  );

  if (!fromCurrency || !toCurrency) {
    return res.status(400).send({
      error: "Invalid currency. Please check the currency abbreviations",
    });
  }

  // if amount is not a number, return 400
  if (isNaN(amount)) {
    return res.status(400).send({
      error: "Invalid amount. Please make sure that the amount is a number",
    });
  }

  // calculate the conversion
  const convertedAmount = (amount * fromCurrency.value) / toCurrency.value;

  res.send({
    from: {
      name: fromCurrency.name,
      abbreviation: fromCurrency.abbreviation,
      symbol: fromCurrency.symbol,
      amount,
    },
    to: {
      name: toCurrency.name,
      abbreviation: toCurrency.abbreviation,
      symbol: toCurrency.symbol,
      amount: convertedAmount,
    },
  });
});

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});
