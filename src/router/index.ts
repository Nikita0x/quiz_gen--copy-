import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import QuizComponent from "@/views/quiz/QuizComponent.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/quiz",
	},
	{
		path: "/quiz",
		name: "Quiz",
		component: QuizComponent,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
