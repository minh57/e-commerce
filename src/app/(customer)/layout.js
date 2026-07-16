'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

export default function CustomerLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header/Navbar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>⚡ VARIANT SHOP</Link>
          </Typography>
          <Button startIcon={<ShoppingCartIcon />} color="inherit">Giỏ hàng</Button>
          <Button component={Link} href="/admin" color="primary" variant="outlined" sx={{ ml: 2 }}>
            Vào CMS
          </Button>
        </Toolbar>
      </AppBar>

      {/* Nội dung trang */}
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
}