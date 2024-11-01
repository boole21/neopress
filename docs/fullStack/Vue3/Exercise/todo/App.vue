<template>
	<suspense>
		<template #default>
			<div>
				<todo />
			</div>
		</template>
		<template #fallback>Loading....</template>
	</suspense>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import Todo from "./views/Todo.vue";
</script>

<style lang="scss" scoped>
	div {
		color: #fff;
		box-sizing: border-box;
		padding: 20px;
		background-color: #34495e;
		width: 100%;
		height: 100vh;
	}
</style>
