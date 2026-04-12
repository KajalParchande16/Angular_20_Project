import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
interface News {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  likes: number;
  bookmarked: boolean;
}
@Component({
  selector: 'app-news-blog',
  imports: [FormsModule,CommonModule],
  templateUrl: './news-blog.html',
  styleUrl: './news-blog.scss'
})
export class NewsBlog {
  constructor(private sanitize:DomSanitizer)
  {

  }
  searchText = '';
  selectedCategory = 'All';

  categories = ['All', 'Technology', 'Business', 'Sports', 'Politics'];

  newsList: News[] = [
    {
      id: 1,
      title: 'Angular 19 Released',
      description: 'Angular 19 comes with better performance, signals & DX improvements.',
      image: 'https://source.unsplash.com/400x250/?technology',
      category: 'Technology',
      date: 'Feb 2026',
      likes: 12,
      bookmarked: false
    },
    {
      id: 2,
      title: 'Stock Market Hits Record',
      description: 'Sensex and Nifty touch new all-time highs.',
      image: 'https://source.unsplash.com/400x250/?business',
      category: 'Business',
      date: 'Feb 2026',
      likes: 8,
      bookmarked: false
    },
    {
      id: 3,
      title: 'India Wins Series',
      description: 'India wins the cricket series with outstanding performance.',
      image: 'https://source.unsplash.com/400x250/?sports',
      category: 'Sports',
      date: 'Feb 2026',
      likes: 15,
      bookmarked: false
    }
  ];

  get filteredNews() {
    return this.newsList.filter(news =>
      (this.selectedCategory === 'All' || news.category === this.selectedCategory) &&
      news.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  likeNews(news: News) {
    news.likes++;
  }

  toggleBookmark(news: News) {
    news.bookmarked = !news.bookmarked;
  }

  shareNews(news: News) {
    alert(`Shared: ${news.title}`);
  }

  safeUrl(url:string)
  {
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
  }
}
