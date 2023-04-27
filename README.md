# Calculator
Basic calculator made from HTML5/CSS/Javascript
live view link: https://rwicklun.github.io/Calculator/

# Expected behavior

## Clear button:
    Will always reset state to 0 with no operands or operators set.

## Delete button:
    Will decrement by one action.
    If the final nonzero digit of the first operand would be deleted set state to 0
    Can delete until cleared, from any state 
    Will not reset state to previous e.g. It is unable to affect previously completed calculations.

## Operator buttons (+-*/):
    If one only operand: 
        will set operator to respective type and update display to operand + operator 
        Operator will swap out if different operator buttons are pushed consecutively 
    If operator is not (+, -, /, or *): swap out, should not error 
    If operand is NaN: error message, clear state
    If state is in solvable state: calculate and if successful use the result as the first operand
    If either operand is NaN and not null: error message 
        If first operand is NaN and not null: clear state
        If second operand is NaN and not null: clear second operand and replace operator
    If solvable state, but current operator is not (+, -, /, or *): error message, clear state

## Operand Buttons:
    If current operand is NaN or 0:
        replace current operand with value of clicked button
    If current operand is nonzero:
        append value to current operand
        If current operand will exceed 8 digits not including '.': error message do not update current operand
        If current operand already exceeds 8 digits not including '.': truncate current operand to 8 digits


