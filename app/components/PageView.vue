<script setup lang="ts">
const { data } = await useFetch('/api/pageview');

const time = useLocaleTimeAgo(() => data.value?.startAt || 0);
</script>

<template>
  <div class="text-gray-500">
    <span class="text-gray-400 font-medium">{{ data?.pageview }}</span>
    {{ $t("pageView.viewsSince") }}
    <span class="text-gray-400">{{ time }}</span>
  </div>
</template>
