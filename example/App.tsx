import React from "react";
import { Router, Route, Link, useParams } from "react-lightweight-router";

interface Partner {
  id: string;
  name: string;
  industry: string;
}

interface Customer {
  id: string;
  name: string;
  plan: string;
}

interface CustomersMap {
  [partnerId: string]: Customer[];
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the React Lightweight Router example!</p>
  </div>
);

// Mock data
const PARTNERS: Partner[] = [
  { id: "p1", name: "Acme Corp", industry: "Technology" },
  { id: "p2", name: "Global Industries", industry: "Manufacturing" },
  { id: "p3", name: "Future Solutions", industry: "Consulting" },
];

const CUSTOMERS: CustomersMap = {
  p1: [
    { id: "c1", name: "John Smith", plan: "Enterprise" },
    { id: "c2", name: "Sarah Wilson", plan: "Professional" },
  ],
  p2: [
    { id: "c3", name: "Mike Johnson", plan: "Enterprise" },
    { id: "c4", name: "Emily Brown", plan: "Basic" },
  ],
  p3: [
    { id: "c5", name: "David Lee", plan: "Professional" },
    { id: "c6", name: "Lisa Anderson", plan: "Enterprise" },
  ],
};

const Partners: React.FC = () => (
  <div>
    <h1>Partners</h1>
    <div
      className="card-grid"
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {PARTNERS.map((partner: Partner) => (
        <div
          key={partner.id}
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h2>{partner.name}</h2>
          <p>
            <strong>Industry:</strong> {partner.industry}
          </p>
          <Link to={`/partner/${partner.id}`}>View Partner Details →</Link>
        </div>
      ))}
    </div>
  </div>
);

const PartnerDetails: React.FC = () => {
  const { partnerId } = useParams();
  const partner = PARTNERS.find((p: Partner) => p.id === partnerId);
  const customers = CUSTOMERS[partnerId as keyof typeof CUSTOMERS] || [];

  if (!partner) {
    return <div>Partner not found!</div>;
  }

  return (
    <div>
      <h1>{partner.name}</h1>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Industry:</strong> {partner.industry}
        </p>
        <p>
          <strong>Partner ID:</strong> {partner.id}
        </p>
      </div>

      <h2>Customers</h2>
      <div
        className="card-grid"
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {customers.map((customer: Customer) => (
          <div
            key={customer.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <h3>{customer.name}</h3>
            <p>
              <strong>Plan:</strong> {customer.plan}
            </p>
            <Link to={`/partner/${partnerId}/customer/${customer.id}`}>
              View Customer Details →
            </Link>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Link to="/partners">← Back to Partners</Link>
      </div>
    </div>
  );
};

const CustomerDetails: React.FC = () => {
  const { partnerId, customerId } = useParams();
  const partner = PARTNERS.find((p: Partner) => p.id === partnerId);
  const customers = CUSTOMERS[partnerId as keyof typeof CUSTOMERS];
  const customer = customers?.find((c: Customer) => c.id === customerId);

  if (!partner || !customer) {
    return <div>Customer not found!</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <small>
          <Link to="/partners">Partners</Link>
          {" > "}
          <Link to={`/partner/${partnerId}`}>{partner.name}</Link>
          {" > "}
          Customer Details
        </small>
      </div>

      <h1>Customer Profile</h1>
      <div
        style={{
          padding: "25px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "600px",
          background: "#fff",
        }}
      >
        <h2>{customer.name}</h2>
        <div style={{ marginTop: "15px" }}>
          <p>
            <strong>Customer ID:</strong> {customer.id}
          </p>
          <p>
            <strong>Plan:</strong> {customer.plan}
          </p>
          <p>
            <strong>Partner:</strong> {partner.name}
          </p>
          <p>
            <strong>Partner Industry:</strong> {partner.industry}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/partner/${partnerId}`}>← Back to Partner Details</Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <nav style={{ marginBottom: "30px" }}>
          <ul
            style={{
              listStyle: "none",
              background: "#fff",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <li style={{ display: "inline", marginRight: "1rem" }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ display: "inline" }}>
              <Link to="/partners">Partners</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" element={<Home />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partner/:partnerId" element={<PartnerDetails />} />
        <Route
          path="/partner/:partnerId/customer/:customerId"
          element={<CustomerDetails />}
        />
      </div>
    </Router>
  );
};

export default App;
