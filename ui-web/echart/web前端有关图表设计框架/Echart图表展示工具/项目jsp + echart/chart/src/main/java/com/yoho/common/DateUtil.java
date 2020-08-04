package com.yoho.common;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.util.StringUtils;

public class DateUtil {

    /**
     * 获取当前时间, 并且将当前时间转换称INT类型
     *
     * @return 当前时间的INT类型
     */
    public static int getCurrentTimeSeconds() {
        long longTime = new Date().getTime();
        return (int) (longTime / 1000);
    }

    /**
     * 将通过getTime获得的long型的时间，转换成format类型的时间，如"2015-08-09"
     *
     * @param time
     *            long型的时间戳
     * @param format
     *            需要转化的类型 “yyyy-MM-dd”
     * @return String "2015-08-09"
     */
    public static String long2DateStr(long time, String format) {
        Date date = new Date(time);
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        String dateStr = sdf.format(date);
        return dateStr;
    }

    /**
     * 转换成format类型的时间，如"2015-08-09"
     *
     * @param date
     *            日期
     * @param format
     *            需要转化的类型 “yyyy-MM-dd”
     * @return String "2015-08-09"
     */
    public static String date2String(Date date, String format) {
        if (date == null) { return null; }
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    /**
     * 将通过getTime获得的Date型的时间
     *
     * @param time
     *            long型的时间戳
     * @return java.util.Date
     */
    public static Date long2Date(long time) {
        return new Date(time);
    }

    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String TIME_FORMAT = "HH:mm:ss";

    /**
     * 按照格式，取得当前时间
     *
     * @param str
     * @return
     */
    public static String getToday(String str) {
        return dateToString(new Date(), str);
    }

    /**
     * 获取今天的日期时间（yyyy-MM-dd HH:mm:ss）
     *
     * @return
     */
    public static String getcurrentDateTime() {
        return getToday(DATE_TIME_FORMAT);
    }

    /**
     * 获取今天的日期（yyyy-MM-dd）
     *
     * @return
     */
    public static String getcurrentDate() {
        return getToday(DATE_FORMAT);
    }

    /**
     * 获取今天的日期（HH:mm:ss）
     *
     * @return
     */
    public static String getcurrentTime() {
        return getToday(TIME_FORMAT);
    }

    /**
     * 对日期进行加减
     *
     * @param date
     *            被转换的日期
     * @param type
     *            转换类型(y-年,M-月,d-日, H-小时, m-分钟, s-秒)
     * @param offset
     *            转换的单位
     * @param simpleDateFormat
     *            日期格式
     * @return
     */
    public static String dateAdd(String date, String type, int offset, String simpleDateFormat) {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        if (StringUtils.isEmpty(type)) {
            return date;
        }
        if (offset == 0) {
            return date;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(stringToDate(date, simpleDateFormat));
        if (type.equals("y")) {
            cal.add(Calendar.YEAR, offset);
        } else if (type.equals("M")) {
            cal.add(Calendar.MONTH, offset);
        } else if (type.equals("d")) {
            cal.add(Calendar.DATE, offset);
        } else if (type.equals("H")) {
            cal.add(Calendar.HOUR, offset);
        } else if (type.equals("m")) {
            cal.add(Calendar.MINUTE, offset);
        } else if (type.equals("s")) {
            cal.add(Calendar.SECOND, offset);
        }
        return dateToString(cal.getTime(), simpleDateFormat);
    }

    /**
     * ͳDate型日期转换为String型
     *
     * @param date
     * @param simpleDateFormat
     * @return
     */
    public static String dateToString(Date date, String simpleDateFormat) {
        SimpleDateFormat format = new SimpleDateFormat(simpleDateFormat);
        if (date == null) {
            return null;
        } else {
            return format.format(date);
        }
    }

    /**
     * String型日期转换为Date型
     *
     * @param date
     * @param simpleDateFormat
     * @return
     */
    public static Date stringToDate(String date, String simpleDateFormat) {
        SimpleDateFormat format = new SimpleDateFormat(simpleDateFormat);
        Date d = null;
        if (StringUtils.isEmpty(date)) {
            return null;
        } else {
            try {
                d = format.parse(date);
            } catch (ParseException e) {
            }
            return d;
        }
    }

    /**
     * 日期格式转换
     *
     * @param date
     * @param from
     * @param to
     * @return
     */
    public static String formatDate(String date, String from, String to) {
        return dateToString(stringToDate(date, from), to);
    }

    /**
     * 获取当前时间距离输入时间的毫秒数。如果输入时间小于当前时间，则取第二天的同一时间 时间格式（HH:mm:ss）
     *
     * @param time
     * @return
     */
    public static long getTimeDiff(String time) {
        if (StringUtils.isEmpty(time)) {
            return 0;
        }
        Date d1 = new Date();
        Date d2 = null;
        String nowDate = dateToString(d1, "yyyy-MM-dd");
        String nowTime = dateToString(d1, "HH:mm:ss");
        if (time.compareTo(nowTime) >= 0) {
            d2 = stringToDate(nowDate + " " + time, "yyyy-MM-dd HH:mm:ss");
        } else {
            d2 = stringToDate(dateAdd(nowDate, "d", 1, "yyyy-MM-dd") + " " + time, "yyyy-MM-dd HH:mm:ss");
        }
        return d2.getTime() - d1.getTime();
    }

    /**
     * 从start到end的毫秒数
     *
     * @param start
     * @param end
     * @param format
     * @return
     * @throws Exception
     */
    public static long getTimeDiff(String start, String end, String format) throws Exception {
        if (StringUtils.isEmpty(start) || StringUtils.isEmpty(end) || StringUtils.isEmpty(format)) {
            return 0;
        }
        return stringToDate(end, format).getTime() - stringToDate(start, format).getTime();
    }

    /**
     * 获取当前时间的距离 1970－01-01的秒数
     *
     * @return
     */
    public static int getCurrentTimeSecond() {
        Date date = new Date();
        int second = (int) (date.getTime() / 1000);
        return second;
    }

    /**
     * 获取与当前时间间隔天数的时间点距离 1970－01-01的秒数
     *
     * @param interval
     *            与今天的天数间隔，如昨天则传-1， 明天则传 1
     * @return 距离 1970－01-01的秒数
     */
    public static int getIntervalTimeSecond(int interval) {
        Calendar now = Calendar.getInstance();
        now.add(Calendar.DAY_OF_YEAR, interval);
        return (int) (now.getTimeInMillis() / 1000);
    }

    /**
     * 根据当前时间距离1970－01-01的秒数，获取当前时间的date类型
     *
     * @param second
     * @return
     */
    public static Date getDateBySecond(long second) {
        long secondLong = second * 1000;
        return new Date(secondLong);
    }

    /**
     * 根据距离1970－01-01的秒数，获取当前时间的String类型
     *
     * @param second
     *            秒数
     * @param format
     *            时间格式
     * @return
     */
    public static String getDateStrBySecond(long second, String format) {
        Date date = getDateBySecond(second);
        return dateToString(date, format);
    }

    /**
     * 返回指定日期的unix时间戳
     *
     * @author Quintin.zhang
     * @Time 2016年5月18日下午4:39:41
     * @param date
     * @return int
     */
    @SuppressWarnings("deprecation")
    public static int getSpeciUnixSeconds(Date date, int day) {
        Date d = new Date(date.getYear(), date.getMonth(), day);
        long longTime = d.getTime();
        return (int) (longTime / 1000);
    }

    public static void main(String args[]) throws ParseException {
        long startTime = 1441953159;
        String dateStr = getDateStrBySecond(startTime, "yyyy-MM-dd HH:mm:ss");

        System.out.println(dateStr);
    }
    /**
     * Returns the current time in seconds.
     *
     * @return 1970.1.1到当前时间秒数.
     */
    public static int currentTimeSeconds() {
        return BigInteger.valueOf(System.currentTimeMillis()).divide(BigInteger.valueOf(1000L)).intValue();
    }
}

