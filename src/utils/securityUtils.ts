import React from 'react';

// Anti-copy paste functionality
export const preventCopyPaste = (event: React.ClipboardEvent) => {
  event.preventDefault();
  alert('Copy and paste functionality is disabled for security reasons.');
};

// Anti-screenshot functionality
export const setupAntiScreenshot = () => {
  if (typeof document !== 'undefined') {
    // This is a simple attempt, but true anti-screenshot is limited by browser capabilities
    document.addEventListener('keyup', (e) => {
      // Detect print screen attempt
      if (e.key === 'PrintScreen') {
        // Alert the user
        alert('Screenshots are not allowed for security reasons.');
        return false;
      }
    });

    // Disable context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }
};

// Create a HOC for components that need anti-copy paste
export const withSecurityFeatures = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    React.useEffect(() => {
      setupAntiScreenshot();
    }, []);

    return React.createElement(Component, {
      ...props,
      onCopy: preventCopyPaste,
      onCut: preventCopyPaste,
      onPaste: preventCopyPaste
    });
  };
};