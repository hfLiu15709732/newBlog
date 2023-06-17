---
slug: java-terminal
title: Java期末复习
tags: [Java, 学校课程,期末复习,'java基础']
---


# JAVA基础考点归纳与详解



## 可能考点归纳

==（基于浙江工业大学java基础---期末考卷整理）==



> **:horse:     小题部分（选择）：**

- 名词概念分析
- 静态变量与类
- java命令行编译问题(args参数)
- 继承与抽象类
- 异常捕获问题（注意记住异常类型）
- 重写与重载问题
- swing可视化
- 文件读取（注意文件流的分类）、
- 父子级之间的声明创建关系（可以father child=new child（））



> :dog:     **程序阅读类型：**

- 一般类型与引用变量（深拷贝与浅拷贝）
- 多个基础的类整来整去
- 子类super调用
- 多线程同步问题





> **:sailboat:      程序阅读类型：**

- ArrayList和Vector
- ArrayList的3种创建及遍历形式







> **:computer:     程序编程类型：**



**基本只有三种：**

- swing可视化：

  

- 类与列表的综合：

  

- 多线程：

  













## 编程知识点整理：

### swing可视化



> **:school:    第一部分：基础组件**

- **JFrame** – java的GUI程序的基本思路是以JFrame为基础，它是屏幕上window的对象，能够最大化、最小化、关闭。
- **JPanel** – Java图形用户界面(GUI)工具包swing中的面板容器类，包含在javax.swing 包中，可以进行嵌套，功能是对窗体中具有相同逻辑功能的组件进行组合，是一种轻量级容器，可以加入到JFrame窗体中。。
- **JLabel** – JLabel 对象可以显示文本、图像或同时显示二者。可以通过设置垂直和水平对齐方式，指定标签显示区中标签内容在何处对齐。默认情况下，标签在其显示区内垂直居中对齐。默认情况下，只显示文本的标签是开始边对齐；而只显示图像的标签则水平居中对齐。
- **JTextField** –一个轻量级组件，它允许编辑单行文本。
- **JPasswordField** – 允许我们输入了一行字像输入框，但隐藏星号(*) 或点创建密码(密码)
- **JButton** – JButton 类的实例。用于创建按钮类似实例中的 "Login"。
- **Box mod = Box.createVerticalBox()** ----用于生成垂直容器



> **:coffee:   第二部分：窗口的设置**



```apl
        jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        jf.setSize(380,180);
        jf.setLocationRelativeTo(null);
        jf.setVisible(true);
```



> **:calendar:   第三部分：可视化要引得包**



```apl
//别忘了
import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.io.*;//等等
```



> **:calendar:   第四部分：可视化添加事件**



```apl
//别忘了
import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.io.*;//等等
```





> **:calendar:   第三部分：可视化要引得包**



```apl
//别忘了
import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.io.*;//等等
```







> **:cake:   第部分：例题**



> 请用Java编写一个预约核酸检测的程序，界面示意图如下，包含人员姓名、身份证号码、预约时间（格式为YYYYMMDD）、预约医院（下拉框选择）。点击重置按钮清除所有输入信息。点击保存按钮之后，将预约信息组成字符串形式（每个信息用逗号“,”隔开），逐行保存到booking.cvs中。



**解决代码：**

==总代码如下：==（由于highlight.js好像对java高亮不友好，就先这么看吧）

