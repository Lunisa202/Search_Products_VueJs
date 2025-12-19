<template>
  <article class="product-card">
    <header class="product-card__header">
      <h2 class="product-card__title">{{ title }}</h2>
      <p>Precio: ${{ price }}</p>
    </header>
    <div class="product-card__body">
      <img class="product-card__img" :src="image" :alt="title" />
      <div class="product-card__data">
        <p class="product-card__description">{{ description }}</p>

        <p class="product-card__category">Category: {{ category }}</p>
      </div>
    </div>
    <footer class="product-card__footer">
      <p v-if="stock > 0">In Stock: {{ stock }}</p>
      <p v-else>Out of Stock</p>
      <p>Brand:{{ brand }}</p>
    </footer>
  </article>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  brand: string;
}>();
</script>
<style scoped>
.product-card {
  width: 80%;
  border: 1px solid var(--color-border);
  border-radius: 2rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.product-card__header {
  font-size: 1rem;
  background-color: var(--color-primary);
  overflow: hidden;
  color: var(--color-text-secondary);
  border-radius: 2rem 2rem 0 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}
.product-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.product-card__title {
    flex:2;
  font-size: 1rem;
  font-weight: bold;
}
.product-card__data {
  font-family: var(--font-secondary);
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
}
.product-card__description {
  min-height: 6.25rem;
  max-height: 12.5rem;
  overflow: hidden; 
  line-height: 1.5; 
  text-overflow: ellipsis;
}
.product-card__data p {
  flex: 1;
  text-align: center;
}
.product-card__category {
  font-style: italic;
  color: var(--color-secondary);
}
.product-card__footer {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  background-color: var(--color-accent);
  border-radius: 0 0 2rem 2rem;
  text-align: center;
  padding: 1rem;
}
.product-card__footer p {
  flex: 1;
}
.product-card__img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 1rem;
}
@media (min-width: 768px) {
  .product-card {
    max-width: 40%;
  }
  .product-card__body {
    flex-direction: row;
    column-gap: 1rem;
  }
  .product-card__data {
    row-gap: 1rem;
  }
  .product-card__img {
    width: 50%;
    max-height: 300px;
  }
  .product-card__description {
  min-height: 12.5rem;
  max-height: 20rem;
  overflow: hidden; 
  line-height: 1.5; 
  text-overflow: ellipsis;
}
}
</style>
