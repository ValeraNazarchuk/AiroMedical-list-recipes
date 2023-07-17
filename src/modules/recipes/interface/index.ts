interface BoilVolume {
  value: number
  unit: string
}

interface Brewer {
  brewers_tips: string
  contributed_by: string
}

interface Ingredient {
  malt: string[]
  hops: string[]
  yeast: string
}

interface MashTemp {
  temp: { value: number; unit: string }
  duration: number
}

interface Fermentation {
  temp: { value: number; unit: string }
}

interface Method {
  mash_temp: MashTemp[]
  fermentation: Fermentation
  twist: string | null
}

interface Volume {
  value: number
  unit: string
}

export interface Beer {
  abv: number
  attenuation_level: number
  boil_volume: BoilVolume
  brewers: Brewer
  description: string
  ebc: number
  first_brewed: string
  food_pairing: string[]
  ibu: number
  id: number
  image_url: string
  ingredients: Ingredient
  method: Method
  name: string
  ph: number
  srm: number
  tagline: string
  target_fg: number
  target_og: number
  volume: Volume
}

export interface StoreState {
  recipes: Beer[]
  selectedRecipes: Set<number>
  page: number
}