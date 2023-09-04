import 'tsconfig-paths/register';
import 'dotenv/config';
import '@/db';
import app from './src/app';

app.listen(process.env.APP_PORT ?? 4000, () => {
  console.log(
    `Server is running in http://localhost:${process.env.APP_PORT ?? 3000}`,
  );
});
