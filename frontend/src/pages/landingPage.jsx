import React from 'react'
import TopNavBar from '../components/PageWiseComponents/landingPage/TopNavBar'
import Footer from '../components/PageWiseComponents/landingPage/Footer';
import Main from '../components/PageWiseComponents/landingPage/Main';

function landingPage() {
  return (
    <div className='bg-zinc-800 h-full w-full'>
        <header className='px-20'>
            <TopNavBar/>
        </header>
        
        <main className='px-20'>
            <Main/>
        </main>
        <footer className='border-t border-white/25 pt-4 px-20'>
            <Footer/>
        </footer>
    </div>
  )
}


export default landingPage;