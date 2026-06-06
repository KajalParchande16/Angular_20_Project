export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  expanded?: boolean;
  roles?: string[]; // 👈 Array of roles allowed to see this item
}