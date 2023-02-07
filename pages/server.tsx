import React from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import Layout from "../components/layout"

import type { GetServerSidePropsContext } from "next"
import type { Session } from "next-auth"

import { getUsers } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { users, accounts } = await getUsers();
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
      users, 
      accounts
    },
  }
};

export default function ServerSidePage({ session, users, accounts }: { session: Session, users: any, accounts:any }) {
  console.log('ACCOUNTS ----------');
  console.log(accounts);

  console.log('USERS -----------');
  console.log(users);

  const [accountsVisible, setAccountsVisible] = React.useState<boolean>(false);
  const [usersVisible, setUsersVisible] = React.useState<boolean>(false);

  return (
    <Layout>
      <h1>Server Page</h1>

      <div style={{ backgroundColor: '#323232', color: '#fff', marginBottom: '3rem', padding: '1rem', borderRadius: '0.5rem' }}>
        <code>
          <div style={{ marginBottom: '1rem' }}>Apple Account Not Linking Troubleshooting</div>
          <div style={{ marginBottom: '1rem' }}>
            I. Log into your Apple account first, and then log into your Google account by clicking the <strong>Link Account</strong> button 
            up top. In this scenario, the two accounts will be successfully linked. There will be two accounts and one user.
          </div>
          <div>
            II. Log into your Google account first, and then log into your Apple account
            by clicking the <strong>Link Account</strong> button up top. In this scenario, the two accounts are not linked. There will be two accounts
            and two users, meaning that trying to link an Apple account with another provider does not work. The user would have to log in with their
            Apple account first and then proceed to log into their other provider account.
          </div>
        </code>
      </div>

      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
        <strong>Accounts in Database: {accounts && accounts.length || 0}</strong>
        { (accounts && accounts.length > 0) &&
          <span 
            onClick={() => setAccountsVisible(!accountsVisible)} 
            style={{ marginLeft: '1rem', textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
          >
            View Accounts
          </span>
        }
      </div>

      { accountsVisible && <div>{JSON.stringify(accounts)}</div> }

      <div style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        <strong>Users in Database: {users && users.length || 0}</strong>
        { (users && users.length > 0) && 
          <span 
            onClick={() => setUsersVisible(!usersVisible)} 
            style={{ marginLeft: '1rem', textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
          >
            View Users
          </span>
        }
      </div>

      { usersVisible && <div>{JSON.stringify(users)}</div> }

      <a href='/api/deleteData' style={{ marginTop: '1rem', color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>Delete Data</a>
    </Layout>
  )
};
