enum OpenStatus {
  Up = "up",
  Down = "down"
}

interface Status {
  openStatus: OpenStatus;
  dateTime: Date;
  tweet?: string;
  tweetUrl?: string;
}

export default Status;
export { Status, OpenStatus };
