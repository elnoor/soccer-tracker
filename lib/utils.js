import ms from "ms";

export const timeAgo = (timestamp, timeOnly) => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export function checkResult(success, call) {
  if (success) call();
  else alert("Oops! That didn't work.");
}
