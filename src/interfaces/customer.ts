export interface Customer {
  id: number;
  name: string;
  ig_account: string;
  fav_color: string;
}

export interface ResponseCustomer {
  data: Customer;
  message: string;
  status_code: number;
}

export interface CustomerState {
  customers: [] | Customer[];
  customer: null | Customer;
  totalCount: number;
  loading: boolean;
  errorMessage: string;
}
