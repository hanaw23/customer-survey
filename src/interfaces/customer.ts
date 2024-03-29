export interface Customer {
  id: number;
  name?: string;
  ig_account?: string;
  fav_color?: string;
  is_deleted?: boolean;
  time?: string;
}

export interface ResponseCustomer {
  data: Customer;
  message?: string;
  status_code: number;
  url?: string;
  statusCode?: number;
}

export interface ResponseCustomers {
  data: Customer[];
  message?: string;
  status_code: number;
  total_count: number;
  url?: string;
  statusCode?: number;
}

export interface CustomerState {
  customers: [] | Customer[];
  customer: null | Customer;
  totalCount: number;
}
