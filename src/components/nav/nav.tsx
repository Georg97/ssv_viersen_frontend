import React from 'react';
import MenuButton from './menu/menu_button';
import NavItem from './nav_item';
import { nav_item_interface } from './nav_item_interface';

export default function Nav({ items }: { items: nav_item_interface[] }) {
    return (
        <nav className="
             dark:bg-stone-800 bg-blue-400 bottom-2 border-b-4 border-green-500 py-3 h-36 flex flex-row
        ">
            <ul className="
                h-4/5 container
                sm:flex sm:gap-4 sm:mx-auto
            ">
                {items.map((item, i) => (
                    <NavItem name={item.name} image={item.image} key={item.name} url={item.url} />
                ))}
            </ul>
            {/* <MenuButton /> */}
        </nav>
    )
}
