import { ICardProps } from '../../CardsList/Card'

export function mergeCardPropsArrays(
  currentArray: ICardProps[],
  newArray: ICardProps[]
): ICardProps[] {
  var currentArrayCardIds = currentArray.map((card) => card.cardId)
  return [
    ...currentArray,
    ...newArray.filter((card) => !currentArrayCardIds.includes(card.cardId)),
  ]
}
