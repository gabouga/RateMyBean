export type Item = {
  id: number,
  name: string,
  completed: boolean,
}

export type Coffee = {
  id: number,
  name: string,
  roast: Roast,
}

export type BrewingMethod = {
  id: number,
  name: string,
  accessory: string,
}

export type Rating = {
  id: number,
  date: Date,
  score: number,
  brewingMethod: BrewingMethod,
  grindSize: number,
  brewTime: null | number,
  brewTimeUnit: string,
  coffee: Coffee,
}

export enum Roast {
  Light = "Light",
  Medium = "Medium",
  Dark = "Dark",
}
