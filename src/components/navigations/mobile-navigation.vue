<script setup lang="ts">
import type { PropType } from "vue";
import type { MenuItem } from "../interfaces/navigation-menu.ts";

// global
// props / emits
defineProps({
  menuItems: { type: Array as PropType<MenuItem[]>, default: null },
});
const emits = defineEmits(["toggleMobileSidebar"]);

// Methods
const toggleMobileSidebar = () => {
  emits("toggleMobileSidebar");
};
</script>

<template>
  <nav class="sm:hidden">
    <PanelMenu :model="menuItems">
      <template #item="slot">
        <div v-if="slot.item">
          <NuxtLink :to="slot.item.to" exact-active-class="!bg-slate-300 !text-black" active-class="!bg-slate-400" class="flex flex-row justify-between gap-2 p-2 rounded" @click="toggleMobileSidebar">
            <div class="flex w-full flex-row items-center justify-between">
              <div class="flex flex-row items-center gap-2">
                <div v-if="slot.item.icon">
                  <icon :name="slot.item.icon" />
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
