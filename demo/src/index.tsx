import { QuarkElement, property, customElement } from "quarkc"
import { Router } from "quark-router"
import "./pages/home"
import "./pages/sub"
import "./pages/child"
import style from "./index.less?inline"

declare global {
  interface HTMLElementTagNameMap {
    "my-component": MyComponent;
  }
}

@customElement({ tag: "my-component", style })
class MyComponent extends QuarkElement {
  private _routes = new Router(this, [
    {path: '/', render: () => <home-component/>},
    {path: '/sub/:id', render: ({id}) => <sub-component id={id}/>},
    {path: '/child/*', render: () => <child-component/>},
  ])


  @property({ type: Number }) // 外部属性
  count = 0 // 可以设置默认值

  @property({ type: String })
  text

  add = () => {
    // 内部事件
    this.count += 1
  };

  componentDidMount() {
    console.log("dom loaded!")
    // ...
  }

  render() {
    return (
      <>
        <div className="main">
          <div>
            <a href="https://quarkc.hellobike.com" target="_blank">
              <img
                src="https://quark-design.hellobike.com/assets/quark-logo.f9a6a307.png"
                class="logo"
                alt="quark logo"
              />
            </a>
          </div>

          <h1>{this.text} Quarkc</h1>

          <div className="card">
            <button onClick={this.add}>count is: {this.count}</button>
          </div>
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/sub/3222">Sub</a></li>
          <li><a href="/child/1">Child</a></li>
        </ul>
        <div className="router-render">
          { this._routes.outlet() }
        </div>
      </>
    );
  }
}

export default MyComponent;
