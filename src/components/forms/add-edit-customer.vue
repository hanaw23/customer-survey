<script setup lang="ts">
import type { PropType } from "vue";
import { useToast } from "primevue/usetoast";
import type { Customer } from "../../interfaces/customer.ts";
import { FormType } from "../../interfaces/form.ts";
import { dataCustomers } from "../../dummy/data.ts";

// global
const router = useRouter();
const toast = useToast();

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
  id: dataCustomers.length + 1,
  name: "",
  igAccount: "",
  favoriteOutfitColor: "",
});
const colorSelected = ref("");

// methods
watchEffect(() => {
  if (props.customerData || props.customerData !== null) {
    customerData.id = props.customerData.id;
    customerData.name = props.customerData.name;
    customerData.igAccount = props.customerData.igAccount;
    customerData.favoriteOutfitColor = props.customerData.favoriteOutfitColor;
    colorSelected.value = props.customerData.favoriteOutfitColor;
  }
});
watch(
  () => colorSelected.value,
  () => {
    customerData.favoriteOutfitColor = colorSelected.value;
  }
);

const closeDialog = (id?: string) => {
  emits("close");
  if (id === "") {
    router.push("/customers");
  } else {
    router.push(`/customers/${customerData.id}`);
  }
};

// submit / save
const methodAddEditCustomer = () => {
  if (props.typeForm === FormType.EDIT) {
    for (let i = 0; i < dataCustomers.length; i++) {
      if (dataCustomers[i].id === customerData.id) {
        dataCustomers[i].name = customerData.name;
        dataCustomers[i].igAccount = customerData.igAccount;
        dataCustomers[i].favoriteOutfitColor = customerData.favoriteOutfitColor;
      }
    }
    toast.add({
      severity: "success",
      summary: "Edit Success",
      detail: "Success edited customer",
      life: 3000,
    });
    closeDialog("");
  } else if (props.typeForm === FormType.ADD) {
    dataCustomers.unshift(customerData);
    toast.add({
      severity: "success",
      summary: "Add New Success",
      detail: "Success added new customer",
      life: 3000,
    });
    closeDialog(customerData.id);
  }
};
</script>

<template>
  <Dialog v-model:visible="props.openDialog" :header="props.typeForm === FormType.EDIT ? 'Edit Customer' : 'Add Customer'" :style="{ width: '50%' }" class="text-sm" maximizable :draggable="false" :modal="true" :closable="false">
    <!-- Fields -->
    <div>
      <div class="mb-4 mt-2 flex flex-row justify-center">
        <div class="flex flex-col align-items-center justify-content-center gap-1">
          <div class="rounded-[50%] p-1 w-[6rem] h-[6rem] bg-gray-300">
            <p class="text-slate-50 text-center my-6 font-semibold text-3xl">{{ customerData.name.length >= 2 ? `${customerData.name[0].toUpperCase()}${customerData.name[1].toUpperCase()}` : "Y/A" }}</p>
          </div>
          <p class="font-bold white-space-nowrap text-center">{{ customerData.name }}</p>
        </div>
      </div>

      <div class="mb-4">
        <div class="flex flex-col gap-2 mb-3">
          <label for="name" class="text-sm font-medium -mb-2">Name</label>
          <InputText id="name" v-model="customerData.name" placeholder="Enter customer name." class="border border-slate-300 p-2" />
        </div>
        <div class="flex flex-col gap-2 mb-3">
          <label for="instagram" class="text-sm font-medium -mb-2">Instagram Account</label>
          <InputText id="instagram" v-model="customerData.igAccount" placeholder="Enter customer's instagram account." class="border border-slate-300 p-2" />
        </div>
        <div class="flex flex-col gap-2 mb-3">
          <label for="favcolor" class="text-sm font-medium -mb-2">Favorite Outfit Color</label>
          <InputText id="favcolor" v-model="customerData.favoriteOutfitColor" placeholder="Pick the color." disabled class="border border-slate-300 p-2" />
          <ColorPicker v-model="colorSelected" inline class="mr-6" />
        </div>
      </div>
    </div>

    <!-- submit button -->
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" class="bg-white-400 border border-slate-400 text-slate-400 py-2 px-4 hover:bg-slate-500 hover:text-white hover:border-slate-500" @click="closeDialog('')"></Button>
        <Button type="button" :label="props.typeForm === FormType.EDIT ? 'Save' : 'Submit'" class="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600" @click="methodAddEditCustomer"></Button>
      </div>
    </template>
  </Dialog>
</template>
