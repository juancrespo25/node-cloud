import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

//TODO: Agregar al archivo kafka.config
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'JCV_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'tecypport-app', //Unico para cada aplicacion
            brokers: [process.env.KAFKA_BROKERS || 'host.docker.internal:9092'],
          },
          consumer: {
            groupId: 'tecypport-app-consumer', //Unico para cada aplicacion
          },
        },
      },
    ]),
  ],
  providers: [KafkaService, ClientKafka],
  exports: [KafkaService],
})
export class KafkaModule {}
