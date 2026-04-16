import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/theme/theme';

@Component({
   selector: 'app-header',
   imports: [RouterLink, CommonModule],
   templateUrl: './header.html',
   styleUrl: './header.scss'
})
export class Header {

 isDark = false;
   cs = inject(Auth);
   token = localStorage.getItem('token');
   theme=inject(Theme);
   logOut() {
      this.cs.logOut();
   }
   ngOnInit()
   {
      this.isDark=this.theme.getCurrentTheme()==='dark';
   }

   toggleTheme() {
    this.theme.toggleTheme();
    this.isDark = !this.isDark;
  }


}
