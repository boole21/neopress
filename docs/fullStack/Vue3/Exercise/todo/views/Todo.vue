<template>
	<div class="form">
		<Add class="add" />
		<Sort />
	</div>
	<div class="todo">
		<item :todo="todo" class="item" v-for="todo of todos" :key="todo.id" />
	</div>
</template>

<script setup>
	import useTodo from "../composables/useTodo";
	import Item from "../components/item.vue";
	import Add from "../components/add.vue";
	import Sort from "../components/Sort.vue";

	const { todos, load } = useTodo();
	load();
</script>

<style lang="scss">
	.form {
		display: flex;
		margin-bottom: 20px;
		.add {
			flex: 1;
		}
	}
	div.todo {
		display: flex;
		flex-direction: column;
		.item {
			margin-bottom: 10px;
		}
	}
</style>
