Today we often see the use of the FC (FunctionComponent) type in tutorials, courses, videos on YouTube, which deal with topics on React TypeScript.

At first I didn't pay any attention to it, it was something that everyone used so it was obviously fine to include it in my projects too :D.
Over time, by reading and learning more about the development of React applications through **Function Components**, I discovered that it is possible to return JSX, or in our case, TSX, even by not typing a function correctly.

```jsx
interface IAppProps {
   name: string;
}
const App = (props: IAppProps) => <div>Hello {props.name}!</div>;
```

## So the question arises spontaneously, what is the point of typing our component with FC?

There are a couple of advantages, that's for sure, let's go and see them together:
1) Our component function would become Type-Safe, it would give us an error trying to return a type other than a **JSX.Element**.

```jsx
// no error is raised on the function
const App = (props: IAppProps) => `Hello ${props.name}!`;
// an error is raised if you accidentally return some other type
const App: React.FC = (props: IAppProps) => `Hello ${props.name}!`;
```

2) We have access to **children** implicitly within the props (Not everyone considers this to be an advantage, so let's see it as a 'feature' of **React.FC**)

```jsx
/* 
without any additional interface we can access 'children' directly from props
*/
const App: React.FC = (props) => <div>{props.children}</div>;
```

---

We can immediately notice that the list is quite short, furthermore, by reading the [React TypeScript documentation](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/), we see that there are alternatives to what React.FC uses by default.

As an alternative to **point 1**, we can manually type the type returned by our component function.

```jsx
/*
you can choose annotate the return type so an error is raised if you accidentally return some other type
*/
const App = ({name}: IAppProps): JSX.Element => {
   return <div>Hello {name}!</div>;
}
```

As an alternative to **step 2**, we can manually add children to the component interface like this:

```jsx
interface IAppProps {
   name: string;
   children: JSX:Element;
}
const App = (props: IAppProps) => {
   return <div>
      Hello {props.name}!
      {props.children}
   </div>;
};
```

Also true is the fact that probably, if we were to use the children property, it would be better for us to implement **React.FC**, so we save ourselves the manual typing.

---

## Ok, but are there any disadvantages to continuing to use React.FC?
**1. Children passed even when you don't need it**
The first thing I found is that children can be passed even if the component doesn't use them.

With **React.FC**:

```jsx
// Don't want children
const Header: React.FC = (props) => { /*...*/ };
const App = () => {
   return <div>
      <Header>
        <span>Unwanted Item</span>
      </Header>
   </div>
}
```

Typing manually:

```jsx
// Don't want children
const Header = (props): JSX:Element => { /*...*/ };
const App = (): => {
   return <div>
      <Header> // Will throw an error
        <span>Unwanted Item</span>
      </Header>
   </div>
}
```

**2. Does not support generics**
If desired, you can create components by defining generics in the interface

```jsx
interface IAppPropsGeneric<T> {
  appList: T;
  name: string;
}
function App <T>(props: IAppPropsGeneric<T>) { /*...*/ }
```

Using React.FC there is no way to keep the generics in the types returned by the function.

```jsx
const App: React.FC</*??*/> = <T>(props: IAppProps<T>) =>{/*...*/}
```

**3. Does not work well with defaultProps**
As is also described directly on the [react-typescript site](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/), there are known problems with using defaultProps using React.FC.

Let's take the example of a component that has a required input property and uses **defaultProps** to define its default value.
We will do an example without **React.FC** and one with, using the same interface.

```ts
type IHeaderProps = { title: string; }
```

Without React.FC things would be fine

```jsx
const Header = ({ title }: IHeaderProps) => {
  return <div>
    {title.toUpperCase()} /* Safe since title is required */
  </div>
};
Header.defaultProps = { title: "Hello everyone!" };

const App = () => (<Header/>) 
/* Safe to omit 'title' since already has a default value */
```

Now let's see how it would behave using **React.FC**:

```jsx
const Header: React.FC<IHeaderProps> = ({ title }) => {
  return <div>
    {title.toUpperCase()} /* Safe since title is required */
  </div>
};
Header.defaultProps = { title: "Hello everyone!" };

const App = () => (<Header/>) 
/* Error thrown here saying that propery title is missing */
```

Basically you can't use **defaultProps** to define i**nternally required** and **externally optional** properties.

The only way to get the desired result would be to use the default value directly in the destructoring on the input properties, and define the property as optional on the interface, like this

```jsx
// Use of ? for optional parameter
type  IHeaderProps = { title?: string; }
// Add deafult value on destructoring
const Header: React.FC<IHeaderProps> = ({ title = 'Default Value' }) => {
  return <div>
    {title.toUpperCase()} 
    // Safe since title is required and has a default value
  </div>
};

const App = () => (<Header/>) 
/* Safe now cause the default value was defined internally */
```

But this doesn't solve the **defaultProps** problem, it just offers us an alternative :(

**What to do then?**
Finally, I leave you with the alternative to using **React.FC**:

```
const AppWithFC: React.FC<IAppProps> = (props) => { /*...*/ }
const App = (props: IAppProps): JSX.Element => { /*...*/ };
```

All this to say that it is not strictly necessary to use it, there are alternatives to returning valid JSX.
And if you want to use children, you can add input properties to the interface or use React.FC, however, I would like to point out that the documentation discourages their use nowadays.

![React.FC from documentation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c31uxler02p4e14ioshg.png)

Using React.FC, children will most likely be removed from implicit parameters on props, from version 18.0.0 onwards of @types/react.

![fc from documentation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tzvi8pvu70tu7ztlobnh.png)

---

I hope I have given you some ideas :)

I understand that there are all kinds of materials online and often not everything we see being used en masse means it's the right thing to take into consideration.

So I greet you and if you liked the article I would like to know your opinion on the topic.
Do you use **React.FC** within your projects? :D

PS: I used it and still use it a lot, but don't tell anyone, thanks :)
