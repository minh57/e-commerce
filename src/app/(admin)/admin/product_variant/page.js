'use client';
import React, { useState, useEffect } from 'react';
import {Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '@/utils/supabase';
const ProductVariant = () => {
    const [productVariant, setProductVariant] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProductVariant = async () => {
        try {
            const {data,error} = await supabase
                .from('product_variants')
                .select(`
                    id,
                    sku,
                    price,
                    stock,
                    thumbnail,
                    products(
                        name
                    ),
                    sizes(
                        name
                    ),
                    colors(
                        name
                    )
                `);
            if(error) throw error;
            setProductVariant(data || []);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProductVariant();
    }, []);
    return(
        <Stack spacing={3}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Quản lý biến thể sản phẩm
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} color="success">
                Thêm biến thể
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
                            <TableCell style={{ fontWeight: 'bold' }}>SKU</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Giá</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Tồn</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Thumbnail</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Tên sản phẩm gốc</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Kích cỡ</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Màu sắc</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productVariant.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Chưa có thương hiệu trong database</TableCell>
                            </TableRow>
                          ) : (
                            productVariant.map((row) => (
                              <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>

                                <TableCell>{row.sku}</TableCell>

                                <TableCell sx={{ fontWeight: '500' }}>{row.price}</TableCell>

                                <TableCell>{row.stock}</TableCell>

                                <TableCell>
                                    <Box sx={{
                                        width: '100px',
                                        height:'70px',
                                    }}>
                                        <img style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%'
                                        }} src={row.thumbnail} alt={row.name} />
                                    </Box>
                                </TableCell>

                                <TableCell>{row.products?.name}</TableCell>

                                <TableCell>{row.sizes?.name}</TableCell>

                                <TableCell>{row.colors?.name}</TableCell>

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

export default ProductVariant;