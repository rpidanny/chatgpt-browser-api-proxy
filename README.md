# ChatGPT Browser API Proxy

The **ChatGPT Browser API Proxy** is a project that enables the use of OpenAI APIs by leveraging the ChatGPT unofficial browser API while bypassing Cloudflare anti-bot detection. This proxy allows you to make API requests to OpenAI's services directly from your local machine.

## Prerequisites

Before using this API proxy, ensure that you have the following:

- Node.js installed on your machine
- Yarn package manager installed

## Getting Started

To set up and use the ChatGPT Browser API Proxy, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/rpidanny/chatgpt-browser-api-proxy.git
   ```

2. Navigate to the project directory:

   ```shell
   cd chatgpt-browser-api-proxy
   ```

3. Install the project dependencies:

   ```shell
   yarn install
   ```

4. Copy the example environment file and rename it to `.env`:

   ```shell
   cp example.env .env
   ```

5. Open the `.env` file and add your OpenAI Access Token obtained from the OpenAI platform. Replace `<YOUR_ACCESS_TOKEN>` with your actual token.

6. Start the proxy server in development mode:

   ```shell
   yarn start:dev
   ```

*Note:*

You can get an Access Token by logging in to the ChatGPT webapp and then opening `https://chat.openai.com/api/auth/session`, which will return a JSON object containing your Access Token string.

Access tokens last for few days.

## Configuring for LangChain

If you intend to use the proxy with _LangChain_, you need to set the `OPENAI_API_BASE` environment variable to specify the API base URL.

```shell
export OPENAI_API_BASE=http://localhost:3000/v1
```

## Making API Requests

Once the proxy server is running, you can make API requests to OpenAI's services using the provided routes and endpoints. The proxy will handle the communication with the ChatGPT unofficial browser API and forward the responses to your local machine.

## Notes

- This project is an unofficial implementation and may not provide the same level of reliability or stability as official OpenAI APIs.
- Usage of this project may be subject to OpenAI's terms of service. Please ensure compliance with their guidelines and policies.

## Disclaimer

This project is provided as-is, without any warranty or guarantee of its functionality. The developers and contributors are not responsible for any damages or issues arising from the use of this project.

## License

This project is licensed under the [MIT License](LICENSE).
