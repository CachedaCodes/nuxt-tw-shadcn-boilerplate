<script setup lang="ts">
const name = ref('');

const router = useRouter();
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`);
}
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      :placeholder="$t('inputEntry.placeholder')"
      type="text"
      autocomplete="off"
      class="px-4 py-2 mt-5 w-[250px] text-center bg-transparent border rounded border-gray-200 dark:border-gray-700 outline-none focus:outline-none"
      @keydown.enter="go"
    >
    <div>
      <UiButton
        class="text-sm m-3"
        :disabled="!name"
        @click="go"
      >
        {{ $t('common.button.go') }}
      </UiButton>
    </div>
  </div>
</template>