```java
package terimall_test;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.PrintWriter;
import java.util.*;
import javax.swing.*;
import java.awt.*;

public class Example2 {
    JFrame jf=new JFrame("测试程序");
    JPanel jp1=new JPanel();
    JPanel jp2=new JPanel();
    JPanel jp3=new JPanel();
    JPanel jp4=new JPanel();
    JPanel jp5=new JPanel();

    JButton resetBtn=new JButton("重置");
    JButton submitBtn=new JButton("提交");

    JTextField user=new JTextField(22);
    JTextField info=new JTextField(22);
    JTextField time=new JTextField(22);

    String []hospitalArray={"医院1","医院2","医院3","医院4","医院5",};

    JComboBox hosList=new JComboBox<String>(hospitalArray);


    public Example2(){



        jp1.add(new JLabel("人员姓名"));
        jp1.add(user);
        jp2.add(new JLabel("身份证"));
        jp2.add(info);
        jp3.add(new JLabel("预约时间"));
        jp3.add(time);
        jp4.add(new JLabel("预约医院"));
        jp4.add(hosList);
        jp5.add(resetBtn);
        jp5.add(submitBtn);

        Box mod = Box.createVerticalBox();//设置垂直盒子，实现将原件垂直展现在界面中

        mod.add(jp1);
        mod.add(jp2);
        mod.add(jp3);
        mod.add(jp4);
        mod.add(jp5);

        jf.add(mod);
        jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        jf.setSize(380,380);
        jf.setLocationRelativeTo(null);
        jf.setVisible(true);

        resetBtn.addActionListener(new btnAction());//对按钮进行注册监听事件
        submitBtn.addActionListener(new btnAction());//同一事件可根据构建类中的事件源进行区分
        



    }


    public static void main(String[] args) {
        Example2 ex2=new Example2();

    }


    class btnAction implements ActionListener {
        //创建事件监听的函数

        @Override
        public void actionPerformed(ActionEvent e) {
            if (e.getSource()==resetBtn){
                user.setText("");
                info.setText("");
                time.setText("");
            }
            else if (e.getSource()==submitBtn){
                String targetStr=user.getText()+","+info.getText()+","+time.getText()+","+hospitalArray[hosList.getSelectedIndex()];
                File resultFile=new File("booking.txt");//将文件对象创建为实际文件
                File resultFilesd=new File("1111test11eryhuigfber");
                if(!resultFilesd.exists()) {resultFilesd.mkdir();}//创建一个文件夹必须上面两部才行
                PrintWriter pw=null;//创建printWrite对象
                try
                {
                    pw=new PrintWriter(resultFile);
                }
                catch(Exception exp)
                {
                    System.out.print("文件打开失败！！！");
                    return;
                }

                //文件展示部分
                pw.printf("用户信息为\n");
                pw.printf(targetStr);
                System.out.print("用户你好，文件已保存完毕！");
                pw.close();
            }
        }
    }

}


//其他的可视化相关Tips：
modMiddle.setLayout(new GridLayout(11, 5, 3, 2));//设置网格布局
modTop.setLayout(new FlowLayout(FlowLayout.CENTER, 6, 6));//设置浮动布局的居中对齐
//一个类可以直接继承Jframe的同时实现ActionListioner接口

```



### 类与列表的综合：

**例题：**

> 请用Java编写一个行程码类TravelLogCode，其数据成员包括姓名name，颜色color（绿、黄、红），过去14天内去过的城市列表cities，其中去过的城市列表用ArrayList存储，toString()方法返回行程码信息。每个城市也是一个自定义的类City，数据成员包括城市名字cityName和目前是否存在中等或高风险区域isInRisk。上述2个类均有构造方法，set和get方法可忽略不写。在主方法中构建相关人员的行程码样例对象，并输出每个人的行程码信息，格式如下所示，如果该城市目前存在中等或高风险区域，则在城市名字后面输出*号。
>
> **输出样例：**
>
> 张三（绿码）：杭州，上海
>
> 
>
> 李四（黄码）：西安*，上海
>
> 



==解决代码：==

```java
package terimall_test;

import java.util.ArrayList;

public class Example3 {
    String name;
    String color;
    ArrayList<city> cities;
    public Example3(String names,String colors,ArrayList<city> citiess){
        name=names;
        color=colors;
        cities=citiess;
    }

    public String toString(){

        String target=name+"("+color+"码)：";
        for (int i=0;i<cities.size();i++){
            if(cities.get(i).isRisk==true){
                target+=cities.get(i).cityName+"* ";
            }
            else {
                target+=cities.get(i).cityName+" ";
            }
        }


        return target;
    }


    public static void main(String[] args) {

        city sh=new city("上海",false);
        city xa=new city("西安",true);
        city hz=new city("杭州",false);

        ArrayList<city> cityList1=new ArrayList<city>();
        cityList1.add(sh);
        cityList1.add(hz);

        ArrayList<city> cityList2=new ArrayList<city>();
        cityList2.add(sh);
        cityList2.add(xa);
        cityList2.add(hz);

        Example3 p1=new Example3("张三","绿",cityList1);
        Example3 p2=new Example3("李四","红",cityList2);

        System.out.println(p1.toString());
        System.out.println(p2.toString());





    }
}

class city{
    String cityName;
    boolean isRisk;

    public city(String a,boolean b) {
        cityName = a;
        isRisk = b;
    }

}


```



### 多线程类型：

> **:school:    第一部分：两种实现形式**



```java
//通过继承Thread类进行实现
public class CreateThreadDemo1 extends Thread {

    public CreateThreadDemo1(String name) {
        // 设置当前线程的名字
        this.setName(name);
    }

    @Override
    public void run() {
        System.out.println("当前运行的线程名为： " + Thread.currentThread().getName());
    }

    public static void main(String[] args) throws Exception {
        // 注意这里，要调用start方法才能启动线程，不能调用run方法
        new CreateThreadDemo1("MyThread1").start();
        new CreateThreadDemo1("MyThread2").start();

    }

}
```

