export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3309,
    user: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || '',
  },
  tk: {
    secret: process.env.SECRET || '123456',
    access: process.env.EXP_IN_ACCESS_TOKEN || '1d'
  }
});
