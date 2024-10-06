<template>
  <header class="fixed w-full z-200 top-0 left-0 bg-dark-page">
    <q-toolbar class="relative">
      <q-btn flat dense round class="mr-2" @click.stop="router.back()">
        <Icon icon="fluent:chevron-left-24-regular" width="25" height="25" />
      </q-btn>
      <q-toolbar-title
        class="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] text-[16px] max-w-[calc(100%-34px*2)] line-clamp-1"
      >
        {{ t("cai-dat-host") }}
      </q-toolbar-title>
    </q-toolbar>
  </header>

  <q-list class="pt-[47px]">
    <q-item>
      <q-item-section>
        <div class="relative w-full">
          <input
            class="w-full bg-[#2a2a2a] placeholder-[#818181] h-[39px] rounded-[30px] focus-visible:outline-none pl-6"
            placeholder="HOST_URL"
            v-model="settingsStore.hostUrl"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue"
import { useSettingsStore } from "stores/settings"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const router = useRouter()
const { t } = useI18n()
const settingsStore = useSettingsStore()
</script>
