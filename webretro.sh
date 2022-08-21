echo webretro install script
echo Downloading webretro
wget https://github.com/BinBashBanana/webretro/releases/download/v6.5/webretro-v6.5.zip
echo Uncompressing webretro
unzip webretro-v6.5.zip -d temp-webretro
echo Copying webretro
cp -r temp-webretro static/source/webretro
echo Cleaning up
rm -r temp-webretro
echo Done!