<script setup lang="ts">
import { navigateTo } from '#app';
</script>

<template>
  <div class="text-xl text-gray-400 m-5 flex gap-3 justify-center">
    <IconButton name="carbon:campsite" @click="navigateTo('/')" />
    <a href="https://github.com/antfu/vitesse-nuxt3" target="_blank" class="hover:brightness-200">
      <Icon name="carbon:logo-github" />
    </a>
    <DarkToggle />
  </div>
</template>
