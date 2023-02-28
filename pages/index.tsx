import dynamic from 'next/dynamic';

const ISSViewer = dynamic(() => import('../components/ISSViewer'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ISSViewer />
    </>
  );
}
