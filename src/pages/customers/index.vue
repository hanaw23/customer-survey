<script setup lang="ts">
import { ref } from "vue";
import ListTemplate from "../../components/templates/list-template.vue";
import CostumersList from "../../components/lists/costumers-list.vue";
import AddEditCustomer from "../../components/forms/add-edit-customer.vue";
import { FormType } from "../../interfaces/form";

// declarations
// ref
const addNewCustomer = ref(false);
const isDialogOpen = ref(false);
const costumersRef = ref();

// methods
const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
  addNewCustomer.value = false;
};

const addNewCustomerModal = () => {
  addNewCustomer.value = true;
  openDialog();
};
</script>

<template>
  <div ref="costumersRef">
    <!-- List -->
    <ListTemplate title="Customers" description="Provide list of customer data">
      <template #actions>
        <div v-tooltip.left="'Add New'">
          <Button class="bg-blue-400 text-white my-3 px-5 py-1 hover:bg-blue-500" @click="addNewCustomerModal">
            <Icon name="fluent:add-24-filled" size="25px" />
          </Button>
        </div>
      </template>

      <template #main>
        <CostumersList />
      </template>
    </ListTemplate>

    <!-- Add New Modal -->
    <AddEditCustomer :type-form="FormType.ADD" @close="closeDialog" :open-dialog="isDialogOpen" />
  </div>
</template>
