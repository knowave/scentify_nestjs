import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import MikroOrmConfig from 'src/common/config/mikro-orm.config';

@Module({
    imports: [MikroOrmModule.forRoot(MikroOrmConfig)]
})
export class PostgresModule implements OnModuleInit {
    private readonly logger = new Logger(PostgresModule.name);
    constructor(private readonly orm: MikroORM) {}

    async onModuleInit() {
        try {
            await this.orm.getMigrator().up();
            this.logger.log(`Connected to database: ${this.orm.config.get('dbName')}`);
        } catch (err) {
            this.logger.error('Failed to connect to database:', err);
        }
    }
}
