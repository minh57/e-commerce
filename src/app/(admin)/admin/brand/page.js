'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import CrudTable from '@/app/components/CrudTable'

const title = 'thương hiệu';
const tableName = 'brands';
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
      field: 'slug',
      label: 'Slug',
      type:'text'
  }
]
const listCol = columns.map((item) => item.field).join(",")
const initialForm = columns.reduce((acc,item) => {
  acc[item.field] = '';
  return acc;
}, {});

const Brands = () => {
    const [dataResult, setDataResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const {data,error} = await supabase
                .from(tableName)
                .select(listCol);
            if(error) throw error;
            setDataResult(data || []);
        }
        catch (error) {
            console.error('Lỗi lấy data từ Supabase:', error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

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
                    loading={loading} open={open} dataResult={dataResult} handleEdit={handleEdit} handleDelete={handleDelete} />
    );
}

export default Brands;   