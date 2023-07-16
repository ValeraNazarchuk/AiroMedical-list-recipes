import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { getRecipesReq } from '../../../../api'
import { useStore } from '../../../../store'
import { Pagination } from '../../components/pagination'
import { RecipeCard } from '../../components/recipe-card'
import { PrimaryButton } from '../../../../core/components/buttons/primary-button'
import { Loader } from '../../../../core/components//loader/index'
import _ from 'lodash'

export const ListRecipesPage: React.FC = () => {
  const recipes = useStore((state: any) => state.recipes)
  const selectedRecipes = useStore((state: any) => state.selectedRecipes)
  const page = useStore((state: any) => state.page)
  const addRecipes = useStore((state: any) => state.addRecipes)
  const toggleRecipeSelection = useStore(
    (state: any) => state.toggleRecipeSelection
  )
  const deleteSelectedRecipes = useStore(
    (state: any) => state.deleteSelectedRecipes
  )
  const nextPage = useStore((state: any) => state.nextPage)
  const prevPage = useStore((state: any) => state.prevPage)

  const [startIndex, setStartIndex] = useState(0)

  const visibleRecipes = recipes.slice(startIndex, startIndex + 15)

  const [showLoader, setShowLoader] = useState(false)

  const loadRecipes = async () => {
    try {
      const response = await getRecipesReq(page)
      addRecipes(response)
    } catch (error) {
      console.log(error)
    }
  }

  // ЗРОБИТИ загрузку наступної сторінки при видалені всього,
  // Скролл верх при переході на наступну сторінку 
  // Шоб оставалася пагінація при видалені всих елементів

  if (_.isEmpty(recipes)) {
    // nextPage()
  }

  useEffect(() => {
    loadRecipes()
  }, [page])

  const handleRecipeClick = (
    e: React.MouseEvent<HTMLLIElement>,
    recipeId: number
  ) => {
    e.preventDefault()
    toggleRecipeSelection(recipeId)
  }

  const handleDeleteClick = () => {
    deleteSelectedRecipes()
  }

  const handleScroll = (e: React.MouseEvent<HTMLLIElement>) => {
    const { scrollTop, clientHeight, scrollHeight } =
      e.target as HTMLInputElement

    if (scrollTop < 10 && startIndex >= 5) {
      setStartIndex(startIndex - 5)
    } else if (scrollTop + clientHeight > scrollHeight && startIndex < 10) {
      setShowLoader(true)
      setTimeout(() => {
        setStartIndex(startIndex + 5)
        setShowLoader(false)
      }, 1000)
    }
  }

  return (
    <>
      {!_.isEmpty(recipes) ? (
        <div
          onScroll={(e: React.MouseEvent<any>) => handleScroll(e)}
          style={{ height: '100vh', overflow: 'auto' }}
        >
          <ul>
            {visibleRecipes.slice(0, 15).map((recipe: any) => (
              <RecipeCard
                key={recipe.id}
                info={recipe}
                handleRecipeClick={handleRecipeClick}
                selectedRecipes={selectedRecipes}
              />
            ))}
          </ul>
          {selectedRecipes.size > 0 && (
            <PrimaryButton
              text="Delete"
              onClick={handleDeleteClick}
              individualStyle={{
                position: 'fixed',
                top: 10,
                right: 20,
              }}
            />
          )}
          {!showLoader ? (
            <Pagination
              page={page}
              onClickNextPage={nextPage}
              onClickPrevPage={prevPage}
            />
          ) : (
            <Loader height={'150px'} />
          )}
        </div>
      ) : (
        <Loader height={'100vh'} />
      )}
    </>
  )
}
