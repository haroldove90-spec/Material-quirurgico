import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Customer,
  ActiveCart,
  DiscountCoupon,
  OrderStatus,
  ProductCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_ACTIVE_CARTS,
  INITIAL_COUPONS
} from '../data/initialData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // View mode: Store, Admin, or Customer Portal
  viewMode: 'store' | 'admin' | 'customer';
  setViewMode: (mode: 'store' | 'admin' | 'customer') => void;
  adminTab: 'dashboard' | 'products' | 'register_product' | 'orders' | 'customers' | 'carts' | 'coupons';
  setAdminTab: (tab: 'dashboard' | 'products' | 'register_product' | 'orders' | 'customers' | 'carts' | 'coupons') => void;
  customerTab: 'mis_compras' | 'rastreo' | 'perfil' | 'deseos';
  setCustomerTab: (tab: 'mis_compras' | 'rastreo' | 'perfil' | 'deseos') => void;

  // Active Logged-in Customer
  activeCustomer: Customer;
  setActiveCustomer: (customer: Customer) => void;
  updateActiveCustomerProfile: (updates: Partial<Customer>) => void;

  // Customer Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Quick Reorder
  reorderItems: (order: Order) => void;

  // Simulated live tracking progress
  advanceOrderTracking: (orderId: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  toggleProductActive: (id: string) => void;
  toggleProductFeatured: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void;
  deleteOrder: (id: string) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrderDate'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Active Carts (Admin management)
  activeCarts: ActiveCart[];
  removeActiveCart: (id: string) => void;
  createActiveCart: (cart: Omit<ActiveCart, 'id' | 'lastActivity'>) => void;

  // Shopping Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;

  // Coupons
  coupons: DiscountCoupon[];
  appliedCoupon: DiscountCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: DiscountCoupon) => void;
  toggleCouponActive: (code: string) => void;

  // Cart Math
  subtotal: number;
  discountAmount: number;
  iva: number;
  shippingCost: number;
  total: number;

  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  selectedBrand: string;
  setSelectedBrand: (b: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (s: string) => void;
  sortBy: 'destacados' | 'precio_asc' | 'precio_desc' | 'nombre';
  setSortBy: (sort: 'destacados' | 'precio_asc' | 'precio_desc' | 'nombre') => void;

  // Modals & Triggers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isFormalQuoteOpen: boolean;
  setIsFormalQuoteOpen: (open: boolean) => void;
  lastCreatedOrder: Order | null;
  setLastCreatedOrder: (order: Order | null) => void;
  selectedTrackingOrder: Order | null;
  setSelectedTrackingOrder: (order: Order | null) => void;

  // Notifications
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset
  resetToDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View mode
  const [viewMode, setViewMode] = useState<'store' | 'admin' | 'customer'>('store');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'register_product' | 'orders' | 'customers' | 'carts' | 'coupons'>('dashboard');
  const [customerTab, setCustomerTab] = useState<'mis_compras' | 'rastreo' | 'perfil' | 'deseos'>('mis_compras');

  // Persistence keys
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_products_v1');
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_orders_v1');
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_customers_v1');
      return stored ? JSON.parse(stored) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  // Active logged in customer (Dr. Alejandro Morales Ramos by default for instant simulation)
  const [activeCustomer, setActiveCustomer] = useState<Customer>(() => {
    try {
      const stored = localStorage.getItem('laparo_active_customer_v1');
      return stored ? JSON.parse(stored) : INITIAL_CUSTOMERS[0];
    } catch {
      return INITIAL_CUSTOMERS[0];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_wishlist_v1');
      return stored ? JSON.parse(stored) : ['prod-001', 'prod-005', 'prod-007'];
    } catch {
      return ['prod-001', 'prod-005', 'prod-007'];
    }
  });

  const [activeCarts, setActiveCarts] = useState<ActiveCart[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_active_carts_v1');
      return stored ? JSON.parse(stored) : INITIAL_ACTIVE_CARTS;
    } catch {
      return INITIAL_ACTIVE_CARTS;
    }
  });

  const [coupons, setCoupons] = useState<DiscountCoupon[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_coupons_v1');
      return stored ? JSON.parse(stored) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Client shopping cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('laparo_cart_v1');
      return stored ? JSON.parse(stored) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[6], quantity: 2 }
      ];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState<'destacados' | 'precio_asc' | 'precio_desc' | 'nombre'>('destacados');

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormalQuoteOpen, setIsFormalQuoteOpen] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('laparo_products_v1', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('laparo_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('laparo_customers_v1', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('laparo_active_customer_v1', JSON.stringify(activeCustomer));
    } catch (e) {
      console.error(e);
    }
  }, [activeCustomer]);

  useEffect(() => {
    try {
      localStorage.setItem('laparo_wishlist_v1', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Insumo removido de su lista guardada' : 'Insumo agregado a su lista de favoritos quirúrgicos', 'info');
      return updated;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Update customer profile
  const updateActiveCustomerProfile = (updates: Partial<Customer>) => {
    setActiveCustomer(prev => ({ ...prev, ...updates }));
    setCustomers(prev => prev.map(c => c.id === activeCustomer.id ? { ...c, ...updates } : c));
    showToast('Perfil médico actualizado exitosamente', 'success');
  };

  // Quick reorder all items from past order
  const reorderItems = (order: Order) => {
    let countAdded = 0;
    order.items.forEach(orderItem => {
      const matched = products.find(p => p.id === orderItem.productId) || products.find(p => p.sku === orderItem.sku);
      if (matched && matched.stock > 0) {
        addToCart(matched, orderItem.quantity);
        countAdded += orderItem.quantity;
      }
    });

    if (countAdded > 0) {
      setIsCartDrawerOpen(true);
      showToast(`Se agregaron ${countAdded} piezas de la orden ${order.id} al carrito`, 'success');
    } else {
      showToast('Los insumos seleccionados no cuentan con stock inmediato', 'error');
    }
  };

  // Simulate advancing the tracking status
  const advanceOrderTracking = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        let nextStatus: OrderStatus = o.orderStatus;
        let newTracking = o.trackingNumber;
        let newCarrier = o.carrier;

        if (o.orderStatus === 'pendiente') {
          nextStatus = 'confirmado';
        } else if (o.orderStatus === 'confirmado') {
          nextStatus = 'preparacion_quirurgica';
        } else if (o.orderStatus === 'preparacion_quirurgica') {
          nextStatus = 'enviado';
          if (!newTracking) newTracking = `DHL-${Math.floor(100000000 + Math.random() * 900000000)}`;
          if (!newCarrier) newCarrier = 'DHL Express Quirúrgico Priority';
        } else if (o.orderStatus === 'enviado') {
          nextStatus = 'entregado';
        }

        const updated: Order = {
          ...o,
          orderStatus: nextStatus,
          trackingNumber: newTracking,
          carrier: newCarrier,
          paymentStatus: nextStatus === 'entregado' ? 'pagado' : o.paymentStatus
        };

        if (selectedTrackingOrder && selectedTrackingOrder.id === orderId) {
          setSelectedTrackingOrder(updated);
        }

        showToast(`Envío de la orden ${o.id}: ${nextStatus.replace('_', ' ').toUpperCase()}`, 'info');
        return updated;
      }
      return o;
    }));
  };

  useEffect(() => {
    try {
      localStorage.setItem('laparo_active_carts_v1', JSON.stringify(activeCarts));
    } catch (e) {
      console.error(e);
    }
  }, [activeCarts]);

  useEffect(() => {
    try {
      localStorage.setItem('laparo_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Product actions
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString(36)}`,
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Producto "${newProduct.name}" registrado en catálogo`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Producto actualizado correctamente', 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Producto ${target ? `"${target.name}"` : ''} eliminado del catálogo`, 'info');
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, newStock) };
      }
      return p;
    }));
    showToast('Inventario quirúrgico actualizado', 'success');
  };

  const toggleProductActive = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isActive;
        showToast(`Producto ${nextState ? 'publicado' : 'ocultado'} en la tienda`, 'info');
        return { ...p, isActive: nextState };
      }
      return p;
    }));
  };

  const toggleProductFeatured = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return p;
    }));
  };

  // Order actions
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `LAP-2026-${randomSuffix}`,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Also update or register customer
    setCustomers(prev => {
      const existingIdx = prev.findIndex(c => c.email.toLowerCase() === orderData.customer.email.toLowerCase());
      if (existingIdx >= 0) {
        const updated = [...prev];
        const current = updated[existingIdx];
        updated[existingIdx] = {
          ...current,
          totalOrders: current.totalOrders + 1,
          totalSpent: current.totalSpent + newOrder.total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          status: 'activo'
        };
        return updated;
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now().toString(36)}`,
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          rfc: orderData.billingInfo?.rfc,
          hospitalOrClinic: orderData.customer.hospitalOrClinic,
          city: orderData.shippingAddress.city,
          state: orderData.shippingAddress.state,
          specialty: orderData.customer.specialty || 'Cirugía General',
          cedulaProfesional: orderData.customer.cedulaProfesional || 'En trámite',
          totalOrders: 1,
          totalSpent: newOrder.total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          status: 'activo'
        };
        return [newCustomer, ...prev];
      }
    });

    // Reduce inventory
    setProducts(prev => prev.map(prod => {
      const orderItem = newOrder.items.find(i => i.productId === prod.id);
      if (orderItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - orderItem.quantity)
        };
      }
      return prod;
    }));

    // Clear cart
    clearCart();
    setLastCreatedOrder(newOrder);
    showToast(`¡Orden ${newOrder.id} generada exitosamente!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (
    id: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        const updated: Order = {
          ...o,
          orderStatus: status,
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(carrier ? { carrier } : {})
        };
        if (status === 'confirmado' || status === 'enviado' || status === 'entregado') {
          updated.paymentStatus = 'pagado';
        }
        return updated;
      }
      return o;
    }));
    showToast(`Estado de venta ${id} actualizado a: ${status.replace('_', ' ').toUpperCase()}`, 'success');
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast(`Orden ${id} eliminada del registro`, 'info');
  };

  // Customers
  const addCustomer = (customerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrderDate'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now().toString(36)}`,
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [newCust, ...prev]);
    showToast(`Cliente ${newCust.name} dado de alta con éxito`, 'success');
    return newCust;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    showToast('Datos de cliente actualizados', 'success');
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    showToast('Cliente retirado del directorio', 'info');
  };

  // Active Carts
  const removeActiveCart = (id: string) => {
    setActiveCarts(prev => prev.filter(c => c.id !== id));
    showToast('Sesión de carrito removida', 'info');
  };

  const createActiveCart = (cartData: Omit<ActiveCart, 'id' | 'lastActivity'>) => {
    const newCart: ActiveCart = {
      ...cartData,
      id: `cart-sess-${Math.floor(100 + Math.random() * 900)}`,
      lastActivity: 'Ahora mismo'
    };
    setActiveCarts(prev => [newCart, ...prev]);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`+${quantity} ${product.name} al carrito`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cart math
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.percentage) / 100)
    : 0;

  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  // IVA 16% in Mexico
  const iva = Math.round(subtotalAfterDiscount * 0.16);

  // Free shipping over $5,000 MXN, else $250 MXN standard national medical delivery
  const shippingCost = subtotalAfterDiscount >= 5000 || subtotalAfterDiscount === 0 ? 0 : 250;

  const total = subtotalAfterDiscount + iva + shippingCost;

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Código de cupón inválido o expirado' };
    }
    if (subtotal < found.minPurchase) {
      return {
        success: false,
        message: `El pedido mínimo para aplicar ${found.code} es de $${found.minPurchase.toLocaleString('es-MX')} MXN`
      };
    }
    setAppliedCoupon(found);
    showToast(`Cupón ${found.code} aplicado (${found.percentage}% de descuento)`, 'success');
    return { success: true, message: `Descuento del ${found.percentage}% aplicado exitosamente` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupón de descuento retirado', 'info');
  };

  const addCoupon = (coupon: DiscountCoupon) => {
    setCoupons(prev => [coupon, ...prev]);
    showToast(`Cupón ${coupon.code} creado exitosamente`, 'success');
  };

  const toggleCouponActive = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  // Reset to default demo data
  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setActiveCarts(INITIAL_ACTIVE_CARTS);
    setCoupons(INITIAL_COUPONS);
    localStorage.clear();
    showToast('Base de datos restaurada con valores de prueba de Laparoscopic.mx', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
        customerTab,
        setCustomerTab,
        activeCustomer,
        setActiveCustomer,
        updateActiveCustomerProfile,
        wishlist,
        toggleWishlist,
        isWishlisted,
        reorderItems,
        advanceOrderTracking,
        selectedTrackingOrder,
        setSelectedTrackingOrder,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        toggleProductActive,
        toggleProductFeatured,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        activeCarts,
        removeActiveCart,
        createActiveCart,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCouponActive,
        subtotal,
        discountAmount,
        iva,
        shippingCost,
        total,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        selectedSpecialty,
        setSelectedSpecialty,
        sortBy,
        setSortBy,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        selectedProduct,
        setSelectedProduct,
        isFormalQuoteOpen,
        setIsFormalQuoteOpen,
        lastCreatedOrder,
        setLastCreatedOrder,
        toasts,
        showToast,
        removeToast,
        resetToDefaultData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
