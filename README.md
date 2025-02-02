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

## IN ACTION
<div>
    <a href="https://www.loom.com/share/a26965000ad64176836017b98492d7b7">
      <p>Code Review Application Overview 🚀 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/a26965000ad64176836017b98492d7b7">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/a26965000ad64176836017b98492d7b7-c1bd6a83a29368e7-full-play.gif">
    </a>
  </div>