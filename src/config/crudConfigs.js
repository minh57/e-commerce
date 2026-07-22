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
                label: 'Tên ' + title,
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
                label: 'Tên ' + title,
                type:'text'
            },
            {
                field: 'code',
                label: 'Mã',
                type:'text'
            }
        ]
    },

}