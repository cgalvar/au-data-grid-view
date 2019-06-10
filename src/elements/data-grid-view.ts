import { bindable, autoinject, bindingMode } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { DataGridHead } from "./data-grid-head";
import { ColumnDefinition } from "./column-definition";

var instances = 0;

@autoinject()
export class DataGridView extends DataGridHead{

    dragcolumnEventName: string;
    rowSelectedEventName: string;
    private identifier;

    onSelectRowSubscription: Subscription;
    onMouseUpSubscription: Subscription;

    // settings
    @bindable enableFilter = false;
    @bindable arrowMove = false;


    @bindable columns:any[];
    @bindable rows:any[];

    @bindable onOrderBy;

    // cuando se da un click a la fila
    @bindable clickRow:Function;

    // cuando se selecciona manteniendo presionado click izquierdo o un click derecho
    @bindable rowSelected:Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    rowDiselect:boolean;
    
    // cuando se deselecciona manteniendo presionado click izquierdo o un click derecho
    @bindable rowDiselected:Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    orderByColumn;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    orderByType;
    orderColumnSelected: any;

    constructor(events: EventAggregator){
        super(events);
        instances++;
        this.identifier = instances;
        this.rowSelectedEventName = `rowselected${this.identifier}`;
        this.dragcolumnEventName = `dragcolumn${this.identifier}`;
    }

    _onOrderBy(column:ColumnDefinition, type){
        debugger;
        if(type == ''){
            this.orderByColumn == '';
            this.orderColumnSelected = null;
            this.orderByType = type;
        }

        else{
            this.orderColumnSelected = column;
            this.orderByColumn = column.propertyKey;
            this.orderByType = type;
        }

        if(this.onOrderBy)
            this.onOrderBy({column: this.orderByColumn, type: type});

    }

    rowDiselectChanged(){
        debugger;
        if(this.rowDiselect){
            this.events.publish(`selectable.rowselected${this.identifier}.clear`);
            //this.rowDiselect = false;
        }
    }

    attached(){
        this.listenSelectable();
    }

    listenSelectable() {

        super.listenSelectable();
        
        this.onSelectRowSubscription = this.events.subscribe(`selectable.rowselected${this.identifier}`, (record) => {
            if(this.rowSelected){
                this.rowSelected({row:record});
            }

        })

        this.onSelectRowSubscription = this.events.subscribe(`selectable.rowselected${this.identifier}.onDiselect`, (record) => {
            if(this.rowDiselected){
                this.rowDiselected({ row: record });
            }

        })

    }

    private _clickRow(row){
        if (this.clickRow) {
            this.clickRow({row:row});
        }
    }

    private moveScroll(element:HTMLDivElement, scrollTo){

        let scroll = element.scrollLeft;

        if(scrollTo == 'rigth'){
            scroll += 300;
        }

        else if (scrollTo == 'left') {
            scroll -= 300;
        }

        element.scrollTo(scroll, 0);
    }

}