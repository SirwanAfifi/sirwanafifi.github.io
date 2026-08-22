# Displaying Secured Images

Ran into an interesting problem this week with displaying secured images on the page. The problem is that `img` tag doesn't show the image if the resource is secured with a token or a username/password...

- Published: 2020-01-25
- Language: en
- Tags: Node.js, Express, React, JavaScript
- Canonical: https://sirwan.info/blog/en/Displaying-Secured-Images

---

Ran into an interesting problem this week with displaying secured images on the page. The problem is that `img` tag doesn't show the image if the resource is secured with a token or a username/password. When the browser encounters an image tag with a secured URL, it's unable to show the image, so it immediately responds with 401 Unauthorized error because the request is heading towards a protected resource. To show the problem, consider the following endpoint which requires the caller to pass in a token:

```js
// server.js
app.get("/downloadSecuredImage", authentication, (req, res) => {
  res.sendFile(`${__dirname}/images/Me.jpg`);
});
```

As you can see, the Express framework provides a `sendFile()` method available on the response object which can be used to send static files to the client. It automatically sets appropriate headers to the response. I should also mention the token validation takes place using a custom Express middleware:

```js
const jwt = require("jsonwebtoken");
const database = require("../db/users");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, "SUPER_SECRET_PRIVATE_KEY");
    const user = database.users.some((u) => u.email === decoded.user);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    req.user = decoded.user;
    next();
  } catch (exception) {
    console.log(exception);
    res.status(401).send(exception);
  }
};

module.exports = authentication;
```

Now if we want an `img` tag to point to that endpoint, we get `401 Unauthorized` error, and the result would be the following image:

<img class="img-res" src="/img/secured-image-401.png" alt="secured-image" />

One solution to tackle this issue is by embedding the image using a particular format. This format is called Data URL, and we can use it inside the image's `src` attribute, So the browser does not have to make another request to get it. Here is an example of how such Data URL looks like:

```
data:image/png;base64,R0lGODlhEAAQAM...
```

So we'll need to issue a request of type blob (`responseType: "blob"`) to the protected endpoint with the JWT token provided directly from the code. This way, we don't need to hard-code the URL inside `src` attribute anymore. Once the request is completed, we then assign the response data to a variable and make use of `FileReader`'s `readAsDataUrl` method to convert the blob result to Base64-encoded string. Here is a React component doing the process:

```tsx
import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [token, setToken] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>("");

  const downloadImage = async () => {
    const img = await axios(`http://localhost:4000/downloadSecuredImage`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = img.data;
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="form-group">
            <button
              className="btn btn-info"
              onClick={(_) => downloadImage()}
              disabled={!token}
            >
              Download Image
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img
            src="http://localhost:4000/downloadSecuredImage"
            alt="This is a secured image...."
          />
        </div>
        <div className="col">
          {image && <img src={image as string} alt="Image" />}
        </div>
      </div>
    </div>
  );
};
```

Now when the button is clicked we get the file from the server and save the converted result into a state, When the browser encounters the data URL (the value of `image`), It decodes the data and constructs the original file. This way, we have embedded the image data directly into the document.

<img class="img-res" src="/img/SecureImageDemo.gif" alt="SecureImageDemo" />
