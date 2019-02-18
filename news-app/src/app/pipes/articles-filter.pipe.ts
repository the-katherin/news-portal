import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces';

@Pipe({
  name: 'articlesFilter'
})
export class ArticlesFilterPipe implements PipeTransform {

  transform(articles: Array<Article>, keyword: string): any {
          if (keyword && articles.length) {
          return articles.filter((article) => {
              return  article.description && article.description.includes(keyword);
          });
      }
          return articles;
  }
}
