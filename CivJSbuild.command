#!/bin/sh
# Per rendere eseguibile questo script lanciare su un terminale il comando chmod +x CivJSbuild.command
# Poi per eseguirlo lanciare sul terminale il comando ./CivJSbuild.command
# In alternativa lo si può far eseguire anche con un doppio click sul file
#
echo "CivJS production build started..."
#
# HTML COMPRESSION
#
echo "HTML compression started..."
cd /Users/Venerons/Desktop/CivJS/
java -jar /Users/Venerons/Documents/Developer/htmlcompressor-1.5.3.jar --type html -o index.min.html index.html
rm index.html
mv index.min.html index.html
java -jar /Users/Venerons/Documents/Developer/htmlcompressor-1.5.3.jar --type html -o game.min.html game.html
rm game.html
mv game.min.html game.html
echo "HTML compression completed."
#
# JAVASCRIPT COMPRESSION
#
echo "JS compression started..."
cd scripts/
java -jar /Users/Venerons/Documents/Developer/compiler.jar --js=graphics.js --js=game.js --js=utils.js --js_output_file=civjs.js
rm graphics.js
rm game.js
rm utils.js
java -jar /Users/Venerons/Documents/Developer/compiler.jar --js=database.js --js_output_file=database.min.js
rm database.js
mv database.min.js database.js
java -jar /Users/Venerons/Documents/Developer/compiler.jar --js=index.js --js_output_file=index.min.js
rm index.js
mv index.min.js index.js
echo "JS compression completed."
echo "CivJS production build completed."
