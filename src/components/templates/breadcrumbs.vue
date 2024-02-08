<script setup lang="ts">
import { dataCustomers } from "../../dummy/data.ts";
// global
const route = useRoute();
const customerId = route.params?.customerId;
const customerDetails = computed(() => {
  dataCustomers.find((customer) => customer.id === Number(customerId));
});

// Methods
const breadcrumbs = computed(() => {
  const crumbs = [];
  const routes = route.fullPath.split("/");
  let count = 1;
  while (count < routes.length) {
    let to = "";
    const label = routes[count];
    for (let i = 1; i <= count; i++) to = to.concat(`/${routes[i]}`);

    if (route.path.includes("customers")) {
      if (to === `/customers/${route.params.customerId}`) {
        const item = {
          label: customerDetails?.value?.name ?? "Details",
          disabled: false,
          to,
        };
        crumbs.push(item);
      } else {
        const item = {
          label: label.charAt(0).toUpperCase() + label.slice(1),
          disabled: false,
          to,
        };
        crumbs.push(item);
      }
    }

    const item = {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      disabled: false,
      to,
    };
    crumbs.push(item);
    count++;
  }
  return crumbs.filter((v: { to: string }, i: any, a: any[]) => a.findIndex((v2: { to: string }) => v2.to === v.to) === i);
});
</script>

<template>
  <div>
    <Breadcrumb :model="breadcrumbs" aria-label="breadcrumb" class="overflow-scroll truncate md:!border-none !capitalize">
      <template #item="{ item }">
        <NuxtLink :to="item.to" exact-active-class="font-semibold text-slate-900 capitalize">{{ item.label?.toString().replace(/-/g, " ") }} </NuxtLink>
      </template>
    </Breadcrumb>
  </div>
</template>
