import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admission } from './features/admission/admission';
import { Events } from './features/events/events';
import { Gallery } from './features/gallery/gallery';
import { Teachers } from './features/teachers/teachers';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Disclaimer } from './pages/disclaimer/disclaimer';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Notices } from './features/notices/notices';
import { NewsBlog } from './blog/news-blog/news-blog';
import { AdminDashboard } from './blog/admin-dashboard/admin-dashboard';
import { authGuard } from './guard/auth-guard';
import { noticeResolver } from './features/resolvers/notice-resolver';
import { Blog } from './features/blog/blog';
import { Layout } from './layout/layout/layout';
import { LoginV2 } from './auth/login-v2/login-v2';
import { loginGuard } from './guard/login-guard';
import { Notice } from './features/home/notice/notice';
import { NoticeDashboard } from './dashboard/notice-dashboard/notice-dashboard';
import { TeacherProfile } from './features/teacher-profile/teacher-profile';
import { AdmissionList } from './features/admissions/admission-list/admission-list';
import { Subject } from './components/subject/subject';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginV2,
    canActivate: [loginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'layout',
    component: Layout,
    canActivateChild: [authGuard],
    children: [

      // ✅ Everyone logged in can access
      {
        path: 'dashboard',
        component: Dashboard
      },

      // ✅ Moved inside layout & role added
      {
        path: 'teacher-profile',
        component: TeacherProfile,
        data: { roles: ['Admin', 'Teacher'] }
      },

      // ✅ Admin & Teacher
      {
        path: 'teacher',
        component: Teachers,
        data: { roles: ['Admin', 'Teacher'] }
      },

      // ✅ Admin & Teacher
      {
        path: 'student',
        component: NoticeDashboard,
        data: { roles: ['Admin', 'Teacher'] }
      },

      // ✅ Admin only
      {
        path: 'parent',
        component: Events,
        data: { roles: ['Admin'] }
      },

      // Academics
      {
        path: 'academics/classes',
        component: Dashboard,
        data: { roles: ['Admin', 'Teacher'] }
      },
      {
        path: 'academics/subjects',
        component: Dashboard,
        data: { roles: ['Admin', 'Teacher'] }
      },

      // Admissions — Admin only
      {
        path: 'admissions/enquiries',
        component: Admission,
        data: { roles: ['Admin'] }
      },
      {
        path: 'admissions/applications',
        component: AdmissionList,
        data: { roles: ['Admin'] }
      },
      {
        path: 'admissions/shortlist',
        component: Dashboard,
        data: { roles: ['Admin'] }
      },
      {
        path: 'admissions/fee-allocation',
        component: Dashboard,
        data: { roles: ['Admin'] }
      },

      // Students — Admin & Teacher
      {
        path: 'students/list',
        component: Dashboard,
        data: { roles: ['Admin', 'Teacher'] }
      },
      {
        path: 'students/attendance',
        component: Dashboard,
        data: { roles: ['Admin', 'Teacher'] }
      },

      // Staff — Admin only
      {
        path: 'staff/teachers',
        component: Teachers,
        data: { roles: ['Admin'] }
      },
      {
        path: 'staff/support',
        component: Dashboard,
        data: { roles: ['Admin'] }
      },
      {
        path: 'staff/leaves',
        component: Dashboard,
        data: { roles: ['Admin'] }
      },
      {
        path: 'staff/payroll',
        component: Dashboard,
        data: { roles: ['Admin'] }
      },

      // Finance — Admin only
      {
        path: 'finance/fees',
        component: Dashboard,
        data: { roles: ['Admin'] }
      },

      // Settings — Admin only
      {
        path: 'settings',
        component: Subject,
        data: { roles: ['Admin'] }
      },

      // Fallback inside layout
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Fallback outside layout
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  // { path: "", component: Home },
  // { path: "admission", component: Admission },
  // { path: "event", component: Events },
  // { path: "gallery", component: Gallery, },
  // {
  //     path: "notice", component: Notices, resolve: {
  //         noticeData: noticeResolver
  //     }
  // },
  // { path: "teacher", component: Teachers },
  // { path: "contact-us", component: Contact },
  // { path: "about-up", component: About },
  // { path: "privacy-policy", component: PrivacyPolicy },
  // { path: "disclaimer", component: Disclaimer },
  // // {path:"dashboard",component:Dashboard},
  // { path: "login", component: Login },
  // { path: "new-blog", component: NewsBlog },
  // { path: "admin-dashboard", component: AdminDashboard },
  // { path: 'blog', component: Blog },
  // { path: "**", redirectTo: 'home' },

];
