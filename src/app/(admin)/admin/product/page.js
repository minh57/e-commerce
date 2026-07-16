'use client';
import React, { useState, useEffect } from 'react';
import {Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '@/utils/supabase';
const Sizes = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            const {data,error} = await supabase
                .from('products')
                .select(`
                    id,
                    name,
                    description,
                    thumbnail,
                    album,
                    slug,
                    brands(
                        name
                    )
                `);
            if(error) throw error;
            setProducts(data || []);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return(
        <Stack spacing={3}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Danh sách sản phẩm
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} color="success">
                Thêm sản phẩm
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
                            <TableCell style={{ fontWeight: 'bold' }}>Tên</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Miêu tả sản phẩm</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Thumbnail</TableCell>                            
                            <TableCell style={{ fontWeight: 'bold' }}>Album</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Slug</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Thương hiệu</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Chưa có thương hiệu trong database</TableCell>
                            </TableRow>
                          ) : (
                            products.map((row) => (
                              <TableRow key={row.id} hover>

                                <TableCell>{row.id}</TableCell>

                                <TableCell sx={{ fontWeight: '500' }}>{row.name}</TableCell>

                                <TableCell>{row.description}</TableCell>

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

                                <TableCell>{row.album}</TableCell>

                                <TableCell>{row.slug}</TableCell>

                                <TableCell>{row.brands?.name}</TableCell>

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