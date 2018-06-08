import { AfterViewInit, EventEmitter, OnInit, QueryList } from '@angular/core';
import { DDDirective } from './d-d.directive';
import { DDService, IEvent } from './d-d.service';
export declare class DDMaterialStyleComponent implements OnInit, AfterViewInit {
    private _dDService;
    config: {
        direction?: 'x' | 'y' | 'grid';
        matClick?: boolean;
        shadow?: boolean;
        collection?: any[];
        swipe?: string;
    };
    collection: QueryList<DDDirective>;
    dChange: EventEmitter<IEvent>;
    dDrop: EventEmitter<IEvent>;
    private _customCollection;
    private _direction;
    private _materialStyle;
    private _shadow;
    private _swipe;
    constructor(_dDService: DDService);
    ngOnInit(): void;
    private _sendEvent;
    ngAfterViewInit(): void;
}
