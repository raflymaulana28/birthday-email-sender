import moment from "moment-timezone";
import { User } from "../entities/User";
import axios from "axios";
async function retryApiRequest(
  url: string,
  data: {
    email: string;
    message: string;
  },
  maxRetries: number,
  delay: number
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      if (attempt < maxRetries) {
        console.log(
          `Attempt ${attempt} failed. Retrying in ${delay} milliseconds.`
        );
        await delayAsync(delay);
      } else {
        console.error(
          `Max retries (${maxRetries}) reached. API request failed.`
        );
        throw error;
      }
    }
  }
}

async function delayAsync(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const sendBirthdayMessages = (users: User[]): void => {
  users.forEach(async (user) => {
    const userTimezone = user.location; // Replace with the user's actual timezone
    const now = moment().tz(userTimezone);

    const birthday = moment(user.birthDate)
      .set("year", now.year())
      .tz(userTimezone)
      .startOf("day");

    if (
      now.isSame(birthday, "day") &&
      now.hours() === 9 &&
      now.minutes() === 0 &&
      now.seconds() === 0
    ) {
      retryApiRequest(
        process.env.MAIL_SENDER_URL as string,
        {
          email: user.email,
          message: `Hey, ${user.name} it’s your birthday!`,
        },
        3,
        1000
      )
        .then((data) => {
          console.log(
            `Sending birthday message to ${user.name} in their timezone: ${userTimezone}`
          );
        })
        .catch((error) => {
          console.log(
            `Error sending birthday message to ${user.name} in their timezone: ${userTimezone}`
          );
        });
    }
  });
};
