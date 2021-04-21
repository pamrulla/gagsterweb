import SignupForm from '../components/SignupForm';
import { useAppState, useAppDispatchState } from '../context/state';

export default function Home() {
  const isl = useAppState()
  console.log(isl)

  return (
        <SignupForm></SignupForm>
  )
}
