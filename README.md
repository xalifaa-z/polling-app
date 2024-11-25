# Would You Rather Project

A web app that lets users play the "Would You Rather?" game. The application requires only `npm install` and `npm start` to install and launch.

## Description

This is a polling application where users can:

- Create new polls with two options
- Answer existing polls
- View poll results with vote percentages
- Track their ranking on the leaderboard
- See answered and unanswered polls in separate views

## Installation and Launch Instructions

1. Install dependencies:
   npm install

2. Start the application:
   npm start

The app will automatically open in your default browser at `http://localhost:3000`.

## Features

- User authentication (no backend required - uses mock data)
- Create new polls
- Answer existing polls
- View poll statistics
- Track user rankings on the leaderboard
- Persistent state across page refreshes

## Technologies Used

- React
- Redux Toolkit
- React Router v6
- Local Storage for data persistence

## Project Structure

polling-app/
├── src/
│ ├── components/ # React components
│ ├── features/ # Redux slices and actions
│ ├── utils/ # Utility functions
│ └── DATA.js # Mock backend data

## Notes

- No additional configuration required
- No environment variables needed
- No database setup necessary
