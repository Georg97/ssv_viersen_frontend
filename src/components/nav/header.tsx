import { get_menu_entries } from "@/utils/menu";
import Nav from "./nav";

export default function Header() {
    const entries = get_menu_entries()

    return (
        <Nav items={entries} />
    )
}
