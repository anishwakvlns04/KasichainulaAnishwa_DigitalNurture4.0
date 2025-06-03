import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter two numbers : ");
        double num1 = sc.nextDouble();
        double num2 = sc.nextDouble();

        System.out.print("Choose an operation (+, -, *, /): ");
        char op = sc.next().charAt(0);

        double result;

        switch (op) {
            case '+':
                result = num1 + num2;
                System.out.println("Result = " + result);
                break;

            case '-':
                result = num1 - num2;
                System.out.println("Result = " + result);
                break;

            case '*':
                result = num1 * num2;
                System.out.println("Result = " + result);
                break;

            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Result = " + result);
                } else {
                    System.out.println("Cannot divide by zero!");
                }
                break;

            default:
                System.out.println("Invalid operation selected.");
        }

    
    }
}
