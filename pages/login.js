import LoginForm from '../components/LoginForm';
import { useAppState, useAppDispatchState } from '../context/state';

export default function Home() {

  const isl = useAppState()
  console.log(isl)

  return (
        <LoginForm></LoginForm>
  )
}
