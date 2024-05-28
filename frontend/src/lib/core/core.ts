export const apiCore = {
  url: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers() {
    return {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  },
  headersWithAuth(token: string) {
    return {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },
};
