import { join } from 'path';
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [join(__dirname, 'src', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'src', 'migrations', '*.{ts,js}')],
  cli: { migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR },
};

export default ormConfig;
