Hi everyone, my name is Eduard and together with a dear friend of mine,
Newton Urbanetz, we were trying last day to create our first PCF (PowerApps Component Framework).

I must say that, to be a Microsoft component I expected to be documented in a much better way. In fact, some parts are not fully explained, I also found it difficult to find information in a single Microsoft Docs.
With this article I hope to fill these empty spaces, to put all the information
in one place and make everyone understand how to create their first PCF.

So, let’s start this path together !

We will go through 3 steps, firstly we will download all necessary files, then we will see how to create a simple static grid, and then publish it.

![3 Steps](https://miro.medium.com/max/1970/1*qTrink55bg7Aqa1kbBHHzA.jpeg)


![Are you ready ?](https://miro.medium.com/max/2400/1*FUuD-Bdt-u-An2NkE9PQBQ.jpeg)

# **What do you need to create a PCF project?**
Firstly we need to install the Power Apps CLI, which gives us access to **creation** / **update** and **deploy** functions of a custom control component.
To do this, Microsoft gives us this *[guide](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/powerapps-cli)*. But let’s do it together !


1) We need to install *[Node.js](https://nodejs.org/it/)* and together it will come also installed NPM.

What is Node.js?

A framework that allows you to create server-side applications in Javascript, using an engine, called V8, which was made by Google, but this is not important for us, at least not now :)

NPM instead is a package manager (Node.js Package Manager) tool that
allows you to include, remove and update libraries within project.

2) Without the .NET Framework version 4.6.2 it is not possible to use the Power Apps CLI.

