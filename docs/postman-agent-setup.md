# Postman Agent Setup for Local API Testing

The Postman Agent allows the Postman web application to send requests to local or private API endpoints that the browser cannot reach directly.

## When to use it

Use the Postman Agent when:

- testing `localhost` development endpoints;
- testing private APIs reachable from the machine running the agent;
- validating local gateway or validator services without exposing those services publicly.

## Install

1. Download the Postman Agent from the official Postman download page:
   https://www.postman.com/downloads/postman-agent/
2. Install the package for your operating system.
3. Start the agent and select it from Postman's agent selector in the web application.
4. Confirm that the target API is reachable from the same machine before running the collection.

> Security note: the agent provides connectivity; it does not grant permission to access third-party systems. Keep credentials in Postman environments or secret stores, never in committed collection files.

## Aura-Core / validator development

Useful development cases include:

- testing local validator health endpoints;
- exercising an API gateway before public deployment;
- validating routing and fail-closed behavior against development services;
- running Postman collections against local test infrastructure.

Keep production signing, proposing, payment execution, and asset-transfer operations disabled in local API tests unless they are explicitly being exercised in an authorized test environment.

## CI with Newman

The desktop agent is intended for interactive Postman use. CI should use Newman (or Postman CLI) rather than depending on a desktop agent.

```bash
npm install --save-dev newman
npx newman run path/to/collection.json --environment path/to/environment.json
```

Do not commit API keys, wallet keys, authorization tokens, or other secrets. Inject them through CI secrets/environment variables.

## Suggested verification

Before treating an API integration as production-ready, verify:

1. expected status codes and response schemas;
2. authentication failure behavior;
3. timeout and retry behavior;
4. read-only/fail-closed behavior where required;
5. that test requests cannot accidentally execute production financial or signing actions.
