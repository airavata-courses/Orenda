package com.example.dataAnalysis.models;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.bson.types.ObjectId;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;

public class ImageUpload {
	
public static void main(String message) throws FileNotFoundException, IOException {
		
		Gson g = new Gson();
		ReceivedData rD = g.fromJson(message, ReceivedData.class);
		MongoClientURI clientURI= new MongoClientURI("mongodb+srv://nehanayak:teamOren%40123@cluster0-389i7.mongodb.net/test?retryWrites=true&w=majority");

        MongoDatabase database = new MongoClient(clientURI).getDatabase("FileUploadDB");
        GridFSBucket gridFSBucket = GridFSBuckets.create(database);
        
        uploadData(gridFSBucket, new ByteArrayInputStream(rD.resultPlot.getBytes(StandardCharsets.UTF_8)), "result-plot.jpg");
        uploadData(gridFSBucket, new ByteArrayInputStream(rD.uid.getBytes(StandardCharsets.UTF_8)), "uid");
        uploadData(gridFSBucket, new ByteArrayInputStream(rD.userId.getBytes(StandardCharsets.UTF_8)), "user-id");
        
    }
	
	static void uploadData(GridFSBucket gridFSBucket, InputStream iS, String fName) throws IOException
	{
		InputStream streamToUploadFrom = iS;

        GridFSUploadOptions options = new GridFSUploadOptions()
                .chunkSizeBytes(1024);

        ObjectId fileId = gridFSBucket.uploadFromStream(fName, streamToUploadFrom, options);
        streamToUploadFrom.close();
        //System.out.println("The fileId of the uploaded file is: " + fileId.toHexString());
	}

}
