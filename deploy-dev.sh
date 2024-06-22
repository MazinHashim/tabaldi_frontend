echo "Switching to master branch"
git checkout master 

echo "Building app..."
npm run build:qa

echo "Deploying files to server..."
scp -r build/* root@194.238.22.144:/var/www/qa.rateena-app.com/

echo "Done!"