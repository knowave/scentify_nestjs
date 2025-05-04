import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ormConfig } from '../common/config/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

@Module({
    imports: [MikroOrmModule.forRoot(ormConfig)]
})
export class PostgresqlModule implements OnModuleInit {
    private readonly logger = new Logger(PostgresqlModule.name);
    constructor(private readonly orm: MikroORM) {}

    async onModuleInit() {
        try {
            if (this.orm.isConnected()) this.logger.log(`Connected to database: ${this.orm.config.get('dbName')}`);
        } catch (err) {
            this.logger.error('Failed to connect to database:', err);
        }
    }
}
