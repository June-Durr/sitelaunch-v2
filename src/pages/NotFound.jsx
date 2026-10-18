import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Kicker from "../components/common/Kicker";

const NotFound = () => {
  return (
    <section className="section-y-lg flex min-h-[70vh] items-center bg-ivory">
      <Helmet>
        <title>Page not found | SiteLaunch Studios</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container-page w-full">
        <Kicker>Error 404</Kicker>
        <h1 className="type-title mt-3 max-w-2xl text-ink">Page not found.</h1>
        <p className="type-lead mt-4 max-w-xl text-ink/80 sm:mt-5">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link to="/" className="btn btn-primary w-full sm:w-auto">
            Return to Homepage
          </Link>
          <Link to="/insights" className="link text-base">
            Read the Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
