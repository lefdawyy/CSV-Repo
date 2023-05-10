# CSV-Repo 
## Architectures
![image](https://user-images.githubusercontent.com/92638982/236921439-e35b1258-38b6-46dd-affa-b98a5fb5a475.png)
![image](https://github.com/lefdawyy/CSV-Repo/assets/92638982/e80db106-78cf-4b75-89d3-e6aa565122ca)

## My App
Web app link: https://main.dqexq777ufnpo.amplifyapp.com/files

### Users:-
full permission : username: admin , pass: Admin200<br>
read write permission : username: read_write_user , pass: ReadWriteUser200<br>
read permission : username: read_user , pass: ReadUser200<br>

### Services region:-
* Functions, sns and APIGateway Services was in `US East (N. Virginia) us-east-1`.
* Amplify and cognito services was in `Europe (Milan) eu-south-1`, because in (N. Virginia) was reached the maximum number of hosted apps.
## App Services
### Upload csv:- 
1. First I created the needed lambda functions:-
   * `upload-csv-JL` : This function publish message to the sns topic `CSV-upload-JL`, the message has the file content and file name, I gave it the needed permissions to publish message to the sns.
   * `UploadCsvToBucket-JL` : This function take the file content and file name from the sns message, and upload the file to the s3 bucket and the KMS encrypt the csv file, I triggered the function with the sns topic `CSV-upload-JL`, and I gave it the needed permissions to read messages from the sns, and to put object in the s3 bucket.
   * `uploadToDynamoDB-JL` : This function take the file content and file name from the sns message, and first check if table exist, if exist, it will delete the table and create it again for overwrite requirement, if not exist it will create the table and put the csv content in the table, I triggered the function with the sns topic `CSV-upload-JL`, and I gave it the needed permissions to read messages from the  sns, and to create table, put items in the table and delete table in the DynamoDB.
2. I added integration to my api, and add the lambda function `upload-csv-JL` to it with post method.
3. Finally in my angular app I fetched the api and send the file.

### Delete csv:-
1. First I created the needed lambda functions:-
   * `DeleteCsv-JL` : This function publish message to the sns topic `CSV-delete-JL`, the message has file name, I gave it the needed permissions to publish message to the sns.
   * `DeleteCsvFromBucket-JL`: This function take the file name from the sns message, and delete the file from the s3 bucket, I triggered the function with the sns topic `CSV-delete-JL`, and I gave it the needed permissions to read messages from the sns, and to delete object from the s3 bucket.
   * `DeleteCsvFromDB-JL` : This function take the table name from the sns message, and delete the table from the DynamoDB, I triggered the function with the sns topic `CSV-delete-JL`, and I gave it the needed permissions to read messages from the sns, and to delete table from the DynamoDB.
2. I added integration to my api, and add the lambda function `DeleteCsv-JL` to it with delete method.
3. Finally in my angular app I fetched the api and send the file name.

### List csv files:- 
1. First I created the needed lambda function `CsvList-JL`, this function return all the names of the files from the s3 bucket, I gave it the needed permissions to get the objects from s3.
2. I added integration to my api, and add the lambda function `CsvList-JL` to it with get method.
3. Finally in my angular app I fetched the api and list all the files.

### Download csv:- 
1. First I created the needed lambda function `DownloadCsv-JL`, this function return the link of needed file from the s3 bucket, I gave it the needed permissions to get the object URL from s3 and the KMS permissions.
2. I added integration to my api, and add the lambda function `DownloadCsv-JL` to it with get method.
3. Finally in my angular app I fetched the api and send the file name.

### Convert to json:-
1. First I created the needed lambda function `ConvertCsvToJson-JL`, this function get the contents from the table and convert it to json then return the json, I gave it the needed permissions to get the table from DynamoDB.
2. I added integration to my api, and add the lambda function `ConvertCsvToJson-JL` to it with get method.
3. Finally in my angular app I fetched the api and send the file name.

## Authentication
I used cognito service for the authentication:-
1. I created the cognito service `csvrepo-JL` and add three users `admin` with full permissions, `read_write_user` with read and write permissions, and `read_user` with read permissions, and I created three groups, `full-permissions`, `read-write-permissions`, and `read-permissions`.
2. I put each user in the needed group.
3. I used cognito module in my app, with ready design, and I configure my cognito using user pool id, and user pool web client Id.
4. For permissions, I checked the authenticated user what the permissions that he has, by check the group he included in.

## Deployment
I deploy my app using amplify, I select host my app from github, then deploy it. 
