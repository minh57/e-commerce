'use client';
import React, { useState, useEffect } from 'react';
import {Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '@/utils/supabase';
const Sizes = () => {
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchColors = async () => {
        try {
            const {data,error} = await supabase
                .from('colors')
                .select(`
                    id,
                    name,
                    code
                `);
            if(error) throw error;
            setColors(data || []);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchColors();
    }, []);
    return(
        <Stack spacing={3}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Danh sách Màu sắc sản phẩm
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} color="success">
                Thêm màu mới
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
                            <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {colors.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Chưa có kích cỡ trong database</TableCell>
                            </TableRow>
                          ) : (
                            colors.map((row) => (
                              <TableRow key={row.id} hover>

                                <TableCell>{row.id}</TableCell>

                                <TableCell sx={{ fontWeight: '500' }}>{row.name}</TableCell>

                                <TableCell>
                                    <Box sx={{
                                        backgroundColor: row.code,
                                        width: '30px',
                                        height: '30px',
                                        border: '1px solid black'
                                    }}>

                                    </Box>    
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

export default Sizes;