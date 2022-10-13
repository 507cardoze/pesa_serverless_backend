export const getAuthToken = (authbearer: string | undefined | null): string | null => {
  if (!authbearer) return null;
  return authbearer.split(/[Bb][Ee][Aa][Rr][Ee][Rr]\s/)[1];
};
