'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Gọi file supabase client bằng Import Alias chuẩn chỉ @/*
import { supabase } from '@/utils/supabase'; 

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API trực tiếp từ Supabase
  const fetchProducts = async () => {
    try {
      //setLoading(true);
      // Kỹ thuật Joins bảng đỉnh cao của Supabase: Lấy sản phẩm, thông tin Brand, và mảng các Biến thể đi kèm
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          slug,
          brands ( name ),
          product_variants ( id )
        `);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Lỗi lấy data từ Supabase:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Danh sách Sản phẩm gốc
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="success">
          Thêm sản phẩm mới
        </Button>
      </Stack>

      {loading ? (
        <Stack sx={{ alignItems: 'center', py: 5 }}><CircularProgress /></Stack>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table aria-label="database table">
            <TableHead sx={{ backgroundColor: '#eeeeee' }}>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Tên Sản phẩm</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Thương hiệu (Brand)</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Số biến thể</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Chưa có sản phẩm nào trong database.</TableCell>
                </TableRow>
              ) : (
                products.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell sx={{ fontWeight: '500' }}>{row.name}</TableCell>
                    {/* Lấy trường dữ liệu đã được tự động JOIN từ bảng brands */}
                    <TableCell>{row.brands?.name || 'Không có'}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={`${row.product_variants?.length || 0} biến thể`} 
                        color="secondary" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack sx={{ flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
                        <Button size="small" variant="outlined" startIcon={<EditIcon />} color="info">Sửa</Button>
                        <Button size="small" variant="outlined" startIcon={<DeleteIcon />} color="error">Xóa</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}