# Building Ionic React App

Ionic is a cross-platform mobile app development framework built on top of Angular. It allows you to build mobile apps using web technologies like HTML, CSS, and JavaScript...

- Published: 2019-10-21
- Language: en
- Tags: React, Ionic, Programming Notes
- Canonical: https://sirwan.info/blog/en/Building-Ionic-React-App

---

1. Make sure you have Node.js installed (https://nodejs.org/dist/v12.13.0/node-v12.13.0-x86.msi)
2. Open command prompt and type in this command to create an app: npx ionic start myApp blank --type=react
3. Make sure you have VSCode installed (https://code.visualstudio.com/download)
4. cd into myApp
5. Type in this command to open the project in VSCode: code .
6. Inside App.tsx you can see something like this:
   `<Route path="/home" component={Home} exact={true} />`
   This means that when we navigate to /home it shows a page called Home which is located inside pages directory.
7. Run the project using this command: npx ionic serve
8. Switch to the editor and create a new page called List.tsx with this content:

```js
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const List: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is a sample page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {["Item one", "Item two", "Item 3"].map((item) => (
          <p key={item}>{item}</p>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default List;
```

9. Add a new route for the newly created page inside App.tsx right after the `<Route path="/home" component={Home} exact={true} />`:

```js
<Route path="/list" component={List} exact={true} />
```

<img class="center-image img-res" src="/img/ionic.png" alt="ionic" />
