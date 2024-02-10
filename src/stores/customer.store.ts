import { defineStore } from "pinia";
import type { Customer, CustomerState, ResponseCustomer } from "../interfaces/customer";

export const useCustomerStore = defineStore("customer-store", {
  state: (): CustomerState => ({
    customers: [] as Customer[],
    customer: {} as Customer,
    totalCount: 0,
    loading: false,
    errorMessage: "",
  }),
  actions: {
    async createCustomer(name: string, ig_account: string, fav_color: string) {
      this.loading = true;
      const response: ResponseCustomer = await $fetch("/api/create/customer", {
        method: "POST",
        credentials: "include",
        body: {
          name,
          ig_account,
          fav_color,
        },
      });
      if (!response) {
        this.errorMessage = `Error: 404 the server cannot find the requested resource.`;
      }
      this.loading = false;
      return response;
    },
  },
});
