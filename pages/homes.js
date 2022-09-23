import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { prisma } from '@/lib/prisma';

// const prisma = new PrismaClient();

// const ListedHome = (home = null) => {

  // const { data: session } = useSession();
  // const [isOwner, setIsOwner] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     if (session?.user) {
  //       try {
  //         const owner = await axios.get(`/api/homes/${home.id}/owner`);
  //         setIsOwner(owner?.id === session.user.id);
  //       } catch (e) {
  //         setIsOwner(false);
  //       }
  //     }
  //   })();
  // }, [session?.user]);

  // const router = useRouter();
  // const [deleting, setDeleting] = useState(false);

  // const deleteHome = async () => {
  //   let toastId;
  //   try {
  //     toastId = toast.loading('Deleting...');
  //     setDeleting(true);
  //     // Delete home from DB
  //     await axios.delete(`/api/homes/${home.id}`);
  //     // Redirect user
  //     toast.success('Successfully deleted', { id: toastId });
  //     router.push('/homes');
  //   } catch (e) {
  //     console.log(e);
  //     toast.error('Unable to delete home', { id: toastId });
  //     setDeleting(false);
  //   }
  // };

  // return (
  //   <Layout>
  //     <div className="max-w-screen-lg mx-auto">
  //       <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
  //         <div>
  //           <h1 className="text-2xl font-semibold truncate">
  //             {home?.title ?? ''}
  //           </h1>
  //           <ol className="inline-flex items-center space-x-1 text-gray-500">
  //             <li>
  //               <span>{home?.guests ?? 0} guests</span>
  //               <span aria-hidden="true"> · </span>
  //             </li>
  //             <li>
  //               <span>{home?.beds ?? 0} beds</span>
  //               <span aria-hidden="true"> · </span>
  //             </li>
  //             <li>
  //               <span>{home?.baths ?? 0} baths</span>
  //             </li>
  //           </ol>
  //         </div>

  //         {isOwner ? (
  //           <div className="flex items-center space-x-2">
  //             <button
  //               type="button"
  //               disabled={deleting}
  //               onClick={() => router.push(`/homes/${home.id}/edit`)}
  //               className="px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
  //             >
  //               Edit
  //             </button>

  //             <button
  //               type="button"
  //               disabled={deleting}
  //               onClick={deleteHome}
  //               className="rounded-md border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none transition disabled:bg-rose-500 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
  //             >
  //               {deleting ? 'Deleting...' : 'Delete'}
  //             </button>
  //           </div>
  //         ) : null}
  //       </div>

  //       {/* ... */}
	// 		</div>
  //   </Layout>
  // );
// }

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Get all homes from the authenticated user
  const homes = await prisma.home.findMany({
    where: { owner: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
  });

  // Pass the data to the Homes component
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}

const Homes = ({ homes = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Your listings</h1>
      <p className="text-gray-500">
        Manage your homes and update your listings
      </p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
};

export default Homes;
