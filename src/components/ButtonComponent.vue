<template>
	<ion-button
		:disabled="disabled"
		class="button-component"
	>
		{{ title }}
	</ion-button>
</template>

<script setup lang="ts">
	import { IonButton } from "@ionic/vue";

	interface Props {
		disabled: boolean;
		title: string;
	}

	const props = defineProps<Props>();
</script>

<style scoped lang="scss">
	ion-button::part(native) {
		background: var(--primaryColor);
	}

	.button-component {
		width: 80%;
		font-size: 16px;
		padding-inline: 16px;
		padding-top: 11px;
		padding-bottom: 13px;
		text-transform: capitalize;
		// box-shadow: 0px 4px 16px 0px black;
	}
</style>
