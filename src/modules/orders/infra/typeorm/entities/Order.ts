import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // vários pedidos poderão ser de 1 customer
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' }) // customer_id está no banco
  customer: Customer;

  // OneToMany ManyToOne
  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[]; // coluna virtual (?) -> relations: ['order_products', 'customers'] -> Em OrdersRepository

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
