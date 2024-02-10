import { defineStore } from "pinia";
import type { Customer, CustomerState, ResponseCustomer, ResponseCustomers } from "../interfaces/customer";

export const useCustomerStore = defineStore("customer-store", {
  state: (): CustomerState => ({
    customers: [] as Customer[],
    customer: {} as Customer,
    totalCount: 0,
  }),
  actions: {
    async fetchCustomers(page: number, per_page: number) {
      const response: ResponseCustomers = await $fetch(`/api/customers/${page}/${per_page}`, {
        method: "GET",
        credentials: "include",
      });
      if (response) {
        this.customers = response.data;
        this.totalCount = response.total_count;
      }
      return this.customers;
    },
    async fetchCustomerById(id: number) {
      const response: ResponseCustomer = await $fetch(`/api/customer/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (response) {
        this.customer = response.data;
      }
      return this.customer;
    },
    async createCustomer(name: string, ig_account: string, fav_color: string) {
      const response: ResponseCustomer = await $fetch("/api/create/customer", {
        method: "POST",
        credentials: "include",
        body: {
          name,
          ig_account,
          fav_color,
        },
      });

      return response;
    },
    async updateCustomer(id: number, name: string, ig_account: string, fav_color: string) {
      const response: ResponseCustomer = await $fetch(`/api/update/customer/${id}`, {
        method: "PUT",
        credentials: "include",
        body: {
          name,
          ig_account,
          fav_color,
        },
      });
      return response;
    },
    async deleteCustomer(id: number) {
      const response: ResponseCustomer = await $fetch(`/api/delete/customer/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      return response;
    },
  },
});
