package com.example.data_analysis;

import com.example.data_analysis.engine.Consumer;
import com.example.data_analysis.engine.Producer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static Producer producer;
	public static Consumer consumer;
	static ConfigurableApplicationContext context;

	public static void initialize() {
		producer = context.getBean(Producer.class);
		consumer = context.getBean(Consumer.class);
	}

	public static void main(String[] args) {
		context = SpringApplication.run(DemoApplication.class, args);
		initialize();
	}

	@Bean
	public Consumer consumerCode(){
		return new Consumer();
	}
		
	@Bean
	public Producer produceCode(){
		return new Producer();
	}


}
