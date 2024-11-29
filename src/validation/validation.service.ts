import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ValidationService {
  constructor(private httpService: HttpService) {}

  /**
   * Genera datos aleatorios para la validación.
   */
  private generateRandomData(): any {
    return {
      product_id: Math.floor(Math.random() * 100) + 1,
      client_id: Math.floor(Math.random() * 50) + 1,
      quantity: Math.floor(Math.random() * 20) + 1,
    };
  }

  /**
   * Valida una solicitud individual enviándola al backend Laravel.
   * @param data Datos de la solicitud.
   */
  async validateData(data: { product_id: number; client_id: number; quantity: number }) {
    try { 
      console.log("data: ",data);  
      const response = await firstValueFrom( 
        this.httpService.post('http://127.0.0.1:8000/api/validate', data),
      );
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Envía múltiples solicitudes concurrentes con datos aleatorios.
   * @param count Número de solicitudes a enviar.
   */
  async sendRandomRequests(count: number) {
    const promises = [];

    for (let i = 0; i < count; i++) {
      const randomData = this.generateRandomData();
      promises.push(this.validateData(randomData));
    }

    const results = await Promise.all(promises);

    // Resumen de resultados
    const successfulRequests = results.filter((res) => res && res.success !== false);
    const failedRequests = results.filter((res) => res && res.success === false);

    console.log(`Solicitudes exitosas: ${successfulRequests.length}`);
    console.log(`Solicitudes fallidas: ${failedRequests.length}`);

    return {
      successful: successfulRequests.length,
      failed: failedRequests.length,
      details: { successfulRequests, failedRequests },
    };
  }
}
