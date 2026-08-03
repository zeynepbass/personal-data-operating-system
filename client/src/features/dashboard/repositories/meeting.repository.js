import { meetingAdapter } from "../adapters/dashboard.adapter";

export function createmeetingRepository(provider) {
  return {
    async getAllMeetings() {
      const response = await provider.getMeetingApi();
      console.log(response);
      return response.map(meetingAdapter);
    },
  };
}
