<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div class="text-4xl">
      <div class="i-carbon-warning inline-block" />
    </div>
    <div>Not found</div>
    <div>
      <button class="text-sm btn mx-3 mt-8" @click="router.back()">Back</button>
    </div>
  </main>
</template>