To install it you can either go to the *[Microsoft website](https://dotnet.microsoft.com/download/dotnet-framework/net462)* and download the Developer version. Or open Visual Studio Installer, select ‘Individual Components’ and then choose **.NET Framework 4.6.2 SDK** & **.NET Framework 4.6.2 Targeting Pack**.

![How to install .NET Framework 4.6.2 from VS](https://miro.medium.com/max/1996/1*RzgJ14w7DHA3ZTZCcfqtpg.png)

Once you have selected, click on ‘Edit’ at the bottom right.

3) Download the *[Power Apps CLI](https://aka.ms/PowerAppsCLI)*

In order to create a PCF project you need to have a version of Visual Studio equal to or greater than 2017 !

Once we have followed these 3 simple steps we can start setting up our project

# **How to set up a PCF project?**

1) Create a folder called MyFirstPCF

2) Then, open your favorite command prompt, which can be the classic CMD or other console emulators like *[CMDER](https://cmder.net/)*.

Open the folder created, using the command ‘cd <Folder Name Path>’. It’s time to launch the command shown below:

```
pac pcf init --namespace <specify your namespace here> --name <Name of the code component> 
--template <component type>
```

With this command we have created a Power Apps Component Framework (PCF) project in our folder.
In the namespace param you can enter whatever you want, in the name param we will enter the name we want to give to our component, the important thing is to understand the types of templates available. There are currently only 2 templates for model-driven apps (**Field** and **DataSet**) and only one for canvas apps (**Field**).


Since Microsoft talks about the Field in the documentation and my need was to create another type of template, a grid for example, I found myself in difficulty.

So let’s choose DataSet and see what happens:

```
pac pcf init --namespace MyFristPCF --name GridComponent --template dataset
```

Once the command has been executed, we must make sure that we have installed all the necessary dependencies, so execute:

```
npm install
```
![NPM Install](https://miro.medium.com/max/2310/1*EHVskAjVhKQfKhKp9-SoRQ.jpeg)

We are ready to start, we have created and configured our project and our component, open component in your favourite editor. I will use Visual Studio Code.

You should be able to see this files:

![Files](https://miro.medium.com/max/498/1*4r5Pl4A7w5zpWBw3JPgcfw.png)

# **Creating a static grid and start it in local**

Let’s create the syle of our grid, create a folder named ‘assets’ and copy this css there:

global.css
```css
#customers {
font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
border-collapse: collapse;
width: 100%;
}
#customers td, #customers th {
border: 1px solid #ddd;
padding: 8px;
}
#customers tr:nth-child(even) {
background-color: #f2f2f2;
}
#customers tr:hover {
background-color: #ddd;
}
#customers th {
padding-top: 12px;
padding-bottom: 12px;
text-align: left;
background-color: #4CAF50;
color: white;
}
```
Now we need to comunicate to our PCF that the css that we want to use is the one present in global.css. To do this we will modify the **ControlManifest.Input.xml**, this file is important and we will talk about it later in my next post :), for now add in the ‘resources’ tag our css reference

```xml
<css path="assets/global.css" order="1" />
```

You should have something like this:

![Control Manifest](https://miro.medium.com/max/3419/1*fMNXi2vHtdr8gsLcntrgJA.jpeg)

Open index.ts to write our grid code and implement it in PCF. There are some methods already presents like **updateView**, **getOutputs**, **destroy** and **init**

**updateView**: will be fired when any property of our control changes

**getOutputs**: called by framework when the data related to control changes

**destroy**: called by framework when component is removed from DOM tree

**init**: initialize the control. Here you build your control with the HTML 
elements that would be rendered on CRM forms / views

We want that our grid loads at the same time with the CRM page, so the code will be centralized in the **init** method.

Init accept in input some variables like **context**, **notifyOutputChanged**, **state** and **container**

**context**: The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.

**notifyOutputChanged**: A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.

**state**: A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling ‘setControlState’ in the Mode interface.

**container**: If a control is marked control-type=’standard’, it will receive an empty div element within which it can render its content.

I will explain better the posibilities that this 4 variables are giving to us in a future post, but for now i think that we can focus on the **container**.

# **Let’s start code (not so much, for now :D)**

First of all, create a container of HTMLDivElement type into our GridComponent class:

![Grid Component Class](https://miro.medium.com/max/1893/1*ERBNNxl8WLeos20U5FmRUg.png)

```typescript
private mainContainer: HTMLDivElement;
```

I have created a simple variable named *gridHTML* that contains our table html as bellow:

```typescript
const gridHTML = `<table id="customers">
<tr>
<th>Company</th>
<th>Contact</th>
<th>Country</th>
</tr>
<tr>
<td>Alfreds Futterkiste</td>
<td>Maria Anders</td>
<td>Germany</td>
</tr>
<tr>
<td>Paris spécialités</td>
<td>Marie Bertrand</td>
<td>France</td>
</tr>
</table>`
```

Now, we need to create a `<div>` to put our table in, and then ‘inject’ the HTML into the page:

```typescript
// Create main table container div
this.mainContainer = document.createElement("div");
this.mainContainer.id = 'GridContainer';
this.mainContainer.innerHTML = gridHTML;
container.appendChild(this.mainContainer);
```

Let’s see what happens, write and lunch command bellow to build and start the project in local.

```
npm start
```

You should be able to see the result by navigating on http://127.0.0.1:8181/

![Local Debug](https://miro.medium.com/max/3418/1*5n47Ec2rHDEHOpLfuVgL_A.png)

As you can see, Power Apps component framework provide us a special interface of debugging, it really helps if we want to debug with real data or if we want to see if our component is responsive or not.

Ok, so… I think that it’s the moment to publish this great grid :))

First, navigate to our ‘GridComponent’ folder and create a new folder named ‘solution’. To publish a PCF we need a solution to connect with. Into the solution folder write the following command:

```
pac solution init --publisher-name <publisher name> --publisher-prefix <publisher prefix>
```

I have created a new publisher on my environment and i will use this one, you can use yours or the default one.

![Publisher](https://miro.medium.com/max/3413/1*QS6Rm_bozuykBwdI12rHRA.png)

Since my publisher name is ‘edu’ I will write something like this:

```
pac solution init --publisher-name edu --publisher-prefix edu
```

You will be able to see that some files were created into the folder, we have created an empty solution, now we need to connect our project to this empty solution. To do this you **must** run the following command from solution path.

```
pac solution add-reference --path <project path>
```

In our case, the project path is ‘ C:\MyFirstPCF’. After that we have a solution with our component inside. Next step is the connection with our organization, to do it I will use this command here:

```
pac auth create --url <your organization url>
```

Before publish , we need to build it, a new folder named ‘out’ will be created in our project folder, to do it you need to be in your **component path**, in this case ‘C:\MyFirstPCF\GridComponent’ and run the following:

```
npm run build
```

To publish our component we need to use **Developer Command Prompt**, both version 2017 or 2019 are fine. This cause Power Apps CLI needs MSBuild.exe and **Developer Command Prompt** already comes with it.

![Developer Command Prompt](https://miro.medium.com/max/2395/1*u6Ruo-9kl-RWK_49HWlHiA.jpeg)

From our project path run bellow command:

```
pac pcf push --publisher-prefix <publisher prefix>
```

And that’s it, we should be able to see our PCF published now, so navigate on our solution, entity, choose the one that you want, I will choose Account

![Account Entity in Default Solution](https://miro.medium.com/max/2505/1*8E6whKxXoRUU_UJTlJ6c7Q.png)

And from ‘Controls’ tab add control like bellow:

![Custom Control Select](https://miro.medium.com/max/1218/1*teClXb9rzVeQ_C-3G-ELTg.png)

Then choose it for Web disponibility, save and publish. Let’s see what we have :)

![PCF Published](https://miro.medium.com/max/3420/1*95NvPMW81lzQFuhrWJatsA.png)

We have do it, I hope that this wasn’t difficult for you. I think that is enought for this post, surely I have already bored you :D

I want to thank you for getting so far, this was my first article, I accept advice and I hope you enjoyed it. Next time I would like to explain better the real functionality of the PCF and how to interact with the data coming from the context, how to configure our manifest and how to debug with real data in local.

See you next time !