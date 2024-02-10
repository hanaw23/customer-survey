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
const editModal = ref(false);
const deleteModal = ref(false);
const loading = ref(false);
const loadingDelete = ref(false);

// Methods
const fetchCustomer = async () => {
  loading.value = true;
  customer.value = null;
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
  await fetchCustomer();
});

// edit and delete
const openEditDialog = () => {
  editModal.value = true;
};
const closeEditDialog = () => {
  editModal.value = false;
  editCustomer.value = false;
};
const editCustomerModal = () => {
  editCustomer.value = true;
  openEditDialog();
};

const openDeleteDialog = () => {
  deleteModal.value = true;
};
const closeDeleteDialog = () => {
  deleteModal.value = false;
};

const deleteCustomerMethod = async () => {
  loadingDelete.value = true;
  const response = await deleteCustomer(customerId);
  loadingDelete.value = false;

  if (response.data) {
    toast.add({
      severity: "success",
      summary: "Delete Success",
      detail: `${response.message}`,
      life: 3000,
    });
    router.push("/customers");
  } else if (response.statusCode === 500 || response.statusCode === 400 || response.statusCode === 404) {
    toast.add({
      severity: "error",
      summary: "Delete Failed",
      detail: `Failed to delete customer`,
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="text-sm">
    <!-- Header -->
    <div class="flex flex-row justify-between">
      <div class="flex w-full flex-col overflow-hidden rounded-md border shadow" :class="[customer && customer.is_deleted ? ' bg-slate-50' : 'bg-white']">
        <div class="flex flex-row justify-between w-full">
          <div class="flex w-full flex-row">
            <div v-if="!loading && customer" class="flex max-w-fit flex-col gap-2 border-r p-4 font-semibold text-2xl" :class="[customer && customer.is_deleted ? 'text-slate-500' : '']">
              {{ customer.name }}
            </div>
            <Skeleton v-else width="20rem" height="3rem" class="m-2" />
          </div>
          <div v-if="!loading && customer && !customer.is_deleted" class="flex w-full flex-row justify-end my-1 gap-2 text-sm pr-2">
            <Button v-tooltip.left="'Delete'" type="button" class="bg-red-500 text-white hover:bg-red-600 my-3 px-3" @click="openDeleteDialog">
              <Icon name="material-symbols:delete-outline" size="18px" />
            </Button>
            <Button v-tooltip.left="'Edit'" type="button" class="bg-blue-500 text-white hover:bg-blue-600 my-3 px-3" @click="editCustomerModal"><Icon name="material-symbols:edit-outline-rounded" size="18px" /> </Button>
          </div>
          <div v-if="customer && customer.is_deleted" class="bg-red-500 text-white m-3 p-3 rounded font-semibold">DELETED</div>
        </div>
      </div>
    </div>

    <!-- Message if data is deleted  -->
    <div v-if="customer && customer.is_deleted">
      <Message severity="warn" :closable="false" :sticky="true">This customer has been deleted!</Message>
    </div>

    <!-- Body -->
    <div class="rounded-md border py-4 my-4" :class="[customer && customer.is_deleted ? 'bg-slate-50 text-slate-400' : '']">
      <div class="mx-4 grid grid-cols-1 gap-4 gap-y-2 pb-7 text-sm lg:grid-cols-3">
        <!-- details -->
        <div :class="[customer && customer.is_deleted ? ' text-slate-500' : 'text-slate-600']">
          <div>
            <p v-if="!loading && customer" class="text-lg font-medium">Detail Customer</p>
            <Skeleton v-else class="mb-2" height="1rem" width="8rem" />
          </div>
          <div>
            <p v-if="!loading && customer" class="!text-sm">Detail information for customer</p>
            <Skeleton v-else class="mb-2" width="15rem" />
          </div>
        </div>
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-6">
            <div class="md:col-span-4">
              <div v-if="!loading && customer">
                <div class="grid grid-cols-2 gap-20">
                  <p class="mb-1">Name</p>
                  <p :class="[customer && customer.is_deleted ? ' text-slate-400' : 'text-slate-500']">
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
                  <p :class="[customer && customer.is_deleted ? ' text-slate-400' : 'text-slate-500']">{{ customer.ig_account }}</p>
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
                    <p :class="[customer && customer.is_deleted ? ' text-slate-400' : 'text-slate-500']">#{{ customer.fav_color }}</p>
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
    <AddEditCustomer :type-form="FormType.EDIT" :open-dialog="editModal" :customer-data="(customer as Customer)" @close="closeEditDialog" />

    <!-- Delete Modal -->
    <Dialog v-model:visible="deleteModal" header="Delete Confirmation" :style="{ width: '30rem' }" class="text-sm" :draggable="false" :modal="true" :closable="false">
      <div class="flex flex-col items-center">
        <Icon name="bi:exclamation-triangle" class="text-orange-300 h-[4rem] w-[4rem] mb-1" />
        <p class="text-center lg:text-base md:text-sm">
          Are you sure you want to delete
          <span class="font-semibold">
            {{ customer ? customer.name : "this customer" }}
          </span>
          ?
        </p>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button type="button" label="No" class="bg-white border border-red-500 text-red-500 py-2 px-4 hover:bg-red-500 hover:text-white hover:border-red-500" @click="closeDeleteDialog" />
          <Button type="button" label="Yes" class="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600" :loading="loadingDelete" @click="deleteCustomerMethod"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
