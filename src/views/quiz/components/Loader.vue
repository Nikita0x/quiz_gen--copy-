<template>
	<!-- Loader.vue -->
	<div class="flex">
		<div class="info-container">
			<div
				class="box"
				:style="`--i: ${num}%; --size: ${size}px`"
			>
				<div class="circle">
					<span id="text">{{ num }}%</span>
				</div>
			</div>
			<p id="description">{{ title }}</p>
		</div>
	</div>
</template>

<script setup>
	import { watch, ref, onMounted } from "vue";

	defineProps({
		title: String,
	});

	const emit = defineEmits({
		loadingStart() {
			return true;
		},
		loadingDone() {
			return true;
		},
	});

	//state
	const num = ref(0);
	const size = ref(121);

	onMounted(() => {
		increment(30);

		emit("loadingStart");
	});

	watch(num, () => {
		if (num.value === 100) {
			emit("loadingDone");
		}
	});

	//methods
	const increment = (delay = 1000, stopValue = 100) => {
		function startIteration() {
			let intervalId = setInterval(() => {
				num.value++;
				if (num.value >= stopValue) {
					clearInterval(intervalId);
				}
			}, delay);
		}

		return startIteration();
	};
</script>

<style scoped lang="scss">
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
		padding-left: 25px;
		padding-right: 25px;
	}

	#title {
		font-weight: 400;
		font-size: 24px;
		// color: white;
		margin-bottom: 47px;
	}

	.info-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	#description {
		font-weight: 400;
		font-size: 24px;
		// color: white;
	}

	/* circular loader */

	.box {
		position: relative;
		height: var(--size);
		width: var(--size);
	}

	.circle {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: conic-gradient(
			from 180deg,
			var(--primaryColor) 0%,
			var(--primaryColor) 0%,
			var(--i),
			transparent var(--i),
			transparent 100%
		);
		border-radius: 50%;
	}

	.circle::before {
		position: absolute;
		content: "";
		inset: 4px;
		background-color: #181818;
		border-radius: 50%;
	}

	#text {
		position: absolute;
		// color: white;
		font-size: 40px;
		font-weight: 700;
	}
</style>
