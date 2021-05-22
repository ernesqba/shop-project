import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { Product } from '../product/product.entity';

@Table({
  // paranoid: true,
  hooks: {
    beforeCreate(user: User) {
      user.rol = 'Creador';
    },
  },
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  identificationNumber: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  province: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  municipality: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.ENUM,
    values: ['Comercial FCBC- UEB', 'Comercial FCBC- Casa Matriz', 'Creador'],
    // defaultValue: 'Creador',
    // allowNull: false,
  })
  rol: string;

  @HasMany(() => Product)
  Products: Product[];

  // @BeforeCreate
  // public static setRol(user: User) {
  //   console.log('Aqi1111111111111111111111');
  //   user.rol = 'Creador';
  // }

  // @BeforeCreate
  // public static hashPassword(user: User, options: any) {
  //   if (!options.transaction) throw new Error('Missing transaction.');
  //   // user.password = crypto.createHmac('sha256', user.password).digest('hex');
  // }
}
