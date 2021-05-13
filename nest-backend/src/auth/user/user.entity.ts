import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import { UserRoles } from 'src/models/UserRoles';
import { LayoutThemes } from 'src/models/LayoutThemes';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: UserRoles;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column()
  password: string;

  @Column()
  theme: LayoutThemes;

  @Column()
  allowNotificatin: boolean;
}
