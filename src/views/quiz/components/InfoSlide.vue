<template>
	<!-- Info.vue -->
	<div class="flex">
		<p id="title">{{ mainTitle }}</p>
		<div class="info-container">
			<img :src="image" />
			<p id="title2">{{ properties.title }}</p>
			<p id="description">{{ properties.description }}</p>
			<div
				v-if="properties.postTitle"
				class="post-title"
			>
				{{ properties.postTitle }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		properties: Object,
		mainTitle: String,
	});

	const image = computed(() => {
		return `/img${props.properties.image}`;
	});
</script>

<style lang="scss" scoped>
	p {
		margin: 0;
		margin-bottom: 0;
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

	.info-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	img {
		width: 150px;
	}

	#title {
		font-weight: 400;
		font-size: 24px;
		// color: white;
		margin-bottom: 47px;
	}

	#title2 {
		font-weight: 700;
		font-size: 24px;
		// color: white;
		margin-bottom: 0;
	}

	#description {
		font-weight: 400;
		font-size: 18px;
		// color: #b9b9b9;
		text-align: center;

		margin-bottom: 0;
	}

	.post-title {
		font-size: 24px;
		font-weight: 700;
	}
</style>
