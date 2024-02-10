<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

import AddEditCustomer from "../../../components/forms/add-edit-customer.vue";

import { useCustomerStore } from "../../../stores/customer.store";
import type { Customer } from "../../../interfaces/customer";
import { FormType } from "../../../interfaces/form";

// global
const router = useRouter();
const route = useRoute();
const customerId = Number(route.params?.customerId);

const confirm = useConfirm();
const toast = useToast();

// store
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomerById, deleteCustomer } = useCustomerStore();

// declarations
// refs
const editCustomer = ref(false);
const isDialogOpen = ref(false);
const loading = ref(false);

// Methods
const fetchCustomer = async () => {
  loading.value = true;
  await fetchCustomerById(customerId);
  loading.value = false;
  if (!customer.value) {
    toast.add({
      severity: "error",
      summary: "Failed Get Customer Details",
      detail: `No customer found`,
      life: 3000,
    });
  }
};
onMounted(async () => {
  fetchCustomer();
});

// edit and delete
const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
  editCustomer.value = false;
};
const editCustomerModal = () => {
  editCustomer.value = true;
  openDialog();
};

const deleteCustomerMethod = () => {
  confirm.require({
    message: `Are you sure you want to delete ${customer ? customer.value?.name : "this customer"}?`,
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    acceptClass: "bg-blue-500 py-1 px-4 text-white",
    rejectClass: "bg-red-500 py-1 px-4 text-white",
    accept: async () => {
      loading.value = true;
      const response = await deleteCustomer(customerId);
      loading.value = false;

      if (response.data) {
        toast.add({
          severity: "success",
          summary: "Delete Success",
          detail: `${response.message}`,
          life: 3000,
        });
        router.push("/customers");
      } else if (response.statusCode === 500 || 400 || 404) {
        toast.add({
          severity: "error",
          summary: "Delete Failed",
          detail: `Failed to delete customer`,
          life: 3000,
        });
      }
    },
  });
};
</script>

<template>
  <div class="text-sm">
    <!-- Header -->
    <div class="flex flex-row justify-between">
      <div class="flex w-full flex-col overflow-hidden rounded-md border bg-white shadow">
        <div class="flex flex-row justify-between w-full">
          <div class="flex w-full flex-row">
            <div v-if="!loading && customer" class="flex max-w-fit flex-col gap-2 border-r p-4 font-semibold text-2xl">
              {{ customer.name }}
            </div>
            <Skeleton v-else width="20rem" height="3rem" class="m-2" />
          </div>
          <div v-if="!loading && customer" class="flex w-full flex-row justify-end my-1 gap-2 text-sm pr-2">
            <Button v-tooltip.left="'Delete'" type="button" class="bg-red-500 text-white hover:bg-red-600 my-3 px-3" :loading="loading" @click="deleteCustomerMethod">
              <Icon name="material-symbols:delete-outline" size="18px" />
            </Button>
            <Button v-tooltip.left="'Edit'" type="button" class="bg-blue-500 text-white hover:bg-blue-600 my-3 px-3" @click="editCustomerModal"><Icon name="material-symbols:edit-outline-rounded" size="18px" /> </Button>
          </div>
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="rounded-md border py-4 my-4">
      <div class="mx-4 grid grid-cols-1 gap-4 gap-y-2 pb-7 text-sm lg:grid-cols-3">
        <!-- details -->
        <div class="text-gray-600">
          <p class="text-lg font-medium">Detail Customer</p>
          <p class="!text-sm">Detail information for customer</p>
        </div>
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-6">
            <div class="md:col-span-4">
              <div v-if="!loading && customer">
                <div class="grid grid-cols-2 gap-20">
                  <p class="mb-1">Name</p>
                  <p class="text-gray-500">
                    {{ customer.name }}
                  </p>
                </div>
              </div>
              <Skeleton v-else class="mb-2" />
            </div>
            <div class="md:col-span-4">
              <div v-if="!loading && customer">
                <div class="grid grid-cols-2 gap-20">
                  <p class="mb-1">Instagram Account</p>
                  <p class="text-gray-500">{{ customer.ig_account }}</p>
                </div>
              </div>
              <Skeleton v-else class="mb-2" />
            </div>
            <div class="md:col-span-4">
              <div v-if="!loading && customer">
                <div class="grid grid-cols-2 gap-20">
                  <p class="mb-1">Favorite Outfit Color</p>
                  <div class="flex flex-row gap-3">
                    <div :style="{ backgroundColor: `#${customer.fav_color}` as string }" class="w-5 h-5 rounded" />
                    #{{ customer.fav_color }}
                  </div>
                </div>
              </div>
              <Skeleton v-else class="mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <AddEditCustomer :type-form="FormType.EDIT" :open-dialog="isDialogOpen" :customer-data="(customer as Customer)" @close="closeDialog" />
  </div>
</template>
