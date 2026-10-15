import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/store/CartDrawer';
import ToastContainer from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'SLATE APPARELS | Luxury Retail Streetwear Store & Online Drops',
  description: 'Pure cotton heavyweight fleece hoodies, drop shoulder t-shirts, selvedge denim jackets, and tailored joggers. Direct retail purchasing with free express home delivery across India.',
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
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#06080e] text-slate-100 font-sans antialiased selection:bg-[#00ff87] selection:text-[#06080e]">
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
