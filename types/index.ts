

export interface UserProps {
    id: string;
    name: string;
    email: string;
    role: "STAFF" | "ADMIN";
}
export interface LoginProps {
    id: string;
    name: string;
    email: string;
    role: "STAFF" | "ADMIN";
    token: string;
}

export interface CategoryProps{
    id: string;
    name: string;
    createAt: string;
}
export interface ProductsProps{
    id: string;
    name: string;
    description: string;
    price: number;
    banner: string;
    disabled: boolean;
    category_id: string;
    createAt: string;
    category?: CategoryProps
}

export interface OrderProps{
    id: string;
    table: string;
    name?: string;
    status: boolean;
    draft: boolean;
    createAt: string;
    items?: ItemProps[];
}

export interface ItemProps{
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    createAt: string;
    product: ProductsProps
}

export interface CreateOrderRequest{
    table: string;
    name?: string;
}

export interface AddItemProps{
    amount: number;
    order_id: string;
    product_id: string;
}

export interface SendOrderRequest{
    id: string;
    order_id: string;
    name?: string;
    table: string;
    status: boolean;
    draft: boolean;
}