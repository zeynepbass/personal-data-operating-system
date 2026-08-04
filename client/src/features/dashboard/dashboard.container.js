import { dashboardProvider } from "../../providers/dashboard.provider";

import {
  createmeetingRepository,
  createDocumentRepository,
} from "./repositories/dashboard.repository";


const meetingRepository = createmeetingRepository(dashboardProvider);
const documentRepository = createDocumentRepository(dashboardProvider);



export const dashboardRepository = {
  ...meetingRepository,
  ...documentRepository,
};

