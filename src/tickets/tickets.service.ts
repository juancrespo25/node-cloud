import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  private readonly logger: Logger = new Logger(TicketsService.name);
  constructor(
    @InjectRepository(Ticket) private ticketsRepository: Repository<Ticket>
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<string> {
    try {
      const ticketEntity = this.ticketsRepository.create({
        ...createTicketDto,
        code: this.generateCode('TCK'),
        created_user: 'system',
      });

      const ticket = await this.ticketsRepository.save(ticketEntity);

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

  private generateCode(prefix: string): string {
    return `${prefix}-${Math.floor(100000 + Math.random() * 900000).toString()}`;
  }
  //TODO Agregar el filtro por codigo
}