```java
//通过实现Runnable接口实现
public class CreateThreadDemo2 implements Runnable {

    @Override
    public void run() {
        System.out.println("当前运行的线程名为： " + Thread.currentThread().getName());
    }

    public static void main(String[] args) throws Exception {
        CreateThreadDemo2 runnable = new CreateThreadDemo2();
        new Thread(runnable, "MyThread1").start();
        new Thread(runnable, "MyThread2").start();

    }

}
```







> **:coffee:   第二部分：run()与start的相关关系**

- 
- **1.start()** 方法来启动线程，真正实现了多线程运行。这时无需等待 run 方法体代码执行完毕，可以直接继续执行下面的代码；通过调用 Thread 类的 start() 方法来启动一个线程， 这时此线程是处于就绪状态， 并没有运行。 然后通过此 Thread 类调用方法 run() 来完成其运行操作的， 这里方法 run() 称为线程体，它包含了要执行的这个线程的内容， run 方法运行结束， 此线程终止。然后 CPU 再调度其它线程。
- **2.run()** 方法当作普通方法的方式调用。程序还是要顺序执行，要等待 run 方法体执行完毕后，才可继续执行下面的代码； 程序中只有主线程——这一个线程， 其程序执行路径还是只有一条， 这样就没有达到写线程的目的。



> **:cake:   第四部分：例题**



**例题：**

> 3、利用多线程编写一个求解某范围素数对（指一对素数，它们之间相差2，例如3和5，5和7，11和13）的程序FindPrimePair.java，一共需要10个线程，每个线程负责1000范围：线程1找1-1000；线程2找1001-2000；线程3找2001-3000….；线程10找9001-10000。请编写程序将每个线程找到的素数对打印出来。



==解决代码：==

```

```







## 非编程类注意点：

### 重写与重载



> 下面一张图即可解决：



| 区别点   | 重载方法 | 重写方法                                       |
| :------- | :------- | :--------------------------------------------- |
| 参数列表 | 必须修改 | 一定不能修改                                   |
| 返回类型 | 可以修改 | 一定不能修改                                   |
| 异常     | 可以修改 | 可以减少或删除，一定不能抛出新的或者更广的异常 |
| 访问     | 可以修改 | 一定不能做更严格的限制（可以降低限制）         |



------



### 列表的三种遍历形式

> 列表以ArrayList为例子





**:phone:      第一种类型：普通for循环**

```java
for (int i = 0; i < mList.size(); i++) {
            System.out.println(mList.get(i));
        }

```



**:building_construction:     第二种类型：增强for循环**

```java
for (String item : mList) {
    System.out.println(item);
}


```



**:bank:     第三种类型：遍历迭代器**

```java
Iterator<String> iterator = mList.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

```





------



### 一般类型与引用类型：



> 八大类型中除了数组与对象之外都是简单类型，默认进行深拷贝
>
> 数组与对象是引用类型，默认浅拷贝

------

### 父子间创建关系：



```java
public class PolymorphismTest {
    public static void main(String[] args) {
        Father child = new Child();
        child.func1();//打印结果将会是什么？
    }
//这样的情况是允许的，正确的
//反之，编译器直接报错，无法通过编译
```





------

### 异常捕获的执行机制



- 错误已经在本级别处理完了，就不会向上抛出
- 多个catch是一个一个对应，对应上了，后面的catch就不会执行
- 所有不能出现上方的catch范围比下方的大这种情况，会报错（因为无意义）



> 代码相关：



```java
package terimall_test;
import java.io.*;
class MyFileReader{
    public int fileReading() throws Exception{
        try {
            FileInputStream file = new FileInputStream("c:/systemaaaaaaaaaaaaaaaaaaaaaaaaaaa.ini");
        } catch (IOException e) {
            System.out.println("文件读取失败");
            return -1;
        } finally {
            System.out.println("退出");
        }
        return 0;
    }
}
public class Example1 {
    public static void main(String argv[]) {
        try {
            MyFileReader r = new MyFileReader();
            r.fileReading();
        }catch (FileNotFoundException e) {
            System.out.println("文件未找到");
        } catch (Exception e) {
            System.out.println("主程序执行异常");
        }
        System.out.println("主程序执行完毕");
    }
}


//当前结果：文件读取失败   退出    主程序执行完毕


//如果把上面的改为其他异常（即为下层不处理，抛出异常）
//结果为：退出      文件未找到         主程序执行完毕


```



------

### 第一题的基本概念



> **java常见的容器效率对比**



<img src="https://pic2.zhimg.com/v2-e6af814e463ffa5d9c1f666e29a51bb9_r.jpg" />





