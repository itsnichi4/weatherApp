export interface BuildContext {
    [key: string]: any;
    addEventListener?: Parameters<typeof HTMLElement.prototype.addEventListener>;
    children?: NodeListOf<ChildNode> | HTMLElement[];
    onBuild?: (element: HTMLElement) => void;
  }
  
  export function b(tag: keyof HTMLElementTagNameMap, buildContext: BuildContext): HTMLElement {
    const element = document.createElement(tag);
  
    for (let property in buildContext) {
      switch (property) {
        case "addEventListener":
          element.addEventListener(...buildContext[property]!);
          break;
        case "children":
          const childArray = Array.from(buildContext.children!);
          element.append(...childArray);
          break;
        case "onBuild":
          buildContext.onBuild!(element);
          break;
        default:
          element[property] = buildContext[property];
      }
    }
  
    return element;
  }