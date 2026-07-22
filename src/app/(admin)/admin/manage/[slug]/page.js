'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import CrudTable from '@/app/components/CrudTable'

const title = 'màu sắc';
const tableName = 'colors';
const columns = [
  {
      field: 'id',
      label: 'ID',
      type: 'text'
  },
  {
      field: 'name',
      label: 'Tên ' + title,
      type:'text'
  },
  {
      field: 'code',
      label: 'Mã',
      type:'color'
  }
]

const listCol = columns.map((item) => item.field).join(",")
const initialForm = columns.reduce((acc,item) => {
  acc[item.field] = '';
  return acc;
}, {});

const Colors = () => {
    const [dataResult, setDataResult] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  
    const [totalCount,setTotalCount] = useState(0);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const from = page * rowsPerPage;
            const to = from + rowsPerPage - 1;

            const {data,count,error} = await supabase
                .from(tableName)
                .select(listCol, {count: 'exact'})
                .range(from,to)
                .order('id',{ascending: true});
            if(error) throw error;
            setDataResult(data || []);
            if (count !== null) setTotalCount(count);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [page,rowsPerPage]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData,setFormData] = useState(initialForm);

    const updateFormField = (name,value) =>{
      setFormData((prev) => ({
        ...prev,
        [name]:value
      }));
    }

    const handleInputChange = (e) =>{
      const {name,value} = e.target;
      updateFormField(name,value);
    }

    const handleAdd = () =>{
      setFormData(initialForm);
      handleOpen();
    }

    const handleEdit = (row) => {
      setFormData(row);
      handleOpen();
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        let response;
      if(formData.id){
        response = await supabase
          .from(tableName)
          .update(formData)
          .eq('id',formData.id)
          .select();
      }
      else {
        const dataToInsert = { ...formData};
        if(dataToInsert.id === ''){
          delete dataToInsert.id;
        }

        response = await supabase
        .from(tableName)
        .insert([dataToInsert])
        .select();
      }      
      
      const {data,error} = response;
      if(error){
        throw error
      }
      console.log('Success: ',data);
        handleClose(); 
        fetchData();
      } catch (error){
        console.error('Lỗi lấy data từ Supabase:', error.message);
      }
    } 
    
    const handleDelete = async (row) =>{
      try{
        let response = await supabase 
          .from(tableName)
          .delete()
          .eq('id',row.id)
          .select()
              const {data,error} = response;
        if(error){
          throw error
        }
        console.log('Success: ',data);
          handleClose(); 
          fetchData();
      }
    catch (error){
        console.error('Lỗi lấy data từ Supabase:', error.message);
      }
  }

    useEffect(()=>
    {
      console.log(formData);
    },[formData])

    return(
          <CrudTable title={title} handleAdd={handleAdd} handleClose={handleClose} columns={columns} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} 
                    loading={loading} open={open} dataResult={dataResult} handleEdit={handleEdit} handleDelete={handleDelete} 
                    page={page} rowsPerPage={rowsPerPage} totalCount={totalCount} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>
    );
}

export default Colors;   