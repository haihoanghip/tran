import React, { useState } from 'react';
import './auth.css';

export default function AuthModal({ isOpen, onClose }) {
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'

    if (!isOpen) return null;

    const handleGoogleLogin = () => {
        alert('Đang kết nối tài khoản Google...');
    };

    return (
        <div className="auth-modal">
            <div className="auth-modal__overlay" onClick={onClose}></div>

            <div className="auth-modal__box">
                <button type="button" className="auth-modal__close" onClick={onClose}>&times;</button>

                {/* 1. ĐĂNG NHẬP */}
                {authMode === 'login' && (
                    <div className="auth-modal__content">
                        <h2 className="auth-modal__title">Đăng Nhập</h2>
                        <p className="auth-modal__subtitle">Chào mừng bạn quay trở lại với AURA.</p>

                        <form className="auth-modal__form" onSubmit={(e) => e.preventDefault()}>
                            <div className="auth-modal__field">
                                <label>Email hoặc Số điện thoại</label>
                                <input type="text" placeholder="Nhập email hoặc số điện thoại" required />
                            </div>

                            <div className="auth-modal__field">
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="Nhập mật khẩu" required />
                            </div>

                            <div className="auth-modal__options">
                                <label className="auth-modal__remember">
                                    <input type="checkbox" /> Ghi nhớ đăng nhập
                                </label>
                                <button type="button" className="auth-modal__link-btn" onClick={() => setAuthMode('forgot')}>
                                    Quên mật khẩu?
                                </button>
                            </div>

                            <button type="submit" className="auth-modal__submit">Đăng Nhập</button>

                            {/* NÚT GOOGLE CHUYỂN XUỐNG DƯỚI NÚT ĐĂNG NHẬP */}
                            <div className="auth-modal__divider">
                                <span>hoặc</span>
                            </div>

                            <button type="button" className="auth-modal__social-btn" onClick={handleGoogleLogin}>
                                <svg className="auth-modal__social-icon" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                Đăng nhập với Google
                            </button>
                        </form>

                        <p className="auth-modal__footer">
                            Chưa có tài khoản?{' '}
                            <button type="button" className="auth-modal__link-btn auth-modal__link-btn--bold" onClick={() => setAuthMode('register')}>
                                Đăng ký ngay
                            </button>
                        </p>
                    </div>
                )}

                {/* 2. ĐĂNG KÝ */}
                {authMode === 'register' && (
                    <div className="auth-modal__content">
                        <h2 className="auth-modal__title">Tạo Tài Khoản</h2>
                        <p className="auth-modal__subtitle">Nhận ưu đãi dành riêng cho thành viên.</p>

                        <form className="auth-modal__form" onSubmit={(e) => e.preventDefault()}>
                            <div className="auth-modal__field">
                                <label>Họ và Tên</label>
                                <input type="text" placeholder="Nhập họ và tên" required />
                            </div>

                            <div className="auth-modal__field">
                                <label>Email hoặc Số điện thoại</label>
                                <input type="text" placeholder="Nhập email hoặc số điện thoại" required />
                            </div>

                            <div className="auth-modal__field">
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="Tạo mật khẩu" required />
                            </div>

                            <button type="submit" className="auth-modal__submit">Đăng Ký</button>

                            {/* NÚT GOOGLE CHUYỂN XUỐNG DƯỚI NÚT ĐĂNG KÝ */}
                            <div className="auth-modal__divider">
                                <span>hoặc</span>
                            </div>

                            <button type="button" className="auth-modal__social-btn" onClick={handleGoogleLogin}>
                                <svg className="auth-modal__social-icon" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                Đăng ký nhanh với Google
                            </button>
                        </form>

                        <p className="auth-modal__footer">
                            Đã có tài khoản?{' '}
                            <button type="button" className="auth-modal__link-btn auth-modal__link-btn--bold" onClick={() => setAuthMode('login')}>
                                Đăng nhập
                            </button>
                        </p>
                    </div>
                )}

                {/* 3. QUÊN MẬT KHẨU */}
                {authMode === 'forgot' && (
                    <div className="auth-modal__content">
                        <h2 className="auth-modal__title">Quên Mật Khẩu</h2>
                        <p className="auth-modal__subtitle">Nhập email để nhận hướng dẫn đặt lại mật khẩu.</p>

                        <form className="auth-modal__form" onSubmit={(e) => e.preventDefault()}>
                            <div className="auth-modal__field">
                                <label>Email khôi phục</label>
                                <input type="email" placeholder="Nhập email của bạn" required />
                            </div>

                            <button type="submit" className="auth-modal__submit">Gửi mã khôi phục</button>
                        </form>

                        <p className="auth-modal__footer">
                            Quay lại{' '}
                            <button type="button" className="auth-modal__link-btn auth-modal__link-btn--bold" onClick={() => setAuthMode('login')}>
                                Đăng nhập
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
