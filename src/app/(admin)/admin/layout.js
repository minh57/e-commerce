'use client';
import React from 'react';
import { Button, Box, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import Link  from 'next/link';
import {usePathname} from 'next/navigation';

const drawerWidth = 240;
const MenuItem = [
    {
      text: "Tổng quan",
      icon: <CategoryIcon />,
      href: "/admin"
    },
    {
      text: "Quản lý sản phẩm gốc",
      icon: <CategoryIcon />,
      href: "/admin/product"
    },
    {
      text: "Quản lý biến thể sản phẩm",
      icon: <CategoryIcon />,
      href: "/admin/product_variant"
    },
    {
      type: "divider"
    },
    {
      text: "Kích cỡ",
      icon: <CategoryIcon />,
      href: "/admin/size"
    },
    {
      text: "Màu sắc",
      icon: <CategoryIcon />,
      href: "/admin/color"
    },
    {
      text: "Thương hiệu",
      icon: <CategoryIcon />,
      href: "/admin/brand"
    },
    {
      text: "Danh mục sản phẩm",
      icon: <CategoryIcon />,
      href: "/admin/category"
    },
    {
      text: "Phân loại sản phẩm",
      icon: <CategoryIcon />,
      href: "/admin/product_category"
    },

  ]
export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Topbar của Admin */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Hệ thống Quản trị CMS
          </Typography>
          <Button component={Link} href="/" startIcon={<HomeIcon />} color="inherit">
            Xem Trang Chủ
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar bên trái */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {
              MenuItem.map(
                (item,i) => {
                  if(item.type === 'divider'){
                    return (
                      <Divider key={'divider'+i}/>
                    )
                  }
                  const isActive = pathname === item.href;

                    return(
                      <ListItem key={i} disablePadding>
                        <ListItemButton selected={isActive} component={Link} href={item.href}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>                      
                    )     }             
              )
            
            }
          </List>
        </Box>
      </Drawer>

      {/* Phần ruột chứa nội dung bảng CSDL */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}