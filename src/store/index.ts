import { create } from 'zustand'

export const useStore = create((set) => ({
  recipes: [],
  selectedRecipes: new Set(),
  page: 1,
  addRecipes: (newRecipes: any) => set(() => ({ recipes: [...newRecipes] })),
  toggleRecipeSelection: (recipeId: number) =>
    set((state: any) => {
      const selectedRecipes = new Set(state.selectedRecipes)
      selectedRecipes.has(recipeId)
        ? selectedRecipes.delete(recipeId)
        : selectedRecipes.add(recipeId)
      return { selectedRecipes }
    }),
  deleteSelectedRecipes: () =>
    set((state: any) => {
      const recipes = state.recipes.filter(
        (recipe: any) => !state.selectedRecipes.has(recipe.id)
      )
      const selectedRecipes = new Set()
      return { recipes, selectedRecipes }
    }),
  nextPage: () => set((state: any) => ({ page: state.page + 1 })),
  prevPage: () => set((state: any) => ({ page: state.page - 1 })),
}))
