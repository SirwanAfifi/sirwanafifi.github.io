# OS Notification

I recently tweeted something about a little script I had put together to automate one of the tasks I had always struggle with. I thought it would be a good idea to share the process in a little bit more detail:

- Published: 2021-05-19
- Language: en
- Tags: macOS, Windows, AppleScript, Powershell
- Canonical: https://sirwan.info/blog/en/OS-Notification

---

I recently tweeted something about a little script I had put together to automate one of the tasks I had always struggle with. I thought it would be a good idea to share the process in a little bit more detail:

<blockquote class="twitter-tweet"><p lang="fa" dir="rtl">کلاً خیلی علاقه دارم کارهای روتین‌ رو اتوماتیک کنم، یه مدته یه schedule task نوشتم که هر نیم ساعت یکبار بهم هشدار میده که زیاد پشت کامپیوتر نباشم و کمی قدم بزنم؛ الان هم نوتیفیکشن میده هم یه خانم با لهجه‌ی بریتیش و صدای زیباش بهم یادآوری میکنه 😀 <a href="https://t.co/E7RneW9W28">pic.twitter.com/E7RneW9W28</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1393528573013680128?ref_src=twsrc%5Etfw">May 15, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The tweet is in Persian but the gist of it is that like many programmers, I am really into automating things to make the most of my working day, at the same time I have been a little bit lazy recently in terms of doing regular exercises as I used to go walking a few times a week. Since I do things on the spur of the moment so I decided to give it a try right off the bat to remedy the problem.

What I ended up with was to get my computer to help me out on this process by putting together a simple script to show me a notification every X times a day simply saying this:

<img class="img-res m-auto" src="/img/mac_reminder.png" alt="Mac OS Reminder" />

Well, as I mentioned I am out of practice at walking so I can at least stand up a few times a day :D It simply reminds to do the activity so that it doesn't slip my mind.

## MacOS

Initiating that notification is incredibly easy. If you are on mac you can open your terminal and type in this command:

```js
osascript -e 'display notification "Hey boss, code is enough, Could you please stand up and move around for at least one minute?" with title "Reminder!"'
```

What it does is simply running a script which is called [AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html). It comes out of the box with your operating OS so that you don't need to install something. It's basically a way to automate things in macOS. It also supports JavaScript, The following code has the exact same result:

```js
var app = Application.currentApplication();

app.includeStandardAdditions = true;

app.displayNotification("Reminder", {
  withTitle: "Reminder",
  subtitle:
    "Hey boss, code is enough, Could you please stand up and move around for at least one minute?",
  soundName: "Frog",
});
```

## Windows

You can do the same thing on Windows:

<img class="img-res m-auto" src="/img/windows_reminder.jpeg" alt="Windows OS Reminder" />

Which can be done using Powershell (You can also use [Powershell on macOS](https://sirwan.info/blog/en/running-powershell-on-macos)):

```powershell
Add-Type -AssemblyName System.Windows.Forms
$global:reminder = New-Object System.Windows.Forms.NotifyIcon
$path = (Get-Process -id $pid).Path
$reminder.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon($path)
$reminder.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
$reminder.BalloonTipText = ‘Hey boss, code is enough, Could you please stand up and move around for at least one minute?'
$reminder.BalloonTipTitle = "Reminder! $Env:USERNAME"
$reminder.Visible = $true
$reminder.ShowBalloonTip(20000)
```

The code is self-explanatory, it instantiates an object of type `NotifyIcon` and sets some properties to display it on the screen.

## How to Schedule the Task to Run Every 30 Minutes?

We can execute the task automatically every 30 minutes. It's pretty easy on both platforms. On Windows we can use Task Scheduler and on macOS we can use cron tab.

### Windows

1. Open `Task scheduler` > `Action` > `Create Task`.
2. Choose a new for the task: `Reminder`.
3. Go to `Triggers` tab > Click on `New...` button.
4. Check `Repeat task every: 30 minutes`. > OK
   <img class="img-res w-2/3 m-auto" src="/img/notification_windows_new_trigger.jpg" alt="Windows OS Reminder" />

5. Go to `Actions` tab > Click on `New...`
   - `Program/script`: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`
   - `Add arguments (optional)`: `-File "C:\Users\Sirwan\Desktop\scripts\reminder.ps1"`

<img class="img-res w-2/3 m-auto" src="/img/notification_windows_new_action.jpg" alt="Windows OS Reminder" />

### macOS

1. Open your terminal and type in this command: `crontab -e`
2. Paste the following command then `:wq`:

```
*/30 * * * * osascript -e 'display notification "Hey boss, code is enough, Could you please stand up and move around for at least one minute?" with title "Reminder!"'
```

3. You might get this confirmation after saving the cron. Click OK to allow

<img class="img-res w-2/3 m-auto" src="/img/notification_macos_cron_permission.jpg" alt="Mac OS Reminder" />
