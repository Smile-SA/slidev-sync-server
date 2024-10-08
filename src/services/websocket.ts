import type { States } from "../types/data";
import type { Groups, WsConnections } from "../types/groups";

import { WebSocket, WebSocketServer } from "ws";

import { EventType } from "../types/data.js";

import { isConnectData, isPatchData, isReplaceData, isResetData } from "./data.js";
import { log, LogLevel } from "./log.js";
import { getRoutes } from "./routes.js";

const groups: Groups = new Map();
const connections: WsConnections = new Map();

export function initServer(port: number) {
  const { connect, patch, replace, reset } = getRoutes({
    groups,
    send,
    broadcast,
    addConnection
  });

  const wss = new WebSocketServer({ port });
  wss.on("connection", (ws) => {
    ws.on("message", (message: string) => {
      const data = JSON.parse(message);
      log("--- RECEIVED ---");
      log(data);
      if (isConnectData(data)) {
        connect(data, ws, data.uid);
      } else if (isPatchData(data)) {
        patch(data, data.uid);
      } else if (isReplaceData(data)) {
        replace(data, data.uid);
      } else if (isResetData(data)) {
        reset(data, data.uid);
      }
    });

    ws.on("close", () => {
      connections.delete(ws);
    });

    ws.onerror = function () {
      log("Some Error occurred", LogLevel.ERROR);
    };
  });
}

export function addConnection(connection: WebSocket, id: string) {
  connections.set(connection, id);
}

export function removeConnection(connection: WebSocket) {
  connections.delete(connection);
}

export function send(
  ws: WebSocket,
  states: States,
  uid?: string,
  type: EventType = EventType.REPLACE,
) {
  if (process.env.DEBUG === "info") {
    log("--- SEND ---");
    log(states);
  }
  ws.send(JSON.stringify({ type, states, uid }));
}

export function broadcast(
  groupId: string,
  states: States,
  uid?: string,
  type: EventType = EventType.REPLACE,
  connection?: WebSocket
) {
  for (const [conn, id] of connections.entries()) {
    if (groupId === id && conn !== connection) {
      send(conn, states, uid, type);
    }
  }
}
