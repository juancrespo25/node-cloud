import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { RolesGuard } from '../roles/roles.guard';
import { UserRole } from '../roles/types/role.type';
import { Roles } from '../roles/roles.decorator';
import { EmailUser } from '../common/common.decorator';

@Controller('tickets')
@UseGuards(RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(UserRole.WRITE)
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @EmailUser() email: string
  ) {
    const ticketCode = await this.ticketsService.create(createTicketDto, email);

    console.log(ticketCode);
    return {
      success: true,
      message: 'Ticket created successfully',
      ticket_code: ticketCode,
    };
  }

  @Get()
  @Roles(UserRole.READ, UserRole.WRITE)
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return {
      success: true,
      message: 'Tickets found successfully',
      tickets,
    };
  }

  @Get(':code')
  @Roles(UserRole.READ, UserRole.WRITE)
  async findByCode(@Param('code') code: string) {
    const ticket = await this.ticketsService.findByCode(code);
    return {
      success: true,
      message: 'Ticket found successfully',
      ticket,
    };
  }
}
