import { redirect } from 'next/navigation';
import { BASE_URL } from '../config/api';

interface RedirectPageProps {
  params: Promise<{ shortCode: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = await params;

  // We redirect the user directly to the backend's redirection endpoint
  // This ensures the backend handles the hit counting and the actual redirect
  redirect(`${BASE_URL}/${shortCode}`);

  // This part will never be reached, but needed for TS/Next.js structure
  //if no route found with that short code, it will return 404 or render defualt 404 page 
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <p className='text-lg text-gray-600'>
        Redirecting you to your destination...
      </p>
    </div>
  );
}
