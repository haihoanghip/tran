import React, { useState } from 'react';
import './header.css';

function Header() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'

    // Mở modal đăng nhập mặc định
    const openAuthModal = (mode = 'login') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Đóng modal
    const closeAuthModal = () => {
        setIsAuthOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <header className="header">
                <div className="header__container">
                    <a href="/" className="header__logo">
                        AURA.
                    </a>

                    <nav className="header__nav">
                        <a href="/">Trang chủ</a>
                        <a href="#categories">Danh mục</a>
                        <a href="#products">Sản phẩm</a>
                    </nav>

                    <div className="header__actions">
                        <button onClick={() => openAuthModal('login')} className="header__login-btn">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </header>

            {/* MODAL AUTH OVERLAY */}
            {isAuthOpen && (
                <div className="auth-modal">
                    <div className="auth-modal__overlay" onClick={closeAuthModal}></div>

                    <div className="auth-modal__box">
                        <button className="auth-modal__close" onClick={closeAuthModal}>
                            &times;
                        </button>

                        {/* FORM 1: ĐĂNG NHẬP */}
                        {authMode === 'login' && (
                            <>
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
                                        <button
                                            type="button"
                                            className="auth-modal__link-btn"
                                            onClick={() => setAuthMode('forgot')}
                                        >
                                            Quên mật khẩu?
                                        </button>
                                    </div>

                                    <button type="submit" className="auth-modal__submit">
                                        Đăng Nhập
                                    </button>
                                </form>

                                <p className="auth-modal__footer">
                                    Chưa có tài khoản?{' '}
                                    <button
                                        type="button"
                                        className="auth-modal__link-btn auth-modal__link-btn--bold"
                                        onClick={() => setAuthMode('register')}
                                    >
                                        Đăng ký ngay
                                    </button>
                                </p>
                            </>
                        )}

                        {/* FORM 2: ĐĂNG KÝ */}
                        {authMode === 'register' && (
                            <>
                                <h2 className="auth-modal__title">Tạo Tài Khoản</h2>
                                <p className="auth-modal__subtitle">Tham gia AURA để nhận nhiều ưu đãi.</p>

                                <form className="auth-modal__form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="auth-modal__field">
                                        <label>Họ và Tên</label>
                                        <input type="text" placeholder="Nhập họ và tên" required />
                                    </div>

                                    <div className="auth-modal__field">
                                        <label>Email / Số điện thoại</label>
                                        <input type="text" placeholder="Nhập email hoặc SĐT" required />
                                    </div>

                                    <div className="auth-modal__field">
                                        <label>Mật khẩu</label>
                                        <input type="password" placeholder="Tạo mật khẩu" required />
                                    </div>

                                    <button type="submit" className="auth-modal__submit">
                                        Đăng Ký
                                    </button>
                                </form>

                                <p className="auth-modal__footer">
                                    Đã có tài khoản?{' '}
                                    <button
                                        type="button"
                                        className="auth-modal__link-btn auth-modal__link-btn--bold"
                                        onClick={() => setAuthMode('login')}
                                    >
                                        Đăng nhập
                                    </button>
                                </p>
                            </>
                        )}

                        {/* FORM 3: QUÊN MẬT KHẨU */}
                        {authMode === 'forgot' && (
                            <>
                                <h2 className="auth-modal__title">Quên Mật Khẩu</h2>
                                <p className="auth-modal__subtitle">Nhập email để nhận mã khôi phục mật khẩu.</p>

                                <form className="auth-modal__form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="auth-modal__field">
                                        <label>Email khôi phục</label>
                                        <input type="email" placeholder="Nhập email đăng ký" required />
                                    </div>

                                    <button type="submit" className="auth-modal__submit">
                                        Gửi mã xác minh
                                    </button>
                                </form>

                                <p className="auth-modal__footer">
                                    Quay lại{' '}
                                    <button
                                        type="button"
                                        className="auth-modal__link-btn auth-modal__link-btn--bold"
                                        onClick={() => setAuthMode('login')}
                                    >
                                        Đăng nhập
                                    </button>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
