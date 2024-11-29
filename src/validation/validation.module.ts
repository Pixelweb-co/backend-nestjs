import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [HttpModule],
  controllers: [ValidationController],
  providers: [ValidationService],
})
export class ValidationModule {}
