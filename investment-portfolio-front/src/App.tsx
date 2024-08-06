import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginView } from './views/LoginView';
import { Route, Routes } from 'react-router-dom';
import { ProtectedLoginRoute } from './helpers/ProtectedLoginRoute';
import { RegisterView } from './views/RegisterView';
import { LogoutForm } from './views/LogoutForm';
import { HomePage } from './views/HomePage';
import { NotFoundView } from './views/NotFoundView';
import { Header } from './views/Header';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import { EditBalance } from './views/EditBalance';
import { ListOfInvestmentsView } from './views/ListOfInvestmentsView';
import { AddInvestmentView } from './views/AddInvestmentView';

const queryClient = new QueryClient();

function App() {
  return <div className='App'>
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/login' element={<ProtectedLoginRoute element={<LoginView />} />} />
        <Route path='/user/register' element={<ProtectedLoginRoute element={<RegisterView />} />} />
        <Route path='/user/logout' element={<ProtectedRoute element={<LogoutForm />} />} />
        <Route path='/user/balance' element={<ProtectedRoute element={<EditBalance />} />} />
        <Route path='/investment/add' element={<ProtectedRoute element={<AddInvestmentView />} />} />
        <Route path='/investment/list' element={<ProtectedRoute element={<ListOfInvestmentsView />} />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </QueryClientProvider>
  </div>
}

export default App
