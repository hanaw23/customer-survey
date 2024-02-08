<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AddEditCustomer from "../../components/forms/add-edit-customer.vue";
import { FormType } from "../../interfaces/form";

// global
const route = useRoute();

// declarations
// ref
const isDialogOpen = ref(false);

// methods
const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
};

onMounted(() => {
  if (route.fullPath.includes("new") && route.fullPath.includes("customers")) {
    openDialog();
  }
});
</script>

<template>
  <div>
    <AddEditCustomer :type-form="FormType.ADD" @close="closeDialog" :open-dialog="isDialogOpen" />
  </div>
</template>
