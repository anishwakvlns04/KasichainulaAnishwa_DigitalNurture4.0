public class MethodOverloadingExample {
    
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double x, double y) {
        return x + y;
    }
    
    public int add(int p, int q, int r) {
        return p + q + r;
    }

    public static void main(String[] args) {
        MethodOverloadingExample example = new MethodOverloadingExample();

        System.out.println("Sum of two ints : " + example.add(5, 10));
        System.out.println("Sum of two doubles : " + example.add(3.5, 4.2));
        System.out.println("Sum of three ints : " + example.add(1, 2, 3));
    }
}

