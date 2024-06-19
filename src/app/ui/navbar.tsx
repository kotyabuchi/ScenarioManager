'use client';

import Image from 'next/image';
import ProfileMenu from './profile-menu';

export default function Navbar() {
  return (
    <div className="navbar h-16 bg-base-200 z-10">
      <div className="navbar-start gap-2">
        <a className="btn btn-ghost text-xl w-60">シナプレ管理くん</a>
        <div className="dropdown">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </button>
        </div>
      </div>
      <div className="navbar-center">

      </div>
      <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle dropdown dropdown-bottom dropdown-end">
          <Image
            className=" object-cover w-11 h-11 rounded-full"
            src="/image.png"
            alt="userアイコン"
            width={44}
            height={44}
            sizes=''
          />
          <ProfileMenu />
        </button>
      </div>
    </div>
  );
}