package com.example.data_analysis.models;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "FileStorage")
public class ReceivedData {
	
	public String inputData;
	public String outputData;
	public String uid;
	public String userId;

	public ReceivedData(String inputData, String outputData,String uid,String userId) {
		this.inputData = inputData;
		this.outputData = outputData;
		this.uid = uid;
		this.userId = userId;
	  }


}

