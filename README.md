banc-bi-js
==========

visual caption/image timeline editor

installation

- créer un `sessions` 
- lancer `npm install`
- lancer `node server.js`
- créer une nouvelle session à partir de `localhost:8080/admin/`
- aller sur `localhost:8080`


todo
-
#### server
- glob paterns pour éviter les .sync et .DS_Store ( https://github.com/isaacs/node-glob )
- redimensionner les images/retraitement ( http://aheckmann.github.io/gm | css ?) 
- enregistrer en session, csv parser https://github.com/wdavidw/node-csv

exemple de CSV

| timecode  | client_name | caption | caption_style | dirname1   | dirname2   | dirnamen   |
| --------- | ----------- | ------- | ------------- | ---------- | ---------- | ---------- |
| 1401188437| editeur     | bla bla | bold,italic   | img32.jpg  | none       | nnnn.jpg   |

#### édition ui
- iframe live tweet
- champ de pris de notes
- diriger une *note* vers poste ( #1 #2 #3 )

#### rédaction UI
- sélectionner une seule colonne
- récuperer la *note* qui à été transmise au modeleur
- éditer la *note* pour la transformer en *légende*
- selectionner une variante typographique ( statut légende )
- afficher le timecode de la note
- décompte du nombre de caractères restant pour la légende
- shortcuts
  - `TAB` pour changer de col
  - `espace` pour la sélectionner
  - `fléche D/G` pour passer d’une image à l’autre
  - `entrer` pour envoyer ...

#### feedback UI
- varier la densité de l'affichage
  - toute la timeline 
  - full screen avec déplacement de cases en cases au clavier
- intrompre la diffusion ( écran noire )

#### capture ui
- capturer depuis la webcam
- afficher les nouvelles *notes* envoyés par l'éditeur
- marquer la *note* comme traitée
- shortcuts
  - `space` pour capturer
  - `l` marquer comme traité

#### impression 
- forcer les images à 300 dpi en css
- lancer l’impression ( +p | https://www.npmjs.org/package/lp-client )
- mise en page spécifique, converture ? pagination ? sommaire ?
