import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import Header from 'components/header';
import styles from '../../styles/Analyze-Psellos.module.css'
import { useText } from '../api/services/use-text';
 
export default function Page() {
  const router = useRouter();
  const { text } = useText({

    url: `/api/data/text`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      text_id: router.query.id
    }
  });

  return (
    <div>
      <p>Post: {router.query.id}</p>
    </div>
  )

}

export const getServerSideProps = withPageAuthRequired();