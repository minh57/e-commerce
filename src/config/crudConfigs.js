export const crudConfigs = {
    // Quản lý màu sắc: /admin/colors
    colors: {
        title: 'Quản lý Màu Sắc',
        tableName: 'colors',
        columns: [
            {
                field: 'id',
                label: 'ID',
                type: 'text'
            },
            {
                field: 'name',
                label: 'Tên màu sắc',
                type:'text'
            },
            {
                field: 'code',
                label: 'Mã',
                type:'color'
            }
        ]
    },
    // Quản lý kích cỡ
    sizes: {
        title: 'Quản lý Kích cỡ',
        tableName: 'sizes',
        columns: [
            {
                field: 'id',
                label: 'ID',
                type: 'text'
            },
            {
                field: 'name',
                label: 'Tên kích cỡ',
                type:'text'
            },
            {
                field: 'code',
                label: 'Mã',
                type:'text'
            }
        ]
    },
    // Quản lý thương hiệu
    brands: {
        title: 'Quản lý thương hiệu',
        tableName: 'brands',
        columns: [
            {
                field: 'id',
                label: 'ID',
                type: 'text'
            },
            {
                field: 'name',
                label: 'Tên thương hiệu',
                type:'text'
            },
            {
                field: 'slug',
                label: 'slug',
                type:'text'
            }
        ]
    }

}