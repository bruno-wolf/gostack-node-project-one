import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

export default class ProviderMonthAvailabilityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const lstProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);
    const availability = await lstProviderMonthAvailability.execute({
      provider_id: provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}