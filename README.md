# Code-Review app

Code Review Agent powered by Gemini and Arakoo. Analyzes code and provides insights using AI.

## Setup

### For API-MODEL

```
cd api-model
```

In jsonnet/secrets.jsonnet

```
local GEMINI_KEY = "your-gemini-key";

{
    "gemini_key": GEMINI_KEY
}
```

Run the agent.

```
yarn start
```

### For CLIENT

```
cd client
yarn dev
```