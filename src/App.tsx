/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/storefront/Header';
import { CategoryNav } from './components/storefront/CategoryNav';
import { HeroBanner } from './components/storefront/HeroBanner';
import { CatalogSection } from './components/storefront/CatalogSection';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { FormalQuoteModal } from './components/storefront/FormalQuoteModal';
import { Footer } from './components/storefront/Footer';
import { AdminLayout } from './components/admin/AdminLayout';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { FloatingCart } from './components/common/FloatingCart';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent: React.FC = () => {
  const { viewMode } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Dynamic View Mode: Admin, Customer Portal, or Public Storefront */}
      {viewMode === 'admin' ? (
        <AdminLayout />
      ) : viewMode === 'customer' ? (
        <CustomerPortal />
      ) : (
        <>
          <Header />
          <CategoryNav />
          <main className="flex-1 pb-16 md:pb-0">
            <HeroBanner />
            <CatalogSection />
          </main>
          <Footer />
        </>
      )}

      {/* Floating Shopping Cart Trigger */}
      <FloatingCart />

      {/* App-like Bottom Navigation for Tablet and iOS Mobile */}
      <MobileBottomNav />

      {/* Shared Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <FormalQuoteModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
