import ApiService from '@/app/services/__mocks__/ApiService';
import '../__mocks__/routerMock';
process.env.TZ = 'UTC';

jest.mock('axios');
jest.mock('@/app/services/ApiService', () => ApiService);