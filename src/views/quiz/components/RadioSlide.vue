<template>
	<div class="flex">
		<p id="title">{{ properties.title }}</p>
		<ion-radio-group
			value="''"
			mode="ios"
			@ion-change="handleSelect($event.detail.value)"
		>
			<ion-radio
				v-for="(item, id) in properties.options"
				:value="id"
			>
				{{ item.title }}
			</ion-radio>
		</ion-radio-group>
	</div>
</template>

<script setup>
	import { IonRadio, IonRadioGroup } from "@ionic/vue";

	const props = defineProps({
		properties: Object,
		name: String,
	});

	//emits
	const emit = defineEmits({
		select(payload) {
			return payload;
		},
	});

	const handleSelect = (id) => {
		emit("select", {
			name: props.name,
			id,
		});
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

	ion-radio-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		max-width: 448px;
		width: 100%;
	}
	ion-radio {
		background: #fff3d7;
		// border: 1px solid #b9b9b9;
		border-radius: 0.25rem;
		width: 100%;

		padding-top: 7px;
		padding-bottom: 7px;
		padding-left: 10px;
		padding-right: 10px;
		// text-transform: capitalize;
		// color: #b9b9b9;
		font-weight: 500;
		font-size: 16px;
		transition-property: color, background-color, border-color,
			text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	ion-radio.radio-checked {
		// border-color: var(--primaryColor);
		background-color: #fedc86;
		color: black;
	}

	ion-radio::part(container) {
		display: none;
	}
	ion-radio::part(label) {
		margin: 0;
	}
</style>
