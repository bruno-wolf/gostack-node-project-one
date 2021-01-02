import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { };

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<IResponse> {

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    })

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;