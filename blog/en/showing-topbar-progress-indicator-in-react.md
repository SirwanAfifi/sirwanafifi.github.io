# Showing Topbar Progress Indicator in React

I use circular loading indicators in my React applications before data is returned from the server...

- Published: 2021-09-01
- Language: en
- Tags: React, React Query, Axios, Vite
- Canonical: https://sirwan.info/blog/en/showing-topbar-progress-indicator-in-react

---

I use circular loading indicators in my React applications before data is returned from the server:

 <img src="/img/circular_loading.jpg" alt="circular_loading" />

Which is a simple SVG file loaded as a React component:

```tsx
// other imports
import { ReactComponent as Circular } from "./assets/CircularLoading.svg";// highlight-line

function App() {
  const { data, isLoading } = useQuery<User[]>("users", () => getUsers(), {})
  return (
    <div>
      {isLoading && <Circular className="circular" /> // highlight-line}
      {data && (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
```

In one of our projects I was asked to add a topbar loading indicator:

 <img src="/img/linear_loading.jpg" alt="linear_loading" />

Since it's an SVG file, it's pretty easy to do. However, it should be based on the elapsed time. As opposed to the first one, which spins as long as `isLoading` is set to `true`, for this one we will have to calculate the actual elapsed time and convert it to percentage, then use it as `width` for the loading indicator.

```tsx
function App() {
  const [progress, setProgress] = useState(0) // highlight-line
  const { data, isLoading } = useQuery<User[]>(
    "users",
    () =>
      // highlight-start
      getUsers(progressEvent => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        )
        setProgress(percentCompleted)
      }),
    // highlight-end
    {}
  )
  return (
    <div>
      {isLoading && <TopbarLoading value={progress} /> // highlight-line}
      {isLoading && <Circular className="circular" />}
      {data && (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// highlight-start
const TopbarLoading = styled(Linear)<{ value?: number }>`
  #progress rect {
    transition: width 0.5s;
    width: ${props => (props.value && `${props.value}px`) || "unset"};
  }
`
// highlight-end

export default App
```

You can see from the code above that we changed the service method slightly. It now accepts a callback that is used to update the progress state. The implementation below utilizes the integrated functionality of axios:

```ts
export const getUsers = (
  onDownloadProgress?: (progressEvent: {
    loaded: number;
    total: number;
  }) => void
) =>
  client
    .get("/api/users", {
      onDownloadProgress,
    })
    .then((res) => (res as AxiosResponse).data);
```

If you just want to display a loading bar that goes backwards and forwards, you do not need to pass the `onDownloadProgress` event. All you need to do is use a timer to generate random values while the data is being loaded:

```tsx
function App() {
  let timer: number; // highlight-line
  const [progress, setProgress] = useState(0);
  const { data, isLoading } = useQuery<User[]>("users", () => getUsers(), {
    onSuccess: () => clearInterval(timer), // highlight-line
  });

  // highlight-start
  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          return 0;
        }
        return Math.min((prev + Math.random() * 20) % 100, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // highlight-end

  return (
    <div>
      {isLoading && <TopbarLoading value={progress} />}
      {isLoading && <Circular className="circular" />}
      {data && (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const TopbarLoading = styled(Linear)<{ value?: number }>`
  #progress rect {
    transition: width 0.5s;
    width: ${(props) => (props.value && `${props.value}px`) || "unset"};
  }
`;

export default App;
```
