ONE FOLDER SHOP WORKFLOW

1) Put saved HTML and the matching *_files folder into INPUT_HERE.
   Example:
   INPUT_HERE/product.html
   INPUT_HERE/product_files/big.jpg

2) Run 1_CLICK_JPG_TO_REVIEW.bat
   It copies JPG/JPEG only into review_images/folder01/image01.jpg ...

3) In review_images, delete images you do not use.
   Rename each product folder to match products.csv folder value.
   Example: bag01, bag02, shoes01, etc01

4) Run 2_CLICK_REVIEW_TO_SHOP_ASSETS.bat
   It creates:
   assets/bag01/main.jpg
   assets/bag01/detail01.jpg
   assets/bag01/detail02.jpg
   and also copies the same structure to uploads.

5) Open index.html to preview the shop.

IMPORTANT:
- The shop code reads images from assets/{folder}/main.jpg and detail01.jpg.
- The folder name must match the folder column in products.csv.
- Running step 1 resets review_images.
- Running step 2 resets assets and uploads.
