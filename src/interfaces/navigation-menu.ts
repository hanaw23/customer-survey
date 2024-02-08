export interface Item {
  label: string;
  icon: string;
  to?: string;
}
export interface MenuItem {
  label: string;
  icon: string;
  to?: string;
  items?: Item[];
}
