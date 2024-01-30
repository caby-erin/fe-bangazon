import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <h1>Welcome to Hip Hop Pizza and Wings</h1>

      <Link passHref href="/orders/orders">
        <Button variant="danger" type="button" size="lg" className="copy-btn">
          View Orders
        </Button>
      </Link>

      <Link passHref href="/orders/new">
        <Button variant="danger" type="button" size="lg" className="copy-btn">
          Create Order
        </Button>
      </Link>

      <Link passHref href="/revenues/revenues">
        <Button variant="danger" type="button" size="lg" className="copy-btn">
          View Revenue
        </Button>
      </Link>
    </div>
  );
}

export default Home;
