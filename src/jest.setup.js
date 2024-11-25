// Mock timers
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// Increase timeout
jest.setTimeout(30000);

// Handle process cleanup
afterAll(() => {
  jest.clearAllTimers();
  jest.useRealTimers();

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});
