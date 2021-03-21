package week01;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class HelloClassLoader extends ClassLoader {

    public static void main(String[] args) {
        try {
            Class hello = new HelloClassLoader().findClass("Hello");
            Object instance = hello.newInstance();
            Method method = instance.getClass().getDeclaredMethod("hello");
            method.invoke(instance);
        } catch (IllegalAccessException | InstantiationException | NoSuchMethodException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected Class<?> findClass(String name) {
        String path = "src\\week01\\Hello.xlass\\" + name + ".xlass";
        try (FileInputStream fis = new FileInputStream(path); ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            int val;
            while ((val = fis.read()) != -1) {
                val = 255 - val;
                bos.write(val);
            }
            byte[] res = bos.toByteArray();
            return defineClass(name, res, 0, res.length);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
