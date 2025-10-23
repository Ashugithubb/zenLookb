import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { UnavailableSlot } from 'src/unavailable-slots/entities/unavailable-slot.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'), // use Neon pooled URL
    entities: [User, Service, Booking, UnavailableSlot],
    synchronize: false,
    autoLoadEntities: true,
    extra: {
      ssl: {
        rejectUnauthorized: false, // required for Neon
      },
    },
  }),
};
