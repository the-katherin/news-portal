interface Article {
    source: object,
    author: string,
    title: string,
    description: string,
}

interface Channel {
    id: string,
    name: string,
}

interface GetArticlesResponse {
    status: string,
    articles: Array<Article>,

}

interface GetChannelsResponse {
    status: string,
    sources: Array<Channel>,

}

interface MyArticle {
    _id: string,
    author: string,
    title: string,
    description: string,
    source: string,
    publishedAt: string,
}



export {Article, Channel, GetArticlesResponse, GetChannelsResponse, MyArticle};
