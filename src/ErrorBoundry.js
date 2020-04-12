// mostly code from reactjs.org/docs/error-boundaries.html
// note to self: check Azure Monitor, TrackJS and Sentry (Consolidated Logging Services)

import React from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Catches exceptions generated in descendant components.
    // Unhandled exceptions will cause the entire component tree to unmount.
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    // Called immediately before rendering when new props or state is received.
    // Not called for the initial render.
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
      // use instead of Redirect, also from reachRouter
      // setTimeout(() => navigate("/"), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait 5 seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
