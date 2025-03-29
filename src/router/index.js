import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
    },
    {
      path: '/admin',
      name: 'admin', // Agrega esta propiedad
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'productos',  // Ahora es '/admin/productos'
          name: 'productos',
          component: () => import('../views/admin/ProductsView.vue'),
        },
        {
          path: 'nuevo-producto',  // Ahora es '/admin/nuevo-producto'
          name: 'nuevo-producto',
          component: () => import('../views/admin/NewProductView.vue'),
        },
        {
          path: 'ventas',     // Ahora es '/admin/ventas'
          name: 'ventas',
          component: () => import('../views/admin/SalesView.vue'),
        },

        {
          path: 'editar-producto/:id',  // Ahora es '/admin/editar-producto/:id'
          name: 'editar-producto',
          component: () => import('../views/admin/EditProductView.vue'),
        },
        {
          path: 'productos/seeder',
          name: 'seeder-products',
          component: () => import('../views/admin/SeederView.vue'),
        }
        // Otras rutas hijas...
      ]
    }
  ],
})

export default router