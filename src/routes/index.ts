import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { LessonRoutes } from "../modules/Lesson/lesson.route";
import { QuizRoutes } from "../modules/Quiz/quiz.route";
import { StudyPlanRoutes } from "../modules/StudyPlan/studyPlan.route";
import { ScheduleRoutes } from "../modules/Schedule/schedule.route";

const routes = Router()

routes.use("/auth", AuthRoutes );
routes.use("/courses", CourseRoutes)
routes.use("/lessons",LessonRoutes)
routes.use("/quizzes",QuizRoutes)
routes.use("/study-plans",StudyPlanRoutes )
routes.use("/schedules",ScheduleRoutes)

export default routes;