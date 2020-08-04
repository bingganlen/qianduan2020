package com.yoho.common;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;





/**
 * API 响应格式
 * /**
 * 响应为：
 * <pre>
 * {
 * "code": 200,
 * "message": "ok",
 * "data": {
 * }
 * Created by chang@yoho.cn on 2015/11/3.
 */
public class Response {

    @SuppressWarnings("unused")
	private static String DEFAULT_MSG = "ok";
    @SuppressWarnings("unused")
	private static int DEFAULT_CODE = 200;
 
    private int code;
   
    private String message;
 
    private Object data;
 
    public Response(int code, String message, Object data) {
        this.code = code;
        if (StringUtils.isNotEmpty(message)) {
            this.message = message;
        }
        this.data = data;
    }


    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }

   
    }



