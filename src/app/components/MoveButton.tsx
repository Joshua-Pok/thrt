import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import ConsolesMenu from './ConsolesMenu';
export default function MoveButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const button = buttonRef.current?.getBoundingClientRect();

    if (button) {
      setMenuPosition({
        x: button.left - 166,
        y: button.bottom,
      });
    }
    setIsMenuOpen(true);
  }, []);

  // const handleCloseMenu() => {
  //     setIsMenuOpen(false);
  // }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isMenuOpen) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        buttonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Button style={{ background: '#3B82F6' }}>Move</Button>

      {isMenuOpen && (
        <ConsolesMenu/>
      )}
    </>
  );
}
