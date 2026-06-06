import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './features/home/home';
import { Loader } from './services/loader/loader';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Cancle } from './services/requestCancle/cancle';
import { Theme } from './services/theme/theme';
import { LoginV2 } from './auth/login-v2/login-v2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home, Footer, AsyncPipe, CommonModule, LoginV2],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  loader = inject(Loader);

  constructor(
    private router: Router,
    private cancelSer: Cancle,
    private theme: Theme
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.cancelSer.cancelPendingRequest();
      }
    })
  }

  ngOnInit() {
    this.theme.initialTheme();
  }

  protected title = 'frontend';
}
