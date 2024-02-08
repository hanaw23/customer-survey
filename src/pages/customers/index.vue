<script setup lang="ts">
import { useRouter } from "vue-router";
import ListTemplate from "../../components/templates/list-template.vue";
import CostumersList from "../../components/lists/costumers-list.vue";

// global
const router = useRouter();

// methods
const addNewCustomer = () => {
  router.push("/customers/new");
};
</script>

<template>
  <div>
    <ListTemplate title="Customers" description="Provide list of customer data">
      <template #actions>
        <div>
          <Button class="bg-blue-400 text-white p-2 hover:bg-blue-500" @click="addNewCustomer">
            <Icon name="fluent:add-24-filled" size="15px" />
            <p class="mx-2">Add Customer</p>
          </Button>
        </div>
      </template>

      <template #main>
        <CostumersList />
      </template>
    </ListTemplate>
  </div>
</template>
