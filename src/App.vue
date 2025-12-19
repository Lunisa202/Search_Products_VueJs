<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import CardProduct from "./components/CardProduct.vue";
import { ProductService, type Product } from "./service/Service";
import SearchInput from "./components/SearchInput.vue";

const productsList = ref<Product[]>([]);
const searchResults = ref<Product[]>([]);
const lastSearchTerm = ref<string>("");
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const searchInputRef = ref<InstanceType<typeof SearchInput> | null>(null);

onMounted(async () => {
  try {
    isLoading.value = true;
    productsList.value = await ProductService.getAllProducts();
    console.log("Productos cargados:", productsList.value.length);
  } catch (err) {
    console.error("Error cargando productos:", err);
    error.value = "Error al cargar productos";
  } finally {
    isLoading.value = false;
  }
});

const handleProductSearch = async (searchTerm: string): Promise<void> => {
  lastSearchTerm.value = searchTerm;
  error.value = null;
  isLoading.value = true;

  try {
    const results = await ProductService.searchProducts(searchTerm);
    searchResults.value = results;
    console.log("Resultados de búsqueda:", results.length);
  } catch (err) {
    console.error("Error en búsqueda:", err);
    error.value = "Error al buscar productos";
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Manejador de limpieza
const handleClearSearch = (): void => {
  searchResults.value = [];
  lastSearchTerm.value = "";
  error.value = null;
};

const displayedProducts = computed((): Product[] => {
  if (searchResults.value.length > 0) {
    return searchResults.value;
  }
  // Si hay término de búsqueda pero NO resultados → array vacío
  if (lastSearchTerm.value) {
    return [];
  }
  // Caso por defecto: mostrar todos los productos
  return productsList.value;
});

const showNoResults = computed((): boolean => {
  return lastSearchTerm.value !== "" && searchResults.value.length === 0;
});

const hasSearchResults = computed((): boolean => {
  return searchResults.value.length > 0;
});

const showAllProducts = computed((): boolean => {
  return lastSearchTerm.value === "" && productsList.value.length > 0;
});
</script>

<template>
  <div class="container">
    <SearchInput
      ref="searchInputRef"
      placeholder="Ej: Laptop, Camisa, Teléfono..."
      @search="handleProductSearch"
      @clear="handleClearSearch"
    />

    <!-- Estado de carga -->
    <div v-if="isLoading" class="loading">
      <p>Buscando productos...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <section v-else class="results-section">
      <!-- Título solo si hay resultados -->
      <h2 v-if="hasSearchResults">Resultados ({{ searchResults.length }})</h2>

      <!-- Resultados de búsqueda -->
      <div v-if="hasSearchResults" class="products">
        <CardProduct
          v-for="product in searchResults"
          :title="product.title"
          :price="product.price"
          :description="product.description"
          :category="product.category"
          :image="product.images[0]"
          :stock="10"
          :key="product.id"
        />
      </div>

      <!-- Sin resultados -->
      <div v-else-if="showNoResults" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No se encontraron productos para "{{ lastSearchTerm }}"</h3>
        <p>Intenta con otras palabras o verifica la ortografía.</p>
      </div>

      <!-- Todos los productos (cuando no hay búsqueda) -->
      <div v-else-if="showAllProducts" class="products">
        <CardProduct
          v-for="product in productsList"
          :title="product.title"
          :price="product.price"
          :description="product.description"
          :category="product.category"
          :image="product.images[0]"
          :brand="product.brand"
          :stock="10"
          :key="product.id"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.products {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
}
.results-section {
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
}
.no-results {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 40px;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.no-results h3 {
  color: var(--color-border);
  margin-bottom: 10px;
}

.no-results p {
  color: var(--color-secondary);
}

.loading {
  text-align: center;
  padding: 1.25rem;
  color: #64748b;
}

.error {
  text-align: center;
  padding: 1.25rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: var(--);
  margin: 20px 0;
}
@media (min-width: 768px) {
  .products {
    width: 90%;
    flex-direction: row;
    column-gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  
}
</style>
