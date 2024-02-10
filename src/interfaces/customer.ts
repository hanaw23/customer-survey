export interface Customer {
  id: number;
  name: string;
  ig_account: string;
  fav_color: string;
}

export interface ResponseCustomerObject {
  data: Customer;
  message?: string;
  status_code: number;
  url?: string;
  statusCode?: number;
}
export interface ResponseCustomerArray {
  data: Customer[];
  message?: string;
  status_code: number;
  url?: string;
  statusCode?: number;
}

export interface CustomerState {
  customers: [] | Customer[];
  customer: null | Customer;
  totalCount: number;
}
