import { reactive } from 'vue'

const buttons = reactive([
    'Rad', 'Deg', 'x!', '(', ')',
    '%', 'AC', 'Inv', 'sin', 'ln',
    '7', '8', '9', '÷', 'π', 
    'cos', 'log', '4', '5', '6', 
    '×', 'e', 'tan', '√', '1', 
    '2', '3', '-', 'Ans', 'EXP',
    'x<sup>y</sup>', '0', '.', '=', '+'])

export function useSymbols() {
    return buttons
}

export function useInverseSymbols() {
    let rand_index = Math.floor(Math.random() * 35)
    buttons[rand_index] = "bCD"
}