# My Approach to Problem Solving - Blazor Version

Here's how I tackle my programming tasks using Test Driven Development (TDD). I first try to understand the problem and then break it down into smaller tasks. TDD helps me do this effectively. I don't use TDD just to write tests; it's a way to manage and solve problems step by step.

- Published: 2024-07-31
- Language: en
- Tags: TDD, Blazor, TailwindCSS
- Canonical: https://sirwan.info/blog/en/my-approach-to-problem-solving-blazor-version

---

Here's how I tackle my programming tasks using Test Driven Development (TDD). I first try to understand the problem and then break it down into smaller tasks. TDD helps me do this effectively. I don't use TDD just to write tests; it's a way to manage and solve problems step by step.

> [TDD For Breaking Problems Apart](https://daedtech.com/tdd-for-breaking-problems-apart/)

Recently, I wanted to build a simple UI to track my calorie intake using Blazor and TailwindCSS. I started by defining my goals and then listing all the test cases I could think of. I began with a simple test, like rendering something on the screen. Then I moved on to more complex tasks, like adding a button to add a new item. This approach helped me build the app without feeling overwhelmed.

```csharp
public class HomeTests : TestContext
{
    public HomeTests()
    {
        var dbContext = new Mock<IUnitOfWork>();
        dbContext.Setup(x => x.DbSet<Meal>())
            .ReturnsDbSet(FakeData.Meals);
        
        Services.AddSingleton(dbContext.Object);
    }
    [Fact]
    public void ShouldRenderMealComponent()
    {
        var meal = RenderComponent<Home>();
        meal.RenderCount.Should().BeGreaterThan(0);
    }
    [Fact]
    public void ShouldRenderListsOfMeals()
    {
        var meal = RenderComponent<Home>();
        meal.FindComponents<MealItem.MealItem>().Count.Should().Be(3);
    }
    [Fact]
    public void ShouldRenderTotalCalories()
    {
        var meal = RenderComponent<Home>();
        var value = meal.FindComponent<TotalCalories>().Find("h2").TextContent;
        value.Should().Be("2,000");
    }
}
```
This is where the feedback loop comes in. I write a test, run it, see it fail, write the code to make it pass, run the test again, and see it pass. This loop is crucial because it gives me confidence that I'm on the right track and helps me refactor the code safely, knowing that the tests will catch any mistakes. Using this method, I built the main screen of the app quickly:

<img src="/img/blazor/tdd-blazor_app.png" alt="tdd-blazor_app" />
<img src="/img/blazor/tdd_blazor_app_main_razor.png" alt="tdd_blazor_app_main_razor" />

Next, I moved on to the Add Meal screen, following the same approach:

```csharp
public class AddMealTests : TestContext
{
    public AddMealTests()
    {
        var dbContext = new Mock<IUnitOfWork>();
        dbContext.Setup(x => x.DbSet<Meal>())
            .ReturnsDbSet(FakeData.Meals);
        Services.AddSingleton(dbContext.Object);
    }
    [Fact]
    public void ShouldRenderAddMealComponent()
    {
        var addMeal = RenderComponent<AddMeal>();
        addMeal.RenderCount.Should().BeGreaterThan(0);
    }
    [Fact]
    public void ShouldRenderAddMealForm()
    {
        var addMeal = RenderComponent<AddMeal>();
        addMeal.Find("form").Should().NotBeNull();
    }
    [Fact]
    public void ShouldRenderAddMealFormInputs()
    {
        var addMeal = RenderComponent<AddMeal>();
        addMeal.FindAll("input").Count.Should().Be(3);
    }
    [Fact]
    public void ShouldRenderAddMealFormButton()
    {
        var addMeal = RenderComponent<AddMeal>();
        addMeal.Find("button").Should().NotBeNull();
    }
    [Fact]
    public void ShouldReturnsErrorWhenFormIsInvalid()
    {
        var addMeal = RenderComponent<AddMeal>();
        addMeal.Find("button").Click();
        addMeal.FindAll(".validation-message").Count.Should().Be(4);
    }
    [Fact]
    public void ShouldAddMealWhenFormIsValid()
    {
        var addMeal = RenderComponent<AddMeal>();
        var dbContext = Services.GetService<Mock<IUnitOfWork>>();
        
        addMeal.Find("input[name='Meal.MealName']").Change("Test Meal");
        addMeal.Find("select").Change("Breakfast");
        addMeal.Find("input[name='Meal.Calories']").Change("500");
        
        InputFileContent fileToUpload = InputFileContent.CreateFromText("Text content", "meal.jpg");
        IRenderedComponent<AddMeal> cut = RenderComponent<AddMeal>();
        IRenderedComponent<InputFile> inputFile = cut.FindComponent<InputFile>();
        inputFile.UploadFiles(new []{fileToUpload});

        
        addMeal.FindAll(".validation-message").Count.Should().Be(0);
        dbContext?.Object.DbSet<Meal>().LastOrDefault()?.MealName.Should().Be("Test Meal");
    }
    
    // Other tests...
}
```

<img src="/img/blazor/tdd_blazor_app_test_cases.png" alt="tdd_blazor_app_test_cases" />


This process helped me build the app incrementally, one step at a time. I didn't have to worry about the big picture; I just focused on the next test case/feature.
