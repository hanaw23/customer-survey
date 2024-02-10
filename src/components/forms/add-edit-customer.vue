<script setup lang="ts">
import type { PropType } from "vue";
import { useToast } from "primevue/usetoast";

import { useCustomerStore } from "../../stores/customer.store";
import type { Customer } from "../../interfaces/customer";
import { FormType } from "../../interfaces/form";

// global
const router = useRouter();
const toast = useToast();

// store
const { customer } = storeToRefs(useCustomerStore());
const { createCustomer, updateCustomer, fetchCustomerById } = useCustomerStore();

// props / emits
const props = defineProps({
  customerData: {
    type: Object as PropType<Customer>,
    default: null,
    require: false,
  },
  typeForm: {
    type: String,
    default: "",
    require: false,
  },
  openDialog: {
    type: Boolean,
    default: true,
    require: false,
  },
});
const emits = defineEmits(["close"]);

// declaration
const customerData = reactive<Customer>({
  id: 0,
  name: "",
  ig_account: "",
  fav_color: "",
});
const colorSelected = ref("");
const validation = reactive({
  name: true,
  ig_account: true,
  fav_color: true,
  isSubmit: false,
});
const loading = ref(false);

// methods
watchEffect(() => {
  if (props.customerData || props.customerData !== null) {
    customerData.id = props.customerData.id;
    customerData.name = props.customerData.name;
    customerData.ig_account = props.customerData.ig_account;
    customerData.fav_color = props.customerData.fav_color;
    colorSelected.value = props.customerData.fav_color as string;
  }
});

watch([colorSelected, customerData], () => {
  customerData.fav_color = colorSelected.value;

  if (customerData.name !== "") {
    validation.name = true;
  } else {
    validation.name = false;
  }
  if (customerData.ig_account !== "") {
    validation.ig_account = true;
  } else {
    validation.ig_account = false;
  }
  if (customerData.fav_color !== "") {
    validation.fav_color = true;
  } else {
    validation.fav_color = false;
  }
});

const closeDialog = (id: number) => {
  emits("close");
  if (id === 0) {
    router.push("/customers");
  } else {
    router.push(`/customers/${id}`);
  }
};

// submit / save
const methodAddEditCustomer = async () => {
  validation.isSubmit = false;
  if (validation.name && validation.ig_account && validation.fav_color && customerData.name && customerData.ig_account && customerData.fav_color) {
    if (props.typeForm === FormType.EDIT) {
      // Edit
      loading.value = true;
      const response = await updateCustomer(Number(customerData.id), customerData.name, customerData.ig_account, customerData.fav_color);
      loading.value = false;

      if (response.data) {
        toast.add({
          severity: "success",
          summary: "Update Success",
          detail: `${response.message}`,
          life: 3000,
        });
        closeDialog(response.data.id);

        // reload the page
        loading.value = true;
        await fetchCustomerById(response.data.id);
        loading.value = false;
        if (!customer.value) {
          toast.add({
            severity: "error",
            summary: "Failed Get Customer Details",
            detail: `No customer found`,
            life: 3000,
          });
        }
      } else if (response.statusCode === 500 || response.statusCode === 400 || response.statusCode === 404) {
        toast.add({
          severity: "error",
          summary: "Update Failed",
          detail: `Failed to update customer`,
          life: 3000,
        });
      }
    } else if (props.typeForm === FormType.ADD) {
      // Create
      loading.value = true;
      const response = await createCustomer(customerData.name, customerData.ig_account, customerData.fav_color);
      loading.value = false;

      if (response.data) {
        toast.add({
          severity: "success",
          summary: "Add New Success",
          detail: `${response.message}`,
          life: 3000,
        });
        closeDialog(response.data.id);
      } else if (response.statusCode === 500 || response.statusCode === 400 || response.statusCode === 404) {
        toast.add({
          severity: "error",
          summary: "Add New Failed",
          detail: `Failed to add new customer`,
          life: 3000,
        });
      }
    }
  } else {
    //Handle if validation failed
    if (customerData.name === "") {
      validation.name = false;
    }
    if (customerData.ig_account === "") {
      validation.ig_account = false;
    }
    if (customerData.fav_color === "") {
      validation.fav_color = false;
    }
    validation.isSubmit = true;
  }
};
</script>

