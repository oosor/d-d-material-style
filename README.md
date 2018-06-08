# d-d-material-style
drag and drop with material style

### Demo
 
<a target="_blank" href="https://angular-jd6bgy.stackblitz.io/">https://angular-jd6bgy.stackblitz.io/</a>
or
<a target="_blank" href="https://stackblitz.com/edit/angular-jd6bgy">stackblitz editor</a>

### Install

```npm i d-d-material-style --save```

### Setup

```
import { DDMaterialStyleModule } from 'd-d-material-style';

@NgModule({
  ...
  imports:      [ ..., DDMaterialStyleModule ],
  ...
})
```

### Use Directive

````
<div ddMatStyle>Dragable div</div>
````

```
<div class="limit-box" #container>
  <div [ddMatStyle]='container'>Dragable div inner div.limit-box</div>
</div>
```

#### Directive config
```
@Input() config: {direction?: 'x' | 'y' | 'grid', matClick?: boolean, shadow?: boolean, elem?: any, swipe?: string}
@Output() dChange: EventEmitter<IEvent>
@Output() dDrop: EventEmitter<IEvent>
```
```
IEvent = {
  type: 'change' | 'drop';
  point: {...};
  elem: {...} | any;
  collection: {...}[] | any;
}
```
See at <a target="_blank" href="https://stackblitz.com/edit/angular-jd6bgy?file=src%2Fapp%2Fdemo%2Fdemo.component.html">example</a>.

### Use Component with Directive 

```
<div class="vertical-box" #container>
  <d-d-material-style [config]="{direction: 'y', shadow: true}">
    <div class='item {{ el.style }}' *ngFor="let el of miniCollect" [ddMatStyle]="container">
      <span>{{ el.data }}</span>
    </div>
  </d-d-material-style>
</div>
```
#### Component config
```
@Input() config: {direction?: 'x' | 'y' | 'grid', matClick?: boolean, shadow?: boolean, collection?: any[], swipe?: string}
@Output() dChange: EventEmitter<IEvent>
@Output() dDrop: EventEmitter<IEvent>
```
See at <a target="_blank" href="https://stackblitz.com/edit/angular-jd6bgy?file=src%2Fapp%2Fdemo%2Fdemo.component.html">example</a>.
