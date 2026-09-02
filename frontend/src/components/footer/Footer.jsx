import React from 'react';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Cột 1: Thông tin thương hiệu */}
                <div className="footer__col">
                    <a href="/" className="footer__logo">AURA.</a>
                    <p className="footer__desc">
                        Định hình phong cách tối giản với các thiết kế thời trang hiện đại, chú trọng vào chất liệu cao cấp và sự tinh tế.
                    </p>
                </div>

                {/* Cột 2: Điều hướng nhanh */}
                <div className="footer__col">
                    <h4 className="footer__title">Khám Phá</h4>
                    <ul className="footer__links">
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="#categories">Danh mục nổi bật</a></li>
                        <li><a href="#products">Sản phẩm mới</a></li>
                        <li><a href="/about">Về chúng tôi</a></li>
                    </ul>
                </div>

                {/* Cột 3: Trợ giúp & CSKH */}
                <div className="footer__col">
                    <h4 className="footer__title">Hỗ Trợ</h4>
                    <ul className="footer__links">
                        <li><a href="#">Hướng dẫn chọn size</a></li>
                        <li><a href="#">Chính sách đổi trả</a></li>
                        <li><a href="#">Chính sách giao hàng</a></li>
                        <li><a href="#">Bảo mật thông tin</a></li>
                    </ul>
                </div>

                {/* Cột 4: Đăng ký nhận tin */}
                <div className="footer__col">
                    <h4 className="footer__title">Đăng Ký Nhận Tin</h4>
                    <p className="footer__newsletter-desc">
                        Nhận ưu đãi 10% cho đơn hàng đầu tiên và thông tin ưu đãi sớm nhất.
                    </p>
                    <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Nhập email của bạn..."
                            className="footer__input"
                            required
                        />
                        <button type="submit" className="footer__btn">Gửi</button>
                    </form>
                </div>
            </div>

            {/* Dòng Copyright dưới cùng */}
            <div className="footer__bottom">
                <div className="footer__bottom-container">
                    <p>© 2026 AURA Fashion. All rights reserved.</p>
                    <div className="footer__socials">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">TikTok</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
