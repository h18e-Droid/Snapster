"use client"
import { selectLoggedIn } from "@/features/auth/model/authSelectors"
import {useSelector} from "react-redux";

const SingIn = () => {
  const isAuth = useSelector(selectLoggedIn)
  console.log(isAuth)
  return <>SingIn</>
}

export default SingIn
