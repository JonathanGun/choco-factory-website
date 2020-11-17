## Node Libraries

1. create-react-app
1. material-ui

Client server runs on [http://localhost:4000/](http://localhost:4000/)

You can also view as static page:

1. Build

```
npm run-script build
```

2. Serve

```
serve -s build
```

Static client server runs on [http://localhost:5000/](http://localhost:5000/)

## Project Structure

```
├───public
│       favicon.ico
│       index.html
│       manifest.json
│
└───src
    │   index.js
    │   theme.js
    │
    └───components
        │   App.js
        │   Balance.js
        │   Content.js
        │   Header.js
        │   Sidebar.js
        │   SignIn.js
        │
        ├───button
        │       GroupedButton.js
        │
        ├───chocostock
        │       ChocoStock.js
        │       ChocoStockHeader.js
        │       IngredientItem.js
        │
        ├───ingredientstock
        │       IngredientDetailItem.js
        │       IngredientStock.js
        │       IngredientStockHeader.js
        │
        └───requests
                RequestItem.js
```

## Low Fidelity Design

<img src="./client/screenshot/lofi.png" width="350px">
