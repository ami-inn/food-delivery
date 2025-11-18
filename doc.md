npx create-expo-app@latest
create an expo app 

create an account on app write
create an account on sentry


npx expo start to start

ts config contains the configure of the typescript
app.json contains the app configuration  name slug verison and all
scripts folder single step to restet the code to bare minimum

npm run reset-project to reset the project to bare miniimum code


for styling we can use native wind its imilar like tylewind css

learn adding the custom font
use the usefont hook on the layout and setup the custom fonts

-usefont to load the custom font
-safeareaview not from react native from "react-native-safe-area-context" this ensure that  the area not cut by notches or edges on any devices
-flatlist recommented way to render list on react native this as maping the list use when data is long
-view similar to div
-text for render texts
-pressable if u put anything under this and it make as clickable
-TouchableOpacity its kindof button in react native
- scroll flatlist in webdev browser actually add scrollbar when it exceedes the limit
- in react native the alyout engin not assume tha tu wanna score so you expilicitly wrap your content in a scrollable container scrollview or flatlist
- never ever wrap a flat list inside a scroll view
- 

route structure 
route group (auth ) it will be auth folder routes
_layout <Slot /> to render the  rest of content like outlet
- redirect href for to redirect to particular route if authenticated or not authenticated
- safe areia view 
- touchable opacity and button difference mention here


lean appwrite
appwrite opensource all in one platform this app use for backend infastructure

create project 
connect platform select react-ntive
enter details
com.ami.foodapp
instll npx expo install react-native-appwrite react-native-url-polyfill

authflow
userenterdata --> call the appwrite auth function =--> create a new auth user ---> call appwrite db ---> store in the user collection --->

we have user couple of orders
user have multiple addressses


need to create db
create an db and change the appwrite config with the id databaseid
configure the creat database and table and rows and colums 
and configure the appwrite like appwrite.ts
and create table and db accordingly enable the permisions

storage feature of appwrite is used for storing the images and other struffs

KeyboardAvoidingView its use for keyboard will appear below automaticall it will not go above


seeding the database
create the data.ts the dummy datas
and check the seed.ts file for seeding the database

sentry implementation
explain here what is sentry is
create an account on sentry
and choose the platform 
npx @sentry/wizard@latest -i reactNative install this
yes yes
sentrysas select
sentry acount yes
authenticate and create project
session replay add yes
click yes
sentry.catch 

Tabs = used t is implemented with React Navigation's bottom tabs and offers familiar API if you have already used React Navigation.

t is implemented with React Navigation's bottom tabs and offers familiar API if you have already used React Navigation.

Tabs.Screen
write the sceen name tible and tabbaricon