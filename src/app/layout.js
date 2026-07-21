import React from 'react';

export const metadata = {
  title: 'Variant E-Commerce Shop',
  description: 'Hệ thống bán hàng và quản lý biến thể sản phẩm',
};

export default function RootLayout({ children }) {
  return (
    // hết ngày thêm lại lang vi
    <html >
      <body>
        {/* Tất cả các trang con và layout con sẽ được bơm vào đây */}
        {children}
      </body>
    </html>
  );
}