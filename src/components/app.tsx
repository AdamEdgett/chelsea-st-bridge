import React from "react";
import format from "date-fns/format";

import { getLatestStatus } from "helpers/status";
import { Status, OpenStatus } from "types/status";

import Loader from "components/loader";

interface AppProps {
  status?: Status;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    const { status } = this.props;
    if (!status) {
      return (
        <div className="content">
          <Loader />
        </div>
      );
    }

    let img = "/img/logo.png";
    if (status.openStatus === OpenStatus.Up) {
      img = "/img/up.png";
    }

    let statusTitle = "NO";
    if (status.openStatus === OpenStatus.Up) {
      statusTitle = "YES";
    }

    let statusText = <span>The bridge is currently closed</span>;
    if (status.dateTime) {
      const formattedTimestamp = format(status.dateTime, "h:mm A");
      let timestamp = <span>{formattedTimestamp}</span>;
      if (status.tweetUrl) {
        timestamp = <a href={status.tweetUrl} target="_blank">{formattedTimestamp}</a>;
      }

      statusText = (
        <span>
          As of {timestamp}, the bridge is {status.openStatus}
        </span>
      );
    }

    return (
      <div className="content">
        <div className="header">Is the Chelsea St Bridge up?</div>
        <img src={img} />
        <div className="status-title">{statusTitle}</div>
        {statusText}
      </div>
    );
  }
}

export default App;
