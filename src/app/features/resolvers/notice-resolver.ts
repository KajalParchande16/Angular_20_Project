import { ResolveFn } from '@angular/router';
import { Api } from '../../services/api';
import { inject } from '@angular/core';

export const noticeResolver: ResolveFn<any> = (route, state) => {
  const apiService = inject(Api);

  return apiService.getNoticeApi();
};
