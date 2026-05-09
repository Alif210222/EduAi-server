import cron from "node-cron";
import { prisma } from "../lib/prisma";
import { sendEmail } from "./sendEmail";

cron.schedule("* * * * *", async () => {
  //console.log("Checking reminders...");

  const now = new Date();

  const schedules =
    await prisma.schedule.findMany({
      where: {
        reminderTime: {
          lte: now
        },
        reminderSent: false
      },
      include: {
        user: true
      }
    });

  for (const schedule of schedules) {
    await sendEmail(
      schedule.user.email,
      "Study Reminder",
      `
      <h2>Reminder</h2>
      <p>${schedule.title}</p>
      <p>Start Time: ${schedule.startTime}</p>
      `
    );

    await prisma.notification.create({
      data: {
        userId: schedule.userId,
        message: `Reminder: ${schedule.title} starts soon`
      }
    });

    await prisma.schedule.update({
      where: {
        id: schedule.id
      },
      data: {
        reminderSent: true
      }
    });
  }
});