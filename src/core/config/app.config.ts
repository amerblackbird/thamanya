import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL,
  companyBaseUrl: process.env.COMPANY_BASE_URL,
  vendorBaseUrl: process.env.VEDNRO_BASE_URL,
  adminBaseUrl: process.env.ADMIN_BASE_URL,
  projectName: process.env.PROJECT_NAME,
  projectEmail: process.env.PROJECT_EMAIL,
  name: process.env.PROJECT_NAME,
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'ar',
}));
