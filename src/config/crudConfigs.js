export const crudConfigs = {
    // Quản lý màu sắc: /admin/colors
    colors: {
        title: 'Quản lý Màu Sắc',
        tableName: 'colors',
        primaryKey: 'id',
        orderBy:[
            {column:'id',ascending:true}
        ],
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
        primaryKey:'id',
        orderBy: [
            {column: 'id',ascending:true}
        ],
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
        primaryKey: 'id',
        orderBy: [
            {column:'id',ascending: true}
        ],
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
    },
    // Quản lý danh mục
    categories: {
        title: 'Quản lý danh mục sản phẩm',
        tableName: 'categories',
        primaryKey:'id',
        orderBy: [
            {column:'id',ascending: true}
        ],
        columns: [
            {
                field: 'id',
                label: 'ID',
                type: 'text'
            },
            {
                field: 'name',
                label: 'Tên danh mục',
                type:'text'
            },
            {
                field: 'slug',
                label: 'slug',
                type:'text'
            }
        ]
    },
    // Quản lý phân loại sản phẩm
    product_categories: {
        title: 'Quản lý phân loại sản phẩm',
        tableName: 'product_categories',
        primaryKey: ['product_id','category_id'],
        orderBy: [
            {column: 'product_id',ascending: true},
            {column: 'category_id',ascending: true}
        ],
        columns: [
            {
                field: 'product_id',
                label: 'ID sản phẩm',
                type: 'select',
                foreignTable: 'products'
            },
            {
                field: 'category_id',
                label: 'ID danh mục',
                type:'select',
                foreignTable: 'categories'
            }
        ]
    },


}