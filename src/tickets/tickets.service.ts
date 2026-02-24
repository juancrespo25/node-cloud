/* eslint-disable @typescript-eslint/no-floating-promises */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { USER_PREFIX } from '../common/constant';
import { KafkaService } from '../kafka/kafka.service';
import { ITicketEvent } from './interface/ticket.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TicketsService {
  private readonly logger: Logger = new Logger(TicketsService.name);
  constructor(
    @InjectRepository(Ticket) private ticketsRepository: Repository<Ticket>,
    private readonly commonService: CommonService,
    private readonly kafkaService: KafkaService
  ) {}
  async create(
    createTicketDto: CreateTicketDto,
    email: string
  ): Promise<string> {
    try {
      const ticketEntity = this.ticketsRepository.create({
        ...createTicketDto,
        code: this.commonService.generateCode(USER_PREFIX.TICKETS),
        created_user: email,
      });

      const ticket = await this.ticketsRepository.save(ticketEntity);

      if (ticket) {
        this.logger.log('Publish event to Kafka');

        const event: ITicketEvent = {
          eventId: randomUUID(),
          ticketCode: ticket.code,
        };

        this.kafkaService.publish<ITicketEvent>('ticket.created', event);
      }

      return ticket.code;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Ticket[]> {
    try {
      const tickets = await this.ticketsRepository.find();
      return tickets;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findByCode(code: string): Promise<Ticket | null> {
    try {
      const ticket = await this.ticketsRepository.findOne({ where: { code } });
      return ticket;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
