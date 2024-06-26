<template>
	<div
		class="progress-bar"
		:style="`width: ${width}%`"
	/>
</template>

<script setup lang="ts">
	interface Props {
		width: number;
	}

	const props = defineProps<Props>();
</script>

<style scoped>
	.progress-bar {
		top: var(--ion-safe-area-top, 0);
		left: 0;
		height: 5px;
		max-width: 100%;
		border-radius: 2px;
		/* border-top-right-radius: 3px;
		border-bottom-right-radius: 3px; */
		background-color: var(--primaryColor);
		transition: width 0.5s ease;
	}
</style>
