import dashboardProvider from "../../providers/dashboard.provider";

import {
  createmeetingRepository
} from "./repositories/meeting.repository";


export const meetingsRepository =
  createmeetingRepository(dashboardProvider);



