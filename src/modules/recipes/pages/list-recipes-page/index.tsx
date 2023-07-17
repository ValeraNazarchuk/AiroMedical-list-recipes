import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { getRecipesReq } from '../../../../api'
import { useStore } from '../../../../store'
import { Pagination } from '../../components/pagination'
import { RecipeCard } from '../../components/recipe-card'
import { PrimaryButton } from '../../../../core/components/buttons/primary-button'
import { Loader } from '../../../../core/components//loader/index'
import _ from 'lodash'
import { Beer } from '../../interface'

export const ListRecipesPage: React.FC = () => {
  const recipes = useStore((state) => state.recipes)
  const selectedRecipes = useStore((state) => state.selectedRecipes)
  const page = useStore((state) => state.page)
  const addRecipes = useStore((state) => state.addRecipes)
  const toggleRecipeSelection = useStore((state) => state.toggleRecipeSelection)
  const deleteSelectedRecipes = useStore((state) => state.deleteSelectedRecipes)
  const nextPage = useStore((state) => state.nextPage)
  const prevPage = useStore((state) => state.prevPage)

  const [startIndex, setStartIndex] = useState(0)

  const visibleRecipes = recipes.slice(startIndex, startIndex + 15)

  const [showLoader, setShowLoader] = useState(false)

  const listRef = useRef<HTMLDivElement>(null)

  const loadRecipes = async () => {
    try {
      const response = await getRecipesReq(page)
      addRecipes(response)
    } catch (error) {
      console.log(error)
    }
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
    if (recipes.length - selectedRecipes.size === 0) {
      nextPage()
      if (listRef.current) {
        listRef.current.scrollTo({
          top: 0,
        })
      }
    }
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

  const onClickNextPage = () => {
    nextPage()
    setStartIndex(0)
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
      })
    }
  }

  const onClickPrevPage = () => {
    prevPage()
    setStartIndex(0)
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
      })
    }
  }

  return (
    <>
      {!_.isEmpty(recipes) ? (
        <div
          ref={listRef}
          onScroll={(e: React.MouseEvent<any>) => handleScroll(e)}
          style={{ height: '100vh', overflow: 'auto' }}
        >
          <ul>
            {visibleRecipes.slice(0, 15).map((recipe: Beer) => (
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
              onClickNextPage={onClickNextPage}
              onClickPrevPage={onClickPrevPage}
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
