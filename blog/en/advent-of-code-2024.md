# Advent of Code 2024

As we approach Advent of Code 2024, I wanted to share my experience from previous years tackling these coding challenges with perhaps an unconventional choice of tools: PowerShell and Pester. While PowerShell is often pigeonholed as just an automation tool, I've found it to be a surprisingly powerful language for algorithmic problem-solving, thanks to its foundation on .NET and its expressive pipeline syntax.

- Published: 2024-11-30
- Language: en
- Tags: Advent of Code, Programming
- Canonical: https://sirwan.info/blog/en/advent-of-code-2024

---

As we approach Advent of Code 2024, I wanted to share my experience from previous years tackling these coding challenges with perhaps an unconventional choice of tools: PowerShell and Pester. While PowerShell is often pigeonholed as just an automation tool, I've found it to be a surprisingly powerful language for algorithmic problem-solving, thanks to its foundation on .NET and its expressive pipeline syntax.

<img src="/img/advent_of_code.jpg" width="50%" class="m-auto" alt="Advent of Code 2024" />

Each year, I've participated in Advent of Code, typically making it through the first 10-15 days before time constraints catch up. While I may not reach day 25, the journey always proves invaluable for honing my programming skills and discovering new aspects of PowerShell.

My project structure is straightforward:

```
advent-of-code/
  ├── 2024/
    └── dayXX/
        ├── data.txt    # Challenge input
        └── dayXX.ps1   # Solution with Pester tests
```

PowerShell, built on top of .NET, offers much more than just system automation capabilities. It provides access to powerful .NET classes and collections, making it suitable for complex algorithmic challenges.

Here's a simple example of a solution to day seven of Advent of Code 2023:

```powershell
using namespace System.Linq
using namespace System.Collections
using namespace System.Collections.Generic

Describe "Day 07" {
    BeforeAll {
        $InputData = Get-Content -Path "./day07/data.txt" -Raw
        $InputData = $InputData.Trim() -Split "`n"

        $Path = ""
        $Files = [Dictionary[String, Int]]@{}
        $Dirs = [Dictionary[string, ArrayList]]@{}

        # Parse input and build file system structure
        $InputData | ForEach-Object {
            $Words = $_ -Split " "
            if ($Words[0] -eq "$") {
                if ($Words[1] -eq "cd") {
                    # Handle directory navigation
                    if ($Words[2] -eq "/") {
                        $Path = "/"
                    }
                    elseif ($Words[2] -eq "..") {
                        $Path = $Path.Substring(0, $Path.LastIndexOf("/"))
                    }
                    else {
                        $Path = $Path + "/" + $Words[2]
                    }
                }
                elseif ($Words[1] -eq "ls") {
                    $Files[$Path] = 0
                    $Dirs[$Path] = [ArrayList]@()
                }
            }
            else {
                # Record files and directories
                if ($Words[0] -eq "dir") {
                    $Dirs[$Path].Add($Path + "/" + $Words[1])
                }
                else {
                    $Files[$Path] += [int]$Words[0]
                }
            }
        }
    }
```

One of the aspects I love about this approach is how Pester makes it easy to verify solutions:

```powershell
It "Should return 1583951 for part 1" {
        $Sorted = $Files.GetEnumerator() | Sort-Object -Property Key -Descending
        $Sorted | ForEach-Object {
            $Sum = $_.Value
            $Dirs[$_.Key] | ForEach-Object {
                $Sum += $Files[$_]
            }
            $Files[$_.Key] = $Sum
        }
        $Total = 0
        $Files.GetEnumerator() | ForEach-Object {
            if ($_.Value -le 100000) {
                $Total += $_.Value
            }
        }
        $Total | Should -Be 1583951
    }
```

For 2024, I'm thinking of mixing things up a bit. While PowerShell has served me well, I might try my hand at some other languages this year.
If you're planning to participate in Advent of Code this year, don't be afraid to use tools that might seem unconventional. Sometimes the best solutions come from unexpected places!

Who knows? Maybe I'll finally make it to day 25 this year! 🎄✨
