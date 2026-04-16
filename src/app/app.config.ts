import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth-interceptor';
import { errorInterceptor } from './interceptor/error-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { loaderInterceptor } from './interceptor/loader/loader-interceptor';
import { cancelInterceptor } from './interceptor/Cancel/cancel-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loaderInterceptor,authInterceptor,errorInterceptor,cancelInterceptor])),
    provideAnimations(),
     provideToastr({
      positionClass: 'toast-top-right', // ✅ set position here
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true //in 1 page it 3-4 api getting same error then only 1 toaster will display
    })
  ]
};
