<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import type { Customer } from "../../../interfaces/customer";
import { dataCustomers } from "../../../dummy/data";

// global
const router = useRouter();
const route = useRoute();
const customerId = route.params?.customerId;

const confirm = useConfirm();
const toast = useToast();

// declarations
// refs
const customerData = ref<Customer>(null);

// Methods
const findData = () => {
  customerData.value = dataCustomers.find((customer) => customer.id === Number(customerId));
};

onMounted(() => {
  findData();
});

// edit and delete
const editCustomer = () => {
  router.push(`/customers/${customerId}/edit`);
};

const deleteCustomer = () => {
  confirm.require({
    message: `Are you sure you want to delete ${customerData.value.name}?`,
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    acceptClass: "bg-blue-500 py-1 px-4 text-white",
    rejectClass: "bg-red-500 py-1 px-4 text-white",
    accept: () => {
      dataCustomers.filter((customer) => customer.id !== Number(customerId));
      toast.add({
        severity: "success",
        summary: "Delete Success",
        detail: "Success deleted customer",
        life: 3000,
      });
      router.push("/customers");
    },
  });
};
</script>

<template>
  <div>
    <div v-if="customerData">
      <!-- Header -->
      <div class="flex flex-row justify-between">
        <div class="flex w-full flex-col overflow-hidden rounded-md border bg-white shadow">
          <div class="flex flex-row justify-between w-full">
            <div class="flex w-full flex-row">
              <div class="flex max-w-fit flex-col gap-2 border-r p-4 font-semibold text-2xl">
                {{ customerData.name }}
              </div>
            </div>
            <div class="flex w-full flex-row justify-end my-1 gap-2 text-sm pr-2">
              <Button type="button" class="bg-red-500 text-white hover:bg-red-600 my-2 px-3" @click="deleteCustomer">
                <Icon name="material-symbols:delete-outline" size="18px" />
                <p class="mx-2">Delete</p>
              </Button>
              <Button type="button" class="bg-blue-500 text-white hover:bg-blue-600 my-2 px-3" @click="editCustomer"
                ><Icon name="material-symbols:edit-outline-rounded" size="18px" />
                <p class="mx-2">Edit</p></Button
              >
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
                <div>
                  <div class="grid grid-cols-2 gap-20">
                    <p class="mb-1">Name</p>
                    <p class="text-gray-500">
                      {{ customerData.name }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="md:col-span-4">
                <div>
                  <div class="grid grid-cols-2 gap-20">
                    <p class="mb-1">Instagram Account</p>
                    <p class="text-gray-500">{{ customerData.igAccount }}</p>
                  </div>
                </div>
              </div>
              <div class="md:col-span-4">
                <div>
                  <div class="grid grid-cols-2 gap-20">
                    <p class="mb-1">Favorite Outfit Color</p>
                    <div class="flex flex-row gap-3">
                      <div :style="{ backgroundColor: `#${customerData.favoriteOutfitColor}` as string }" class="w-5 h-5 rounded" />
                      #{{ customerData.favoriteOutfitColor }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
