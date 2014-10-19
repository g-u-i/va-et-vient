#!/bin/bash
# set -x

# settings

printer=_192_168_1_35                    # labos
archivebox="archivebox/"
printinbox="printbox/"
interval=5

# main loop
mkdir $archivebox $printinbox

while true; do

  for step in `find $printinbox -iname "*.pdf" -type f`
  do 
    lpr -P $printer -o media=A4 -o fit-to-page $step
    mv -v $step $archivebox # copy in outbox (archives)
  done

  # wait
  for (( i=$interval; i>0; i--)); do
    sleep 1 &
    printf "next try in $i s \r"
    wait
    printf "                   \r"
  done
done