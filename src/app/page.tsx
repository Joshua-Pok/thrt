import SubHeader from './components/Subheader';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './globals.scss';
import PoolCard from './components/Content/PoolCard';
import { usePools } from './components/Provider/PoolProvider';
import { useState, useRef, useCallback } from 'react';

interface ScrollNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const ScrollNavigation = ({ currentPage, totalPages, onPrev, onNext }: ScrollNavigationProps) => (
  <>
    <Button 
      style={{ position: 'fixed', left: '20px', zIndex: 1000, bottom: '40vh' }}
      onClick={onPrev}
      disabled={currentPage === 0}
    >
      <LeftOutlined />
    </Button>
    <Button 
      style={{ position: 'fixed', right: '20px', zIndex: 1000, bottom: '40vh' }}
      onClick={onNext}
      disabled={currentPage >= totalPages - 1}
    >
      <RightOutlined />
    </Button>
  </>
);

// Custom hook for scroll management
const useScrollNavigation = (cardsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToPage = useCallback((page: number) => {
    setCurrentPage(page);
    const scrollAmount = page * cardsPerPage * 400; // Assuming each card is ~400px wide
    scrollContainerRef.current?.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, [cardsPerPage]);

  const scrollToNext = useCallback(() => {
    scrollToPage(currentPage + 1);
  }, [currentPage, scrollToPage]);

  const scrollToPrev = useCallback(() => {
    scrollToPage(currentPage - 1);
  }, [currentPage, scrollToPage]);

  const scrollToPool = useCallback((poolIndex: number) => {
    const targetPage = Math.floor(poolIndex / cardsPerPage);
    scrollToPage(targetPage);
  }, [cardsPerPage, scrollToPage]);

  return {
    currentPage,
    scrollContainerRef,
    scrollToNext,
    scrollToPrev,
    scrollToPool
  };
};

export default function Home() {
  const { pools } = usePools();
  const cardsPerPage = 3;
  const totalPages = Math.ceil(pools.length / cardsPerPage);
  
  const { 
    currentPage, 
    scrollContainerRef, 
    scrollToNext, 
    scrollToPrev, 
    scrollToPool 
  } = useScrollNavigation(cardsPerPage);

  return (
    <>
      <SubHeader pools={pools} onPoolSelect={scrollToPool} />
      <div className="content" style={{ position: 'relative' }}>
        <ScrollNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={scrollToPrev}
          onNext={scrollToNext}
        />
        
        <div 
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            gap: '20px',
            padding: '0 20px'
          }}
        >
          {pools.map((pool) => (
            <div key={pool.id} style={{ minWidth: '380px', flexShrink: 0 }}>
              <PoolCard pool={pool} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
