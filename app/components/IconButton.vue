<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>();
</script>

<template>
  <UiButton class="!p-0 bg-transparent border-0 text-inherit text-xl h-auto block hover:bg-transparent hover:brightness-200">
    <Icon :name="name" />
  </UiButton>
</template>