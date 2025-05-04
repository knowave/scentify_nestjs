import { Options } from '@mikro-orm/core';
import { logger } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, IS_LOCAL_ENV } from './env';

export const MikroOrmConfig: Options<PostgreSqlDriver> = {
    dbName: DATABASE_NAME,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    entities: ['./dist/domains/**/entities/**.entity.js'],
    entitiesTs: ['./src/domains/**/entities/**.entity.ts'],
    driver: PostgreSqlDriver,
    migrations: {
        path: './migrations/*.ts',
        tableName: 'migrations',
        transactional: true
    },
    logger: message => {
        return IS_LOCAL_ENV ? logger.log(message) : null;
    }
};

export default MikroOrmConfig;
