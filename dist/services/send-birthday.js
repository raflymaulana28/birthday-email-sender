"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBirthdayMessages = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const axios_1 = __importDefault(require("axios"));
async function retryApiRequest(url, data, maxRetries, delay) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios_1.default.post(url, data);
            return response.data;
        }
        catch (error) {
            if (attempt < maxRetries) {
                console.log(`Attempt ${attempt} failed. Retrying in ${delay} milliseconds.`);
                await delayAsync(delay);
            }
            else {
                console.error(`Max retries (${maxRetries}) reached. API request failed.`);
                throw error;
            }
        }
    }
}
async function delayAsync(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
const sendBirthdayMessages = (users) => {
    users.forEach(async (user) => {
        const userTimezone = user.location; // Replace with the user's actual timezone
        const now = (0, moment_timezone_1.default)().tz(userTimezone);
        const birthday = (0, moment_timezone_1.default)(user.birthDate)
            .set("year", now.year())
            .tz(userTimezone)
            .startOf("day");
        if (now.isSame(birthday, "day") &&
            now.hours() === 9 &&
            now.minutes() === 0 &&
            now.seconds() === 0) {
            retryApiRequest(process.env.MAIL_SENDER_URL, {
                email: user.email,
                message: `Hey, ${user.name} it’s your birthday!`,
            }, 3, 1000)
                .then((data) => {
                console.log(`Sending birthday message to ${user.name} in their timezone: ${userTimezone}`);
            })
                .catch((error) => {
                console.log(`Error sending birthday message to ${user.name} in their timezone: ${userTimezone}`);
            });
        }
    });
};
exports.sendBirthdayMessages = sendBirthdayMessages;
