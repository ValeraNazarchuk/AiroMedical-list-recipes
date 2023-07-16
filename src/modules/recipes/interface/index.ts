interface Volume<T extends string> {
  value: number
  unit: T
}

interface BoilVolume<T extends string> extends Volume<T> {}

interface MashTemp<T extends string> {
  temp: {
    value: number
    unit: T
  }
  duration: number
}

interface Fermentation<T extends string> {
  temp: Volume<T>
}

interface Method<T extends string, U extends string | null> {
  mash_temp: MashTemp<T>[]
  fermentation: Fermentation<T>
  twist: U
}

interface Malt<T extends string> {
  name: T
  amount: Volume<T>
}

interface Hop<T extends string> {
  name: T
  amount: Volume<T>
  add: T
  attribute: T
}

interface Ingredient<T extends string> {
  malt: Malt<T>[]
  hops: Hop<T>[]
  yeast: T
}

export interface Abv<T extends string, U extends string | null, V extends string[]> {
  abv: number
  attenuation_level: number
  boil_volume: BoilVolume<T>
  brewers_tips: T
  contributed_by: T
  description: T
  ebc: number
  first_brewed: T
  food_pairing: V
  ibu: number
  id: number
  image_url: T
  ingredients: Ingredient<T>
  method: Method<T, U>
  name: T
  ph: number
  srm: number
  tagline: T
  target_fg: number
  target_og: number
  volume: Volume<T>
}
