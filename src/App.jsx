const initialTravellers = [
  {
    id: 1,
    name: "Jack",
    phone: 88885555,
    bookingTime: new Date(),
    seat: 1,
  },
  {
    id: 2,
    name: "Rose",
    phone: 88884444,
    bookingTime: new Date(),
    seat: 2,
  },
];
const initialMaxId = 2;
const initialTotalSeats = 10;

function TravellerRow(props) {
  const traveller = props.traveller;
  return (
    <tr key={traveller.id}>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{new Date(traveller.bookingTime).toLocaleString()}</td>{" "}
      {/* Format bookingTime */}
      <td>{traveller.seat}</td>
    </tr>
  );
}

function Display(props) {
  const travellers = props.travellers;
  return (
    <div className="container mt-4">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Booking Time</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {travellers.map((traveller) => (
            <TravellerRow key={traveller.id} traveller={traveller} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.bookTravellerForm;
    const { bookTraveller } = this.props;
    bookTraveller({
      name: form.travellername.value,
      phone: form.phone.value,
      bookingTime: new Date(),
      seat: form.seat.value,
    });
    form.reset();
  }

  render() {
    return (
      <div className="container mt-4">
        <form name="bookTravellerForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="travellername"
              placeholder="Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="seat"
              placeholder="Seat"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Traveller
          </button>
        </form>
      </div>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.deleteTravellerForm;
    const { deleteTraveller } = this.props;
    deleteTraveller(form.travellerId.value);
    form.reset();
  }

  render() {
    return (
      <div className="container mt-4">
        <form name="deleteTravellerForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="number"
              name="travellerId"
              placeholder="Traveller ID"
              className="form-control"
            />
          </div>
          <button className="btn btn-danger">Delete Traveller</button>
        </form>
      </div>
    );
  }
}

function DisplayFreeSeats(props) {
  return (
    <div className="mt-4">
      <p>
        Total Free Seats: <strong>{props.freeSeats}</strong>
      </p>
    </div>
  );
}

class Homepage extends React.Component {
  render() {
    const { totalSeats, travellers } = this.props;
    const occupiedSeats = travellers.map((traveller) =>
      parseInt(traveller.seat)
    );

    return (
      <div className="container mt-4">
        <DisplayFreeSeats freeSeats={totalSeats - occupiedSeats.length} />
        <div className="seat-grid">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            const isOccupied = occupiedSeats.includes(seatNumber);

            return (
              <span
                key={index}
                className={`seat-box ${
                  isOccupied ? "seat-occupied" : "seat-free"
                }`}>
                {seatNumber}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      travellers: [],
      selector: 1,
      maxId: 0,
      totalSeats: 10,
      deleteFeedback: "",
      addFeedback: "",
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value) {
    this.setState({ selector: value, deleteFeedback: "", addFeedback: "" }); // Reset feedback messages
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        travellers: initialTravellers,
        maxId: initialMaxId,
        totalSeats: initialTotalSeats,
      });
    }, 500);
  }

  bookTraveller(newTraveller) {
    this.setState((prevState) => {
      const occupiedSeats = prevState.travellers.map(
        (traveller) => traveller.seat
      );

      if (newTraveller.seat < 1) {
        return {
          addFeedback: "Seat number must be greater than 0.",
        };
      }

      if (newTraveller.seat > prevState.totalSeats) {
        return {
          addFeedback: `Seat number ${newTraveller.seat} exceeds total available seats.`,
        };
      }

      if (occupiedSeats.length >= prevState.totalSeats) {
        return {
          addFeedback:
            "Cannot add new traveller because all seats are occupied.",
        };
      }

      const updatedTraveller = { ...newTraveller, id: prevState.maxId + 1 };
      return {
        travellers: [...prevState.travellers, updatedTraveller],
        maxId: prevState.maxId + 1,
        addFeedback: `Traveller ${newTraveller.name} added successfully.`,
      };
    });
  }

  deleteTraveller(travellerId) {
    this.setState((prevState) => {
      const idToDelete = Number(travellerId);
      if (prevState.travellers.length === 0) {
        return { deleteFeedback: "No travellers found." };
      }

      const travellerExists = prevState.travellers.some(
        (traveller) => traveller.id === idToDelete
      );
      if (!travellerExists) {
        return {
          deleteFeedback: `Traveller with ID ${travellerId} not found.`,
        };
      }

      const updatedTravellers = prevState.travellers.filter(
        (traveller) => traveller.id !== idToDelete
      );
      return {
        travellers: updatedTravellers,
        deleteFeedback: `Traveller with ID ${travellerId} successfully deleted.`,
      };
    });
  }

  render() {
    const components = {
      1: (
        <Homepage
          totalSeats={this.state.totalSeats}
          travellers={this.state.travellers}
        />
      ),
      2: <Display travellers={this.state.travellers} />,
      3: (
        <div>
          <Add bookTraveller={this.bookTraveller} />
          {this.state.addFeedback && (
            <div className="alert alert-info mt-4">
              {this.state.addFeedback}
            </div>
          )}
        </div>
      ),
      4: (
        <div>
          <Delete deleteTraveller={this.deleteTraveller} />
          {this.state.deleteFeedback && (
            <div className="alert alert-info mt-4">
              {this.state.deleteFeedback}
            </div>
          )}
        </div>
      ),
    };

    const selector = this.state.selector;
    return (
      <div className="container mt-4">
        <h1>Ticket To Ride</h1>
        <div className="btn-group mb-4">
          <button
            className={`btn btn-outline-primary ${
              selector === 1 ? "active" : ""
            }`}
            onClick={() => this.setSelector(1)}>
            Homepage
          </button>
          <button
            className={`btn btn-outline-primary ${
              selector === 2 ? "active" : ""
            }`}
            onClick={() => this.setSelector(2)}>
            Display Travellers
          </button>
          <button
            className={`btn btn-outline-primary ${
              selector === 3 ? "active" : ""
            }`}
            onClick={() => this.setSelector(3)}>
            Add New Traveller
          </button>
          <button
            className={`btn btn-outline-primary ${
              selector === 4 ? "active" : ""
            }`}
            onClick={() => this.setSelector(4)}>
            Delete Traveller
          </button>
        </div>
        <div>{components[selector] || <Homepage />}</div>
      </div>
    );
  }
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById("contents"));
