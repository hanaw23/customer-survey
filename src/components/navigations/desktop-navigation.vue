<script setup lang="ts">
import type { PropType } from "vue";
import type { MenuItem } from "../../interfaces/navigation-menu";

// global
const route = useRoute();

// props
const props = defineProps({
  menuItems: { type: Array as PropType<MenuItem[]>, default: null },
});
</script>

<template>
  <nav class="hidden sm:block">
    <PanelMenu :model="props.menuItems">
      <template #item="slot">
        <div v-if="slot.item">
          <NuxtLink
            :to="slot.item.to"
            exact-active-class="!bg-white !text-slate-900"
            active-class="!bg-white -mr-6 !border-none"
            class="flex flex-row justify-between gap-2 p-4 rounded-[1rem] ml-2"
            :class="[route.fullPath.includes(`${slot.item.to}`) ? '!bg-white -mr-6 !border-none text-slate-900' : '']"
          >
            <div class="flex w-full flex-row items-center justify-between">
              <div class="flex flex-row items-center gap-4">
                <div v-if="slot.item.icon">
                  <Icon :name="slot.item.icon" size="20px" />
                </div>
                <div>{{ slot.item.label }}</div>
              </div>
              <icon v-if="slot.item.items" name="material-symbols:keyboard-arrow-down" />
            </div>
          </NuxtLink>
        </div>
      </template>
    </PanelMenu>
  </nav>
</template>

<style>
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content {
  @apply !border-none !bg-transparent !text-white;
}
.p-panelmenu .p-panelmenu-header:not(.p-disabled).p-highlight .p-panelmenu-header-content {
  @apply !border-none !bg-transparent  !text-white;
}
</style>
