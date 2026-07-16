'use client';
import React, { useState, useEffect } from 'react';
import {Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '@/utils/supabase';
const Sizes = () => {
    const [productCategory, setProductCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProductCategory = async () => {
        try {
            const {data,error} = await supabase
                .from('product_categories')
                .select(`
                    product_id,
                    category_id,
                    products (
                        name
                    ),
                    categories(
                        name
                    )
                `);
            if(error) throw error;
            setProductCategory(data || []);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProductCategory();
    }, []);
    return(
        <Stack spacing={3}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Phân loại sản phẩm
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} color="success">
                Thêm thương hiệu mới
                </Button>
            </Stack>
                  {loading ? (
                    <Stack sx={{ alignItems: 'center', py: 5 }}><CircularProgress /></Stack>
                  ) : (
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                      <Table aria-label="database table">
                        <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                          <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>ID Sản phẩm</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>ID Danh mục</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productCategory.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Chưa có thương hiệu trong database</TableCell>
                            </TableRow>
                          ) : (
                            productCategory.map((row) => (
                              <TableRow key={row.product_id +''+ row.category_id} hover>

                                <TableCell>{row.products?.name}</TableCell>

                                <TableCell sx={{ fontWeight: '500' }}>{row.categories?.name}</TableCell>

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

export default Sizes;