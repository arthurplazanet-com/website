import { type InjectionKey, inject, provide } from 'vue'

/**
 * Used for provide/inject pattern in Vue - https://vuejs.org/guide/components/provide-inject
 * See
 * - apps/admin-frontend/src/components/providers/CategoryProvider.vue
 * - apps/admin-frontend/src/composables/category-context.ts
 *
 * createContext<T>() returns a pair of helpers:
 * - `provideContext(ctx: T)`: calls `provide(KEY, ctx)`
 * - `useContext(): T`: calls `inject(KEY)` and guards
 */
export function createContext<T>(key?: InjectionKey<T>) {
  const KEY = key || Symbol()

  function provideContext(ctx: T) {
    provide(KEY, ctx)
  }

  function useContext(): T {
    const ctx = inject<T>(KEY)
    if (!ctx) {
      throw new Error('useContext must be called within its Provider')
    }
    return ctx
  }

  return { provideContext, useContext }
}
