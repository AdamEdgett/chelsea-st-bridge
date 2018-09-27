import { Status, OpenStatus } from "types/status";

function getLatestStatus(): Promise<Status> {
  return fetch("http://localhost:4567/api/status")
    .then(response => response.json())
    .then(response => ({
      ...response,
      dateTime: new Date(response.dateTime)
    }));
}

export { getLatestStatus };
