import React from 'react';

type SuspenseProps = {
  lazyChildren: React.ReactElement;
};

const Suspense: React.FC<SuspenseProps> = ({ lazyChildren }) => (
  <React.Suspense fallback={<>...</>}>{lazyChildren}</React.Suspense>
);

export default Suspense;
