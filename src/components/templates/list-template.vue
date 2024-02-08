<script setup lang="ts">
// global
// props / emits
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="mx-2 my-2">
    <!-- header -->
    <div class="flex flex-col justify-between pb-4 sm:flex-row">
      <div>
        <div class="text-2xl font-semibold">{{ title }}</div>
        <div class="text-sm text-[#526484]">{{ description }}</div>
      </div>

      <div class="flex justify-end sm:justify-between [&>:not(:last-child)]:mr-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- table -->
    <div class="rounded-md border border-[#e3e3e3]">
      <slot name="main" />
    </div>
  </section>
</template>
