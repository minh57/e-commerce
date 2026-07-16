'use client';
import React, { useState, useEffect } from 'react';
import {Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '@/utils/supabase';
const Colors = () => {
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchSizes = async () => {
        try {
            const {data,error} = await supabase
                .from('sizes')
                .select(`
                    id,
                    name,
                    code
                `);
            if(error) throw error;
            setSizes(data || []);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchSizes();
    }, []);
    return(
        <Stack spacing={3}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Danh sách Kích cỡ
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
                            <TableCell style={{ fontWeight: 'bold' }}>Tên</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Code</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sizes.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Chưa có kích cỡ trong database</TableCell>
                            </TableRow>
                          ) : (
                            sizes.map((row) => (
                              <TableRow key={row.id} hover>

                                <TableCell>{row.id}</TableCell>

                                <TableCell sx={{ fontWeight: '500' }}>{row.name}</TableCell>

                                <TableCell>{row.code}</TableCell>
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

export default Colors;