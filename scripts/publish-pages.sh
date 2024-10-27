vite build --base=/spotify-data/
rm -rf docs
mkdir docs
cp -r dist/ docs/
