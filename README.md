# DateTwoOption.PCF ![GitHub all releases](https://img.shields.io/github/downloads/drivardxrm/DateTwoOption.PCF/total?style=plastic)
DateTwoOption PCF (PowerApps Component framework) Control that turns a PowerApps date field into a checkbox. When the checkbox is clicked, the current date is stored in the backing date field.

# Dependencies
fluentui/react-components : https://github.com/microsoft/fluentui

# Features
*	Compatible with all DateTime formats (Date Only, User Local, Timezone Independent)
*	Show or Hide the checked date beside the Chexbox.
*	Customize text that appears beside the checkbox
*	Customize the DateTime display format
*	Optional : Lock the Checkbox after check


# Parameters
| Parameter         | Description                                                                                  | Default     |
|-------------------|----------------------------------------------------------------------------------------------|----------   |
|Date TwoOption Field  | Date field to attach the control                                                          |             |
| Show Date    | Show checked date next to checkbox                                                                | true|
| Show Date Text   | Text to show before the date (ex. Completed on ...), remove to show date only                 | Completed on   |
| Override Date Format    | Override the date format (defaults are DateAndTime=YYYY-MM-DD hh:mm, DateOnly=YYYY-MM-DD  |      |
| Lock After Check   | Lock after first check                                                              |     false    |


# Screenshots
![alt text](https://github.com/drivardxrm/DateTwoOption.PCF/blob/master/datetwooption.png?raw=true)
![alt text](https://github.com/drivardxrm/DateTwoOption.PCF/blob/master/datetwooption-feature.png?raw=true)
![alt text](https://github.com/drivardxrm/DateTwoOption.PCF/blob/master/datetwooption.gif?raw=true)


# Installation
You can install the component directly from solution files containes in the 'Release' section
https://github.com/drivardxrm/DateTwoOption.PCF/releases

# Get required tools

To use Microsoft PowerApps CLI, do the following:

* Install Npm (comes with Node.js) or install Node.js (comes with npm). We recommend LTS (Long Term Support) version 10.15.3 LTS as it seems to be most stable.

* Install .NET Framework 4.6.2 Developer Pack.

* If you don’t already have Visual Studio 2017 or later, follow one of the options below:

  * Option 1: Install Visual Studio 2017 or later.
  * Option 2: Install .NET Core 2.2 SDK and then install Visual Studio Code.
* Install Microsoft PowerApps CLI.

Be sure to update your Microsoft PowerApps CLI to the latest version: 
```bash
pac install latest
```
# Build the control

* Clone the repo/ download the zip file.
* Navigate to ./DateTwoOption/ folder.
* Copy the folder path and open it in visual studio code.
* Open the terminal, and run the command the following command to install the project dependencies:
```bash
npm install
```
Then run the command:
```bash
npm run start
```
# Build the solution

* Create a new solution folder and open the Developer command prompt.
* Change the directory to the newly created folder in previous step.
* Init the future solution:
```bash
pac solution init --publisherName someName --customizationPrefix someSolutionPrefix
``` 
* Add the control to your future solution:
```bash
pac solution add-reference --path provide path of control project folder where the pcf.proj is available
``` 
* Build 1/2:
```bash
msbuild /t:restore
``` 
* Build 2/2:
```bash
msbuild
``` 
* You will have the solution file in SolutionFolder/bin/debug folder!

If you want to change the solution type you have to edit the .cdsproj file:
```bash
Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>

  ```
 
 

 
