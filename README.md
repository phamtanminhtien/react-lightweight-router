# React Lightweight Router

A lightweight, type-safe routing solution for React applications with support for dynamic route parameters.

## Features

- 🪶 **Lightweight** - No external dependencies
- 🔒 **Type-safe** - Built with TypeScript
- 🎯 **URL Parameters** - Easy access to route parameters with `useParams` hook
- 🧭 **Programmatic Navigation** - Navigate between routes using the `useRouter` hook
- 🔗 **Link Component** - Declarative navigation with the `Link` component
- 📦 **Zero Configuration** - Works out of the box

## Installation

```bash
npm install react-lightweight-router
# or
yarn add react-lightweight-router
```

## Basic Usage

```tsx
import { Router, Route, Link } from "react-lightweight-router";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Router>
  );
};
```

## URL Parameters

The router supports URL parameters using the `:param` syntax. Parameters can be accessed using the `useParams` hook:

```tsx
// Route definition
<Route path="/users/:userId" element={<UserProfile />} />;

// UserProfile component
const UserProfile = () => {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
};
```

### Multiple Parameters

You can use multiple parameters in a single route:

```tsx
// Route definition
<Route path="/org/:orgId/users/:userId" element={<OrgUser />} />;

// Component
const OrgUser = () => {
  const { orgId, userId } = useParams();
  return (
    <div>
      <h1>Organization: {orgId}</h1>
      <h2>User: {userId}</h2>
    </div>
  );
};
```

## Programmatic Navigation

Use the `useRouter` hook for programmatic navigation:

```tsx
import { useRouter } from "react-lightweight-router";

const NavigationExample = () => {
  const { navigate } = useRouter();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
};
```

## API Reference

### `<Router>`

The root component that provides routing context.

```tsx
<Router>{/* Your app content */}</Router>
```

### `<Route>`

Defines a route and its corresponding component.

```tsx
<Route path="/path" element={<Component />} />
```

Props:

- `path`: string - The route path pattern
- `element`: JSX.Element - The component to render when the route matches

### `<Link>`

A component for navigation between routes.

```tsx
<Link to="/path">Navigate</Link>
```

Props:

- `to`: string - The target path
- `children`: React.ReactNode - Link content

### `useParams`

A hook to access URL parameters.

```tsx
const { paramName } = useParams();
```

### `useRouter`

A hook to access router functionality.

```tsx
const { path, navigate } = useRouter();
```

Returns:

- `path`: string - Current path
- `navigate`: (to: string) => void - Function to navigate programmatically

## Example

Here's a complete example showing various features:

```tsx
import { Router, Route, Link, useParams } from "react-lightweight-router";

// Components
const Home = () => <h1>Home</h1>;

const UserProfile = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

// App
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users/123">View User 123</Link>
      </nav>

      <Route path="/" element={<Home />} />
      <Route path="/users/:userId" element={<UserProfile />} />
    </Router>
  );
};

export default App;
```

## TypeScript Support

The router is built with TypeScript and provides full type safety. Parameter types are automatically inferred from the route pattern.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Tiến Phạm Tấn Minh]
