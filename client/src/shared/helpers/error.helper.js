export function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}
