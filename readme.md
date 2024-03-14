Here's the markdown documentation for your API:

# VJP Currency Converter Backend

This API allows you to convert between different currencies based on predefined conversion rates.

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. List of Currencies

- **Description:** Get a list of all available currencies.
- **Method:** GET
- **Endpoint:** `/currencies`
- **Response:**

```json
{
  "description": "List of all available currencies",
  "currencies": [
    {
      "name": "string",
      "abbreviation": "string",
      "symbol": "ഗ"
    }
  ]
}
```

### 3. Convert Currency

- **Description:** Convert an amount from one currency to another.
- **Method:** POST
- **Endpoint:** `/convert`
- **Request Body:**

```json
{
  "from": "TIP",
  "to": "MOK",
  "amount": 10
}
```

- **Response:**

```json
{
  "from": {
    "name": "Tippaleipä",
    "abbreviation": "TIP",
    "symbol": "ഗ",
    "amount": 10
  },
  "to": {
    "name": "Mokkapala",
    "abbreviation": "MOK",
    "symbol": "♢",
    "amount": 150
  }
}
```

**Note:** Replace `TIP`, `MOK`, and `10` with appropriate currency abbreviations and amount for your conversion.

## Usage Instructions

Please refer to the README file for detailed API usage instructions.

---

Feel free to expand this documentation further by adding more details about request and response formats, error handling, authentication, etc., as per your project requirements.
