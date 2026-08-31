import { inject, provide, type InjectionKey, type Ref } from 'vue'
import type { Experience, Project } from '../../types'

export { createDefaultContext, providePortfolioContentContext, usePortfolioContentContext }

export interface PortfolioContentInterface {
  projects?: Project[]
  experiences?: Experience[]
}

export type PortfolioContentContext = PortfolioContentInterface

export const portfolioContentKey: InjectionKey<PortfolioContentInterface> =
  Symbol('portfolioContent')

function createDefaultContext(): PortfolioContentContext {
  return {
    projects: [],
    experiences: [],
  }
}

function providePortfolioContentContext(context: Ref<PortfolioContentContext>) {
  console.log('📟 - context → ', context)
  provide(portfolioContentKey, context.value)
}

function usePortfolioContentContext(): PortfolioContentContext {
  const context = inject<PortfolioContentContext>(portfolioContentKey)
  console.log('📟 - context → ', context)
  console.log('📟 - context → ', context)
  if (!context) {
    return createDefaultContext()
    throw new Error('usePortfolioContentContext must be used within a provider')
  }
  return context
}
