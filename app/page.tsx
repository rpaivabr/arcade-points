'use client'

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState('');

  useEffect(() => {
    async function fetchUser() {
      if (profile) {
        const res = await fetch(`https://arcade-points-topaz.vercel.app/api?url=${profile}`)
        const data = await res.json()
        setUser(data)
      }
    }
    fetchUser()
  }, [profile])

  function handleClick() {
    if (inputRef.current) {
      const value = inputRef.current.value;
      setProfile(value);
    }
  }
 
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Calcular</button>
      { user && (<p>{JSON.stringify(user)}</p>) }
    </>
  )
}
