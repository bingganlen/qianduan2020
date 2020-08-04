package test;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class test1 {
    public static void main(String[] args) throws ParseException {
//        float i = -11;
//        System.out.println(i%10);
//        int j = (int) (i%10);
//        System.out.println(j);

//        String timeAdd = TimeAdd("2019-11-11 11:03", "90");
//        System.out.println(timeAdd);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = df.parse("2019-11-11 11:03");
//        Date expireTime = new Date(date.getTime() + 1000000*60*1000);
//        System.out.println(df.format(expireTime));
//        int i = 1000000*60*1000;
//        long j = 1000000*60*1000;
//        BigInteger k = new BigInteger(String.valueOf(1000000*60*1000));
//        System.out.println(i);//-129542144
//        System.out.println(j);//-129542144
//        System.out.println(k);//-129542144


        for (int l = 0; l < 300000; l++) {
            long count = l*6;
            long temp = date.getTime() + count*10000;

            Date expireTime1 = new Date(temp);

            System.out.println(df.format(expireTime1) + "     " + count);
        }
    }



        /**
         *  处理时间
         * @param oldTime  原时间
         * @param add  增加时间
         * @return
         * @throws ParseException
         */
        public static String  TimeAdd(String oldTime,String add) throws ParseException {
            int addMit = Integer.valueOf(add);
            DateFormat df = new SimpleDateFormat("yyyy-mm-dd HH:mm");
            Date date = df.parse(oldTime);
            Date expireTime = new Date(date.getTime() + addMit*60*1000);
            String newTime = df.format(date);
            return newTime;
        }


}
