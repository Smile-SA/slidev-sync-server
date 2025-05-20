# slidev-sync-server

WebSocket server for [Slidev](https://sli.dev/).

You can use this server easily with the [slidev-addon-sync](https://github.com/Smile-SA/slidev-addon-sync) addon.

## Installation

Get source code or git clone this repo.

Install dependencies:
```bash
npm i
```

Then build the files:
```bash
npm run build
```

Finally start the server:
```bash
npm run start
```

## Configuration

You can configure the project using environment variables.

Example:
```bash
DEBUG=info npm run start
```

Available environment variables:

| Variable | Type | Default value | Description |
|---|---|---|---|
| PORT | `number` | `8080` | Change running port |
| DEBUG | `'error' \| 'warn' \| 'info'` | `'error'` | Debug level |
| WS | `boolean` | `false` | use WebSocket if `true`, else use HTTP Server Sent Events |
| CORS_ORIGIN | `string` | `'*'` | Access-Control-Allow-Origin header for HTTP SSE |

## Docker

A prebuilt Docker image is available to run the server without building it manually.

Image:

    ghcr.io/smile-sa/slidev-sync-server:latest

Example usage:

    docker run --rm -p 8080:8080 \
      -e WS=true \
      -e DEBUG=info \
      ghcr.io/smile-sa/slidev-sync-server:latest

Environment variables:

- `PORT`: (default: `8080`) – the port the server will listen on
- `DEBUG`: `error`, `warn`, or `info` (default: `error`)
- `WS`: `true` to use WebSocket, `false` to use HTTP Server Sent Events
- `CORS_ORIGIN`: access control header for SSE connections (default: `*`)
