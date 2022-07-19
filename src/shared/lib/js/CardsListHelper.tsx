import { ICardProps } from '../../CardsList/Card'

export function mergeCardPropsArrays(
  currentArray: ICardProps[],
  newArray: ICardProps[]
): ICardProps[] {
  if (currentArray && currentArray.length > 0) {
    var currentArrayCardIds = currentArray
      ? currentArray.map((card) => card.cardId)
      : []
    newArray = [
      ...currentArray,
      ...newArray.filter((card) => !currentArrayCardIds.includes(card.cardId)),
    ]
  }
  return [...newArray]
}

export interface IRedditRisingResponseData {
  data: IRedditListingResponseData
}
export interface IRedditListingResponseData {
  data: {
    after: string
    before: string
    children: IRedditT3ResponseData[]
    geo_filter: string
  }
  kind: string
}
export interface IRedditT3ResponseData {
  data: IRedditData
  kind: string
}
export interface IRedditData {
  author: string
  body: string
  body_html: string
  created: string
  created_utc: string
  id: string
  permalink: string
  subreddit: string
  name: string
  title: string
  thumbnail: string
  ups: number
  score: number
  replies: IRedditListingResponseData
}
