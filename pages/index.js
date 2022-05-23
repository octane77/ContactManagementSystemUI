import Head from 'next/head'
import Navbar from "../components/Navbar";
import ContactList from "../components/ContactList";
import AddContact from "../components/AddContact";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Contact Management System</title>
      </Head>
        <Navbar />

      <main>
          <AddContact />
          {/*<ContactList />*/}

      </main>

    </div>
  )
}
