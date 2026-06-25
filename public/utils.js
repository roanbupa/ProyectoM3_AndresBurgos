export function formatMessage(role, text) {
  return {
    role,
    text,
    timestamp: new Date().toISOString()
  };
}

export function getLastMessage(messages) {
  return messages[messages.length - 1];
}