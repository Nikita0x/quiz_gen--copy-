<template>
	<!-- StatisticsSlide.vue -->

	<div class="flex">
		<p id="title">{{ mainTitle }}</p>
		<transition>
			<Loader
				v-if="properties.preload && isLoading"
				:title="properties.preload.title"
				@loadingStart="handleLoadingStart"
				@loadingDone="handleLoadingDone"
			/>
			<div v-else>
				<div class="info-container">
					<img :src="image" />
					<p id="title2">{{ properties.title }}</p>
					<p id="description">{{ properties.description }}</p>
				</div>
				<div
					class="center"
					v-for="item in data"
				>
					<p id="title3">{{ item.title }}</p>
					<p id="description2">
						{{ item.description }} {{ item.percent }}
					</p>
					<Chart :data="item.percentByDay" />
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
	import Loader from "./Loader.vue";
	import Chart from "./Chart.vue";
	import { useI18n } from "vue-i18n";

	const props = defineProps({
		properties: Object,
		mainTitle: String,
	});

	const { t } = useI18n();

	const emit = defineEmits({
		loadingStart() {
			return true;
		},
		loadingDone() {
			return true;
		},
	});

	const isLoading = ref(true);

	const data = [
		{
			title: t("personalAdvisor.matchWinner"),
			description: t("personalAdvisor.averageAccuracy"),
			percent: "77%",
			percentByDay: [
				{ value: 0.8 },
				{ value: 0.8 },
				{ value: 0.75 },
				{ value: 0.8888888889 },
				{ value: 0.7027027027 },
				{ value: 0.7169811321 },
				{ value: 0.7610619469 },
				{ value: 0.75 },
				{ value: 1 },
				{ value: 0.75 },
				{ value: 0.6666666667 },
				{ value: 0.8421052632 },
				{ value: 0.75 },
				{ value: 0.7777777778 },
				{ value: 0.75 },
				{ value: 0.7647058824 },
				{ value: 0.7941176471 },
				{ value: 0.8181818182 },
				{ value: 0.8484848485 },
				{ value: 0.7647058824 },
				{ value: 0.8072289157 },
				{ value: 0.5714285714 },
				{ value: 0.6666666667 },
				{ value: 0.65 },
				{ value: 0.9 },
				{ value: 0.8965517241 },
				{ value: 0.7602739726 },
				{ value: 0.7341772152 },
				{ value: 1 },
			],
		},
		{
			title: t("personalAdvisor.doubleChance"),
			description: t("personalAdvisor.averageAccuracy"),
			percent: "76%",
			percentByDay: [
				{ value: 0.7888888889 },
				{ value: 0.7179487179 },
				{ value: 0.8114754098 },
				{ value: 0.7333333333 },
				{ value: 0.71875 },
				{ value: 0.7746288799 },
				{ value: 0.7517123288 },
				{ value: 0.8227848101 },
				{ value: 0.775862069 },
				{ value: 0.7479674797 },
				{ value: 0.8115942029 },
				{ value: 0.7243589744 },
				{ value: 0.7746686303 },
				{ value: 0.7422145329 },
				{ value: 0.7014925373 },
				{ value: 0.8235294118 },
				{ value: 0.7441860465 },
				{ value: 0.7179487179 },
				{ value: 0.7692307692 },
				{ value: 0.7692307692 },
				{ value: 0.731372549 },
				{ value: 0.6952380952 },
				{ value: 0.7457627119 },
				{ value: 0.7394957983 },
				{ value: 0.8243243243 },
				{ value: 0.7251461988 },
				{ value: 0.7662116041 },
				{ value: 0.7714932127 },
				{ value: 0.7846153846 },
			],
		},
		{
			title: t("personalAdvisor.goalsOverUnder"),
			description: t("personalAdvisor.averageAccuracy"),
			percent: "81%",
			percentByDay: [
				{ value: 0.7333333333 },
				{ value: 0.7777777778 },
				{ value: 0.7348484848 },
				{ value: 0.9019607843 },
				{ value: 0.8341232227 },
				{ value: 0.8112773303 },
				{ value: 0.8229665072 },
				{ value: 0.7857142857 },
				{ value: 0.7866666667 },
				{ value: 0.7841726619 },
				{ value: 0.7592592593 },
				{ value: 0.7991071429 },
				{ value: 0.8046783626 },
				{ value: 0.8077571669 },
				{ value: 0.8709677419 },
				{ value: 0.7692307692 },
				{ value: 0.8032786885 },
				{ value: 0.775862069 },
				{ value: 0.7926829268 },
				{ value: 0.8223684211 },
				{ value: 0.8179775281 },
				{ value: 0.8360655738 },
				{ value: 0.7611940299 },
				{ value: 0.8129032258 },
				{ value: 0.7878787879 },
				{ value: 0.8378378378 },
				{ value: 0.8271604938 },
				{ value: 0.8146453089 },
				{ value: 0.7777777778 },
			],
		},
	];

	const image = computed(() => {
		return `/img${props.properties.image}`;
	});

	const handleLoadingStart = () => {
		isLoading.value = true;

		emit("loadingStart");
	};

	const handleLoadingDone = () => {
		isLoading.value = false;

		emit("loadingDone");
	};
</script>

<style lang="scss" scoped>
	p {
		margin: 0;
	}
	.flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		// background-color: #181818;
		border-radius: 7px;
		width: 100%;
		padding-top: 17px;
		padding-bottom: 30px;
		/* padding-left: 25px; */
		/* padding-right: 25px; */
	}

	.info-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding-inline: 25px;
	}

	img {
		width: 150px;
	}

	.center {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40px;
		gap: 20px;
	}

	#title {
		font-weight: 400;
		font-size: 24px;
		// color: white;
		margin-bottom: 47px;
		padding-inline: 25px;
	}

	#title2 {
		font-weight: 700;
		font-size: 24px;
		// color: white;
	}

	#description {
		font-weight: 400;
		font-size: 18px;
		// color: #b9b9b9;
		text-align: center;
		margin: 0;
	}

	#title3 {
		font-weight: 400;
		font-size: 24px;
		// color: white;
		margin: 0;
	}
	#description2 {
		font-weight: 400;
		font-size: 18px;
		// color: #b9b9b9;
		text-align: center;
		margin: 0;
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s ease;
	}

	.v-leave-active {
		position: absolute;
	}

	.v-leave-to,
	.v-enter-from {
		opacity: 0;
	}
</style>
