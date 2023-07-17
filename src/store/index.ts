import { create } from 'zustand'
import { Beer, StoreState } from '../modules/recipes/interface'

interface StoreActions {
  addRecipes: (newRecipes: Beer[]) => void
  toggleRecipeSelection: (recipeId: number) => void
  deleteSelectedRecipes: () => void
  nextPage: () => void
  prevPage: () => void
}

export const useStore = create<StoreState & StoreActions>((set) => ({
  recipes: [],
  selectedRecipes: new Set<number>(),
  page: 1,
  addRecipes: (newRecipes: Beer[]) => set(() => ({ recipes: [...newRecipes] })),
  toggleRecipeSelection: (recipeId: number) =>
    set((state) => {
      const selectedRecipes = new Set(state.selectedRecipes)
      selectedRecipes.has(recipeId)
        ? selectedRecipes.delete(recipeId)
        : selectedRecipes.add(recipeId)
      return { selectedRecipes }
    }),
  deleteSelectedRecipes: () =>
    set((state) => {
      const recipes = state.recipes.filter(
        (recipe) => !state.selectedRecipes.has(recipe.id)
      )
      const selectedRecipes = new Set<number>()
      return { recipes, selectedRecipes }
    }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
}))
