import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { CommonService } from '../common/common.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), KafkaModule],
  controllers: [TicketsController],
  providers: [TicketsService, CommonService],
})
export class TicketsModule {}
