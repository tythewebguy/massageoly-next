// pages/accounts/[id].js

import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';

// Instantiate it

export async function getServerSideProps({ params }) {
  // Get all accounts
  const data = await prisma.accounts.findFirst({
    where: { account_id: Number(params.id)}
  })
  // Pass the data to the Home page
  return {
    props: {
      account: JSON.parse(JSON.stringify(data)),
    }
  };
}

export default function Account({ account = {}}) {

  return (
    <ul>
      <li>
        ID:<br/>{account.account_id}
      </li>
      <li>
        Name:<br/>{account.account_name}
      </li>
      <li>
        Header URL: <br/>{account.header_url}
      </li>
      <li>
        Notes: <br/>{account.notes}
      </li>
    </ul>
  );

}