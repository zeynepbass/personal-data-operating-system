import { meetingAdapter } from "../adapters/meeting.adapter";

export function createmeetingRepository(provider) {
  return {

    async getAllMeetings() {

      const response = await provider.getMeetingApi();

      return response.meetings.map(meetingAdapter);

    },


  };
}