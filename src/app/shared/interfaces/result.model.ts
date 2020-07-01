export interface ResultModel {
  game: string,
  resultGame: ResultItem[],
  _id: string
}
export interface ResultItem {
  difference: number,
  result: ResultXY,
  userId: string,
  _id?: string
}

export interface ResultXY {
  x: number,
  y: number
} 

