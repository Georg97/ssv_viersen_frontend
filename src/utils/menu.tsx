import {nav_item_interface} from '../components/nav/nav_item_interface'

export class nav_item implements nav_item_interface {
    name: string
    url: string
    image: string | null
    constructor(
          name: string
        , url: string
        , image: string | null = null
    ) {
        this.name = name
        this.url = url
        this.image = image

    }
}

export function get_menu_entries() {
    return [
          new nav_item('SSV', '/')
        , new nav_item('Fachschaften', '/fachschaften')
    ]
}
