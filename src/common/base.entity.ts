import {
  BeforeCreate,
  BeforeDelete,
  BeforeUpdate,
  Filter,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Filter({ name: 'softDelete', cond: { deletedAt: null } })
export class BaseEntity {
  @PrimaryKey({ type: 'int' })
  id: number;

  @Property({ type: 'date' })
  createdAt: Date;

  @Property({ type: 'date' })
  updatedAt: Date;

  @Property({ type: 'date', nullable: true })
  deletedAt: Date;

  @BeforeCreate()
  protected beforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeDelete()
  protected beforeDelete() {
    this.deletedAt = new Date();
  }
}
