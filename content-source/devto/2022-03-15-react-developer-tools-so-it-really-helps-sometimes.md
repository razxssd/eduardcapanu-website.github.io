I'm that kind of person who, as soon as I start to delve into a new topic / framework / library, I go and do research on everything that could make studying or putting it into practice easier.
In fact, I don't even know the extensions I downloaded in the first days of studying React, I'll just tell you that they were more extensions for React Native than for ReactJS 😁.

Among all this plethora of tools I also downloaded React Developer Tools. (Link for[ Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) for Firefox, and [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil))

Obviously months went by without me using it at all, I didn't understand its potential and usefulness.
And it is precisely for this reason that, after 1 and a half years now, I have decided to bring you some of the really useful features of this extension.

---

## Functionalities

**Identification of an app developed in React**
By visiting a web page you have the opportunity to see whether it was written in React or not.
Let's take for example a sample page I made: [Google Keep Clone Basic](https://rx-google-keep.vercel.app/).

![Sample app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tpsue3h8u9kl3yn6z61y.png)

Just look at the color to understand that the app was written in React and uses a production build.

Let's see an example of a page that doesn't use React instead.

![App withous react](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ea1bqu17wvp8pdbbc4rf.png)
 
The exact same thing for local applications too.

![App without react in local](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6k08ij2lruh611jvsjkc.png)
 
As from the message presented to us, we see that for those apps that use React, we have 2 new tabs available.

**Components tab**
By opening the extension you have the opportunity to see how the application is actually structured and identify, for example, a problematic item on a list.

![Developer tools tabs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cxetnlhwb84ic2o9tqzb.png)
 
You can pass properties to test how components work with different inputs or change the state of hooks such as useState().
Very useful in case you have non-visible values ​​such as the 'isLoading' parameters.


![Example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lmm65fis8lzopf4bi2l2.gif)

A step forward for debugging for sure, enough with console.logs at every point of the application 😁.

By inspecting a component you can also observe which part of the application rendered it, showing the components in cascade.

![Example of inspecting](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s1tpvi0n8uo96gdo3erg.jpg)
 
In addition to data inspection and manipulation, the tab comes with some interesting settings.
It gives us the possibility to hide certain components from the list, if the app is very complex and large, change the theme, stop on wranings or decide to print all the information relating to a component in the console.

![Example of rendering](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2aju2uk9xb1ti0d70cat.gif)

How many times have you had to print the input props to a component and write and rewrite console.log(props)?😁

![Example of props](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jzf7kne0zvj5naqejlc1.gif)

**Profiler tab**
Thanks to this tab we can identify and optimize the performance of our components, once started you will be listening to all the modifications and changes within the app.

Initially the profiler could only be activated once the application had been loaded, thus losing the initial render, which is often the most problematic one.
The issue was resolved later, with the introduction of the 'Reload and start profiling' button.

![Profiling](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pyj4u2dv3x3npcw078sg.png)

Which will refresh the page and start the profiler automatically.
Let's see how it works though.

![Profiler tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/25cpu3upe0mgm60gxt2m.gif)

The profiler will display a list of all items along with the loading time of each.
They will then be colored differently based on the time taken and you will have the opportunity to identify those who take the longest to render their children or themselves.
You can also notice if a component is rendered more than once, very useful for discovering superfluous renders.

---

Debugging React applications can be difficult, especially when users encounter problems that are difficult to reproduce, so I think the extension can be very useful for several use cases.
Both during development and later for performance optimization.

If you liked the post, let me know in the comments, and if you would like to learn more about the topic, tell me below, so that I can make a video or an article in which I actually explain how to best use the profiler and the components tab based on different use cases 😉.
 

