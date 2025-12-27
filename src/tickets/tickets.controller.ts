import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    const ticketCode = await this.ticketsService.create(createTicketDto);
    return {
      success: true,
      message: 'Ticket created successfully',
      ticket_code: ticketCode,
    };
  }

  @Get()
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return {
      success: true,
      message: 'Tickets found successfully',
      tickets,
    };
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    const ticket = await this.ticketsService.findByCode(code);
    return {
      success: true,
      message: 'Ticket found successfully',
      ticket,
    };
  }
}
