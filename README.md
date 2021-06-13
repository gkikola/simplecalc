# Simple Calculator

A simple pocket-style calculator written in JavaScript. It was originally
created for [The Odin Project](https://www.theodinproject.com/).


## Features

- Easy to read 10-digit display with commas for digit grouping
- Supports standard arithmetic operations and square roots
- Can perform percentage calculations including tax and discounts
- Includes memory storage and recall functions
- Support for repeated operations and calculations with constants
- Full keyboard and touch support


## Functions

The operators and other supported functions are summarized in the table below.

| Button      | Keyboard Shortcut | Description                   |
| ----------- | ----------------- | ----------------------------- |
| +           | +                 | Addition                      |
| -           | -                 | Subtraction                   |
| &times;     | *                 | Multiplication                |
| &divide;    | /                 | Division                      |
| .           | .                 | Decimal point                 |
| &radic;     | s q r t           | Square root                   |
| =           | Enter, =          | Result                        |
| %           | %                 | Percent                       |
| &plusmn;    | n                 | Change sign                   |
| C           | Escape            | Clear/reset                   |
| MC          | m c               | Memory clear                  |
| MR          | m r               | Memory recall                 |
| M-          | m -               | Memory subtraction            |
| M+          | m +               | Memory addition               |


## Instructions

### Basic Arithmetic

Simple arithmetic can be performed by entering the first operand, entering the
operator, entering the second operand, and pressing the equals ('=') button.

Examples:

| Button Presses | Displayed Result |
| -------------- | ----------------:|
| 1234+5678=     | 6,912.           |
| 1234-5678=     | -4,444.          |
| 7&times;6=     | 42.              |
| 22&divide;7=   | 3.142857142      |

One can also perform operations with more than two numbers. As you press each
operator button, the calculator will display an intermediate result. Press
equals ('=') to compute the final total.

Examples:

| Button Presses                           | Displayed Result |
| ---------------------------------------- | ----------------:|
| 123+456+789=                             | 1,368.           |
| 99+78-13+42-13=                          | 193.             |
| 32&times;14+5&divide;4=                  | 113.25           |
| 1.243&times;1.09&times;2.45&divide;3.45= | 0.962154057      |


### Arithmetic with Negative Numbers

To enter a negative number, type in the number without the sign and then press
the plus-or-minus button ('&plusmn;'). The plus-or-minus button can be pressed
repeatedly to alternate the sign of the currently-displayed number.

Examples:

| Button Presses               | Displayed Result |
| ---------------------------- | ----------------:|
| 123&plusmn;+456+789&plusmn;= | -456.            |
| 42&plusmn;*16&plusmn;=       | 672.             |


### Square Roots

Press the square root button ('&radic;') to take the square root of the number
that is currently displayed.

Examples:

| Description        | Button Presses     | Displayed Result |
| -------------------| ------------------ | ----------------:|
| Square root of 5   | 5&radic;           | 2.236067977      |
| Square root of 7*8 | 7*8=&radic;        | 7.483314773      |
| Fourth root of 256 | 256&radic;&radic;  | 4.               |


### Percentage Calculations

#### Basic Percentages

The percent button ('%') can be used to perform computations with
percentages. To find the percentage of a number, enter the number, press the
multiply button ('&times;'), enter the percentage, and press the percent
button.

Examples:

| Description     | Button Presses | Displayed Result |
| --------------- | -------------- | ----------------:|
| Find 5% of 20   | 20&times;5%    | 1.               |
| Find 30% of 48  | 48&times;30%   | 14.39999999      |
| Find 200% of 15 | 15&times;200%  | 30.              |

To determine what percentage a number is of another number, enter the first
number, press the divide button ('&divide;'), enter the second number, and
press the percent button ('%').

Examples:

| Description                | Button Presses | Displayed Result |
| -------------------------- | -------------- | ----------------:|
| 5 is what percent of 25?   | 5&divide;25%   | 20.              |
| 30 is what percent of 7.5? | 30&divide;7.5% | 400.             |
| 68 is what percent of 300? | 68&divide;300% | 22.66666666      |


#### Tax and Discounts

The percent button ('%') also allows you to add a percentage markup or
subtract a percentage markdown from a number.

Examples:

| Description          | Button Presses  | Displayed Result |
| -------------------- | --------------- | ----------------:|
| Add 6% tax to $40    | 40+6%           | 42.4             |
| Take 20% off $149.99 | 149.99-20%      | 119.992          |


### Calculations with Constants

Sometimes you need to repeat an operation over and over again with different
numbers. For example, you might need to multiply a bunch of numbers by 7. This
can be accomplished easily using the constants feature. After pressing the
equals button ('=') the first time, enter the next number and press equals
again. The calculation will be repeated using the new number.

Examples:

| Description                        | Button Presses             | Displayed Result               |
| ---------------------------------- | -------------------------- | ------------------------------ |
| Multiply 4.12, 5.42, and 6.01 by 7 | 7&times;4.12=5.42=6.01=    | 28.84, 37.94, 42.07            |
| Add 150 to 7, 10, and 15           | 7+150=10=15=               | 157., 160., 165.               |
| Subtract 12 from 100, -14, and 50  | 100-12=14&plusmn;=50=      | 88., -26., 38.                 |
| Divide 16, 20, and -42 by 3        | 16&divide;3=20=42&plusmn;= | 5.333333333, 6.666666666, -14. |
| Find 17.25% of 120 and 279.11      | 17.25&times;120%279.11%    | 20.7, 48.146475                |
| Add a 5%, 6% and 7% markup to $42  | 42+5%6%7%                  | 44.1, 44.52, 44.94             |


### Storing and Manipulating Values in Memory

The memory buttons ('MC', 'MR', 'M-', and 'M+') allow you to manipulate a
variable in memory. This can allow you to perform a sequence of complicated
computations.

To clear the memory storage, press the memory-clear button ('MC'); this resets
the memory to 0. To display the stored value or to use it in a calculation,
press the memory-recall button ('MR'). To add or subtract the displayed value
to or from the stored number, press the memory-add or memory-subtract buttons
('M+' or 'M-'), respectively.

Examples:

| Description                                | Button Presses                                            | Displayed Result |
| ------------------------------------------ | --------------------------------------------------------- | ----------------:|
| Calculate 8*4 + 25/5 + 6*9/3               | 8&times;4=(M+)25&divide;5=(M+)6&times;9&divide;3=(M-)(MR) | 19.              |
| Add $108 with 6% tax plus $99 with 10% tax | (MC)108+6%(M+)99+10%(M+)(MR)                              | 223.38           |


### Correcting Mistakes

If you make a mistake when entering a value, press the clear button ('C') to
reset the displayed number; this allows you to type in the correct number
without starting the calculation over from the beginning. If you *do* want to
completely clear the entire calculation and start over, press the clear button
twice in succession.


### Errors and Overflow

Performing certain operations that are undefined can result in an error. When
this happens, the calculator will display 'ERROR'. An error can also occur if
you try to enter a number that is too large for the display, or if a computed
result would be too large for the display. Press the clear button ('C') twice
to clear the error and restart the calculation.

Examples:

| Description                      | Button Presses       | Displayed Result |
| -------------------------------- | -------------------- | ----------------:|
| Division by 0                    | 5&divide;0=          | ERROR            |
| Square root of a negative number | 10&plusmn;&radic;    | ERROR            |
| Overflow                         | 123456&times;987654= | ERROR            |


## Copyright

This calculator is copyright &copy; 2021 Greg Kikola. License: MIT.

This is free software: you are free to change and redistribute it. There is NO
WARRANTY, to the extent permitted by law. See the file
[LICENSE.txt](LICENSE.txt) for more details.
