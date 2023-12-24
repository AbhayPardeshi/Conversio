import React from "react";
import {
  differenceInMinutes,
  formatDistanceToNow,
  differenceInHours,
} from "date-fns";

const creationTime = (postDate) => {
  const minutesDifference = differenceInMinutes(new Date(), new Date(postDate));
  const hoursDifference = differenceInHours(new Date(), new Date(postDate));

  if (minutesDifference < 60) {
    return formatDistanceToNow(new Date(postDate), { addSuffix: true });
  } else {
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
  }
};

export default creationTime;
