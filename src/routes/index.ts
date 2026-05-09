import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { LessonRoutes } from "../modules/Lesson/lesson.route";
import { QuizRoutes } from "../modules/Quiz/quiz.route";
import { StudyPlanRoutes } from "../modules/StudyPlan/studyPlan.route";
import { ScheduleRoutes } from "../modules/Schedule/schedule.route";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { AiScheduleRoutes } from "../modules/AiSchedule/aiSchedule.route";
import { ChatbotRoutes } from "../modules/Chatbot/chatbot.route";
import { DictionaryRoutes } from "../modules/Dictionary/dictionary.rote";

const routes = Router()

routes.use("/auth", AuthRoutes );
routes.use("/courses", CourseRoutes)
routes.use("/lessons",LessonRoutes)
routes.use("/quizzes",QuizRoutes)
routes.use("/study-plans",StudyPlanRoutes )
routes.use("/schedules",ScheduleRoutes)
routes.use("/notifications", NotificationRoutes)
routes.use("/ai-schedule",AiScheduleRoutes)
routes.use("/chatbot", ChatbotRoutes)
routes.use("/dictionary", DictionaryRoutes)



export default routes;