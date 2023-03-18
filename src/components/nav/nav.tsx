import React, { useState } from 'react';
import LoginForm from '../login/login';
import MenuButton from './menu/menu_button';
import NavItem from './nav_item';
import { nav_item_interface } from './nav_item_interface';
// import '@/styles/Nav.module.css';
// import '@/styles/Login.module.css';
// import './Nav.module.css';

export default function Nav({ items }: { items: nav_item_interface[] }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <nav className="
              hard-gradient bottom-2 border-b-4 border-green-500 py-3 md:h-36 flex flex-col items-start md:flex-row px-8 md:px-[10%] xl:px-[15%] 2xl:px-[20%] md:items-center
        ">
            <button onClick={() => setExpanded(!expanded)} className="md:hidden flex flex-col gap-2 w-16">
              <span className="border-2 border-stone-900 bg-stone-900 dark:border-stone-300 dark:bg-stone-300 w-full h-3 rounded-sm"></span>
              <span className="border-2 border-stone-900 bg-stone-900 dark:border-stone-300 dark:bg-stone-300 w-full h-3 rounded-sm"></span>
              <span className="border-2 border-stone-900 bg-stone-900 dark:border-stone-300 dark:bg-stone-300 w-full h-3 rounded-sm"></span>
            </button>
            <div className={`transition-all ${expanded ? 'h-fit' : 'h-0 overflow-hidden'} md:h-fit md:grid md:grid-cols-12 md:mx-auto md:w-full`}>
                <ul className="
                h-4/5 container
                col-span-4 md:items-center
                flex flex-col md:flex-row md:gap-4 md:mx-auto
                items-start mt-4 md:mt-0 gap-2
            ">
                    {items.map((item, i) => (
                        <NavItem name={item.name} image={item.image} key={item.name} url={item.url} />
                    ))}
                </ul>
                <div className="col-span-6"></div>
                <LoginForm className="col-span-2" />
            </div>
        </nav>
    )
}

/*

tailwindcss example code for responsive navbar:


<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a href="https://flowbite.com/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


*/
