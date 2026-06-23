import { formatMessage } from "./utils.js";

export const messages = []; // historial en memoria

export function addUserMessage(text) {

  const msg = formatMessage("user", text); // crea mensaje usuario

  messages.push(msg); // guarda historial

  return msg;
}

export function addBotMessage(text) {

  const msg = formatMessage("assistant", text); // crea mensaje AI

  messages.push(msg);

  return msg;
}