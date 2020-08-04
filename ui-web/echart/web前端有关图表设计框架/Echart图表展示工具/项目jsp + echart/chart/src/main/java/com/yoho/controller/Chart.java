package com.yoho.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yoho.common.DateUtil;
import com.yoho.common.Response;


@Controller
@RequestMapping("/chart")
public class Chart {

	
	@RequestMapping("/getRealInfo")
	@ResponseBody
	public Response getRealMonitorInfo(Model model){
		java.util.Random random=new java.util.Random();// 定义随机类
		int date = DateUtil.getCurrentTimeSeconds();
		String a = String.valueOf(date);
		a = a+"000";//把10位的时间拼接成13位，000表示的是毫秒，如果精确度在秒以上就没有问题，如果是精确到毫秒的话，那肯定是取13位的，就不需要拼接了
		Long e = Long.parseLong(a);//这表必须转成long类型
		int result=random.nextInt(10);
		Test test = new Test();
		test.setDate(e);
		test.setNum(result);
		return new Response(200, "success", test);
	}
	
	class Test{
		Long date;
		int num;
		public Long getDate() {
			return date;
		}
		public void setDate(Long date) {
			this.date = date;
		}
		public int getNum() {
			return num;
		}
		public void setNum(int num) {
			this.num = num;
		}
	}
}
