import { BeforeDelete, Filter, PrimaryKey, Property } from '@mikro-orm/core';

@Filter({ name: 'softDelete', cond: { deletedAt: null } })
export class BaseEntity {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date;

    @Property({ nullable: true })
    deletedAt?: Date;

    @BeforeDelete()
    protected beforeDelete() {
        this.deletedAt = new Date();
    }
}
