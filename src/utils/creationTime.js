import React from "react";
import {
  differenceInMinutes,
  formatDistanceToNow,
  differenceInHours,
  differenceInDays,
} from "date-fns";

const creationTime = (postDate) => {
  const minutesDifference = differenceInMinutes(new Date(), new Date(postDate));
  const hoursDifference = differenceInHours(new Date(), new Date(postDate));
  const daysDifference = differenceInDays(new Date(), new Date(postDate));

  if (minutesDifference < 60) {
    return formatDistanceToNow(new Date(postDate), { addSuffix: true });
  } else if (hoursDifference < 24) {
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }
};

export default creationTime;
