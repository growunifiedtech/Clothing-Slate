import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/store/CartDrawer';
import ToastContainer from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'SLATE APPARELS | E-Commerce & B2B Production Store',
  description: 'High-density combed cotton silhouettes, heavy fleece hoodies, selvedge denim jackets, and luxury activewear. B2B volume pricing and direct-to-consumer dispatch.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
