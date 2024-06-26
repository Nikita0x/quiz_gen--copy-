<template>
	<div
		class="container"
		ref="containerRef"
	>
		<div
			class="column"
			v-for="(item, idx) in data"
			:style="`height: ${100 * item.value}%; transition-delay: ${
				idx * 75
			}ms;`"
		></div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { onMounted } from "vue";

	defineProps({
		data: Array,
	});

	const containerRef = ref(null);

	onMounted(() => {
		const options = {
			threshold: 0.5,
		};
		const observer = new IntersectionObserver(function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in-view");
				}
			});
		}, options);

		observer.observe(containerRef.value);
	});
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		height: 100px;
		width: 100%;
		background-color: transparent;

		.column {
			max-height: 0;
		}

		&.in-view {
			.column {
				max-height: 100%;
				transition: max-height 0.5s;
			}
		}
	}

	.column {
		width: 7px;
		background-color: var(--primaryColor);
		border-radius: 2px;
	}
</style>
