import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from '../type/tickets.type';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.PENDING,
  })
  status: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  created_at?: string;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  created_user?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  updated_user?: string;

  is_active?: boolean;

  @DeleteDateColumn({
    select: false,
  })
  deleted_at: Date; // * Captura la fecha de eliminacion del registro, pero no lo borra, solo lo oculta
}
