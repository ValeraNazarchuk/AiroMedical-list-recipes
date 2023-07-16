import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { getRecipesReq } from '../../../../api'
import { useStore } from '../../../../store'
import { Pagination } from '../../components/pagination'
import { RecipeCard } from '../../components/recipe-card'
import { PrimaryButton } from '../../../../core/components/buttons/primary-button'
import { Loader } from '../../../../core/components//loader/index'
import _ from 'lodash'

export const ListRecipesPage: React.FC = () => {
  // const [data, setData] = useState<any>(null)
  // const [page, setPage] = useState<number>(1)

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

  const listRef = useRef(null)

  const loadRecipes = async () => {
    try {
      const response = await getRecipesReq(page)
      addRecipes(response)
      // setIsLoading(true)
    } catch (error) {
      // errorError(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    loadRecipes()
    // console.log(1);

    //   const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}`
    //   axios.get(apiUrl).then((resp) => {
    //     const allPersons = resp.data
    //     setData(allPersons)
    //   })
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
    // if(recipes.length === 0) {
      // console.log(deleteSelectedRecipes)
    // }
  }

  // const handleScroll = (e: any) => {
  //   const element = e.target
  //   if (element.scrollTop + element.clientHeight === element.scrollHeight) {
  //     nextPage()
  //   }
  // }
  

  return (
    <>
      {!_.isEmpty(recipes) ? (
        <div
          ref={listRef}
          // onScroll={handleScroll}
          // style={{ height: '100vh', overflowY: 'scroll' }}
          style={{ height: '100vh', overflowY: 'scroll' }}
        >
          <ul>
            {recipes.slice(0, 15).map((recipe: any) => (
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
          <Pagination
            page={page}
            onClickNextPage={nextPage}
            onClickPrevPage={prevPage}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
