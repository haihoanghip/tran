import React, { useState } from 'react';
import './home.css';

const CATEGORIES = [
    { id: 1, name: 'Áo Nam & Sơ Mi', count: '120+ Sản phẩm', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Đầm & Thời Trang Nữ', count: '250+ Sản phẩm', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Phụ Kiện Tinh Tế', count: '80+ Sản phẩm', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800' },
];

const PRODUCTS = [
    { id: 1, name: 'Áo Blazer Minimalist Tailored', price: '1.450.000đ', originalPrice: '1.800.000đ', category: 'Áo khoác', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600', tag: 'BESTSELLER' },
    { id: 2, name: 'Áo Sơ Mi Silk Oversized', price: '890.000đ', originalPrice: '', category: 'Sơ mi', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=600', tag: 'NEW' },
    { id: 3, name: 'Quần Trousers Form Rộng', price: '950.000đ', originalPrice: '', category: 'Quần dài', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600', tag: '' },
    { id: 4, name: 'Túi Xách Leather Minimal', price: '1.800.000đ', originalPrice: '2.100.000đ', category: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600', tag: 'SALE 15%' },
];

const REVIEWS = [
    { id: 1, name: 'Chị Hà My', role: 'Khách hàng thân thiết', text: 'Chất vải cao cấp, đường may tỉ mỉ. Phom dáng mặc lên cực kỳ tôn dáng!', rating: 5 },
    { id: 2, name: 'Anh Minh Trí', role: 'Verified Buyer', text: 'Giao hàng nhanh, đóng gói sang trọng như quà tặng. Sẽ tiếp tục ủng hộ AURA.', rating: 5 },
];

export default function Home({ onRequireLogin }) {
    const handleClick = (e) => {
        e.preventDefault();
        if (onRequireLogin) onRequireLogin();
    };

    return (
        <div className="home" onClick={handleClick}>
            {/* 1. HERO SECTION BANNER */}
            <section className="hero">
                <div className="hero__background">
                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920" alt="AURA 2026" />
                    <div className="hero__overlay"></div>
                </div>

                <div className="hero__content">
                    <span className="hero__badge">SPRING / SUMMER 2026</span>
                    <h1 className="hero__title">ĐỊNH HÌNH PHONG CÁCH TỐI GIẢN</h1>
                    <p className="hero__subtitle">
                        Khám phá những thiết kế tinh tế, tôn vinh khí chất hiện đại của riêng bạn.
                    </p>
                    <div className="hero__actions">
                        <button className="btn btn--primary">Khám Phá Bộ Sưu Tập</button>
                        <button className="btn btn--outline">Xem Lookbook</button>
                    </div>
                </div>
            </section>

            {/* 2. VALUE PROPOSITIONS (GIÁ TRỊ THƯƠNG HIỆU) */}
            <section className="features-bar">
                <div className="features-bar__container">
                    <div className="feature-item">
                        <div className="feature-item__icon">⚡</div>
                        <div>
                            <h4>Giao Hàng Hỏa Tốc</h4>
                            <p>Miễn phí cho đơn từ 1.000.000đ</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item__icon">🔄</div>
                        <div>
                            <h4>Đổi Trả Dễ Dàng</h4>
                            <p>Hỗ trợ đổi size trong 30 ngày</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item__icon">💎</div>
                        <div>
                            <h4>Cam Kết Chính Hãng</h4>
                            <p>Chất liệu thiết kế độc quyền</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CATEGORIES SECTION */}
            <section className="section categories">
                <div className="section__header">
                    <div>
                        <h2 className="section__title">Danh Mục Nổi Bật</h2>
                        <p className="section__subtitle">Lựa chọn phong cách phù hợp với cá tính của bạn</p>
                    </div>
                    <button className="section__more-btn">Xem tất cả &rarr;</button>
                </div>

                <div className="categories__grid">
                    {CATEGORIES.map((item) => (
                        <div key={item.id} className="category-card">
                            <div className="category-card__image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="category-card__info">
                                <h3>{item.name}</h3>
                                <span>{item.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. PRODUCTS GRID SECTION */}
            <section className="section products">
                <div className="section__header">
                    <div>
                        <h2 className="section__title">Sản Phẩm Mới Nhất</h2>
                        <p className="section__subtitle">Những xu hướng vừa cập bến trong mùa này</p>
                    </div>
                </div>

                <div className="products__grid">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-card__image">
                                <img src={product.image} alt={product.name} />
                                {product.tag && <span className="product-card__badge">{product.tag}</span>}
                                <button className="product-card__wishlist">♥</button>
                                <button className="product-card__quick-add">+ Thêm vào giỏ hàng</button>
                            </div>

                            <div className="product-card__info">
                                <span className="product-card__category">{product.category}</span>
                                <h3 className="product-card__name">{product.name}</h3>
                                <div className="product-card__price-box">
                                    <span className="product-card__price">{product.price}</span>
                                    {product.originalPrice && <span className="product-card__old-price">{product.originalPrice}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. TESTIMONIALS (ĐÁNH GIÁ KHÁCH HÀNG) */}
            <section className="section reviews">
                <h2 className="section__title text-center">Khách Hàng Nói Về AURA</h2>
                <div className="reviews__grid">
                    {REVIEWS.map((rev) => (
                        <div key={rev.id} className="review-card">
                            <div className="review-card__stars">{"★".repeat(rev.rating)}</div>
                            <p className="review-card__text">"{rev.text}"</p>
                            <div className="review-card__author">
                                <strong>{rev.name}</strong>
                                <span>{rev.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. PROMO NEWSLETTER */}
            <section className="promo-banner">
                <div className="promo-banner__container">
                    <span className="promo-banner__tag">ĐẶC QUYỀN THÀNH VIÊN</span>
                    <h2>NHẬN NGAY VOUCHER GIẢM 15%</h2>
                    <p>Đăng ký trải nghiệm dịch vụ thời trang cá nhân hóa từ AURA ngay hôm nay.</p>
                    <button className="btn btn--accent">Đăng Nhập / Đăng Ký Ngay</button>
                </div>
            </section>
        </div>
    );
}
