<script setup lang="ts">
const { count, inc, dec } = useCount();
</script>

<template>
  <div class="inline-flex my-3">
    <UiButton class="p-0 rounded-full aspect-square" @click="dec()">
      <Icon name="carbon:subtract" />
    </UiButton>
    <div class="font-mono w-15 m-auto inline-block">
      {{ count }}
    </div>
    <UiButton class="p-0 rounded-full aspect-square" @click="inc()">
      <Icon name="carbon:add" />
    </UiButton>
  </div>
</template>
