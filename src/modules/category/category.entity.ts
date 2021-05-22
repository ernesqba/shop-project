import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Table
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  CategoryId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  UserId: number;

  @BelongsTo(() => User)
  User: User;

  @BelongsTo(() => Category)
  Category: User;

  @HasMany(() => Category)
  Categories: Category[];

  @HasMany(() => Product)
  Products: Product[];
}
