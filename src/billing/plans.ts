export const PLANS = {
  free: {
    requestsPerDay: 3,
    streaming: false,
    export: false,
  },

  pro: {
    requestsPerDay: 50,
    streaming: true,
    export: true,
  },

  premium: {
    requestsPerDay: 200,
    streaming: true,
    export: true,
  },
};