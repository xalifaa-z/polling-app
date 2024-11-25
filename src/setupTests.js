import "@testing-library/jest-dom";

jest.setTimeout(60000);

const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (/Warning: ReactDOM.render is no longer supported/.test(args[0])) return;
  if (/Warning: `ReactDOMTestUtils.act` is deprecated/.test(args[0])) return;
  if (/Warning: React.createFactory/.test(args[0])) return;
  originalError.call(console, ...args);
};

console.warn = (...args) => {
  if (args[0]?.includes("React Router")) return;
  if (args[0]?.includes("⚠️ React Router Future Flag Warning")) return;
  originalWarn.call(console, ...args);
};

window.__reactRouterFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
  console.error = originalError;
  console.warn = originalWarn;
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  localStorage.clear();
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
}));
