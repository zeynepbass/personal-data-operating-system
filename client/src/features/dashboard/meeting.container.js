import meetingProvider from "../../providers/meeting.provider";

import {
  createmeetingRepository,
} from "./repositories/meeting.repository";


const meetingRepository =
  createmeetingRepository(meetingProvider);


export default meetingRepository;