<script setup lang="ts">
// global
// props / emits
const emits = defineEmits(["toggleMobileSidebar, toggleDesktopSidebar"]);

// methods
const toggleSideBar = () => {
  emits("toggleMobileSidebar");
  emits("toggleDesktopSidebar");
};
</script>

<template>
  <div class="bg-white">
    <div class="flex w-max-screen flex-1 justify-between px-2 sm:px-4">
      <div class="flex items-center" @click="toggleSideBar">
        <icon name="humbleicons:bars" class="rounded-full border border-slate-900 p-1 hover:cursor-pointer" size="28px" />
      </div>
    </div>
  </div>
</template>

<style>
.p-badge {
  @apply h-[1rem];
}
.p-overlay-badge .p-badge {
  @apply !text-xs;
}
</style>