<template>
  <Dialog v-model:visible="props.openDialog" :header="props.typeForm === FormType.EDIT ? 'Edit Customer' : 'Add Customer'" :style="{ width: '50rem' }" class="text-sm" maximizable :draggable="false" :modal="true" :closable="false">
    <!-- Fields -->
    <div>
      <div class="mb-4 mt-2 flex flex-row justify-center">
        <div class="flex flex-col align-items-center justify-content-center gap-1">
          <div class="rounded-[50%] p-1 w-[6rem] h-[6rem] bg-gray-300">
            <p class="text-slate-50 text-center my-6 font-semibold text-3xl">
              {{ customerData && customerData.name && customerData.name.length >= 2 ? `${customerData.name[0].toUpperCase()}${customerData.name[1]?.toUpperCase()}` : "Y/A" }}
            </p>
          </div>
          <p class="font-bold white-space-nowrap text-center">{{ customerData.name }}</p>
        </div>
      </div>

      <div class="mb-4">
        <div class="flex flex-col gap-2 mb-3">
          <label for="name" class="text-sm font-medium -mb-2" :class="[!validation.name && validation.isSubmit ? 'text-red-500' : '']">Name*</label>
          <InputText id="name" v-model="customerData.name" placeholder="Enter customer name." class="border p-2" :class="[!validation.name && validation.isSubmit ? 'border-red-500' : 'border-slate-300']" />
          <small v-if="!validation.name && validation.isSubmit" class="text-xs text-red-500 -mt-1">Cannot be empty!</small>
        </div>
        <div class="flex flex-col gap-2 mb-3">
          <label for="instagram" class="text-sm font-medium -mb-2" :class="[!validation.ig_account && validation.isSubmit ? 'text-red-500' : '']">Instagram Account*</label>
          <InputText id="instagram" v-model="customerData.ig_account" placeholder="Enter customer's instagram account." class="border p-2" :class="[!validation.ig_account && validation.isSubmit ? 'border-red-500' : 'border-slate-300']" />
          <small v-if="!validation.ig_account && validation.isSubmit" class="text-xs text-red-500 -mt-1">Cannot be empty!</small>
        </div>
        <div class="flex flex-col gap-2 mb-3">
          <label for="favcolor" class="text-sm font-medium -mb-2" :class="[!validation.fav_color && validation.isSubmit ? 'text-red-500' : '']">Favorite Outfit Color*</label>
          <InputText id="favcolor" v-model="customerData.fav_color" placeholder="Pick the color." disabled class="border p-2" :class="[!validation.fav_color && validation.isSubmit ? 'border-red-500' : 'border-slate-300']" />
          <ColorPicker v-model="colorSelected" inline class="mr-6" />
          <small v-if="!validation.fav_color && validation.isSubmit" class="text-xs text-red-500">Cannot be empty!</small>
        </div>
      </div>
    </div>

    <!-- submit button -->
    <template #footer>
      <div class="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Cancel"
          class="bg-white-400 border border-slate-400 text-slate-400 py-2 px-4 hover:bg-slate-500 hover:text-white hover:border-slate-500"
          @click="() => (props.typeForm === FormType.EDIT ? closeDialog(customerData.id) : closeDialog(0))"
        ></Button>
        <Button type="button" :label="props.typeForm === FormType.EDIT ? 'Save' : 'Submit'" class="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600" :loading="loading" @click="methodAddEditCustomer"></Button>
      </div>
    </template>
  </Dialog>
</template>
