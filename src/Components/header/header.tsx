import Link from "next/link"
import styles from './header.module.css'
import Navbar from "./navbar"
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import LogoutButton from "./logoutButton";


const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
      <Navbar isAdmin={userPayload?.isAdmin || false} />
      <div className={styles.right}>
        {userPayload ? 
        (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              {userPayload?.username}           
            </strong>
            < LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href='/login'>Login</Link>
            <Link className={styles.btn} href='/register'>Register</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header