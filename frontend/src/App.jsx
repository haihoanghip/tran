import React, { useState } from 'react';
import Header from './components/header/Header';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import AuthModal from './modal/AuthModal';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Hàm bật/tắt Modal
  const openModal = () => setIsAuthOpen(true);
  const closeModal = () => setIsAuthOpen(false);

  return (
    <div className="app">
      <Header onOpenLogin={openModal} />
      
      {/* Bấm vào bất kỳ đâu trong Home cũng mở Modal */}
      <Home onRequireLogin={openModal} />

      <Footer />

      {/* Hiển thị Modal Đăng nhập */}
      <AuthModal isOpen={isAuthOpen} onClose={closeModal} />
    </div>
  );
}