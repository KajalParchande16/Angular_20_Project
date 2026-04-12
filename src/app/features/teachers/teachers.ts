import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers implements OnInit {
  searchText = '';
  selectedCategory = 'All';

  categories = ['All', 'Angular', 'React', 'JavaScript'];
  posts: any[] = [
    {
      id: 1,
      title: 'Angular Best Practices in 2025',
      description: 'Learn the latest Angular best practices for scalable and high-performance applications.',
      image: 'https://picsum.photos/400/250?1',
      date: 'Jan 10, 2025'
    },
    {
      id: 2,
      title: 'RxJS Made Simple',
      description: 'Understand RxJS concepts with easy-to-follow real-world examples.',
      image: 'https://picsum.photos/400/250?2',
      date: 'Jan 12, 2025'
    },
    {
      id: 3,
      title: 'State Management Without NgRx',
      description: 'Handle application state efficiently using services and signals.',
      image: 'https://picsum.photos/400/250?3',
      date: 'Jan 15, 2025'
    },
    {
      id: 4,
      title: 'Angular Performance Optimization',
      description: 'Boost Angular app performance using OnPush, trackBy and lazy loading.',
      image: 'https://picsum.photos/400/250?4',
      date: 'Jan 18, 2025'
    }
  ];

  recentPosts: any[] = this.posts.slice(0, 3);
  teachers:any=[];
  constructor(private api: Api) {

  }
  ngOnInit(): void {
    this.getTeachers()
  }

  getTeachers() {
    this.api.getTeacher().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.teachers=res.data;

      }
    })
  }
}
