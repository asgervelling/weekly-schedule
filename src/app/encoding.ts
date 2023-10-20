import { createHmac } from "crypto";
import { Week } from "../../types";

// Your secret key (keep this secure on the server)
const secretKey = "yourSecretKey";

// Function to encode the schedule data
export const encodeSchedule = (week: Week): string => {
  const serializedData = JSON.stringify(week);
  const hash = createHmac("sha256", secretKey)
    .update(serializedData)
    .digest("hex");
  return hash;
};

// Function to decode the schedule data
export const decodeSchedule = (hash: string): Week | null => {
  try {
    const serializedData = createHmac("sha256", secretKey)
      .update(hash)
      .digest("hex");
    const week = JSON.parse(serializedData);
    return week;
  } catch (error) {
    // Handle any errors (e.g., data tampering)
    return null;
  }
};
