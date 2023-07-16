import React from 'react'
import { ListRecipesPage } from '../modules/recipes/pages/list-recipes-page'
import { RecipeDetailedPage } from '../modules/recipes/pages/detailed-recipe-page'
import { listRecipesRouterName } from '../modules/recipes/config/routers.config'
import { detailedRecipesRouterName } from '../modules/recipes/config/routers.config'
import { Navigate } from 'react-router-dom'

export const routersConfig = [
  {
    path: listRecipesRouterName,
    element: <ListRecipesPage />,
  },
  {
    path: detailedRecipesRouterName,
    element: <RecipeDetailedPage />,
  },
  {
    path: '*',
    element: <Navigate to={listRecipesRouterName} />,
  },
]
