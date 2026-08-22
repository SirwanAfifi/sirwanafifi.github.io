# disallow nested ternary expressions (no-nested-ternary)

We usually use ternary operator as a shortcut for `if` statement, For instance, in React applications we can use them to conditionally rendering elements inline...

- Published: 2021-06-10
- Language: en
- Tags: JS, TypeScript, Clean Code, Ternary Operator
- Canonical: https://sirwan.info/blog/en/no-nested-ternary

---

We usually use ternary operator as a shortcut for `if` statement, For instance, in React applications we can use them to conditionally rendering elements inline:

```tsx
<div>{isLoggedIn ? <MainLayout /> : <LandingPage />}</div>
```

It's great until it's not. Let me give you an example, I had written the following piece of code in one of our projects:

```ts
const jsonResult = {
  schedule: [
    {
      // lots of other props
      ...(recipeElement.Repeat
        ? {
            hour: `${fromTime[0]}-${toTime[0]}`,
            minutes: `*/${frequency[1]}`,
          }
        : {
            hour: fromTime[0],
            minutes: fromTime[1],
          }),
    },
  ],
};
```

I was asked to change the code a little bit and add something on top of it:

```ts
const hourRangeSegements = `${fromTime[0]}-${endTime[0]}`;
const jsonResult = {
  schedule: [
    {
      // lots of other props
      ...(recipeElement.Repeat
        ? frequency[0] === "00"
          ? {
              hour: timeSegements,
              minutes: `*/${frequency[1]}`,
            }
          : {
              hour: timeSegements,
            }
        : {
            hour: fromTime[0],
            minutes: fromTime[1],
          }),
    },
  ],
};
```

As you can see the nested ternary operator is not readable (I know it's called chained ternaries I just don't like them). Of course the code worked as expected but I didn't like it so I tried to change it to something like this:

```ts
const hourRangeSegements = `${fromTime[0]}-${endTime[0]}`;
const jsonResult = {
  schedule: [
    {
      // lots of other props
      ...(recipeElement.Repeat
        ? {
            hour: timeSegements,
            ...(frequency[0] === "00" ? { minutes: `*/${frequency[1]}` } : {}),
          }
        : {
            hour: fromTime[0],
            minutes: fromTime[1],
          }),
    },
  ],
};
```

A bit better, right? but it's still nested. Let's try something else:

```ts
const hourRangeSegements = `${fromTime[0]}-${endTime[0]}`;
const jsonResult = {
  schedule: [
    {
      // lots of other props
      ...(() => {
        // You can also use switch/case if you want to

        if (!recipeElement.Repeat) {
          return {
            hour: fromTime[0],
            minutes: fromTime[1],
          };
        }

        if (frequency[0] === "00") {
          return {
            hour: timeSegements,
            minutes: `*/${frequency[1]}`,
          };
        }

        return {
          hour: timeSegements,
        };
      })(),
    },
  ],
};
```

As you can see I completely got rid of the ternary operators and replaced it with an IIFE. It's a bit long-winded but much better in terms of code readability. I know I could have moved it to a new function I didn't want to, for two main reason:

- I am a lazy developer 😁
- That's the only place where I use that logic (in terms of code reusability)

### Let's do another small improvement, Shall we?

I'm not saying I'm against using ternary operators, My point being is that using chained ternaries makes our code difficult to read, So I merged the last two return statments:

```ts
const hourRangeSegements = `${fromTime[0]}-${endTime[0]}`;
const jsonResult = {
  schedule: [
    {
      // lots of other props
      ...(() => {
        // You can also use switch/case if you want to

        if (!recipeElement.Repeat) {
          return {
            hour: fromTime[0],
            minutes: fromTime[1],
          };
        }

        return {
          hour: timeSegements,
          ...(frequency[0] === "00" ? { minutes: `*/${frequency[1]}` } : {}),
        };
      })(),
    },
  ],
};
```

You might say, well, we don't need that long-winded IIFE we can just merge them all together:

```ts
const hourRangeSegements = `${fromTime[0]}-${endTime[0]}`;
const jsonResult = {
  schedule: [
    {
      // lots of other props
      ...{
        hour: recipeElement.Repeat ? timeSegements : { hour: fromTime[0] },
        ...(frequency[0] === "00"
          ? { minutes: `*/${frequency[1]}` }
          : { minutes: fromTime[1] }),
      },
    },
  ],
};
```

But again it's not readable.
