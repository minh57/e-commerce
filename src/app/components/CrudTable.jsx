'use client';
import React, { useState, useEffect } from 'react';
import {Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from '@/app/components/Modal';
import TablePagination from '@mui/material/TablePagination';

const renderCell = (row,column,i) =>{
    const cellValue = row[column.field];
    // console.log(column.field + ': ' + cellValue);
    switch (column.type){
      case 'text':
        return <TableCell key={i}>{cellValue}</TableCell>;
        break;
      case 'color':
        return <TableCell key={i}>
            <Box sx={{
                backgroundColor: cellValue,
                width: '30px',
                height: '30px',
                border: '1px solid black'
            }}></Box></TableCell>
        break;
      case 'img':
        return <TableCell key={i}>
                <Box sx={{
                    width: '100px',
                    height:'70px',
                }}>
                    <img style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                    }} src={cellValue} alt={cellValue} />
                </Box>
            </TableCell>
        break;
      default:
        return <TableCell key={i}>{cellValue}</TableCell>; 
    }
}

const CrudTable = ({title,handleAdd,handleClose,columns,formData,handleInputChange,handleSubmit,loading,open,dataResult,handleEdit,handleDelete,page,totalCount,handleChangePage,rowsPerPage,handleChangeRowsPerPage}) =>{
  return(
        <>
        <Stack spacing={3}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Danh sách {title}
                </Typography>
                <Button onClick={() => handleAdd()} variant="contained" startIcon={<AddIcon />} color="success">
                    Thêm {title}
                </Button>
                <CustomModal open={open} handleClose={handleClose} columns={columns} formData={formData}
                            handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
            </Stack>
                  {loading ? (
                    <Stack sx={{ alignItems: 'center', py: 5 }}><CircularProgress /></Stack>
                  ) : (
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                      <Table aria-label="database table">
                        <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                          <TableRow>
                            {
                              columns.map((col,i) => {
                                return (<TableCell key={i} style={{ fontWeight: 'bold' }}>{col.label}</TableCell>)
                              })
                            }
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataResult.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Chưa có {title} trong database</TableCell>
                            </TableRow>
                          ) : (
                            dataResult.map((row) => (
                              <TableRow key={row.id} hover>
                                  {
                                    columns.map((column,i) =>{
                                      return renderCell(row,column,i)
                                    })
                                  }
                                <TableCell align="center">
                                  <Stack sx={{ flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
                                    <Button onClick={() => handleEdit(row)} size="small" variant="outlined" startIcon={<EditIcon />} color="info">Sửa</Button>
                                    <Button onClick={() => handleDelete(row)} size="small" variant="outlined" startIcon={<DeleteIcon />} color="error">Xóa</Button>
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage='Số dòng mỗi trang: '
          />   
        </Stack>
        </>
    );
}

export default CrudTable;
