#Durfje

Gulp commands:

gulp serve
This will compile all our resources and should pop up a browser window afterwards. If you change something in your code, the browser window should automatically refresh.

gulp serve:minified
The gulp serve:minified should do something quite similar, except that it will run the less:min and js:min tasks.

gulp tdd
Then we have the gulp tdd task, that will run each unit test again as soon as the code changes. For example, when we changed something so that the code would fail, we could see the errors. When we fixed the code again, all tests ran successfully again.

gulp package
Then finally we have the gulp package task, which can be used to create a ZIP archive. When the task is completed, you will be able to find a .ZIP file inside the dist/ folder containing your application sources.# myproject-adminpanel
