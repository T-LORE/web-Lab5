'use client';

import { logout } from "../../../api/auth";
import './ButtonLogout.css';
import { useRouter } from 'next/navigation'; 

export default function ButtonLogout() {
    const router = useRouter();
    function handleClick() {
        logout();
        router.push('/login');
    }
  
    return (
        <div className="ButtonLogout">
            <button onClick={handleClick} className="button-logout"> Выйти </button>
        </div>
  );
}