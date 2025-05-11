import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {

  
const {isLoading,authUser} = useAuthUser();

const isAuthenticated = Boolean(authUser);
const isOnboarded = authUser?.isOnboarded

const {theme} = useThemeStore()

   if(isLoading) return <PageLoader/>
  return (
    <div className='' data-theme={theme}>
      <Routes>
         <Route index path='/' element={ isAuthenticated && isOnboarded ? (<Layout showSidebar={true}> <HomePage/> </Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
         <Route path='/signup' element={!isAuthenticated? <SignupPage/> : <Navigate to="/"/>}/>
         <Route path='/login' element={!isAuthenticated ? <LoginPage/> :<Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
         <Route path='/notifications' element={isAuthenticated && isOnboarded  ? (<Layout showSidebar={true}><NotificationsPage/></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
         <Route path='/call/:id' element={isAuthenticated && isOnboarded  ? (<CallPage/>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
         <Route path='/chat/:id' element={isAuthenticated && isOnboarded  ? (<Layout showSidebar={false}><ChatPage/></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
         <Route path='/onboarding' element={isAuthenticated ? (!isOnboarded ? (<OnboardingPage/>):(<Navigate to="/"/>)) : (<Navigate to="/login"/>)}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
