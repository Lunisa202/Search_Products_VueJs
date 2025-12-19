<template>
  <div class="search">
    <div class="search__box">
      <div class="search__input-container">
        <div class="search__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        
        <input
          v-model="searchText"
          type="text"
          :placeholder="placeholder"
          class="search__input"
          @keyup.enter="handleSearch"
          ref="inputRef"
        />
      </div>
      
      <button
        @click="handleSearch"
        class="search__btn"
        :disabled="isSearching || searchText.length === 0"
        type="button"
        aria-label="Buscar productos"
      >
        <span v-if="!isSearching" class="search__btn-text">Buscar</span>
        <span v-else class="search__loading">Buscando...</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, withDefaults } from 'vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar producto...'
})

const emit = defineEmits<{
  search: [searchTerm: string]
}>()

const searchText = ref<string>('')
const isSearching = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null)

const handleSearch = (): void => {
  const trimmedText = searchText.value.trim()
  
  if (trimmedText.length === 0) {
    return
  }

  isSearching.value = true
  emit('search', trimmedText)
  
  setTimeout(() => {
    isSearching.value = false
  }, 500)
}

const focus = (): void => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

defineExpose({
  focus
})
</script>

<style scoped>
.search {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search__box {
  display: flex;
  gap: 12px;
  width: 100%;
}

@media (max-width: 640px) {
  .search__box {
    flex-direction: column;
    gap: 8px;
  }
}

.search__input-container {
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 12px;
  transition: all 0.3s ease;
  position: relative;
}

.search__input-container:focus-within {
  border-color: #3b82f6;
  box-shadow: var(--shadow-lg);
}

.search__icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  color: #94a3b8;
}

.search__input {
  flex: 1;
  padding: 12px 0;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: #1e293b;
  width: 100%;
}

.search__input::placeholder {
  color: #94a3b8;
  font-size: 1rem;
}

.search__btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 6.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search__btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.search__btn:active:not(:disabled) {
  transform: translateY(0);
}

.search__btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  opacity: 0.7;
}

.search__btn-text {
  display: inline-block;
}

.search__loading {
  display: flex;
  align-items: center;
  gap: 4px;
}

.search__loading::after {
  content: '';
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: search__spin 1s linear infinite;
}

@keyframes search__spin {
  to { transform: rotate(360deg); }
}



.search__btn--loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: search__spin 1s linear infinite;
}

@media (max-width: 640px) {
  .search__btn {
    width: 100%;
    padding: 14px;
  }
  
  .search__input-container {
    padding: 0 10px;
  }
  
  .search__input {
    padding: 14px 0;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .search__box {
    gap: 10px;
  }
  
  .search__btn {
    padding: 12px 20px;
    min-width: 90px;
  }
}


</style>