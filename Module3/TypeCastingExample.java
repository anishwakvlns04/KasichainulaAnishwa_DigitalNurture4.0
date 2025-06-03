public class TypeCastingExample {
    public static void main(String[] args) {
        //Explicit Type Casting (Narrowing)   
        double a = 9.75;
        int x = (int) a;
        System.out.println("Original double: " + a);
        System.out.println("Double cast to int: " + x);

        int b = 7;
        double y = b;
        System.out.println("Original int: " + b);
        System.out.println("Int cast to double: " + y);
        //Implicit Type Casting (Widening)
    }
}
