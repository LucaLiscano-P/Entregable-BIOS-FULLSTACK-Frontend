# BIOS Store - Frontend

Aplicación web de e-commerce moderna desarrollada con React, TypeScript y Tailwind CSS.

## 📋 Descripción

BIOS Store es una plataforma de comercio electrónico completa que permite a los usuarios navegar productos por categorías, ver detalles de productos y realizar compras. Incluye un panel de administración robusto para gestionar productos, categorías y usuarios.

## ✨ Características

### Para Usuarios
- 🏠 **Página Principal**: Banner con productos destacados
- 📦 **Catálogo de Productos**: Visualización de productos con imágenes, precios y descripciones
- 🏷️ **Navegación por Categorías**: Sidebar dinámico para filtrar productos por categoría
- 🔍 **Vista Detallada**: Página individual para cada producto
- 🔐 **Autenticación**: Registro e inicio de sesión de usuarios
- ⚙️ **Configuración de Perfil**: Gestión de información personal y seguridad

### Para Administradores
- 📊 **Dashboard Administrativo**: Panel de control completo
- ➕ **Gestión de Productos**: Crear, editar y eliminar productos
- 🗂️ **Gestión de Categorías**: Administrar categorías de productos
- 👥 **Gestión de Usuarios**: Control de usuarios y roles (admin, superadmin)
- 📄 **Paginación**: Sistema de paginación para manejar grandes volúmenes de datos
- 🖼️ **Carga de Imágenes**: Integración con Cloudinary para gestión de imágenes

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router v7** - Enrutamiento
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **Cloudinary** - Gestión de imágenes
- **Firebase** - Servicios de backend (opcional)

## 📁 Estructura del Proyecto

```
proyecto-BIOS-front/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SideBar.tsx
│   │   ├── SideBarCategory.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostPanel.tsx
│   │   ├── UsersPanel.tsx
│   │   └── ...
│   ├── context/          # Contextos de React
│   │   ├── AuthProvider.tsx
│   │   ├── PostProvider.tsx
│   │   ├── CategoryProvider.tsx
│   │   └── AdminProvider.tsx
│   ├── hooks/            # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── usePost.ts
│   │   ├── useCategory.ts
│   │   └── useAdmin.ts
│   ├── pages/            # Páginas principales
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── PostPage.tsx
│   │   ├── CategoryPage.tsx
│   │   └── ...
│   ├── services/         # Servicios API
│   │   ├── api.client.ts
│   │   ├── auth.service.ts
│   │   ├── post.service.ts
│   │   ├── category.service.ts
│   │   └── admin.service.ts
│   ├── types/            # Tipos TypeScript
│   │   └── api.types.ts
│   ├── utils/            # Utilidades
│   │   └── CloudinaryImage.ts
│   ├── AppRouter.tsx     # Configuración de rutas
│   └── main.tsx          # Punto de entrada
├── public/               # Archivos estáticos
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd proyecto-BIOS-front
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=tu-upload-preset
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📝 Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## 🔐 Roles de Usuario

El sistema implementa tres niveles de acceso:

- **Usuario**: Acceso a catálogo, compras y perfil personal
- **Admin**: Acceso al panel de administración, gestión de productos y categorías
- **Superadmin**: Acceso completo, incluida la gestión de usuarios y roles

## 🌐 Rutas Principales

### Públicas
- `/` - Página principal
- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/categories` - Listado de categorías
- `/categories/:id` - Productos por categoría
- `/post/:id` - Detalle de producto

### Protegidas (Usuario autenticado)
- `/settings` - Configuración de perfil

### Protegidas (Admin/Superadmin)
- `/dashboard` - Panel de administración
- `/dashboard/create-post` - Crear producto
- `/dashboard/edit-post/:id` - Editar producto

## 🎨 Características de Diseño

- **Tema Oscuro**: Interfaz moderna con esquema de colores oscuros
- **Responsive**: Diseño adaptable a dispositivos móviles y desktop
- **Animaciones**: Transiciones suaves y efectos hover
- **Gradientes**: Uso de gradientes purple para elementos destacados
- **Iconografía**: Iconos de Lucide React para mejor UX

## 🔄 Gestión de Estado

La aplicación utiliza el patrón **Context API + Custom Hooks** para gestionar el estado global:

- `AuthContext`: Manejo de autenticación y sesión de usuario
- `PostContext`: Gestión de productos (CRUD completo)
- `CategoryContext`: Gestión de categorías
- `AdminContext`: Funciones administrativas

## 📡 Integración con Backend

La aplicación se conecta a una API REST backend. Los servicios están organizados en:

- **api.client.ts**: Cliente Axios configurado con interceptors
- **auth.service.ts**: Endpoints de autenticación
- **post.service.ts**: Endpoints de productos (CRUD + paginación)
- **category.service.ts**: Endpoints de categorías
- **admin.service.ts**: Endpoints administrativos

### Ejemplo de uso de servicio:
```typescript
// Obtener productos paginados
const response = await PostService.getAll(page, limit, sort);

// Crear un nuevo producto
await PostService.create(productData);

// Actualizar producto
await PostService.update(id, updatedData);
```

## 🖼️ Gestión de Imágenes

Las imágenes se gestionan mediante **Cloudinary**:

```typescript
import { uploadToCloudinary } from './utils/CloudinaryImage';

// Subir imagen
const imageUrl = await uploadToCloudinary(file);
```

## 📦 Características Destacadas

### Paginación
Sistema de paginación implementado en paneles administrativos:
- Botones de navegación (Anterior/Siguiente)
- Números de página clickeables
- Indicador de página actual
- Información de registros mostrados

### Protección de Rutas
- `ProtectedRoute`: Verifica autenticación y roles
- `GuestRoute`: Solo para usuarios no autenticados

### Toast Notifications
Sistema de notificaciones para feedback de acciones del usuario

## 📄 Licencia

Este proyecto es parte de un entregable final para BIOS.

## 👨‍💻 Autor

Desarrollado como proyecto final Frontend BIOS

---

**Nota**: Este proyecto requiere un backend compatible. Asegúrate de tener el servidor backend corriendo en el puerto especificado en las variables de entorno.
