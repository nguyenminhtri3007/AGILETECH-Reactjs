import './homepage.component.scss';
import Footer from '../components/Footer';
import DataWarehouse from '../components/DataWarehouse';
import { FC } from 'react';

interface HomePageProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onLogout: () => void;
  onProfile: () => void;
}

const HomePage: FC<HomePageProps> = ({ isLoggedIn, onSignIn, onLogout, onProfile }) => {
  return (
    <div className="homepage">
      <DataWarehouse isLoggedIn={isLoggedIn} onSignIn={onSignIn} onLogout={onLogout} onProfile={onProfile} />
      <Footer />
    </div>
  );
}

export default HomePage;
