<template>
	<div class="flex">
		<p id="title">{{ properties.title }}</p>

		<div class="checkbox-container">
			<ion-checkbox
				v-for="(item, id) in properties.options"
				mode="ios"
				label-placement="end"
				@ion-change="handleSelect(id)"
			>
				{{ item.title }}
			</ion-checkbox>
		</div>
	</div>
</template>

<script setup>
	import { IonCheckbox } from "@ionic/vue";
	import { ref } from "vue";

	const props = defineProps({
		properties: Object,
		name: String,
	});

	const selectedValues = ref([]);

	//emits
	const emit = defineEmits({
		select(payload) {
			return payload;
		},
	});

	//methods
	const handleSelect = (id) => {
		const itemIdx = selectedValues.value.indexOf(id);

		if (itemIdx > -1) {
			selectedValues.value.splice(itemIdx, 1);
		} else {
			selectedValues.value.push(id);
		}

		emit("select", {
			name: props.name,
			id: selectedValues.value,
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
		overflow: auto;
		// background-color: #181818;
		border-radius: 7px;
		width: 100%;
		padding-top: 17px;
		padding-bottom: 30px;
		padding-left: 25px;
		padding-right: 25px;
	}

	.checkbox-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	#title {
		font-weight: 400;
		font-size: 24px;
		// color: white;
		margin-bottom: 47px;
	}

	ion-checkbox {
		text-transform: uppercase;
		border: 1px solid #b9b9b9;
		padding-top: 7px;
		padding-bottom: 7px;
		padding-inline: 10px;
		border-radius: 30px;
		--size: 11px;
		--checkbox-background-checked: red;
		--checkmark-color: var(--primaryColor);
	}

	ion-checkbox::part(mark) {
		color: red;
	}

	ion-checkbox::part(container) {
		position: relative;
		background-color: transparent;
	}
	.checkbox-checked::part(container) {
		border-radius: 6px;
		border: 1px solid #b9b9b9;
		/* изменение иконки чекбокса */
		background: url(/img/circle.svg) white;
		background-size: 7px 7px;
		background-position: center;
		background-repeat: no-repeat;
	}

	.checkbox-checked::part(mark) {
		display: none;
	}

	ion-checkbox::part(label) {
		font-weight: 700;
		font-size: 14px;
		// color: #b9b9b9;
		margin-inline: 7px 0px;
	}

	ion-checkbox.checkbox-checked::part(label) {
		// color: black;
	}

	.checkbox-checked {
		background-color: var(--primaryColor);
		border-color: transparent;
	}
</style>
