import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from 'src/models/UserRoles';
import { LayoutThemes } from 'src/models/LayoutThemes';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // firstName: string;

  // @Column()
  // lastName: string;

  // @Column()
  // role: UserRoles;

  // @Column({ default: '' })
  // avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // @Column()
  // theme: LayoutThemes;

  // @Column()
  // allowNotificatin: boolean;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
