#!
git add *
echo \"`date`\" | xargs git commit -m
git push origin 
git push heroku main