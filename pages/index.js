import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';

// Instantiate it

export async function getServerSideProps() {
  // Get all accounts
  const data = await prisma.account.findMany() // prisma.accounts.findMany();
  // Pass the data to the Home page
  return {
    props: {
      accounts: JSON.parse(JSON.stringify(data)),
    }
  };
}

export default function Home({ accounts = []}) {
  accounts.sort((a, b) => {
    const nameA = a.account_name;
    const nameB = b.account_name;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  })
  return (
    <div className="container mx-auto px-15">
      <h1 className="text-4xl">Accounts</h1>
      <ul>
      {accounts.map(account => (
        <li key={account.account_id}><a href={`schedule/${account.account_id}`}>{account.account_name}</a></li>
      ))}
    </ul>
    <button type="button" className="h-10 px-6 font-semibold rounded-md bg-black text-white">Create Account</button>
   </div>
    // <Layout>
    //   <h1 className="text-xl font-medium text-gray-800">
    //     Top-rated places to stay
    //   </h1>
    //   <p className="text-gray-500">
    //     Explore some of the best places in the world
    //   </p>
    //   <div className="mt-8">
    //     <Grid homes={homes} />
    //   </div>
    // </Layout>
  );
}
