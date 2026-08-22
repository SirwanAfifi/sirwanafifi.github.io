# Explicit Interface Implementation

Explicit interface implementation is a way to implement interface members that allows you to implement interface members with the same name.

- Published: 2016-08-12
- Language: en
- Tags: C#
- Canonical: https://sirwan.info/blog/en/Explicit-Interface-Implementation

---

Let's imagine that you have a class with two methods:

```csharp
public class VendingMachine
{
    public bool InsertCoin(float amount)
    {
        if (amount < 500)
        {
            return false;
        }
        return true;
    }

    public string Buy()
    {
        return "Buy";
    }
}
```

Now when we want to create an instance of this class and call one of those methods, it executes as expected:

```csharp
VendingMachine machine = new VendingMachine();
machine.InsertCoin(5); // false
machine.Buy();         // "Buy"
```

Now suppose that we have an interface called `IVendingMachine` that has two methods:

```csharp
public interface IVendingMachine
{
    bool InsertCoin(float amount);
    string Buy();
}
```

We want our class to implements this interface:

```csharp
public class VendingMachine : IVendingMachine
{
    public bool InsertCoin(float amount)
    {
        if (amount < 500)
        {
            return false;
        }
        return true;
    }

    public string Buy()
    {
        return "Buy";
    }
}
```

Our class satisfied the interface because it has the methods with the same names. So Visual Studio doesn't give you a compiler error. Now let's imagine that we
also want to add interface's methods to this class, So, in this case, we must explicitly prefix the methods with `IVendingMachine.`:

```csharp
public class VendingMachine : IVendingMachine
{
    public bool InsertCoin(float amount)
    {
        if (amount < 500)
        {
            return false;
        }
        return true;
    }

    bool IVendingMachine.InsertCoin(float amount)
    {
        if (amount < 300)
        {
            return true;
        }
        return false;
    }

    public string Buy()
    {
        return "Buy";
    }

    string IVendingMachine.Buy()
    {
        return "IVendingMachine Buy";
    }
}
```

Note that Visual Studio can help you to implement interface explicitly by pressing `Ctrl + .` on the name of the interface and select `Implement interface explicitly`:

<img class="img-res" src="/img/explicit_interface_implementation.jpg" />
Now, what happens when we call the `InsertCoin` and `Buy` methods? In this case, we should consider two different situations when we create the object:

- Concrete Type
- Interface Variable

If we want the methods of `VendingMachine` we should create the object with concrete type:

```csharp
VendingMachine machine = new VendingMachine();
machine.InsertCoin(5); // false
machine.Buy();         // "Buy"
```

If we want the methods of `IVendingMachine` we should create the object with interface variable:

```csharp
IVendingMachine machine = new VendingMachine();
machine.InsertCoin(5); // true
machine.Buy();         // "IVendingMachine Buy"
```