------





### 继承与访问权限的问题

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90b2pvaG5vbmx5LmdpdGh1Yi5pby9pbWFnZXMvODktSmF2YSVFOCVBRSVCRiVFOSU5NyVBRSVFNiU4RSVBNyVFNSU4OCVCNiVFNCVCOCVBRHByaXZhdGUsZGVmYXVsdCxwcm90ZWN0ZWQlRTUlOTIlOENwdWJsaWMlRTclOUElODQlRTUlOEMlQkElRTUlODglQUIvY29udHJvbC5wbmc?x-oss-process=image/format,png)





------

### 静态变量与静态方法：



> &#26FA;     **静态变量：**

- 运行时，Java 虚拟机只为静态变量分配一次内存，在加载类的过程中完成静态变量的内存分配。
- 在类的内部，可以在任何方法内直接访问静态变量。
- 在其他类中，可以通过类名访问该类中的静态变量。



> &#2673;          **实例变量：**

- 每创建一个实例，Java 虚拟机就会为实例变量分配一次内存。
- 在类的内部，可以在非静态方法中直接访问实例变量。
- 在本类的静态方法或其他类中则需要通过类的实例对象进行访问。



>         **静态方法：**

-  非静态方法既可以访问静态数据成员 又可以访问非静态数据成员
-  静态方法只能访问静态数据成员

------

### String的类型双重性：



> **string即可作为引用类型，也可作为简单类型**



```apl
//作引用类型时：
String s1 = new String("java");
String s2 = new String("java");

System.out.println(s1==s2);            //false
System.out.println(s1.equals(s2));    //true


//作简单类型是：
String s1 = "java";
String s2 = "java";

System.out.println(s1==s2);            //true
System.out.println(s1.equals(s2));    //true


//夹杂对比：
String s1 = new String("java");
String s2 = s1;

System.out.println(s1==s2);            //true
System.out.println(s1.equals(s2));    //true
```





------

### String创建对象的问题

```apl
String a = "hello";
// 下面这一行代码创建了一个对象
String b = new String("hello");
```

```apl
// 下面这一行代码创建了两个对象
String b = new String("hello");
String a = "hello";
```

```apl
String b = new String("hello");//单独一样时，创建了两个对象
```

```apl
   public   void  testTheSameReference1(){
        String str1 = " abc " ;
        String str2 = " abc " ;
        String str3 = " ab " + " c " ;
        String str4 = new  String(str2);
        
         // str1和str2引用自常量池里的同一个string对象
        assertSame(str1,str2);
         // str3通过编译优化，与str1引用自同一个对象
        assertSame(str1,str3);
         // str4因为是在堆中重新分配的另一个对象，所以它的引用与str1不同
        assertNotSame(str1,str4);
    }
```





### java常用API



#### scanner扫描：

```java
 public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        System.out.println(str);
    }
//in.next（）
//in.nextInt（）等等
```



#### Randam生成随机数

```java
Random r = new Radom();//随机数生成的准备
int num = r.nextInt(）//生成一个int型随机数
int num = r.nextInt(3)//生成一个0-2的int型随机数

```





### JAVA文件IO流



> **基本类型分类**

![](https://www.runoob.com/wp-content/uploads/2013/12/iostream2xx.png)















> **考大题时的简便读写操作**



```java
//对文件读操作：
//(逐行读文件)

	public static void main(String[] args) 
    {
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader("/Users/pankaj/Downloads/myfile.txt"));
			String line = reader.readLine();
			while (line != null) {
				System.out.println(line);
				// read next line
				line = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}




//创建文件操作：
        
                File resultFile=new File("booking.txt");//将文件对象创建为实际文件
                if(!resultFile.exists()) {resultFilesd.mkdir();}//创建一个文件夹必须上面两部才行
        
        

//对文件写操作：
 protected void appendToFile(String data){
        try {
            FileWriter fileWriter = new FileWriter("log.txt", true);
            fileWriter.write(data);
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

        
        
        
        //文件夹与文件的相关生成操作
        
        
                //文件夹及文件生成部分
                File resultDir=new File(userName.trim());//创建以用户（去掉前空格和后空格）名字为命名的目录
                if(!resultDir.exists()) 
                {resultDir.mkdir();}//判断目前用户名目录是否创建完成，如果未完成，则创建该目录
                resultFileName=userName+".his";
                File resultFile=new File(resultDir,resultFileName);//将文件对象创建为实际文件

                //校验文件存在问题
                try
                {
                    pw=new PrintWriter(resultFile);
                }
                catch(Exception exp)
                {
                    System.out.print("文件打开失败！！！");
                    return;
                }
```

