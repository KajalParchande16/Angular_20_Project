import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Theme } from '../../services/theme/theme';
declare var bootstrap: any;
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
   theme = inject(Theme);
   logOut() {
      this.cs.logOut();
   }
   @ViewChild('navbar') navbar!: ElementRef;
   constructor(private router: Router) {
      this.router.events.subscribe(() => {
         this.closeMenu();
      });
   }
   ngOnInit() {
      this.isDark = this.theme.getCurrentTheme() === 'dark';
   }

   toggleTheme() {
      this.theme.toggleTheme();
      this.isDark = !this.isDark;
   }

   closeMenu() {
      const bsCollapse = bootstrap.Collapse.getInstance(this.navbar.nativeElement);
      if (bsCollapse) {
         bsCollapse.hide();
      }
   }


}
