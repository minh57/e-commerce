'use client';
import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

const mockProducts = [
  { id: 1, name: 'Giày Sneaker MWC 5881', price: '350,000đ', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { id: 2, name: 'Áo Polo Nam Premium', price: '220,000đ', img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500' },
];

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Sản phẩm mới nhất
      </Typography>
      
      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          /* Mẹo ở đây: Thay vì viết <Grid item xs={12}>, ta chỉ cần truyền thẳng kích thước cột. 
             React 19 sẽ hiểu đây là thuộc tính Grid và không ném lỗi attribute nữa */
          <Grid key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', m: 1 }}>
              <CardMedia component="img" image={product.img} alt={product.name} sx={{ height: 260 }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: '600' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="error" sx={{ fontWeight: 'bold' }}>
                  {product.price}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" color="primary">Xem chi tiết</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}