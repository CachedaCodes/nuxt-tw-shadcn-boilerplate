<script setup lang="ts">
const color = useColorMode();

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff'
  }]
});

const toggleIcon = computed(() => color.value === 'light' ? 'carbon:sun' : 'carbon:moon');

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark';
}
</script>

<template>
  <IconButton :name="toggleIcon" class="outline-none" @click="toggleDark" />
</template>
