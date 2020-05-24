
rem build
call npm run %1 

rem navigate into the build output directory
cd dist

rem if you are deploying to a custom domain
rem echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git remote add origin git@github.com:sndralex/treyner-net-dist.git
git push -fu origin head
rem git push --set-upstream git@github.com:sndralex/treyner-net-dist.git master  

rem if you are deploying to https://<USERNAME>.github.io
rem git push -f git@github.com:sndralex/treyner-net-dist.git

rem if you are deploying to https://<USERNAME>.github.io/<REPO>
rem git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd ..
goto :EOF

:error
echo Failed with error #%errorlevel%.
exit /b %errorlevel%