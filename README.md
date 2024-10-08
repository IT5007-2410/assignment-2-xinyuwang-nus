# Ticket to Ride

This is a basic React application that allows users to manage travellers for a ticketing system. The system lets users view all travellers, add new ones, delete existing travellers, and see available and occupied seats.

## Features

- **View Travellers**: Displays a list of all current travellers, including their ID, name, phone number, booking time, and assigned seat.
- **Add New Traveller**: Users can add a new traveller by providing their name, phone number, and seat number. 
- **Delete Traveller**: Users can delete a traveller by their ID, with feedback indicating if the deletion was successful or if the traveller was not found.
- **View Available and Occupied Seats**: Shows a visual representation of all available and occupied seats.
- **Feedback Messages**: Provides real-time feedback for operations like adding and deleting travellers, indicating success or failure.

## Project Structure

- **`initialTravellers`**: Holds the default list of travellers.
- **`Add` Component**: Contains the form for adding a new traveller, including validation for required fields and available seats.
- **`Delete` Component**: Contains the form for deleting a traveller by their ID.
- **`Display` Component**: Shows the list of all current travellers in a table format.
- **`Homepage` Component**: Displays the number of free seats and a visual grid showing occupied and free seats.
- **`TicketToRide` Component**: The main parent component that manages state and handles navigation between different views (Homepage, Add, Delete, Display).

## Components Overview

### 1. **Add Component**
Allows users to add a traveller to the system. The traveller’s name, phone number, and seat number are required. Seat number is validated to ensure it's below the total number of available seats, and that all seats are not already occupied.

### 2. **Delete Component**
Allows users to delete a traveller by ID. Feedback is provided if the traveller is successfully deleted or if no traveller with the provided ID exists.

### 3. **Display Component**
Displays a table of all travellers, showing their ID, name, phone, booking time, and assigned seat.

### 4. **Homepage Component**
Visual representation of available and occupied seats, with a summary of total free seats.

## Validation Rules

- **Add Traveller**:
  - All fields (name, phone, and seat) are required.
  - The seat number must be less than or equal to the total available seats.
  - Cannot add a new traveller if all seats are occupied.

- **Delete Traveller**:
  - A traveller can only be deleted if they exist in the system.
  - Feedback is shown if the traveller does not exist.

## How to Run the Application

1. Clone this repository.
2. Ensure you have `npm` and `React` installed.
3. In the project directory, run:

   ```bash
   npm install
   npm run compile
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Customization

- **Total Seats**: The total number of seats can be modified by changing the `initialTotalSeats` value in the `TicketToRide` component.
- **Initial Travellers**: The default set of travellers is stored in the `initialTravellers` array. You can customize it to reflect different initial data.

## Technologies Used

- **React**: For building the user interface.
- **Bootstrap**: For styling the buttons, forms, and alerts.
- **JavaScript**: For writing the logic and managing component states.