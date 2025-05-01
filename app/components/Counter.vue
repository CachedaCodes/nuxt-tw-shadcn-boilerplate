<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div class="inline-flex my-3">
    <button class="p-2 rounded-full btn" @click="dec()">
      <Icon name="carbon:subtract" />
    </button>
    <div class="font-mono w-15 m-auto inline-block">
      {{ count }}
    </div>
    <button class="p-2 rounded-full btn" @click="inc()">
      <Icon name="carbon:add" />
    </button>
  </div>
</template>
