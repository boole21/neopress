<template>
	<div class="item">
		<input type="text" :value="todo.title" />
		<button @click="del(todo.id)">删除</button>
	</div>
</template>

<script setup>
	import useTodo from "../composables/useTodo";

	const { del } = useTodo();
	const { todo } = defineProps({
		todo: { type: Object, required: true },
	});
</script>

<style lang="scss">
	div.item {
		display: flex;
		input {
			padding: 10px;
			flex: 1;
			background-color: #fff;
			color: #000;
		}
		button {
			margin-left: 10px;
			background-color: #d35400;
			color: #fff;
			border: none;
			padding: 5px 10px;
		}
	}
</style>
