/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/await-thenable */
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  constructor(@Inject('JCV_KAFKA') private readonly clientKafka: ClientKafka) {}

  async onModuleInit() {
    await this.clientKafka.connect();
  }

  async onModuleDestroy() {
    await this.clientKafka.close();
  }

  async publish<T>(topic: string, message: T): Promise<void> {
    try {
      this.clientKafka.subscribeToResponseOf(topic);
      await this.clientKafka.emit(topic, { message });

      this.logger.log(`Event published in topic: ${topic}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(errorMessage);
    }
  }
}
