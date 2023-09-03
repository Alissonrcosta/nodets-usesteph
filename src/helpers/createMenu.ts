type MenuOptions = '' | 'all' | 'earrings' | 'chains' | 'rings';
export const createMenu = (activeMenu: MenuOptions) => {
    let returnObject = {
        all: false,
        earrings: false,
        chains: false,
        rings: false
    }

    if(activeMenu !== ''){
        returnObject[activeMenu] = true;
    }

    return returnObject;
}