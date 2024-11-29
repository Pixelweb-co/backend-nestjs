import { Controller, Post, Body } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Controller('validation')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}
/**
   * Envía siempre 1000 solicitudes de validación.
   */
    @Post()
    async validate() {
    console.log("send data...")
      return this.validationService.sendRandomRequests(10);
    }
}