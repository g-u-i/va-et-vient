banc-bi-js
==========

visual caption/image timeline editor

todo
-
#### server
- scan dir with glob paterns ( https://github.com/isaacs/node-glob )
- redimensionner les images/retraitement ( http://aheckmann.github.io/gm ) 
- sanitize filename ( https://www.npmjs.org/package/sanitize-filename ) 

#### redactor UI
- sélectionner une seule colonne
- enregistrer les légendes/images + lignes ( csv ? https://github.com/wdavidw/node-csv )
- materialiser les sauts de pages dans la timeline du projet
- raccourcis clavier ( TAB pour changer de col, espace pour la sélectionner, flèches D/G pour passer d’une image à l’autre, entrer pour envoyer )
- selectionner une typographie ( correspondant au role du client )
- décompte du nombre de caractères restant pour la légende

#### feedback UI
- changer la densité de l'affichage ( 1 image, 1 légende, 1 ligne ou toute la timeline )
- intrompre la diffusion ( écran noire )

#### editor ui
- iframe hash tag twitter
- capatation/feedback sonore

#### print
- forcer les images à 300 dpi en css
- lancer l’impression ( https://www.npmjs.org/package/lp-client )
- mise en page spécifique, converture ? pagination ? sommaire ?

exemple de ligne CSV
-

| timecode  | client_name | caption | caption_style | dirname1   | dirname2   | dirnamen   |
| --------- | ----------- | ------- | ------------- | ---------- | ---------- | ---------- |
| 1401188437| editeur     | bla bla | bold,italic    | img32.jpg | none       | nnnn.jpg   |
