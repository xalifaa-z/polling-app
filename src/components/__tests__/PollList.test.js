import React from "react";
import { render, screen } from "@testing-library/react";
import PollList from "../PollList";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe("PollList Component", () => {
  const mockPolls = [
    {
      id: "1",
      optionOne: { text: "Option One Text" },
      optionTwo: { text: "Option Two Text" },
    },
    {
      id: "2",
      optionOne: { text: "Another Option One" },
      optionTwo: { text: "Another Option Two" },
    },
  ];

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <PollList polls={mockPolls} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders all polls correctly", () => {
    render(
      <MemoryRouter>
        <PollList polls={mockPolls} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Option One Text/i)).toBeInTheDocument();
    expect(screen.getByText(/Another Option One/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Would You Rather/i)).toHaveLength(mockPolls.length);
    expect(screen.getAllByText(/View Poll/i)).toHaveLength(mockPolls.length);
  });
});
