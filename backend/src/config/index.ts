export const config = {
  auth: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
  },
  email: {
    HOSTINGER_EMAIL_HOST: process.env.HOSTINGER_EMAIL_HOST,
    HOSTINGER_EMAIL_PORT: process.env.HOSTINGER_EMAIL_PORT,
    HOSTINGER_EMAIL_USER: process.env.HOSTINGER_EMAIL_USER,
    HOSTINGER_EMAIL_PASSWORD: process.env.HOSTINGER_EMAIL_PASSWORD,
  },
}
