<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AddEditCustomer from "../../../components/forms/add-edit-customer.vue";
import { FormType } from "../../../interfaces/form";
import { dataCustomers } from "../../../dummy/data";

// global
const route = useRoute();
const customerId = route.params?.customerId;

// declarations
// ref
const isDialogOpen = ref(false);
const customerData = ref(null);

// methods
const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
};
const findData = () => {
  customerData.value = dataCustomers.find((customer) => customer.id === Number(customerId));
};
onMounted(() => {
  findData();
  if (route.fullPath.includes("edit") && route.fullPath.includes("customers")) {
    openDialog();
  }
});
</script>

<template>
  <div>
    <AddEditCustomer :type-form="FormType.EDIT" :open-dialog="isDialogOpen" :customer-data="customerData" @close="closeDialog" />
  </div>
</template>
