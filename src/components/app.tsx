import React from "react";
import format from "date-fns/format";
import isToday from "date-fns/is_today";
import isYesterday from "date-fns/is_yesterday";

import { Status, OpenStatus } from "types/status";

import Loader from "components/loader";

interface AppProps {
  status?: Status;
  error?: boolean;
}

function getFormattedTimestamp(dateTime: Date): string {
  const formattedTime = format(dateTime, "h:mm A");
  let formattedDate = "";
  if (!isToday(dateTime)) {
    if (isYesterday(dateTime)) {
      formattedDate = "yesterday at ";
    } else {
      formattedDate = `${format(dateTime, "M/D")} at`;
    }
  }

  return `${formattedDate}${formattedTime}`;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    const { status, error } = this.props;
    if (error) {
      return (
        <div className="content error">
          <div className="header">Is the Chelsea St Bridge up?</div>
          <div className="details">
            Whoops! Something went wrong
          </div>
          <div className="details">
            Check the <a href="https://twitter.com/LoganToChelsea">Twitter feed</a> for the latest status
          </div>
        </div>
      );
    }

    if (!status) {
      return (
        <div className="content">
          <Loader />
        </div>
      );
    }

    let statusImgClass = "down";
    if (status.openStatus === OpenStatus.Up) {
      statusImgClass = "up";
    }

    let statusTitle = "NO";
    if (status.openStatus === OpenStatus.Up) {
      statusTitle = "YES";
    }

    let statusText = <span>The bridge is currently closed</span>;
    if (status.dateTime) {
      const formattedTimestamp = getFormattedTimestamp(status.dateTime);
      let timestamp = <span>{formattedTimestamp}</span>;
      if (status.tweetUrl) {
        timestamp = <a href={status.tweetUrl} target="_blank">{formattedTimestamp}</a>;
      }

      statusText = (
        <span className="details">
          As of {timestamp}, the bridge is {status.openStatus}
        </span>
      );
    }

    return (
      <React.Fragment>
        <div className="gh-link">
          <a href="https://github.com/adamedgett/chelsea-st-bridge" target="_blank">
            <div className="gh-logo-img" />
          </a>
        </div>
        <div className="content">
          <div className="header">Is the Chelsea St Bridge up?</div>
          <div className={`bridge-logo ${statusImgClass}`} />
          <div className="status-title">{statusTitle}</div>
          {statusText}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
