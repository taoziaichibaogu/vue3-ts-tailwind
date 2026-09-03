import type {
  ReportListParams,
  ReportListResponse,
  TestGetResponse,
  TestPostResponse,
} from '../types/report';
import { request } from '../axios';

export const reportApi = {
  testGet: () =>
    request<TestGetResponse>({
      url: '/api/test',
      method: 'get',
    }),
  testPost: (data: Record<string, unknown>) =>
    request<TestPostResponse>({
      url: '/api/testPost',
      method: 'post',
      data,
    }),
  getReportList: (data: ReportListParams = {}) =>
    request<ReportListResponse>({
      url: '/web/report/list',
      method: 'post',
      data,
    }),
};
