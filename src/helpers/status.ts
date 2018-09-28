import { Status, OpenStatus } from "types/status";

function getLatestStatus(): Promise<Status> {
  return fetch("/api/status")
    .then(response => response.json())
    .then(response => ({
      ...response,
      dateTime: new Date(response.dateTime)
    }));
}

export { getLatestStatus };
