# 🛍️ Buscador de Productos - Vue.js 3

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Una aplicación moderna y elegante para buscar productos, construida con Vue.js 3 y TypeScript. Esta aplicación consume la API de DummyJSON para mostrar productos y permite buscar en tiempo real con un diseño atractivo y responsivo.

## ✨ Características Destacadas

- 🎨 **Diseño modular CSS** con variables, reset y utilidades
- 📱 **Completamente responsivo**
- ⚡ **Rendimiento optimizado** con Composition API de Vue 3
- 🔒 **Tipado seguro** con TypeScript
- 🌈 **Animaciones suaves** con transiciones CSS
- ⏳ **Indicador de carga** atractivo durante búsquedas
- 📦 **Arquitectura limpia** con separación de responsabilidades

## 📁 Estructura del Proyecto

```
Search_Products_VueJs/
├── src/
│   ├── assets/                 # Recursos estáticos
│   │   └── vue.svg            # Logo de Vue.js
│   ├── components/            # Componentes Vue reutilizables
│   │   ├── CardProduct.vue    # Tarjeta individual de producto
│   │   └── SearchInput.vue    # Componente de búsqueda 
│   ├── service/               # Servicios y lógica de negocio
│   │   └── Service.ts         # Servicio para llamadas API 
│   ├── styles/               # Estilos CSS organizados
│   │   ├── reset.css         # Reset CSS para consistencia cross-browser
│   │   ├── utilities.css     # Clases de utilidad CSS
│   │   └── variables.css     # Variables CSS personalizadas
│   ├── App.vue               # Componente raíz de la aplicación
│   ├── main.ts              # Punto de entrada de la aplicación
│   └── style.css            # Estilos principales de la aplicación
├── public/                   # Archivos públicos
├── index.html               # Plantilla HTML principal
├── package.json             # Dependencias y scripts
├── pnpm-lock.yaml          # Lock file de PNPM
├── tsconfig.json           # Configuración principal de TypeScript
├── tsconfig.app.json       # Configuración TypeScript para la aplicación
├── tsconfig.node.json      # Configuración TypeScript para Node
├── vite.config.ts          # Configuración de Vite
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos

- **Node.js** (versión 18 o superior recomendada)
- **PNPM** instalado globalmente

### Instalación y Ejecución

1. **Clonar el repositorio**
```bash
git clone https://github.com/Lunisa202/Search_Products_VueJs.git
cd Search_Products_VueJs
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Ejecutar en modo desarrollo**
```bash
pnpm dev
```

4. **Abrir en el navegador**
   - Navega a `http://localhost:5173`

5. **Construir para producción**
```bash
pnpm build
```

6. **Previsualizar construcción**
```bash
pnpm preview
```

## 🏗️ Arquitectura del Proyecto

### Componentes
- **`CardProduct.vue`**: Componente para mostrar cada producto con imagen, título, precio y descripción
- **`SearchInput.vue`**: Campo de búsqueda 

### Servicios
- **`Service.ts`**: Servicio centralizado para manejar todas las llamadas a la API usando fetch

### Estilos CSS
- **`reset.css`**: Normaliza estilos entre diferentes navegadores
- **`variables.css`**: Variables CSS personalizadas (colores, bordes y otros)
- **`utilities.css`**: Clases utilitarias 
- **`style.css`**: Estilos principales de la aplicación

## 🔧 Funcionalidades Técnicas

### Sistema de Búsqueda
- Búsqueda en tiempo real 
- Manejo de estados: loading, error, éxito

### Gestión de API
- Servicio centralizado con Fetch
- Tipado completo de respuestas con TypeScript
- Manejo de errores con try/catch

### Estilos y Diseño
- CSS modular con metodología BEM
- Variables CSS para fácil personalización
- Diseño responsivo con breakpoints móviles primero

## 📊 API de Productos

La aplicación consume la API de [DummyJSON Products](https://dummyjson.com/docs/products):

### Endpoints principales:
- `GET /products` - Obtener todos los productos
- `GET /products/search?q={query}` - Buscar productos por término

### Ejemplo de implementación en Service.ts:
```typescript
 
export interface Product {
  id: number
  title: string
  description: string
  price: number
  stock: number
  brand: string
  category: string
  images: string[]
}
export interface ApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const baseUrl = 'https://dummyjson.com/products';

export const ProductService= {

  // Obtener todos los productos
  async getAllProducts(limit: number = 30, skip: number = 0): Promise<Product[]> {
    try {
      const response = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`)
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
      
      const data: ApiResponse = await response.json()
      return data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Buscar productos por término de búsqueda
  async searchProducts(searchTerm: string, limit: number = 30): Promise<Product[]> {
    try {
      if (!searchTerm.trim()) {
        return this.getAllProducts(limit)
      }

      const response = await fetch(`${baseUrl}/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`)
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
      
      const data: ApiResponse = await response.json()
      return data.products
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  }
 
}
```

## 🎨 Sistema de Estilos

### Variables CSS Personalizadas
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

:root {
    font-size: 16px;
  --font-primary: 'Roboto', sans-serif;
  --font-secondary: 'Outfit', sans-serif;

  --color-primary: #4A90E2;
  --color-secondary: #48667f;
  --color-accent: #F5A623;
  --color-background: #F0F2F5;
  --color-border: #926f6f;
  --color-text: #333333;
  --color-text-secondary: #f4f0f0;

  --spacing-xs: .25rem;
  --spacing-sm: .5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --border-radius-sm: .5rem;
  --border-radius-md: 1rem;
  --border-radius-lg: 2rem;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

### Clases Utilitarias
```css
/* utilities.css */
.container{
    max-width: 1200px;
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-md);
}
```

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🧪 Scripts Disponibles

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
...
}
```


## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 🌟 Herramientas aplicadas

- [Vue.js](https://vuejs.org) - Framework JavaScript progresivo
- [Vite](https://vitejs.dev) - Herramienta de construcción frontend
- [DummyJSON](https://dummyjson.com) - API REST gratuita para testing
- [PNPM](https://pnpm.io) - Gestor de paquetes rápido y eficiente

---

<div align="center">
  <h3>✨ Desarrollado con Vue.js 3 + TypeScript + Vite ✨</h3>
  
  <p>
    <a href="https://github.com/Lunisa202/Search_Products_VueJs">
      <img src="https://img.shields.io/github/stars/Lunisa202/Search_Products_VueJs?style=for-the-badge&logo=github" alt="GitHub stars">
    </a>
    <a href="https://vuejs.org/">
      <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue.js">
    </a>
  </p>
  
  <p><sub>Si te gusta este proyecto, ¡dale una estrella ⭐ en GitHub!</sub></p>
</div>
```
