import { MenuItem, OrderItem } from "../types"

export type OrderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'add-tip', payload: { tip: number } } |
    { type: 'place-order' }


export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState: OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {

    switch (action.type) {
        case 'add-item':
            const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)
            let order: OrderItem[] = [];
            if (itemExist) {
                order = state.order.map(orderItem => orderItem.id === action.payload.item.id ?
                    { ...orderItem, quantity: orderItem.quantity + 1 } :
                    orderItem
                )
            } else {
                const newItem = { ...action.payload.item, quantity: 1 }
                order = [...state.order, newItem]
            }

            return {
                ...state,
                order
            }

        case 'remove-item':

            let orderRemove: OrderItem[] = [];

            orderRemove = state.order.filter(item => item.id !== action.payload.id)

            return {
                ...state,
                order: orderRemove
            }


        case 'add-tip':

            return {
                ...state,
                tip: action.payload.tip
            }

        case 'place-order':
            return {
                ...state,
                order: [],
                tip: 0
            }

        default:
            return state
    }
}