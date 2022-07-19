import { IRedditT3ResponseData } from '../../CardsList'
import { ICommentsList } from '../../Post/Comments'

export function iterateChildren(
  redditT3ResponseDataArr: IRedditT3ResponseData[]
): ICommentsList[] {
  var result: ICommentsList[] = []
  redditT3ResponseDataArr.forEach((redditT3ResponseData) => {
    if (redditT3ResponseData.data.body) {
      let comment: ICommentsList = {
        text: redditT3ResponseData.data.body,
        children: [],
        author: redditT3ResponseData.data.author,
        category: redditT3ResponseData.data.subreddit,
        avatarSrc: redditT3ResponseData.data.thumbnail,
        id: redditT3ResponseData.data.id,
        created_utc: redditT3ResponseData.data.created_utc,
        score: redditT3ResponseData.data.score,
      }
      if (redditT3ResponseData.data?.replies?.data?.children)
        comment.children = iterateChildren(
          redditT3ResponseData.data?.replies?.data?.children
        )
      result.push(comment)
    }
  })
  return result
}

export function iterateAndCountComments(commentsList: ICommentsList[]): number {
  var result = 0
  commentsList.forEach((comment) => {
    result++
    if (comment.children)
      result = result + iterateAndCountComments(comment.children)
  })
  return result
}
