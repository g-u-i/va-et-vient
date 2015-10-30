#!/bin/bash
# set -x

# settings
# lanch with $ watch -n 10 print-deamon.sh 

printer=Canon_LBP7100C_7110C
archivebox="archivebox/"
printinbox="printbox/"

# main loop
mkdir $archivebox $printinbox

for step in `find $printinbox -iname "*.pdf" -type f`
do 
  lpr -P $printer -o media=A4 -o fit-to-page $step
  mv -v $step $archivebox # copy in outbox (archives)
done
