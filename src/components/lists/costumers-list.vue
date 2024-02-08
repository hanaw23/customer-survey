<script setup lang="ts">
import { dataCustomers } from "../../dummy/data.ts";

// global
const router = useRouter();

// Methods
const rowClick = (event: any) => {
  router.push(`/customers/${event.id}`);
};
</script>

<template>
  <div>
    <!-- @column-reorder="onColReorder"
      @page="onPageChange($event)" -->
    <!-- @sort="onSort($event)" -->
    <data-table
      ref="dt"
      data-key="id"
      sort-field="name"
      :value="dataCustomers"
      :reorderable-columns="true"
      :sort-order="1"
      :show-gridlines="true"
      :row-hover="true"
      :paginator="true"
      :rows="20"
      :lazy="true"
      :total-records="dataCustomers.length"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} customers"
      class="p-fluid text-sm"
      responsive-layout="scroll"
      @row-click="rowClick($event.data)"
    >
      <template #loading>
        <div>Data is loading..please wait</div>
      </template>

      <template #empty>
        <div class="grid h-60 w-full place-content-center text-center">
          <div>
            <div class="text-lg font-medium">No Customer yet!</div>
            <div class="mb-5 text-gray-500">This section will contain the list of customers</div>
          </div>
        </div>
      </template>

      <Column ref="name" field="name" header="Customer Name" :sortable="true" class="truncate">
        <template #body="slotProps">
          <div>
            {{ slotProps.data?.name }}
          </div>
        </template>
      </Column>
      <Column ref="igAccount" field="igAccount" header="Instagram Account" class="truncate">
        <template #body="slotProps">
          <div>
            {{ slotProps.data?.igAccount }}
          </div>
        </template>
      </Column>
      <Column ref="favoriteOutfitColor" field="favoriteOutfitColor" header="Favorite Color" class="truncate">
        <template #body="slotProps">
          <div class="flex flex-row gap-3">
            <div :style="{ backgroundColor: `#${slotProps.data?.favoriteOutfitColor}` as string }" class="w-5 h-5 rounded" />
            #{{ slotProps.data?.favoriteOutfitColor }}
          </div>
        </template>
      </Column>
    </data-table>
  </div>
</template>
