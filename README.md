banc-bi-js
==========

visual caption/image timeline editor

### todo


**UI**
- sélectionner une seule colonne
- enregistrer les légendes/images + lignes ( csv ? https://github.com/wdavidw/node-csv )
- materialiser les sauts de pages dans la timeline du projet
- raccourcis clavier ( TAB pour changer de col, espace pour la sélectionner, flèches D/G pour passer d’une image à l’autre, entrer pour envoyer )
- Selectionner une typographie ( correspondant au role du client )

**server**
- scan dir with glob paterns ( https://github.com/isaacs/node-glob )
- redimensionner les images/retraitement ( http://aheckmann.github.io/gm ) 
- sanitize filename ( https://www.npmjs.org/package/sanitize-filename ) 


**édition**
- forcer les images à 300 dpi en css
- lancer l’impression ( https://www.npmjs.org/package/lp-client )


### exemple de ligne CSV

| timecode  | client_name | caption | caption_style | dirname1   | dirname2   | dirnamen   |
| --------- | ----------- | ------- | ------------- | ---------- | ---------- | ---------- |
| 1401188437| editeur     | bla bla | bold,italic    | img32.jpg  | img27.jpg | nnnn.jpg   |
