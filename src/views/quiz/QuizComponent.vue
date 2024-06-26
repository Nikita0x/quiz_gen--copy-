<template>
	<ion-page>
		<ion-content class="ion-padding">
			<ProgressBar :width="progressBarWidth" />
			<div class="slide">
				<!-- <div class="navigate-block">
				<div
					:key="index"
					:class="{
						active: index + 1 === activeSlide,
						done: index + 1 < activeSlide,
					}"
					v-for="(_, index) in props.slides"
				>
					<template v-if="index + 1 === activeSlide">
						{{ index + 1 }}
					</template>
					<template v-else-if="index + 1 < activeSlide">
						<ion-icon :icon="checkmarkSharp" />
					</template>
					<template v-else="">
						{{ index + 1 }}
					</template>
				</div>
			</div> -->
				<div class="header">
					<h1>Quiz</h1>
					<p>Quiz description</p>
				</div>
				<!-- content -->
				<swiper
					:slides-per-view="1"
					:space-between="0"
					:preventInteractionOnTransition="true"
					:allow-touch-move="false"
					@swiper="handleSwiper"
					:auto-height="true"
				>
					<swiper-slide
						v-for="item in quiz[currentLanguage]"
						class="slide"
					>
						<transition>
							<component
								v-if="
									selectedOptions[item.name]?.isAnswered ===
									true
								"
								:is="
									answerComponentsByType[
										item.answers[
											selectedOptions[item.name].answer
										].type
									]
								"
								:mainTitle="item.title"
								:properties="
									item.answers[
										selectedOptions[item.name].answer
									]
								"
								@loadingStart="isLoading = true"
								@loadingDone="isLoading = false"
							/>

							<component
								v-else
								@select="handleSelect"
								:is="componentsByType[item.type]"
								:properties="item"
								:name="item.name"
							/>
						</transition>
					</swiper-slide>
				</swiper>
			</div>
		</ion-content>
		<ButtonComponent
			:disabled="isButtonDisabled"
			@click="handleNextButton"
			title="Next"
			class="button"
		/>
	</ion-page>
</template>

<script setup>
	import { IonContent, IonPage } from "@ionic/vue";
	import "swiper/swiper-bundle.css";
	import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
	import { computed, ref } from "vue";
	import CheckboxSlide from "./components/CheckboxSlide.vue";
	import InfoSlide from "./components/InfoSlide.vue";
	import RadioSlide from "./components/RadioSlide.vue";
	import quiz from "./languages/index.js";
	// import ApiService from "../../../core/ApiService";
	import ButtonComponent from "@/components/ButtonComponent.vue";
	import { useRouter } from "vue-router";
	import ProgressBar from "./components/ProgressBar.vue";
	import StatisticsSlide from "./components/StatisticsSlide.vue";
	// import { useUserStore } from "@/stores/user.store";
	// import { storeToRefs } from "pinia";

	const currentLanguage = ref("en");

	// const userStore = useUserStore();
	// const { customerInfo, isOnboardingDone } = storeToRefs(userStore);

	//state
	const componentsByType = {
		radio: RadioSlide,
		checkbox: CheckboxSlide,
	};
	const answerComponentsByType = {
		info: InfoSlide,
		statistics: StatisticsSlide,
	};
	const outerSwiper = useSwiper();
	const router = useRouter();
	const swiperRef = ref();

	const selectedOptions = ref({});
	const isLoading = ref(false);

	const quizByLanguage = computed(() => quiz[currentLanguage.value]);
	const isNewUser = computed(() => {
		return (
			!customerInfo.value?.activeSubscriptions?.length &&
			!customerInfo.value?.allPurchasedProductIdentifiers?.length
		);
	});

	//   test swiper
	const handleSwiper = (instance) => {
		swiperRef.value = instance;
	};

	//methods
	const handleNextButton = () => {
		const currentSlideData =
			selectedOptions.value[currentSlideProperties.value.name];

		if (currentSlideData.isAnswered && !swiperRef.value.isEnd) {
			swiperRef.value.slideNext();
		} else if (swiperRef.value.isEnd && currentSlideData.isAnswered) {
			if (isNewUser.value) {
				outerSwiper.value.slideNext();
			} else {
				isOnboardingDone.value = true;
				router.push({
					name: "matchesList",
				});
			}
		} else {
			selectedOptions.value[
				currentSlideProperties.value.name
			].isAnswered = true;

			// apiService.trackEvent(`quiz_${currentSlideProperties.value.name}`, {
			// 	value: currentSlideData.value,
			// });
		}
	};

	const handleSelect = ({ name, id }) => {
		const isAnswered = currentSlideProperties.value.type === "radio";

		if (Array.isArray(id)) {
			selectedOptions.value[name] = {
				id,
				value: id.map(
					(item) => currentSlideProperties.value.options[item].key,
				),
				answer: currentSlideProperties.value.options[0]?.answer,
				isAnswered,
			};
		} else {
			selectedOptions.value[name] = {
				id,
				value: currentSlideProperties.value.options[id].key,
				answer: currentSlideProperties.value.options[id].answer,
				isAnswered,
			};
		}

		if (isAnswered) {
			const currentSlideData =
				selectedOptions.value[currentSlideProperties.value.name];

			// apiService.trackEvent(`quiz_${currentSlideProperties.value.name}`, {
			// 	value: currentSlideData.value,
			// });
		}
	};

	//computed
	const currentSlideProperties = computed(() => {
		return quizByLanguage.value[swiperRef.value?.activeIndex];
	});

	const isButtonDisabled = computed(() => {
		return (
			!selectedOptions.value[currentSlideProperties.value?.name] ||
			isLoading.value
		);
	});

	const progressBarWidth = computed(() => {
		return (
			(swiperRef.value?.activeIndex / (quizByLanguage.value.length - 1)) *
			100
		);
	});
</script>

<style lang="scss" scoped>
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

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
		h1 {
			font-size: 24px;
		}

		p {
			// color: #b9b9b9;
			font-size: 18px;
		}
	}

	.slide {
		padding-top: calc(var(--ion-safe-area-top, 0) + 30px);
		padding-bottom: 110px;
	}

	.button {
		position: fixed;
		left: 50%;
		bottom: 5%;
		transform: translateX(-50%);
	}

	ion-content {
		background-color: red;
	}
</style>
