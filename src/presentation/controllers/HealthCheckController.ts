import { ok, HttpResponse } from '../contracts/HttpResponse'

export class healthCheckController {
  static async health (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const healthcheck = {
      uptime: process.uptime(),
      status: 'UP',
      timestamp: new Date()
    }
    return ok(healthcheck)
  }
}
