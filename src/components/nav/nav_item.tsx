import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { nav_item_interface } from './nav_item_interface';

export default function NavItem(props: nav_item_interface) {
    return (
        <Link href={props.url} className="
            font-bold text-2xl hover:text-lime-500
        ">
            <div>
                <div className="h-full w-full">
                    {props.image && (<Image src={props.image} alt="imr-logo" width="240" height="240" className="h-full w-auto" />)}
                    {props.image ? <></> : <span className="relative top-1/2 -translate-y-1/2">{props.name}</span>}
                </div>
            </div>
        </Link>
    )
}
