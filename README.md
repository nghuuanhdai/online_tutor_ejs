<h1 align="center">
    Online Tutor
</h1>
<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/24937352/175797809-493b719c-e306-43f2-a012-8756c5169bae.png" alt="Online tutor logo">
  <br/>
  <h4 align="center">A web application made with ejs, express, mongodb, firebase auth, and some other 3rd party services for online course management.</h4>
</p>

## Demo
### Live demo: https://nnhhaadd-online-tutor.herokuapp.com/
Demo credential
  - **User account:** email: admin@demo.com, password: i0sX3W$neb;P=xZn4(uB  
  - **Lecturer account:** email: user@demo.com, password: yj8#eS2W(-XJ0*naw9}k   

*These are dummy emails since this application doesn't provide email verification*

### Deploy it yourself
  - **Clone this repo:** `git clone git@github.com:nghuuanhdai/online_tutor_ejs.git`
  - **Setup environment variable:** This application uses Firebase, MongoAtlas, VimeoSDK, and Cloudinary. To deploy the application yourself, make sure to populate all the environment variables in the following table.


| Key | Value |
|---|---|
| FIREBASE_PUBLIC_API_KEY     | Firebase public API key |
| FIREBASE_AUTH_DOMAIN        | Firebase auth domain |
| FIREBASE_PROJECT_ID         | Firebase project id |
| FIREBASE_PRIVATE_KEY        | Firebase private id with new line escaped as \n |
| FIREBASE_CLIENT_EMAIL       | Firebase client email |
| FIREBASE_DATABASE_URL       | Firebase realtime database URL |
| MONGODB_URI                 | MongoDB connection URI |
| VIMEO_CLI_ID                | Vimeo client id |
| VIMEO_CLI_SECR              | Vimeo client secret |
| VIMEO_ACC_TOKEN             | Vimeo account token |
| CLOUDINARY_CLOUD_NAME       | Cloudinary cloud name |
| CLOUDINARY_UPLOAD_PRESET    | Cloudinayr upload preset. Make sure this preset is unsigned otherwise we can't upload the image to Cloudinary |

  - **Start the server with**  `npm run start` 
  - **Create Lecturer account:** a *lecturer account* or *admin account* is the same as a *normal/student account*, except for a additional property **admin** set to **true**. You can find these documents in the profiles collection. **Notice:** you should create your account first before making it an *admin account* otherwise this collection may not exist.  
       ![image](https://user-images.githubusercontent.com/24937352/175797774-1f25a4c8-6c82-4f10-a7e4-2c6f38f76cdd.png)
       
## Features
### Account authentication/authorization
This application uses Firebase Authentication service to provide login, register, and password reset via email.  
**Notice!** Because of the default email namespace provided by Firebase. Reset password email may end up in your spam emails.

### Student access
*Student account* is the default account when a user register to the website.
|Feature|Preview|
|---|---|
|By default users can only review existing courses but can not see the lectures.<br>The only way to gain access to a course is to get in contact with an admin and request it.|*All existing courses on the home page*<br>![image](https://user-images.githubusercontent.com/24937352/175798237-e9d4fb2d-c612-4d72-91a3-fe7eb93d81ee.png)<br>*Course detail page with description and lecture list*<br>![image](https://user-images.githubusercontent.com/24937352/175798407-f5c88336-6f19-4c14-a5c3-81c5c4a056fe.png)<br>*User without access to a course will see the lecture links to be grayed out*<br>![image](https://user-images.githubusercontent.com/24937352/175798162-37878458-eb70-4eea-93a9-e7d6ceba2b1a.png)|
| Users with access to a course could start seeing the lecture content, and milestone list so they could track their progression.|*Lecture page with lecture video and progression checklist*<br>![image](https://user-images.githubusercontent.com/24937352/175798272-9554885e-aff2-4845-b2bc-f6ba7d3b893e.png)|

### Lecturer courses management
Users with *Lecturer account* will have some additional sections available to them.
|Feature|Preview|
|---|---|
|**Home Page**<br>Create new course|![image](https://user-images.githubusercontent.com/24937352/175798664-353efbcc-151d-46d3-b703-532f0afc927c.png)|
|**Course Detail Page**<br>Update course overview content with a rich text editor (*Quilljs*)|![image](https://user-images.githubusercontent.com/24937352/175798671-838b93ac-59a8-4225-bc3a-45dd5b7a3491.png)|
|**Course Detail Page**<br>Update thumbnail with cloudinary|![image](https://user-images.githubusercontent.com/24937352/175798686-a1a3fa14-85c1-421f-b7de-fba53b4ee920.png)|
|**Course Detail Page**<br>New lecture|![image](https://user-images.githubusercontent.com/24937352/175798693-11b5b520-3e47-468c-9d13-c0f30a5b50d3.png)|
|**Lecture Detail Page**<br>Update lecture description with a rich text editor (*Quilljs*)|![image](https://user-images.githubusercontent.com/24937352/175798701-680fd3e2-3501-4a07-883d-dd8707c1e708.png)|
|**Lecture Detail Page**<br>Upload video to Vimeo|![image](https://user-images.githubusercontent.com/24937352/175798707-b6ecc12b-8172-45ee-a955-3c8882161130.png)|
|**Users Page**<br>Create new account for student|![image](https://user-images.githubusercontent.com/24937352/175798660-f688f73e-665d-4607-b3ec-403223fe8b9c.png)|
|**User Detail Page**.<br>Access by using the edit user form in Users Page<br>Edit student's available courses|![image](https://user-images.githubusercontent.com/24937352/175798653-3fe589d8-95bc-4ea4-81a3-0b92329009ca.png)|

### Responsive design with bootstrap
| Desktop | Tablet | Mobile |
|---|---|---|
|![image](https://user-images.githubusercontent.com/24937352/175798041-1ede269f-98bb-45db-91a4-0373e032427d.png)|![image](https://user-images.githubusercontent.com/24937352/175798046-d994f2e8-75d8-469d-b87c-cbac14a15798.png)|![image](https://user-images.githubusercontent.com/24937352/175798054-b70a64c6-5cdf-4405-8a1c-3e903110c2a1.png)|
