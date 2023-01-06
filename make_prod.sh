echo -n "Making build folder ......"; npm run build &> /dev/null; echo " done.";
if [ -z "$(ls -A ../server/dialogplus)" ]; then
  echo -n "Copying build folder in server repo"; mv build/ ../server/dialogplus; echo " done";
else
  rm -rf "../server/dialogplus/build/"
  echo -n "Copying build folder in server repo"; mv build/ ../server/dialogplus; echo " done";
fi
#echo -n "copying build folder in server repo"; mv build/ ../server/dialogplus/; echo " done.";
