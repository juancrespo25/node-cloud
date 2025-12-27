/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Req() request) {
    const ticketCode = await this.ticketsService.create(
      createTicketDto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      request.user_email
    );
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
