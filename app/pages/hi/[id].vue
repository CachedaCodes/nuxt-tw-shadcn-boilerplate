<script setup lang="ts">
import { navigateTo } from '#app';

const route = useRoute<'hi-id'>();
const user = useUserStore();
const name = route.params.id;

watchEffect(() => {
  user.setNewName(route.params.id as string);
});

definePageMeta({
  layout: 'home'
});
</script>

<template>
  <div>
    <Icon name="twemoji:waving-hand" class="text-4xl inline-block animate-bounce" />
    <h3 class="text-2xl font-medium">
    {{ $t('hi.greeting') }},
    </h3>
    <div class="text-xl">
      {{ $t('common.exclamation', [name]) }}
    </div>

    <template v-if="user.otherNames.length">
      <div class="text-sm my-4">
        <span class="opacity-50">{{ $t("hi.alsoKnown") }}:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </div>
    </template>

    <Counter />

    <div>
      <UiButton
        class="text-sm m-3"
        @click="navigateTo('/')"
      >
        {{ $t('common.button.back') }}
      </UiButton>
    </div>
  </div>
</template>
