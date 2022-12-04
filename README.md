# Poker Hands

Poker Hands is a PWA where you can save cards with poker hands. You can delete or edit your cards and read cards of other users or yours in a details page.

## Links

###[-Back-end](https://github.com/darqsa/poker-hands-darqsa-front) 

🌐♠️ PokerHands

[💻Front deploy](https://david-arques-final-project-202207-bcn.netlify.app/home)

[💻Back deploy](https://darques-final-project-202207.herokuapp.com)

## Metrics

[📈 Front SonarCloud metrics](https://sonarcloud.io/project/overview?id=isdi-coders-2022_David-Arques_Front-Final-Project-202207-BCN)

[📈 Back SonarCloud metrics](https://sonarcloud.io/project/overview?id=isdi-coders-2022_David-Arques_Back-Final-Project-202207-BCN)

## Tecnologies

    🔸 Front
    React | Redux | PWA | Styled Components | Typescript | Jest | Cypress

    🔸 Back
    NodeJS | ExpressJS | MongoDB | Mongoose | JWT | Firebase | Jest | Supertest

    🔸 Tools
    Trello | Postman | Figma

## Back endpoints

    🔹 POST ➡️ .../users/register
    Register a user. The payload should have a name, username and password.

    🔹 POST ➡️ .../users/login
    Login with an existing user to get a valid token. The payload should have an existing username and password.

    🔹 GET ➡️ .../hands
    Get all the hands.

    🔹 POST ➡️ .../hands/create
    Create a hand. The payload should have a hand object and an optional image.

    🔹 DEL ➡️ .../hands/delete/:handID
    Delete a hand with it's ID. A hand can be deleted only by it's creator.

    🔹 GET ➡️ .../hands/:handID
    Get the hand by ID.

    🔹 PUT ➡️ .../hands/edit/:handID
    Edit a hand by ID. A hand can be edited only by it's creator.

    🔹 GET ➡️ .../hands/filter/:handName
    Get a specific hand by handName.
