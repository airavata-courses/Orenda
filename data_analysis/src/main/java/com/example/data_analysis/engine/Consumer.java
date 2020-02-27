package com.example.data_analysis.engine;

import java.io.IOException;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.data_analysis.models.ImageUpload;
import com.example.data_analysis.DemoApplication;
import com.example.data_analysis.engine.Producer;

@Service
public class Consumer {
    private final Logger logger = LoggerFactory.getLogger(Producer.class);

    @KafkaListener(topics = "dataAnalysisConsumerF", groupId = "test-consumer-group")
    public void consume(String message) throws IOException {
        logger.info(String.format("#### -> Consumed message -> %s", message));
        DemoApplication.producer.sendMessage(message);
    }

}
