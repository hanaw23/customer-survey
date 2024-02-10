<script setup lang="ts">
import { useToast } from "primevue/usetoast";

import { useCustomerStore } from "../../stores/customer.store";

// global
const router = useRouter();
const toast = useToast();

// store
const { customers, totalCount } = storeToRefs(useCustomerStore());
const { fetchCustomers } = useCustomerStore();

// Declarations
// refs
const loading = ref(false);
const dt = ref();
const lazyParams = ref({
  first: 0,
  page: 0,
  rows: 20,
});

// Methods
onMounted(async () => {
  loading.value = true;
  await lazyLoadData();
  loading.value = false;
});

const lazyLoadData = async () => {
  loading.value = true;
  await fetchCustomers(lazyParams.value.page + 1, lazyParams.value.rows);

  loading.value = false;
  if (!customers.value) {
    toast.add({
      severity: "error",
      summary: "Failed Get Customer Details",
      detail: `No customer found`,
      life: 3000,
    });
  }
};

const onPageChange = (event: any) => {
  lazyParams.value = event;
  lazyLoadData();
};

const rowClick = (event: any) => {
  router.push(`/customers/${event.id}`);
};
</script>

<template>
  <div>
    <data-table
      ref="dt"
      data-key="id"
      :value="customers"
      :show-gridlines="true"
      :total-records="totalCount.valueOf()"
      :row-hover="true"
      :paginator="true"
      :rows="lazyParams.rows"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
      :lazy="true"
      current-page-report-template="Showing {first} to {last} of {totalRecords} customers"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      class="p-fluid text-sm cursor-pointer"
      responsive-layout="scroll"
      @row-click="rowClick($event.data)"
      @page="onPageChange($event)"
    >
      <template #empty>
        <div class="grid h-60 w-full place-content-center text-center">
          <div v-if="loading">
            <ProgressSpinner />
            <p class="text-center font-semibold text-base">Loading data...</p>
          </div>
          <div v-else>
            <div v-if="customers.length === 0">
              <div class="text-lg font-medium">No Customer yet!</div>
              <div class="mb-5 text-gray-500">This section will contain the list of customers</div>
            </div>
          </div>
        </div>
      </template>

      <Column ref="name" field="name" header="Customer Name" class="truncate">
        <template #body="slotProps">
          <Skeleton v-if="loading" class="mb-2" />
          <div v-else>
            {{ slotProps.data?.name }}
          </div>
        </template>
      </Column>
      <Column ref="ig_account" field="ig_account" header="Instagram Account" class="truncate">
        <template #body="slotProps">
          <Skeleton v-if="loading" class="mb-2" />
          <div v-else>
            {{ slotProps.data?.ig_account }}
          </div>
        </template>
      </Column>
      <Column ref="fav_color" field="fav_color" header="Favorite Color" class="truncate">
        <template #body="slotProps">
          <Skeleton v-if="loading" class="mb-2" />
          <div v-else class="flex flex-row gap-3">
            <div :style="{ backgroundColor: `#${slotProps.data?.fav_color}` as string }" class="w-5 h-5 rounded" />
            #{{ slotProps.data?.fav_color }}
          </div>
        </template>
      </Column>
    </data-table>
  </div>
</template>
