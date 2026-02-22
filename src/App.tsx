import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { fetchCampaigns } from './store/campaignsSlice';
import { fetchFilterDefinitions } from './store/filtersSlice';
import { useFilterPersistence } from './hooks/useFilterPersistence';
import { Header } from './components/Header/Header';
import { CampaignList } from './components/CampaignList/CampaignList';
import { SidePanel } from './components/SidePanel/SidePanel';
import styles from './App.module.css';

function App() {
  const dispatch = useAppDispatch();
  useFilterPersistence();

  useEffect(() => {
    dispatch(fetchCampaigns());
    dispatch(fetchFilterDefinitions());
  }, [dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <CampaignList />
      </main>
      <SidePanel />
    </div>
  );
}

export default App;
