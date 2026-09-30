export type ProductCategory = 
  | 'laparoscopia'
  | 'engrapado'
  | 'cierre_vasos'
  | 'consumibles'
  | 'torres_equipos';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  brand: string;
  specialty: string;
  price: number; // in MXN (before IVA or final)
  comparePrice?: number;
  stock: number;
  minStockThreshold: number;
  presentation: string;
  diameterMm?: number;
  lengthMm?: number;
  cofePristReg: string;
  sterilization: 'Estéril Desechable (ETO)' | 'Reutilizable Autoclavable (134°C)' | 'No Estéril / Equipo';
  description: string;
  features: string[];
  image: string;
  isFeatured?: boolean;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 
  | 'pendiente' 
  | 'confirmado' 
  | 'preparacion_quirurgica' 
  | 'enviado' 
  | 'entregado' 
  | 'cancelado';

export type PaymentMethod = 'spei' | 'tarjeta' | 'orden_compra';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  hospitalOrClinic: string;
  cedulaProfesional?: string;
}

export interface ShippingAddress {
  street: string;
  exteriorNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  hospitalWard?: string;
}

export interface BillingInfo {
  requiresInvoice: boolean;
  rfc: string;
  legalName: string;
  taxRegime: string;
  cfdiUse: string;
  email: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  shippingAddress: ShippingAddress;
  billingInfo: BillingInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  iva: number; // 16%
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pagado' | 'pendiente' | 'rechazado';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  rfc?: string;
  hospitalOrClinic: string;
  city: string;
  state: string;
  specialty: string;
  cedulaProfesional: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'activo' | 'inactivo' | 'prospecto';
}

export interface ActiveCart {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  hospital?: string;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
  lastActivity: string;
  status: 'activo' | 'abandonado' | 'convertido';
}

export interface DiscountCoupon {
  code: string;
  percentage: number;
  minPurchase: number;
  active: boolean;
  description: string;
}
